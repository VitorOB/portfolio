/**
 * npm run og
 * Gera public/og.png (1200×630): fundo #FAFAF8, nome, frase curta e um detalhe azul,
 * usando as mesmas fontes do site (Space Grotesk e Inter, de node_modules).
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const font = async (pkg, file) =>
  (await readFile(path.join(root, "node_modules", "@fontsource", pkg, "files", file))).toString("base64");

const grotesk = await font("space-grotesk", "space-grotesk-latin-600-normal.woff2");
const inter = await font("inter", "inter-latin-600-normal.woff2");

const html = `<!doctype html><html><head><style>
@font-face { font-family: G; src: url(data:font/woff2;base64,${grotesk}) format("woff2"); font-weight: 600; }
@font-face { font-family: I; src: url(data:font/woff2;base64,${inter}) format("woff2"); font-weight: 600; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #FAFAF8; color: #1A1A1A; padding: 88px 96px; display: flex; flex-direction: column; justify-content: space-between; }
.eyebrow { font: 600 22px/1 I; letter-spacing: .12em; text-transform: uppercase; color: #2348D8; }
h1 { font: 600 76px/1.05 G; letter-spacing: -.03em; max-width: 960px; margin-top: 28px; }
.foot { display: flex; align-items: center; justify-content: space-between; border-top: 2px solid #DADAD6; padding-top: 32px; }
.name { font: 600 34px/1 G; letter-spacing: -.02em; }
.pill { font: 600 22px/1 I; background: #2348D8; color: #fff; border-radius: 999px; padding: 18px 30px; }
</style></head><body>
<div><p class="eyebrow">Criação de sites profissionais</p>
<h1>Seu cliente procurou no Google. Encontrou você?</h1></div>
<div class="foot"><span class="name">Vitor Otávio</span><span class="pill">Quero meu site</span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, "public", "og.png") });
await browser.close();
console.log("public/og.png gerado");
