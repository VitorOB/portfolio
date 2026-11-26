/**
 * npm run og
 * Gera public/og.png (1200×630) na mesma direção do site: fundo cinza-claro, pergunta em
 * Archivo condensada e pesada, linha fina, nome e o botão no azul de ação.
 * A fonte vem de node_modules (@fontsource-variable/archivo).
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archivo = (
  await readFile(
    path.join(root, "node_modules", "@fontsource-variable", "archivo", "files", "archivo-latin-wdth-normal.woff2"),
  )
).toString("base64");

const html = `<!doctype html><html><head><style>
@font-face { font-family: A; src: url(data:font/woff2;base64,${archivo}) format("woff2-variations"); font-weight: 100 900; font-stretch: 62% 125%; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #F2F2F0; color: #141414; padding: 72px 80px 64px; display: flex; flex-direction: column; justify-content: space-between; font-family: A; }
h1 { font-size: 104px; line-height: .94; font-weight: 760; font-stretch: 68%; letter-spacing: -.012em; max-width: 900px; }
.foot { display: flex; align-items: center; justify-content: space-between; border-top: 2px solid #141414; padding-top: 28px; }
.name { font-size: 40px; font-weight: 760; font-stretch: 68%; }
.pill { font-size: 24px; font-weight: 600; background: #2A36E8; color: #fff; border-radius: 999px; padding: 18px 32px; }
</style></head><body>
<h1>Seu cliente procurou no Google. Encontrou você?</h1>
<div class="foot"><span class="name">Vitor Otávio</span><span class="pill">Quero meu site</span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, "public", "og.png") });
await browser.close();
console.log("public/og.png gerado");
