<?php
require dirname(__DIR__).'/projects.lib.php';
require_project_admin();
$error=''; $editing=is_string($_GET['edit']??null)?$_GET['edit']:'';
if ($_SERVER['REQUEST_METHOD']==='POST') {
    check_csrf();
    try {
        $id=save_project($_POST,$_FILES['image']??null);
        $_SESSION['project_saved']=true;
        header('Location: /admin/projects.php'.(($_POST['action']??'')==='save_project'?'?edit='.rawurlencode($id):'')); exit;
    } catch(InvalidArgumentException $e) { http_response_code(422); $error=$e->getMessage(); }
      catch(RuntimeException $e) { http_response_code(409); $error=$e->getMessage(); }
    $editing=is_string($_POST['id']??null)?$_POST['id']:'';
}
$data=projects_data(); $csrf=$_SESSION['csrf'];
$saved=$_SESSION['project_saved']??false; unset($_SESSION['project_saved']);
$selected=null; foreach($data['projects'] as $p) if($p['id']===$editing && empty($p['deleted'])) $selected=$p;
$showForm=$selected || isset($_GET['new']) || $error;
$value=function(string $field) use($error,$selected) {
    if ($error && isset($_POST[$field]) && is_string($_POST[$field])) return $_POST[$field];
    if(str_contains($field,'_')) { [$lang,$key]=explode('_',$field,2); return $selected[$lang][$key]??''; }
    return $selected[$field]??($field==='order'?'0':'');
};
$visible=$error?isset($_POST['active']):($selected['active']??false);
$items=$data['projects']; usort($items,fn($a,$b)=>$a['order']<=>$b['order']);
?>
<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Proyectos | Administración Fernely Dev</title><link rel="stylesheet" href="/styles.css"></head>
<body class="admin-page"><header><div class="wrap nav"><a class="brand" href="/admin/">FERNELY<b>DEV</b></a><nav aria-label="Administración"><a href="/admin/">Paquetes y precios</a> · <a href="/admin/projects.php" aria-current="page">Proyectos</a></nav><form method="post" action="/admin/"><input type="hidden" name="csrf" value="<?=esc($csrf)?>"><input type="hidden" name="action" value="logout"><button class="button small">Cerrar sesión</button></form></div></header>
<main class="wrap admin-main"><p class="eyebrow">TU PORTAFOLIO</p><h1>Tus proyectos, a tu manera.</h1><p>Añade trabajos, actualiza sus imágenes y decide qué mostrar. El primer proyecto visible según su orden también aparece en la portada.</p>
<div class="admin-project-actions"><a class="button" href="?new=1">+ Añadir proyecto</a><a href="https://fernelydev.com/#projects" target="_blank" rel="noopener noreferrer">Ver portafolio publicado ↗</a></div>
<?php if($saved):?><p class="notice" role="status">Cambios guardados. Recarga tu portafolio para verlos.</p><?php endif;?>
<?php if($error):?><p class="notice error" role="alert"><?=esc($error)?> Si seleccionaste una imagen, vuelve a seleccionarla.</p><?php endif;?>
<?php if($showForm):?>
<section class="admin-project-form"><h2><?=$selected?'Editar proyecto':'Nuevo proyecto'?></h2><form method="post" enctype="multipart/form-data">
<input type="hidden" name="csrf" value="<?=esc($csrf)?>"><input type="hidden" name="revision" value="<?=esc($data['revision'])?>"><input type="hidden" name="id" value="<?=esc($selected['id']??'')?>"><input type="hidden" name="action" value="save_project"><input type="hidden" name="MAX_FILE_SIZE" value="3145728">
<div class="admin-columns"><label>Enlace del proyecto<input type="url" name="link" value="<?=esc($value('link'))?>" placeholder="https://..." maxlength="1000" required></label><label>Orden (menor número primero)<input type="number" name="order" min="0" max="9999" value="<?=esc($value('order'))?>" required></label></div>
<label class="visible-check"><input type="checkbox" name="active" <?=$visible?'checked':''?>> Visible en el portafolio</label>
<?php if($selected):?><img class="admin-project-preview" src="<?=esc('https://fernelydev.com'.$selected['image'])?>" alt="Vista actual del proyecto"><?php endif;?>
<label>Imagen <?=$selected?'(opcional: reemplazar la actual)':'del proyecto'?><input type="file" name="image" accept="image/jpeg,image/png,image/webp" <?=$selected?'':'required'?>></label><p>JPG, PNG o WebP. Máximo 3 MB y 12 megapíxeles. La imagen se optimiza automáticamente. Ocultar un proyecto lo retira del listado; su imagen no es un archivo confidencial.</p>
<div class="admin-columns"><?php foreach(['es'=>'Español','en'=>'English'] as $lang=>$label):?><fieldset><legend><?=esc($label)?></legend>
<label>Nombre<input name="<?=$lang?>_title" maxlength="120" value="<?=esc($value($lang.'_title'))?>" required></label>
<label>Categoría<input name="<?=$lang?>_category" maxlength="100" value="<?=esc($value($lang.'_category'))?>" placeholder="<?=$lang==='es'?'Diseño web / Servicios':'Web design / Services'?>" required></label>
<label>Descripción<textarea name="<?=$lang?>_description" rows="4" maxlength="1200" required><?=esc($value($lang.'_description'))?></textarea></label>
<label>Descripción de la imagen (accesibilidad)<input name="<?=$lang?>_alt" maxlength="200" value="<?=esc($value($lang.'_alt'))?>" required></label>
</fieldset><?php endforeach;?></div>
<div class="admin-project-actions"><button class="button" type="submit">Guardar proyecto</button><a href="/admin/projects.php">Volver al listado</a></div></form></section>
<?php endif;?>
<h2>Proyectos</h2><p>Un proyecto nuevo empieza oculto si no marcas «Visible». Puedes preparar ambos idiomas antes de publicarlo.</p>
<?php foreach($items as $p):if(!empty($p['deleted']))continue;?>
<article class="admin-project-row"><div><h3><?=esc($p['es']['title'])?></h3><p><?= $p['active']?'Visible':'Oculto'?> · Orden <?=esc($p['order'])?></p><a href="?edit=<?=esc($p['id'])?>">Editar proyecto →</a></div>
<form method="post"><input type="hidden" name="csrf" value="<?=esc($csrf)?>"><input type="hidden" name="revision" value="<?=esc($data['revision'])?>"><input type="hidden" name="id" value="<?=esc($p['id'])?>"><input type="hidden" name="action" value="delete"><label class="visible-check"><input type="checkbox" name="confirm_delete" required> Mover a la papelera</label><button type="submit" class="button small">Eliminar</button></form></article>
<?php endforeach;?>
<details class="admin-item"><summary>Papelera · recuperar proyectos</summary><p>Al restaurar, el proyecto queda oculto hasta que lo publiques de nuevo.</p>
<?php foreach($items as $p):if(empty($p['deleted']))continue;?><form method="post" class="admin-project-row"><strong><?=esc($p['es']['title'])?></strong><input type="hidden" name="csrf" value="<?=esc($csrf)?>"><input type="hidden" name="revision" value="<?=esc($data['revision'])?>"><input type="hidden" name="id" value="<?=esc($p['id'])?>"><input type="hidden" name="action" value="restore"><button class="button small">Restaurar</button></form><?php endforeach;?></details>
</main></body></html>
