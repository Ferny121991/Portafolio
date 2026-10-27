<?php
require dirname(__DIR__).'/precios/app.php';
$id=$_GET['id']??'';
if (!is_string($id) || !preg_match('/^[a-f0-9]{32}\.webp$/D',$id)) { http_response_code(404); exit; }
ensure_private(); $file=private_dir().'/project-images/'.$id;
if (!is_file($file)) { http_response_code(404); exit; }
header('Content-Type: image/webp');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=31536000, immutable');
header("Content-Security-Policy: default-src 'none'");
header('Content-Length: '.filesize($file));
readfile($file);
