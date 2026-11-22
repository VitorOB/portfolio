/**
 * npm run screenshots                     → todos os projetos
 * npm run screenshots -- ana-lira-beauty  → só os slugs informados
 * Captura a primeira dobra (1440×900) de cada projeto publicado com url em src/data/site.ts,
 * converte para WebP com 1200px de largura e salva em public/projects/<slug>.webp.
 * Se um site falhar, gera uma miniatura temporária em cor sólida com o nome do projeto.
 *
 * Requer: npx playwright install chromium (uma vez).
 */
import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";
import sharp from "sharp";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "projects");

/** Lê site.ts sem precisar de bundler: transpila para JS e importa via data URL. */
async function loadSiteData() {
  const source = await readFile(path.join(root, "src", "data", "site.ts"), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function placeholder(project, file) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750">
    <rect width="1200" height="750" fill="#ECECE8"/>
    <text x="600" y="400" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#1A1A1A">${escapeXml(project.name)}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(file);
}

const { projects } = await loadSiteData();
const only = process.argv.slice(2);
const unknown = only.filter((slug) => !projects.some((p) => p.slug === slug));
if (unknown.length) throw new Error(`Slug não encontrado em site.ts: ${unknown.join(", ")}`);
const targets = projects.filter(
  (p) => p.status === "published" && p.image && (only.length === 0 || only.includes(p.slug)),
);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce", // conteúdo com animação de entrada já aparece visível
  locale: "pt-BR",
});

const report = [];
for (const project of targets) {
  const file = path.join(root, "public", project.image.replace(/^\//, ""));
  if (!project.url) {
    await placeholder(project, file);
    report.push(`- ${project.name}: sem url, miniatura temporária gerada`);
    continue;
  }
  const page = await context.newPage();
  try {
    await page.goto(project.url, { waitUntil: "networkidle", timeout: 45_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const png = await page.screenshot({ type: "png" });
    await sharp(png).resize({ width: 1200 }).webp({ quality: 82 }).toFile(file);
    report.push(`- ${project.name}: capturado de ${project.url}`);
  } catch (err) {
    await placeholder(project, file);
    report.push(`- ${project.name}: FALHOU (${err.message.split("\n")[0]}), miniatura temporária gerada`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(report.join("\n"));
