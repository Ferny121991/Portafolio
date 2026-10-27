<?php
declare(strict_types=1);
require_once dirname(__DIR__).'/leads.lib.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Vary: Origin');
function inquiry_reply(int $status,array $body): never { http_response_code($status); echo json_encode($body,JSON_UNESCAPED_UNICODE); exit; }
$origin=(string)($_SERVER['HTTP_ORIGIN']??'');
$allowedOrigins=['https://fernelydev.com','https://www.fernelydev.com'];
if($origin!==''&&in_array($origin,$allowedOrigins,true)) {
    header('Access-Control-Allow-Origin: '.$origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Max-Age: 600');
}
if(($_SERVER['REQUEST_METHOD']??'')==='OPTIONS') {
    if(!in_array($origin,$allowedOrigins,true)) inquiry_reply(403,['error'=>'origin']);
    http_response_code(204); exit;
}
if(($_SERVER['REQUEST_METHOD']??'')!=='POST') inquiry_reply(405,['error'=>'method_not_allowed']);
if(!in_array($origin,$allowedOrigins,true)) inquiry_reply(403,['error'=>'origin']);
if(stripos((string)($_SERVER['CONTENT_TYPE']??''),'application/json')!==0) inquiry_reply(415,['error'=>'content_type']);
$length=(int)($_SERVER['CONTENT_LENGTH']??0);
if($length>8000) inquiry_reply(413,['error'=>'too_large']);
$raw=file_get_contents('php://input');
if(!is_string($raw)||strlen($raw)>8000) inquiry_reply(413,['error'=>'too_large']);
$data=json_decode($raw,true);
if(!is_array($data)) inquiry_reply(400,['error'=>'invalid_request']);
if(trim((string)($data['website']??''))!=='') inquiry_reply(200,['ok'=>true]);
$field=static function(string $key,int $limit,bool $optional=false)use($data):string {
    $value=$data[$key]??'';
    if(!is_string($value)||strlen($value)>$limit||(!$optional&&trim($value)==='')) throw new InvalidArgumentException('field');
    return trim($value);
};
try {
    $name=$field('name',120); $email=$field('email',150); $phone=$field('phone',30,true);
    $service=$field('service',120); $message=$field('message',3000);
    $language=$field('language',2); $campaign=$field('campaign',100,true);
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)||strlen($message)<10||!in_array($language,['es','en'],true)) throw new InvalidArgumentException('validation');
    if($phone!==''&&!preg_match('/^[+()\d .-]{7,30}$/D',$phone)) throw new InvalidArgumentException('phone');
    if(($data['consent']??false)!==true) throw new InvalidArgumentException('consent');
    if(!leads_rate_limit((string)($_SERVER['REMOTE_ADDR']??'unknown'))) inquiry_reply(429,['error'=>'rate_limited']);
    save_lead(compact('name','email','phone','service','message','language','campaign'));
    inquiry_reply(200,['ok'=>true]);
} catch(InvalidArgumentException $e) { inquiry_reply(422,['error'=>'invalid_fields']); }
  catch(Throwable $e) { error_log('Fernely inquiry storage failed: '.$e->getMessage()); inquiry_reply(500,['error'=>'unavailable']); }
