<?php
require_once __DIR__.'/app.php';

function leads_read(): array {
    ensure_private();
    $file=private_dir().'/leads.json';
    if (!is_file($file)) return ['leads'=>[]];
    $data=json_decode((string)file_get_contents($file),true,512,JSON_THROW_ON_ERROR);
    if(!is_array($data)||!is_array($data['leads']??null)) throw new RuntimeException('Inquiry storage is invalid.');
    return $data;
}
function leads_save(array $data): void {
    $temp=tempnam(private_dir(),'leads-');
    try {
        if(file_put_contents($temp,json_encode($data,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR),LOCK_EX)===false) throw new RuntimeException('Could not save inquiries.');
        chmod($temp,0600);
        if(!rename($temp,private_dir().'/leads.json')) throw new RuntimeException('Could not save inquiries.');
    } finally { if(is_file($temp)) unlink($temp); }
}
function leads_rate_limit(string $ip): bool {
    $dir=private_dir(); $secretFile=$dir.'/lead-rate.key';
    $secretLock=fopen($dir.'/lead-rate-key.lock','c');
    if(!$secretLock||!flock($secretLock,LOCK_EX)) return false;
    try {
        if(!is_file($secretFile)) { $secret=random_bytes(32); if(file_put_contents($secretFile,$secret,LOCK_EX)===false) return false; chmod($secretFile,0600); }
        $secret=file_get_contents($secretFile);
        if(!is_string($secret)||strlen($secret)<32) return false;
    } finally { flock($secretLock,LOCK_UN); fclose($secretLock); }
    $key=hash_hmac('sha256',$ip,$secret);
    $file=private_dir().'/lead-rate-'.$key.'.json';
    $lock=fopen($file.'.lock','c');
    if(!$lock||!flock($lock,LOCK_EX)) return false;
    try {
        $times=is_file($file)?json_decode((string)file_get_contents($file),true):[];
        if(!is_array($times)) $times=[];
        $times=array_values(array_filter($times,fn($v)=>is_int($v)&&$v>time()-900));
        if(count($times)>=5) return false;
        $times[]=time();
        file_put_contents($file,json_encode($times),LOCK_EX); chmod($file,0600);
        return true;
    } finally { flock($lock,LOCK_UN); fclose($lock); }
}
function save_lead(array $input): void {
    $dir=private_dir();
    if(!is_dir($dir)||!is_writable($dir)) throw new RuntimeException('Inquiry storage unavailable.');
    $lock=fopen($dir.'/leads.lock','c');
    if(!$lock||!flock($lock,LOCK_EX)) throw new RuntimeException('Inquiry storage unavailable.');
    try {
        $data=leads_read();
        $data['leads'][]=['id'=>bin2hex(random_bytes(12)),'name'=>$input['name'],'email'=>$input['email'],'phone'=>$input['phone'],'service'=>$input['service'],'message'=>$input['message'],'language'=>$input['language'],'campaign'=>$input['campaign'],'status'=>'new','createdAt'=>gmdate('c')];
        leads_save($data);
    } finally { flock($lock,LOCK_UN); fclose($lock); }
}
