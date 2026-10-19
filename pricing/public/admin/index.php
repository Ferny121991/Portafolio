<?php
require dirname(__DIR__).'/app.php';
start_admin_session();
$cfg=config(); $error='';
$ready=isset($cfg['username'],$cfg['password_hash']);
if (!empty($_SESSION['authenticated']) && !hash_equals((string)($_SESSION['credential_version'] ?? ''),hash('sha256',$cfg['password_hash'] ?? ''))) {
    unset($_SESSION['authenticated']); $_SESSION['csrf']=bin2hex(random_bytes(32)); session_regenerate_id(true);
}
$local=in_array($_SERVER['REMOTE_ADDR'] ?? '',['127.0.0.1','::1'],true);
if (!$local && (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS']==='off')) { http_response_code(400); exit('Accede mediante HTTPS.'); }
if ($_SERVER['REQUEST_METHOD']==='POST') {
    check_csrf();
    $action=$_POST['action'] ?? '';
    if ($action==='logout') {
        $_SESSION=[]; session_regenerate_id(true); header('Location: /admin/'); exit;
    }
    if ($action==='login' && $ready && empty($_SESSION['authenticated'])) {
        $user=is_string($_POST['username'] ?? null) ? $_POST['username'] : '';
        $password=is_string($_POST['password'] ?? null) ? $_POST['password'] : '';
        if (strlen($password)<=72 && attempt_login($user,$password,$cfg)) {
            session_regenerate_id(true); $_SESSION['authenticated']=true; $_SESSION['credential_version']=hash('sha256',$cfg['password_hash']); $_SESSION['csrf']=bin2hex(random_bytes(32));
            header('Location: /admin/'); exit;
        }
        $error=http_response_code()===429 ? 'Demasiados intentos. Espera 15 minutos.' : 'No se pudo iniciar sesión.';
    } elseif ($action==='save') {
        if (empty($_SESSION['authenticated'])) { http_response_code(401); exit('Inicia sesión.'); }
        try { save_catalog($_POST); $_SESSION['saved']=true; header('Location: /admin/'); exit; }
        catch (InvalidArgumentException $e) { $error=$e->getMessage(); http_response_code(422); }
        catch (RuntimeException $e) { $error=$e->getMessage(); http_response_code(409); }
    }
}
$data=catalog(); $csrf=$_SESSION['csrf']; $saved=$_SESSION['saved'] ?? false; unset($_SESSION['saved']);
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Administración de precios | Fernely Dev</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body class="admin-page">
<header>
<div class="wrap nav">
<a class="brand" href="/">FERNELY<b>DEV</b>
</a>
<a href="/">Ver precios publicados ↗</a>
<?php if(!empty($_SESSION['authenticated'])):?>
<form method="post">
<input type="hidden" name="csrf" value="<?=esc($csrf)?>">
<input type="hidden" name="action" value="logout">
<button class="button small">Cerrar sesión</button>
</form>
<?php endif;?>
</div>
</header>
<main class="wrap admin-main">
<p class="eyebrow">FERNELY DEV / TU PANEL</p>
<h1>Precios bajo tu control.</h1>
<?php if(!$ready):?>
<section class="admin-login">
<h2>Activación pendiente</h2>
<p>Este panel necesita que el propietario configure su usuario y contraseña en el servidor. No existe una contraseña predeterminada ni registro público.</p>
<p>Consulta la guía de instalación incluida con el proyecto.</p>
</section>
<?php elseif(empty($_SESSION['authenticated'])):?>
<form class="admin-login" method="post">
<h2>Iniciar sesión</h2>
<p>Acceso exclusivo para administrar los paquetes y servicios de Fernely Dev.</p>
<?php if($error):?>
<p class="notice error" role="alert">
<?=esc($error)?>
</p>
<?php endif;?>
<input type="hidden" name="csrf" value="<?=esc($csrf)?>">
<input type="hidden" name="action" value="login">
<label for="username">Usuario</label>
<input id="username" name="username" autocomplete="username" required maxlength="100">
<label for="password">Contraseña</label>
<input type="password" id="password" name="password" autocomplete="current-password" required maxlength="72">
<button class="button" type="submit">Entrar al panel →</button>
</form>
<?php else:?>
<p>Gestiona importes, disponibilidad y textos en español e inglés. Al guardar, se actualiza la página pública. Negocio y Catálogo incluyen el segundo idioma; Catálogo incluye administración básica. Estas reglas no cambian al editar sus nombres. Los límites de idiomas y las condiciones generales se mantienen en los archivos de contenido.</p>
<?php if($saved):?>
<p class="notice" role="status">Cambios guardados. La página pública ya usa la nueva versión.</p>
<?php endif;?>
<?php if($error):?>
<p class="notice error" role="alert">
<?=esc($error)?>
</p>
<?php endif;?>
<form method="post" class="admin-editor">
<input type="hidden" name="csrf" value="<?=esc($csrf)?>">
<input type="hidden" name="revision" value="<?=esc($data['revision'])?>">
<input type="hidden" name="action" value="save">
<fieldset>
<legend>Contacto</legend>
<div class="admin-columns">
<label>Email público<input type="email" name="email" value="<?=esc($data['email'])?>" maxlength="150" required>
</label>
<label>Teléfono internacional<input name="phone" value="<?=esc($data['phone'])?>" maxlength="20" pattern="\+[1-9][0-9]{6,14}" required>
</label>
</div>
</fieldset>
<?php foreach(['plans'=>'Paquetes web','extras'=>'Servicios adicionales'] as $group=>$heading):?>
<h2>
<?=esc($heading)?>
</h2>
<?php foreach($data[$group] as $item):$key=$group.'_'.$item['id'].'_';?>
<details class="admin-item">
<summary>
<?=esc($item['es']['name'])?> <span>
<?=money($item['price'])?>
<?=$group==='extras' && $item['period']==='month'?' / mes':''?> +</span>
</summary>
<div class="admin-item-body">
<div class="admin-columns">
<label>Precio en USD<input type="number" min="0" max="999999" step="1" name="<?=esc($key)?>price" value="<?=esc($item['price'])?>" required>
</label>
<label class="visible-check">
<input type="checkbox" name="<?=esc($key)?>active" <?=$item['active']?'checked':''?>> Visible en la web</label>
</div>
<div class="admin-columns">
<?php foreach(['es'=>'Español','en'=>'English'] as $lang=>$label):?>
<fieldset>
<legend>
<?=esc($label)?>
</legend>
<label>Nombre<input name="<?=esc($key.$lang)?>_name" value="<?=esc($item[$lang]['name'])?>" maxlength="120" required>
</label>
<label>Descripción<textarea name="<?=esc($key.$lang)?>_description" maxlength="600" required rows="3">
<?=esc($item[$lang]['description'])?>
</textarea>
</label>
<?php if($group==='plans'):?>
<label>Etiqueta<input name="<?=esc($key.$lang)?>_tag" value="<?=esc($item[$lang]['tag'])?>" maxlength="100" required>
</label>
<label>Características: una por línea<textarea name="<?=esc($key.$lang)?>_features" maxlength="2500" required rows="7">
<?=esc(implode("\n",$item[$lang]['features']))?>
</textarea>
</label>
<?php endif;?>
</fieldset>
<?php endforeach;?>
</div>
</div>
</details>
<?php endforeach;endforeach;?>
<div class="admin-save">
<span>Revisión <?=esc($data['revision'])?> · La versión anterior se conserva como copia privada.</span>
<button class="button lime" type="submit">Guardar cambios →</button>
</div>
</form>
<?php endif;?>
</main>
</body>
</html>
