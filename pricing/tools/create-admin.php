<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
// Credentials enter through stdin only and are never printed.
$dir = $argv[1] ?? '';
if ($dir === '' || !is_dir($dir) || is_file($dir.'/config.php')) { fwrite(STDERR,"Indica una carpeta privada existente sin config.php.\n"); exit(1); }
if (($argv[2] ?? '') === '--stdin') {
    $input=json_decode(stream_get_contents(STDIN),true,512,JSON_THROW_ON_ERROR);
    $username=$input['username'] ?? ''; $password=$input['password'] ?? '';
} else {
    fwrite(STDOUT,"Usuario administrador: "); $username=trim(fgets(STDIN));
    if (PHP_OS_FAMILY === 'Windows') { fwrite(STDERR,"En Windows usa --stdin con JSON por entrada estándar.\n"); exit(1); }
    fwrite(STDOUT,"Contraseña (mínimo 14 caracteres, no se mostrará): ");
    $state=shell_exec('stty -g');
    if (!$state) { fwrite(STDERR,"No hay terminal segura; usa --stdin.\n"); exit(1); }
    system('stty -echo');
    try { $password=rtrim(fgets(STDIN),"\r\n"); } finally { system('stty '.escapeshellarg(trim($state))); fwrite(STDOUT,"\n"); }
}
if (!is_string($username) || !preg_match('/^[a-zA-Z0-9_.@-]{3,100}$/D',$username) || !is_string($password) || strlen($password)<14 || strlen($password)>72) { fwrite(STDERR,"Usuario no válido o contraseña fuera del rango de 14–72 caracteres.\n"); exit(1); }
$config=['username'=>$username,'password_hash'=>password_hash($password,PASSWORD_DEFAULT)];
$file=fopen($dir.'/config.php','x');
if (!$file) { fwrite(STDERR,"No se pudo crear config.php.\n"); exit(1); }
fwrite($file,"<?php\nreturn ".var_export($config,true).";\n"); fclose($file); chmod($dir.'/config.php',0600);
fwrite(STDOUT,"Administrador configurado. No se ha guardado la contraseña en texto plano.\n");
