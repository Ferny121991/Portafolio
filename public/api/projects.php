<?php
require dirname(__DIR__).'/precios/projects.lib.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
try { echo json_encode(['projects'=>public_projects(($_GET['lang']??'es')==='en'?'en':'es')],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR); }
catch(Throwable $e) { http_response_code(503); echo '{"error":"Portfolio temporarily unavailable"}'; }
