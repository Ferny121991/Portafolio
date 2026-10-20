import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, writeFile, access, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const php = process.env.FERNELY_TEST_PHP || "php";
const privatePrefix = resolve(root, "../pricing-test-");
const privateDir = await mkdtemp(privatePrefix);
const password = randomBytes(24).toString("base64url");
const credentials = JSON.stringify({ username: "test-owner", password });
const defaults = JSON.parse(
  await readFile(resolve(root, "pricing/public/catalog.default.json"), "utf8"),
);
const host = "http://127.0.0.1:5176";
let cookie = "";
let server;
async function command(args, input = "") {
  return await new Promise((done, reject) => {
    const child = spawn(php, args, {
      cwd: root,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (d) => (output += d));
    child.stderr.on("data", (d) => (output += d));
    child.on("error", reject);
    child.on("close", (code) => done({ code, output }));
    child.stdin.end(input);
  });
}
async function request(path, options = {}) {
  const response = await fetch(host + path, {
    ...options,
    redirect: "manual",
    headers: { Cookie: cookie, ...options.headers },
  });
  for (const value of response.headers.getSetCookie())
    if (value.startsWith("fernely_admin=")) cookie = value.split(";")[0];
  return {
    status: response.status,
    headers: response.headers,
    html: await response.text(),
  };
}
function csrf(page) {
  return page.html.match(/name="csrf" value="([^"]+)"/)[1];
}
async function post(data) {
  return request("/admin/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data),
  });
}
function form(data, token) {
  const fields = {
    action: "save",
    csrf: token,
    revision: String(data.revision),
    email: data.email,
    phone: data.phone,
  };
  for (const group of ["plans", "extras"])
    for (const item of data[group]) {
      const key = `${group}_${item.id}_`;
      fields[key + "price"] = String(item.price);
      if (item.active) fields[key + "active"] = "on";
      for (const lang of ["es", "en"]) {
        for (const field of ["name", "description"])
          fields[key + lang + "_" + field] = item[lang][field];
        if (group === "plans") {
          fields[key + lang + "_tag"] = item[lang].tag;
          fields[key + lang + "_features"] = item[lang].features.join("\n");
        }
      }
    }
  return fields;
}
try {
  const setup = await command(
    ["pricing/tools/create-admin.php", privateDir, "--stdin"],
    credentials,
  );
  assert.equal(setup.code, 0, setup.output);
  assert.equal(
    (
      await command(
        ["pricing/tools/create-admin.php", privateDir, "--stdin"],
        credentials,
      )
    ).code,
    1,
    "Setup cannot overwrite an existing owner",
  );
  assert.ok(
    !(await readFile(resolve(privateDir, "config.php"), "utf8")).includes(
      password,
    ),
  );
  server = spawn(php, ["-S", "127.0.0.1:5176", "-t", "pricing/public"], {
    cwd: root,
    env: { ...process.env, FERNELY_PRICING_PRIVATE_DIR: privateDir },
    stdio: "ignore",
  });
  for (let i = 0; i < 30; i++) {
    try {
      await fetch(host);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  const es = await request("/"),
    en = await request("/?lang=en");
  assert.equal(es.status, 200);
  assert.equal(en.status, 200);
  assert.ok(es.html.includes('<html lang="es"'));
  assert.ok(en.html.includes('<html lang="en"'));
  assert.ok(es.html.includes("US$249") && es.html.includes("US$899"));
  assert.ok(
    !es.html.includes("password_hash") && !en.html.includes("test-owner"),
  );
  for (const path of [
    "/styles.css",
    "/site.js",
    "/logo.png",
    "/robots.txt",
    "/sitemap.xml",
  ])
    assert.equal((await request(path)).status, 200, path);
  assert.equal(
    (await request("/fernely-pricing-private/config.php")).status,
    404,
  );
  console.log(
    "PASS public pages, languages, prices, resources and private storage separation.",
  );
  let login = await request("/admin/");
  let token = csrf(login);
  assert.ok(login.headers.get("cache-control").includes("no-store"));
  assert.ok(login.headers.get("x-robots-tag").includes("noindex"));
  const sessionHeader = login.headers.get("set-cookie");
  assert.ok(
    sessionHeader.includes("HttpOnly") &&
      sessionHeader.includes("SameSite=Strict"),
  );
  assert.equal((await post({ action: "save", csrf: token })).status, 401);
  assert.equal(
    (await post({ action: "login", username: "test-owner", password })).status,
    403,
  );
  const beforeCookie = cookie;
  assert.equal(
    (
      await post({
        action: "login",
        csrf: token,
        username: "test-owner",
        password,
      })
    ).status,
    302,
  );
  assert.notEqual(cookie, beforeCookie, "Login rotates session identifier");
  const editor = await request("/admin/");
  token = csrf(editor);
  assert.ok(editor.html.includes("Guardar cambios"));
  console.log(
    "PASS authentication, session rotation, cookie controls and CSRF protection.",
  );
  const valid = form(defaults, token);
  assert.equal(
    (await post({ ...valid, plans_launch_price: "-5" })).status,
    422,
  );
  assert.equal((await post({ ...valid, email: "bad\r\nemail" })).status, 422);
  assert.equal((await post({ ...valid, revision: "0" })).status, 409);
  const altered = {
    ...valid,
    plans_launch_price: "313",
    plans_launch_es_name: "<script>alert(1)</script>",
  };
  assert.equal((await post(altered)).status, 302);
  const updated = await request("/");
  assert.ok(updated.html.includes("US$313"));
  assert.ok(updated.html.includes("&lt;script&gt;alert(1)&lt;/script&gt;"));
  assert.ok(!updated.html.includes("<script>alert(1)</script>"));
  const stored = JSON.parse(
    await readFile(resolve(privateDir, "catalog.json"), "utf8"),
  );
  assert.equal(stored.revision, 2);
  assert.equal(
    (await post(altered)).status,
    409,
    "Stale saves cannot overwrite another edit",
  );
  assert.equal((await post(form(stored, token))).status, 302);
  await access(resolve(privateDir, "catalog.previous.json"));
  console.log(
    "PASS validation, persistent publication, escaped text, edit conflicts and private backup.",
  );
  const configPath = resolve(privateDir, "config.php");
  const previousConfig = await readFile(configPath, "utf8");
  await writeFile(
    configPath,
    "<?php return ['username'=>'test-owner','password_hash'=>'changed'];",
  );
  const revoked = await request("/admin/");
  assert.ok(
    !revoked.html.includes("Guardar cambios"),
    "Changing credentials revokes an existing session",
  );
  await writeFile(configPath, previousConfig);
  token = csrf(revoked);
  assert.equal(
    (
      await post({
        action: "login",
        csrf: token,
        username: "test-owner",
        password,
      })
    ).status,
    302,
  );
  token = csrf(await request("/admin/"));
  console.log("PASS owner credential changes invalidate previous sessions.");
  assert.equal((await post({ action: "logout", csrf: token })).status, 302);
  login = await request("/admin/");
  token = csrf(login);
  assert.ok(!login.html.includes("Guardar cambios"));
  assert.equal((await post({ action: "save", csrf: token })).status, 401);
  for (let i = 0; i < 5; i++)
    await post({
      action: "login",
      csrf: token,
      username: "test-owner",
      password: "incorrect-password",
    });
  assert.equal(
    (
      await post({
        action: "login",
        csrf: token,
        username: "test-owner",
        password: "incorrect-password",
      })
    ).status,
    429,
  );
  console.log("PASS logout and persisted login rate limiting.");
} finally {
  if (server) {
    server.kill();
    await new Promise((r) => server.once("close", r));
  }
  if (!resolve(privateDir).startsWith(privatePrefix))
    throw new Error("Unsafe cleanup path");
  await rm(privateDir, { recursive: true, force: true });
}
