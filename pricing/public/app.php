<?php
declare(strict_types=1);
ini_set('display_errors', '0');

function private_dir(): string {
    return rtrim(getenv('FERNELY_PRICING_PRIVATE_DIR') ?: dirname(__DIR__) . '/fernely-pricing-private', '/\\');
}
function ensure_private(): void {
    $path = realpath(private_dir());
    $root = realpath($_SERVER['DOCUMENT_ROOT'] ?? __DIR__);
    if ($path && $root && str_starts_with(strtolower(str_replace('\\', '/', $path)) . '/', strtolower(str_replace('\\', '/', $root)) . '/')) {
        throw new RuntimeException('La carpeta privada debe estar fuera de la raíz pública.');
    }
}
function config(): array {
    ensure_private();
    $file = private_dir() . '/config.php';
    return is_file($file) ? require $file : [];
}
function catalog(): array {
    ensure_private();
    $file = private_dir() . '/catalog.json';
    return json_decode(file_get_contents(is_file($file) ? $file : __DIR__ . '/catalog.default.json'), true, 512, JSON_THROW_ON_ERROR);
}
function esc(mixed $value): string { return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function money(float|int $value): string { return 'US$' . number_format($value, 0); }
function headers_public(): void {
    header('Content-Type: text/html; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'");
    header('Cache-Control: no-cache');
}
function start_admin_session(): void {
    headers_public();
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex, nofollow');
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_name('fernely_admin');
    session_set_cookie_params(['httponly'=>true, 'secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off', 'samesite'=>'Strict', 'path'=>'/admin/']);
    session_start();
    if (isset($_SESSION['last']) && time() - $_SESSION['last'] > 1800) { $_SESSION = []; session_regenerate_id(true); }
    $_SESSION['last'] = time();
    $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
}
function check_csrf(): void {
    if (!is_string($_POST['csrf'] ?? null) || !hash_equals($_SESSION['csrf'], $_POST['csrf'])) { http_response_code(403); exit('Solicitud no válida. Recarga la página.'); }
}
function text_field(mixed $value, int $max, bool $allowEmpty=false): string {
    if (!is_string($value) || strlen($value) > $max || (!$allowEmpty && trim($value) === '')) throw new InvalidArgumentException('Revisa los textos y sus límites de longitud.');
    return trim($value);
}
function price_field(mixed $value): int {
    if (!is_string($value) || !preg_match('/^\d{1,6}$/D', $value)) throw new InvalidArgumentException('Los precios deben ser números enteros positivos.');
    return (int)$value;
}
function save_catalog(array $post): void {
    $lock = fopen(private_dir() . '/catalog.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) throw new RuntimeException('No se pudo bloquear el catálogo.');
    try {
        $data = catalog();
        if ((string)$data['revision'] !== ($post['revision'] ?? '')) throw new RuntimeException('Otra sesión cambió el catálogo. Recarga antes de guardar.');
        $email = text_field($post['email'] ?? '', 150);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) throw new InvalidArgumentException('El email no es válido.');
        $phone = text_field($post['phone'] ?? '', 20);
        if (!preg_match('/^\+[1-9]\d{6,14}$/D', $phone)) throw new InvalidArgumentException('Usa un teléfono internacional con + y dígitos.');
        $data['email']=$email; $data['phone']=$phone;
        foreach (['plans','extras'] as $group) {
            foreach ($data[$group] as &$item) {
                $key = $group . '_' . $item['id'] . '_';
                $item['price']=price_field($post[$key.'price'] ?? '');
                $item['active']=isset($post[$key.'active']);
                foreach (['es','en'] as $lang) {
                    foreach (['name'=>120,'description'=>600] as $field=>$max) $item[$lang][$field]=text_field($post[$key.$lang.'_'.$field] ?? '', $max);
                    if ($group === 'plans') {
                        $item[$lang]['tag']=text_field($post[$key.$lang.'_tag'] ?? '',100);
                        $features = array_values(array_filter(array_map('trim', explode("\n", text_field($post[$key.$lang.'_features'] ?? '', 2500)))));
                        if (count($features)<1 || count($features)>10) throw new InvalidArgumentException('Cada paquete necesita entre 1 y 10 características.');
                        $item[$lang]['features']=$features;
                    }
                }
            }
            unset($item);
        }
        $data['revision']++;
        $data['updatedAt']=gmdate('c');
        $current=private_dir().'/catalog.json';
        $json=json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR);
        $temp=tempnam(private_dir(), 'catalog-');
        try {
            if (file_put_contents($temp,$json)===false) throw new RuntimeException('No se pudo guardar el catálogo.');
            chmod($temp,0600);
            if (is_file($current) && !copy($current,private_dir().'/catalog.previous.json')) throw new RuntimeException('No se pudo crear la copia anterior.');
            if (!rename($temp,$current)) throw new RuntimeException('No se pudo publicar el catálogo.');
        } finally { if (is_file($temp)) unlink($temp); }
    } finally { flock($lock, LOCK_UN); fclose($lock); }
}

// Failed attempts are persisted outside the web root and shared between sessions.
function attempt_login(string $user, string $password, array $cfg): bool {
    $key=hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    $file=private_dir().'/attempt-'.$key.'.json';
    $lock=fopen($file,'c+');
    if (!$lock || !flock($lock,LOCK_EX)) throw new RuntimeException('No se pudo verificar el acceso.');
    try {
        $raw=stream_get_contents($lock);
        $state=$raw ? json_decode($raw,true) : null;
        if (!$state || time()-$state['start']>900) $state=['start'=>time(),'count'=>0];
        if ($state['count']>=5) { http_response_code(429); return false; }
        $passwordValid=password_verify($password,$cfg['password_hash']);
        $valid=hash_equals($cfg['username'], $user) && $passwordValid;
        $state['count']=$valid ? 0 : $state['count']+1;
        rewind($lock); ftruncate($lock,0); fwrite($lock,json_encode($state)); fflush($lock);
        return $valid;
    } finally { flock($lock,LOCK_UN); fclose($lock); }
}
