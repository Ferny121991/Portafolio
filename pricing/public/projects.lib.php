<?php
require_once __DIR__.'/app.php';

function projects_data(): array {
    ensure_private();
    $file=private_dir().'/projects.json';
    return json_decode(file_get_contents(is_file($file)?$file:__DIR__.'/projects.default.json'),true,512,JSON_THROW_ON_ERROR);
}
function require_project_admin(): void {
    start_admin_session();
    $cfg=config();
    $local=in_array($_SERVER['REMOTE_ADDR']??'', ['127.0.0.1','::1'],true);
    if (!$local && (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS']==='off')) { http_response_code(400); exit('Accede mediante HTTPS.'); }
    if (empty($_SESSION['authenticated']) || !hash_equals((string)($_SESSION['credential_version']??''),hash('sha256',$cfg['password_hash']??''))) {
        unset($_SESSION['authenticated']); header('Location: /admin/'); exit;
    }
}
function project_url(mixed $url): string {
    $url=text_field($url,1000);
    $parts=parse_url($url);
    if (!filter_var($url,FILTER_VALIDATE_URL) || ($parts['scheme']??'')!=='https' || isset($parts['user']) || isset($parts['pass'])) throw new InvalidArgumentException('El enlace debe ser una URL https:// válida, sin usuario ni contraseña.');
    return $url;
}
function project_upload(?array $file): ?string {
    if (!$file || ($file['error']??UPLOAD_ERR_NO_FILE)===UPLOAD_ERR_NO_FILE) return null;
    if (($file['error']??-1)!==UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name']??'') || $file['size']>3*1024*1024) throw new InvalidArgumentException('Sube una imagen JPG, PNG o WebP de hasta 3 MB.');
    $info=@getimagesize($file['tmp_name']);
    if (!$info || !in_array($info[2],[IMAGETYPE_JPEG,IMAGETYPE_PNG,IMAGETYPE_WEBP],true) || $info[0]*$info[1]>12000000) throw new InvalidArgumentException('Imagen no válida. Máximo 12 megapíxeles; no se acepta SVG.');
    if (!function_exists('imagecreatefromstring') || !function_exists('imagewebp')) throw new RuntimeException('El servidor necesita la extensión GD con WebP.');
    $source=@imagecreatefromstring(file_get_contents($file['tmp_name']));
    if (!$source) throw new InvalidArgumentException('No se pudo leer la imagen.');
    $scale=min(1,1600/max($info[0],$info[1]));
    $target=imagecreatetruecolor(max(1,(int)round($info[0]*$scale)),max(1,(int)round($info[1]*$scale)));
    imagealphablending($target,false); imagesavealpha($target,true);
    imagecopyresampled($target,$source,0,0,0,0,imagesx($target),imagesy($target),$info[0],$info[1]);
    $dir=private_dir().'/project-images';
    if (!is_dir($dir) && !mkdir($dir,0700)) throw new RuntimeException('No se pudo preparar la carpeta de imágenes.');
    $id=bin2hex(random_bytes(16)).'.webp';
    try { if (!imagewebp($target,$dir.'/'.$id,82)) throw new RuntimeException('No se pudo guardar la imagen.'); chmod($dir.'/'.$id,0600); }
    finally { imagedestroy($source); imagedestroy($target); }
    return '/api/project-image.php?id='.$id;
}
function save_project(array $post, ?array $upload=null): string {
    ensure_private();
    $lock=fopen(private_dir().'/projects.lock','c');
    if (!$lock || !flock($lock,LOCK_EX)) throw new RuntimeException('No se pudo bloquear el portafolio.');
    $newImage=null; $committed=false;
    try {
        $data=projects_data();
        if ((string)$data['revision']!==($post['revision']??'')) throw new RuntimeException('Otra sesión cambió el portafolio. Recarga antes de guardar.');
        $id=text_field($post['id']??'',64,true);
        $index=null;
        foreach($data['projects'] as $i=>$p) if ($p['id']===$id) $index=$i;
        if ($id!=='' && $index===null) throw new InvalidArgumentException('Proyecto no encontrado.');
        $action=$post['action']??'';
        if ($action==='delete' || $action==='restore') {
            if ($index===null || ($action==='delete' && !isset($post['confirm_delete']))) throw new InvalidArgumentException('Confirma que quieres mover este proyecto a la papelera.');
            $data['projects'][$index]['deleted']=$action==='delete';
            $data['projects'][$index]['active']=false;
        } elseif ($action==='save_project') {
            if ($index!==null && !empty($data['projects'][$index]['deleted'])) throw new InvalidArgumentException('Restaura el proyecto antes de editarlo.');
            if ($index===null && count($data['projects'])>=100) throw new InvalidArgumentException('El portafolio admite hasta 100 proyectos, incluida la papelera.');
            $item=['id'=>$id?:bin2hex(random_bytes(12)),'active'=>isset($post['active']),'deleted'=>false,'link'=>project_url($post['link']??'')];
            $order=$post['order']??'';
            if (!is_string($order) || !preg_match('/^\d{1,4}$/D',$order)) throw new InvalidArgumentException('El orden debe ser un número entre 0 y 9999.');
            $item['order']=(int)$order;
            foreach(['es','en'] as $lang) foreach(['title'=>120,'description'=>1200,'category'=>100,'alt'=>200] as $field=>$limit) $item[$lang][$field]=text_field($post[$lang.'_'.$field]??'',$limit);
            $newImage=project_upload($upload);
            $item['image']=$newImage??($index!==null?$data['projects'][$index]['image']:'');
            if (!$item['image']) throw new InvalidArgumentException('Añade una imagen al proyecto.');
            if ($index===null) $data['projects'][]=$item; else $data['projects'][$index]=$item;
            $id=$item['id'];
        } else throw new InvalidArgumentException('Acción no válida.');
        $data['revision']++; $data['updatedAt']=gmdate('c');
        $temp=tempnam(private_dir(),'projects-');
        try {
            if (file_put_contents($temp,json_encode($data,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR))===false) throw new RuntimeException('No se pudo guardar.');
            chmod($temp,0600);
            $current=private_dir().'/projects.json';
            if (is_file($current) && !copy($current,private_dir().'/projects.previous.json')) throw new RuntimeException('No se pudo guardar la copia anterior.');
            if (!rename($temp,$current)) throw new RuntimeException('No se pudo publicar el portafolio.');
            $committed=true;
        } finally { if(is_file($temp)) unlink($temp); }
        return $id;
    } finally {
        if ($newImage && !$committed) { $file=private_dir().'/project-images/'.explode('id=',$newImage,2)[1]; if(is_file($file)) unlink($file); }
        flock($lock,LOCK_UN); fclose($lock);
    }
}
function public_projects(string $language): array {
    $items=array_values(array_filter(projects_data()['projects'],fn($p)=>$p['active'] && empty($p['deleted'])));
    usort($items,fn($a,$b)=>($a['order']<=>$b['order']) ?: strcmp($a['id'],$b['id']));
    return array_map(fn($p)=>array_merge($p[$language],['id'=>$p['id'],'link'=>$p['link'],'image'=>$p['image']]),$items);
}
