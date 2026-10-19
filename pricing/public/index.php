<?php
require __DIR__.'/app.php'; headers_public();
if (!in_array(parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH),['/','/index.php'],true)) { http_response_code(404); exit('Not found'); }
$lang=($_GET['lang'] ?? '')==='en' ? 'en' : 'es';
$t=(require __DIR__.'/lang.php')[$lang];
$catalog=catalog();
$plans=array_values(array_filter($catalog['plans'],fn($p)=>$p['active']));
$extras=array_values(array_filter($catalog['extras'],fn($p)=>$p['active']));
$url='https://precios.fernelydev.com/'.($lang==='en'?'?lang=en':'');
?>
<!doctype html>
<html lang="<?= $lang ?>" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>
<?=esc($t['title'])?>
</title>
<meta name="description" content="<?=esc($t['description'])?>">
<meta name="theme-color" content="#162f35">
<link rel="canonical" href="<?=esc($url)?>">
<link rel="alternate" hreflang="es" href="https://precios.fernelydev.com/">
<link rel="alternate" hreflang="en" href="https://precios.fernelydev.com/?lang=en">
<meta property="og:title" content="<?=esc($t['title'])?>">
<meta property="og:description" content="<?=esc($t['description'])?>">
<meta property="og:type" content="website">
<meta property="og:url" content="<?=esc($url)?>">
<link rel="icon" href="/logo.png">
<link rel="stylesheet" href="/styles.css">
<link rel="stylesheet" href="/studio.css">
<script src="/site.js" defer>
</script>
</head>
<body data-lang="<?=$lang?>" data-email="<?=esc($catalog['email'])?>">
<a class="skip" href="#main">
<?=esc($t['skip'])?>
</a>
<header>
<div class="wrap nav">
<a class="brand" href="https://fernelydev.com/">
<img src="/logo.png" width="40" height="40" alt="">
<span>FERNELY<b>DEV</b>
<small>DESIGN / VIDEO / WEB</small>
</span>
</a>
<nav aria-label="<?= $lang==='es'?'Principal':'Main' ?>">
<?php foreach(['paquetes','comparativa','cotizador','preguntas'] as $i=>$id):?>
<a href="#<?=$id?>">
<?=esc($t['nav'][$i])?>
</a>
<?php endforeach;?>
</nav>
<div class="nav-right">
<button type="button" class="theme-toggle" id="theme-toggle" aria-label="<?=$lang==='es'?'Activar modo claro':'Use light mode'?>">☀</button>
<a href="/" lang="es" aria-current="<?=$lang==='es'?'page':'false'?>">ES</a>
<span>/</span>
<a href="/?lang=en" lang="en" aria-current="<?=$lang==='en'?'page':'false'?>">EN</a>
<a class="portfolio" href="https://fernelydev.com/">
<?=esc($t['back'])?> ↗</a>
</div>
</div>
</header>
<main id="main">
<section class="hero">
<div class="wrap hero-grid">
<div>
<p class="eyebrow">✳ <?=esc($t['eyebrow'])?>
</p>
<h1>
<?=esc($t['headline'])?>
<em>
<?=esc($t['accent'])?>
</em>
</h1>
<p class="intro">
<?=esc($t['intro'])?>
</p>
<div class="actions">
<a class="button lime" href="#paquetes">
<?=esc($t['cta'])?> ↗</a>
<a class="hero-link" href="#proyectos">
<?=esc($t['second'])?> →</a>
</div>
<span class="hero-foot">USD · Español & English · <?=esc($t['once'])?>
</span>
</div>
<div class="hero-ticket">
<div class="ticket-top">
<span>FERNELY DEV / <?= $lang==='es'?'TU PROYECTO':'YOUR PROJECT' ?>
</span>
<span>↗</span>
</div>
<p>
<?=esc($t['from'])?>
</p>
<strong>
<?= $plans ? money(min(array_column($plans,'price'))) : '—' ?>
</strong>
<span class="ticket-note">
<?=esc($t['once'])?>
</span>
<hr>
<ul>
<?php foreach($t['trust'] as $line):?>
<li>
<span>✓</span>
<?=esc($line)?>
</li>
<?php endforeach;?>
</ul>
<div class="ticket-bottom">
<span>
<?= $lang==='es'?'De una idea a una web propia.':'From an idea to your own website.' ?>
</span>
<span>01 / 03</span>
</div>
</div>
</div>
</section>
<section id="paquetes" class="wrap section">
<div class="heading">
<div>
<p class="eyebrow">
<?=esc($t['plansLabel'])?>
</p>
<h2>
<?=esc($t['plansTitle'])?>
</h2>
</div>
<p>
<?=esc($t['plansIntro'])?>
</p>
</div>
<div class="plans">
<?php foreach($plans as $i=>$plan):$p=$plan[$lang];?>
<article class="plan <?=$plan['id']==='business'?'featured':''?>">
<?php if($plan['id']==='business'):?>
<div class="recommend">
<?=esc($t['recommended'])?> ✳</div>
<?php endif;?>
<div class="plan-number">0<?=$i+1?> <span>
<?=esc($p['tag'])?>
</span>
</div>
<h3>
<?=esc($p['name'])?>
</h3>
<p class="plan-desc">
<?=esc($p['description'])?>
</p>
<p class="price">
<small>
<?=esc($t['from'])?>
</small>
<strong>
<?=money($plan['price'])?>
</strong>
<span>
<?=esc($t['once'])?>
</span>
</p>
<a class="button <?=$plan['id']==='business'?'lime':'outline'?>" href="#cotizador" data-select-plan="<?=esc($plan['id'])?>">
<?=esc($t['choose'])?> ↗</a>
<ul>
<?php foreach($p['features'] as $feature):?>
<li>
<span>✓</span>
<?=esc($feature)?>
</li>
<?php endforeach;?>
</ul>
</article>
<?php endforeach;?>
</div>
<?php if(!$plans):?>
<p>
<?=esc($t['noPlans'])?>
</p>
<?php endif;?>
<div class="included-block">
<h3><?=esc($t['allTitle'])?></h3>
<div class="value-grid">
<?php foreach($t['allItems'] as [$title,$text]):?>
<div><h4><?=esc($title)?></h4><p><?=esc($text)?></p></div>
<?php endforeach;?>
</div>
<div class="language-note"><span aria-hidden="true">ES / EN</span><div><h3><?=esc($t['languageTitle'])?></h3><p><?=esc($t['languageText'])?></p></div></div>
</div>
</section>
<section id="proyectos" class="proof-section section">
<div class="wrap">
<div class="heading"><div><p class="eyebrow"><?=esc($t['proofLabel'])?></p><h2><?=esc($t['proofTitle'])?></h2></div><p><?=esc($t['proofIntro'])?></p></div>
<div class="proof-grid">
<?php foreach([['garden.webp','https://greengardensjn.netlify.app/'],['spa.webp','https://spaferny.netlify.app/']] as $i=>[$image,$link]):?>
<article><a href="<?=esc($link)?>" target="_blank" rel="noopener noreferrer"><img src="/projects/<?=esc($image)?>" alt="<?=esc($t['proofProjects'][$i][0])?>" width="1100" height="619" loading="lazy"><div><h3><?=esc($t['proofProjects'][$i][0])?> ↗</h3><p><?=esc($t['proofProjects'][$i][1])?></p><span><?=esc($t['proofLink'])?></span></div></a></article>
<?php endforeach;?>
</div>
<a class="proof-all" href="https://fernelydev.com/<?=$lang==='en'?'en/':''?>#projects"><?=esc($t['proofAll'])?> →</a>
</div>
</section>
<section id="comparativa" class="comparison section">
<div class="wrap">
<div class="heading">
<div>
<p class="eyebrow">
<?=esc($t['scopeLabel'])?>
</p>
<h2>
<?=esc($t['scopeTitle'])?>
</h2>
</div>
</div>
<details class="compare-details"><summary><?=esc($t['scopeTitle'])?><span>+</span></summary>
<div class="table-scroll" tabindex="0" role="region" aria-label="<?=esc($t['scopeTitle'])?>">
<table>
<thead>
<tr>
<th scope="col">
<?=esc($t['plan'])?>
</th>
<?php foreach($plans as $p):?>
<th scope="col">
<?=esc($p[$lang]['name'])?>
</th>
<?php endforeach;?>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">
<?= $lang==='es'?'Precio base':'Starting price' ?>
</th>
<?php foreach($plans as $p):?>
<td>
<?=money($p['price'])?>
</td>
<?php endforeach;?>
</tr>
<tr>
<th scope="row">
<?= $lang==='es'?'Para qué sirve':'What it does' ?>
</th>
<?php foreach($plans as $p):?>
<td>
<?=esc($p[$lang]['description'])?>
</td>
<?php endforeach;?>
</tr>
<tr>
<th scope="row">
<?= $lang==='es'?'Alcance y entregables':'Scope and deliverables' ?>
</th>
<?php foreach($plans as $p):?>
<td>
<ul>
<?php foreach($p[$lang]['features'] as $feature):?>
<li>
<?=esc($feature)?>
</li>
<?php endforeach;?>
</ul>
</td>
<?php endforeach;?>
</tr>
</tbody>
</table>
</div>
</details>
<div class="cost-note"><h3><?=esc($t['costTitle'])?></h3><p><?=esc($t['costText'])?></p></div>
</div>
</section>
<section class="wrap ai-grid section">
<p class="eyebrow">
<?=esc($t['aiLabel'])?>
</p>
<div>
<h2>
<?=esc($t['aiTitle'])?>
</h2>
<p>
<?=esc($t['aiText'])?>
</p>
<small>
<?=esc($t['aiNote'])?>
</small>
</div>
</section>
<section id="extras" class="extras-section section">
<div class="wrap">
<div class="heading">
<div>
<p class="eyebrow">
<?=esc($t['extrasLabel'])?>
</p>
<h2>
<?=esc($t['extrasTitle'])?>
</h2>
</div>
<p>
<?=esc($t['extrasIntro'])?>
</p>
</div>
<div class="extras-grid">
<?php foreach($extras as $extra):?>
<article>
<div>
<h3>
<?=esc($extra[$lang]['name'])?>
</h3>
<strong>
<?=money($extra['price'])?>
<?=$extra['period']==='month'?'/'.esc($t['month']):''?>
</strong>
</div>
<?php $includedPlans=array_values(array_filter($plans,fn($plan)=>in_array($plan['id'],$extra['includedIn'],true))); if($includedPlans):?>
<span class="included-tag"><?= $lang==='es'?'Incluido: ':'Included: ' ?><?=esc(implode(' · ',array_map(fn($plan)=>$plan[$lang]['tag'],$includedPlans)))?></span>
<?php endif;?>
<p>
<?=esc($extra[$lang]['description'])?>
</p>
</article>
<?php endforeach;?>
</div>
</div>
</section>
<section id="cotizador" class="wrap section quote-grid">
<div>
<p class="eyebrow">
<?=esc($t['quoteLabel'])?>
</p>
<h2>
<?=esc($t['quoteTitle'])?>
</h2>
<p class="intro light">
<?=esc($t['quoteIntro'])?>
</p>
<label class="field-label" for="plan">
<?=esc($t['plan'])?>
</label>
<select id="plan">
<?php foreach($plans as $p):?>
<option value="<?=esc($p['id'])?>" data-price="<?=esc($p['price'])?>" data-name="<?=esc($p[$lang]['name'])?>">
<?=esc($p[$lang]['name'])?> — <?=money($p['price'])?>
</option>
<?php endforeach;?>
</select>
<fieldset>
<legend>
<?=esc($t['extras'])?>
</legend>
<?php foreach($extras as $e):?>
<label class="extra-choice">
<input type="checkbox" value="<?=esc($e['id'])?>" data-price="<?=esc($e['price'])?>" data-period="<?=esc($e['period'])?>" data-included="<?=esc(implode(',',$e['includedIn']))?>">
<span>
<b>
<?=esc($e[$lang]['name'])?>
</b>
<small data-extra-status>
<?=esc($e[$lang]['description'])?>
</small>
</span>
<strong data-extra-price>
<?=money($e['price'])?>
<?=$e['period']==='month'?'/'.esc($t['month']):''?>
</strong>
</label>
<?php endforeach;?>
</fieldset>
</div>
<aside class="estimate">
<p class="eyebrow">FERNELY DEV / <?= $lang==='es'?'TU PROPUESTA':'YOUR PROPOSAL' ?>
</p>
<h3 id="chosen-plan">
<?= $plans?esc($plans[0][$lang]['name']):esc($t['none']) ?>
</h3>
<div class="estimate-line">
<span>
<?=esc($t['initial'])?>
</span>
<strong id="initial-total" aria-live="polite">
<?= $plans?money($plans[0]['price']):'—' ?>
</strong>
</div>
<ul id="chosen-extras">
</ul>
<div class="monthly-line">
<span>
<?=esc($t['monthly'])?>
</span>
<strong id="monthly-total" aria-live="polite">
<?=esc($t['noMonthly'])?>
</strong>
</div>
<p class="estimate-note">
<?=esc($t['quoteNote'])?>
</p>
<a id="quote-email" class="button lime" href="mailto:<?=esc($catalog['email'])?>">
<?=esc($t['send'])?> ↗</a>
<p class="email-note">
<?=esc($t['emailNote'])?>
</p>
<noscript>
<p>
<?= $lang==='es'?'Activa JavaScript para sumar extras automáticamente. También puedes pedir tu cotización por email.':'Enable JavaScript to total extras automatically, or ask for a quote by email.' ?>
</p>
</noscript>
</aside>
</section>
<section class="wrap section process-section">
<p class="eyebrow"><?= $lang==='es'?'ASÍ TRABAJAMOS':'HOW WE WORK' ?></p>
<h2><?=esc($t['processTitle'])?></h2>
<ol class="process-grid">
<?php foreach($t['steps'] as $i=>[$title,$text]):?><li><span>0<?=$i+1?></span><h3><?=esc($title)?></h3><p><?=esc($text)?></p></li><?php endforeach;?>
</ol>
</section>
<section id="preguntas" class="faq-section section">
<div class="wrap faq-grid">
<div>
<p class="eyebrow">
<?=esc($t['faqLabel'])?>
</p>
<h2>
<?=esc($t['faqTitle'])?>
</h2>
</div>
<div>
<?php foreach($t['faqs'] as [$q,$a]):?>
<details>
<summary>
<?=esc($q)?>
<span>+</span>
</summary>
<p>
<?=esc($a)?>
</p>
</details>
<?php endforeach;?>
</div>
</div>
</section>
<section class="wrap contact section">
<div>
<p class="eyebrow">HABLEMOS / LET’S TALK</p>
<h2>
<?=esc($t['contactTitle'])?>
</h2>
<p>
<?=esc($t['contactText'])?>
</p>
</div>
<div class="contact-links">
<a class="button" href="mailto:<?=esc($catalog['email'])?>">
<?=esc($t['email'])?> ↗</a>
<a href="tel:<?=esc($catalog['phone'])?>">
<?=esc($t['call'])?> <?=esc($catalog['phone'])?>
</a>
</div>
</section>
</main>
<footer class="wrap">
<span>© <?=gmdate('Y')?> Fernely Dev</span>
<span>
<?=esc($t['footer'])?>
</span>
<a href="/admin/">
<?=esc($t['admin'])?> ↗</a>
</footer>
</body>
</html>
