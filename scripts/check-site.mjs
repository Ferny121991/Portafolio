import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

// Check the actual deployable HTML, including content available without JavaScript.
for (const [path, lang, title] of [
  ["dist/index.html", "es", "Tu negocio merece"],
  ["dist/en/index.html", "en", "Your business deserves"],
]) {
  const html = await readFile(path, "utf8");
  assert.ok(
    html.includes(`<html lang="${lang}"`),
    `${lang}: document language`,
  );
  assert.ok(html.includes(title), `${lang}: pre-rendered content`);
  assert.ok(!html.includes('<!-- localized-seo -->'), `${lang}: localized metadata inserted`);
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)[1];
  assert.ok(description.startsWith(lang === 'es' ? 'Dale presencia' : 'Give your business'), `${lang}: translated description`);
  assert.equal(
    (html.match(/<h1>/g) || []).length,
    1,
    `${lang}: one main heading`,
  );
  const expectedUrl = `https://fernelydev.com/${lang === "en" ? "en/" : ""}`;
  assert.ok(
    html.includes(`rel="canonical" href="${expectedUrl}"`),
    `${lang}: canonical URL`,
  );
  assert.ok(
    html.includes('hreflang="es"') && html.includes('hreflang="en"'),
    `${lang}: language alternates`,
  );
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(schema.email, "fernelydev@gmail.com");
  assert.equal(schema.hasOfferCatalog.itemListElement.length, 3);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${lang}: unique IDs`);
  for (const match of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.includes(match[1]), `${lang}: anchor #${match[1]}`);
  for (const match of html.matchAll(
    /(?:src|href)="(\/(?:assets|img)\/[^"?]+)[^"]*"/g,
  ))
    await access(`dist${match[1]}`);
  assert.ok(
    !html.includes("/homehero/"),
    `${lang}: no animation frame downloads`,
  );
  console.log(
    `PASS ${path}: rendered content, metadata, structured data, anchors and assets.`,
  );
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 2);
assert.ok(!sitemap.includes("#") && !sitemap.includes("precios."));
console.log("PASS sitemap: two canonical language pages.");
