<?php
require dirname(__DIR__).'/projects.lib.php';
require dirname(__DIR__).'/leads.lib.php';
require_project_admin();
$error='';
if($_SERVER['REQUEST_METHOD']==='POST') {
    check_csrf();
    $id=is_string($_POST['id']??null)?$_POST['id']:'';
    $status=is_string($_POST['status']??null)?$_POST['status']:'';
    if(!preg_match('/^[a-f0-9]{24}$/D',$id)||!in_array($status,['new','responded','closed'],true)) $error='No se pudo actualizar la consulta.';
    else {
        $lock=fopen(private_dir().'/leads.lock','c');
        if(!$lock||!flock($lock,LOCK_EX)) $error='No se pudo actualizar la consulta.';
        else try {
            $data=leads_read(); $found=false;
            foreach($data['leads'] as &$lead) if(($lead['id']??'')===$id) { $lead['status']=$status; $found=true; break; }
            unset($lead);
            if($found) leads_save($data);
            header('Location: /admin/leads.php'); exit;
        } catch(Throwable $e) { $error='No se pudo actualizar la consulta.'; }
        finally { flock($lock,LOCK_UN); fclose($lock); }
    }
}
$leads=array_reverse(leads_read()['leads']); $csrf=$_SESSION['csrf'];
$labels=['new'=>'Nueva','responded'=>'Respondida','closed'=>'Cerrada'];
?>
<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Consultas | Administración Fernely Dev</title><link rel="stylesheet" href="/styles.css"></head>
<body class="admin-page"><header><div class="wrap nav"><a class="brand" href="/admin/">FERNELY<b>DEV</b></a><nav aria-label="Administración"><a href="/admin/">Paquetes y precios</a> · <a href="/admin/projects.php">Proyectos</a> · <a href="/admin/leads.php" aria-current="page">Consultas</a></nav><form method="post" action="/admin/"><input type="hidden" name="csrf" value="<?=esc($csrf)?>"><input type="hidden" name="action" value="logout"><button class="button small">Cerrar sesión</button></form></div></header>
<main class="wrap admin-main"><p class="eyebrow">BANDEJA PRIVADA</p><h1>Consultas de clientes</h1><p>Solo tú puedes ver estos mensajes. Responde por correo y marca el seguimiento aquí.</p><?php if($error):?><p class="notice error" role="alert"><?=esc($error)?></p><?php endif;?>
<?php if(!$leads):?><p class="lead-empty">Todavía no hay consultas. Las nuevas solicitudes del formulario aparecerán aquí.</p><?php endif;?>
<div class="lead-list"><?php foreach($leads as $lead): if(!is_array($lead)) continue; $status=$lead['status']??'new'; ?>
<article class="lead-card"><div class="lead-top"><div><span class="lead-badge lead-<?=esc($status)?>"><?=esc($labels[$status]??'Nueva')?></span><time datetime="<?=esc($lead['createdAt']??'')?>"><?=esc($lead['createdAt']??'')?></time></div><strong><?=esc($lead['service']??'Consulta general')?></strong></div>
<h2><?=esc($lead['name']??'')?></h2><p class="lead-contact"><a href="mailto:<?=esc($lead['email']??'')?>"><?=esc($lead['email']??'')?></a><?php if(!empty($lead['phone'])):?> · <a href="tel:<?=esc($lead['phone'])?>"><?=esc($lead['phone'])?></a><?php endif;?></p><p class="lead-message"><?=nl2br(esc($lead['message']??''))?></p><small>Idioma: <?=esc(strtoupper($lead['language']??'ES'))?><?php if(!empty($lead['campaign'])):?> · Campaña: <?=esc($lead['campaign'])?><?php endif;?></small>
<div class="lead-actions"><a class="button small" href="mailto:<?=esc($lead['email']??'')?>?subject=<?=rawurlencode('Sobre tu consulta a Fernely Dev')?>">Responder por correo</a><form method="post"><input type="hidden" name="csrf" value="<?=esc($csrf)?>"><input type="hidden" name="id" value="<?=esc($lead['id']??'')?>"><label>Seguimiento<select name="status"><option value="new" <?=$status==='new'?'selected':''?>>Nueva</option><option value="responded" <?=$status==='responded'?'selected':''?>>Respondida</option><option value="closed" <?=$status==='closed'?'selected':''?>>Cerrada</option></select></label><button class="button small">Guardar</button></form></div></article><?php endforeach;?></div></main></body></html>
