import { readFile, writeFile, mkdir } from "node:fs/promises";
import { renderPage } from "../.prerender/prerender.js";

const template = await readFile("dist/index.html", "utf8");
await mkdir("dist/en", { recursive: true });
await writeFile("dist/index.html", renderPage(template, "es"));
await writeFile("dist/en/index.html", renderPage(template, "en"));
console.log("Generated complete Spanish and English HTML pages.");
