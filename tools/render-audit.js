#!/usr/bin/env node
"use strict";
// BETA — auditoria com browser real (Playwright/Chromium). Testado em fixtures e na Refri v2 (Chromium headless);
// não testado em dispositivos reais nem em Firefox/WebKit.
// Uso: node tools/render-audit.js <ficheiro.html|url> [--out audit-out]
// Requer: npm i -D playwright && npx playwright install chromium
const path = require("path");
const fs = require("fs");
const target = process.argv[2];
const out = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : "audit-out";
if (!target) {
  console.error(
    "Uso: node tools/render-audit.js <ficheiro.html|url> [--out dir]",
  );
  process.exit(1);
}
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error(
    "Playwright não instalado. Execute: npm i -D playwright && npx playwright install chromium",
  );
  process.exit(2);
}

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

// Corre dentro da página: devolve achados serializáveis.
function inPage(isMobile) {
  const F = [],
    parse = (s) => {
      const m = s.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(/[ ,/]+/).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
    };
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const L = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  const ratio = (a, b) => {
    const [h, l] = [L(a), L(b)].sort((x, y) => y - x);
    return (h + 0.05) / (l + 0.05);
  };
  const over = (f, b) => ({
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
    a: 1,
  });
  const bgOf = (el) => {
    let c = { r: 255, g: 255, b: 255, a: 1 };
    const chain = [];
    for (let e = el; e; e = e.parentElement) chain.push(e);
    chain.reverse().forEach((e) => {
      const bg = parse(getComputedStyle(e).backgroundColor);
      if (bg && bg.a > 0) c = bg.a === 1 ? bg : over(bg, c);
    });
    return c;
  };
  const hidden = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (
        s.display === "none" ||
        s.visibility === "hidden" ||
        +s.opacity === 0 ||
        e.getAttribute("aria-hidden") === "true"
      )
        return true;
    }
    return false;
  };
  if (document.documentElement.scrollWidth > innerWidth + 1)
    F.push({
      id: "overflow-x",
      msg: `Scroll horizontal: ${document.documentElement.scrollWidth}px > ${innerWidth}px`,
    });
  const seen = new Set();
  document.querySelectorAll("body *").forEach((el) => {
    if (hidden(el)) return;
    const own = [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length,
    );
    if (!own) return;
    const cs = getComputedStyle(el),
      fg = parse(cs.color);
    if (!fg || fg.a === 0 || cs.webkitTextFillColor === "rgba(0, 0, 0, 0)")
      return;
    const bg = bgOf(el),
      eff = fg.a < 1 ? over(fg, bg) : fg,
      size = parseFloat(cs.fontSize),
      bold = parseInt(cs.fontWeight, 10) >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5,
      r = ratio(eff, bg);
    const key = el.tagName + cs.color + cs.fontSize;
    if (r < need && !seen.has(key)) {
      seen.add(key);
      F.push({
        id: "contrast",
        msg: `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(" ")[0] : ""} ${r.toFixed(2)}:1 < ${need}:1 (${size}px)`,
      });
    }
    if (size < 12)
      F.push({
        id: "tiny-text",
        msg: `${el.tagName.toLowerCase()} com ${size}px`,
      });
    if (/^H[1-6]$/.test(el.tagName)) {
      const ls = parseFloat(cs.letterSpacing);
      if (!isNaN(ls) && ls / size < -0.03)
        F.push({
          id: "tracking",
          msg: `${el.tagName} com letter-spacing ${(ls / size).toFixed(3)}em`,
        });
    }
  });
  if (isMobile)
    document.querySelectorAll("a[href],button,[role=button]").forEach((el) => {
      if (hidden(el)) return;
      const r = el.getBoundingClientRect();
      if (r.width && r.height && Math.min(r.width, r.height) < 40)
        F.push({
          id: "tap-target",
          msg: `${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 24)}" ${Math.round(r.width)}×${Math.round(r.height)}px < 40px`,
        });
    });
  if (document.querySelectorAll("h1").length !== 1)
    F.push({
      id: "h1-count",
      msg: `${document.querySelectorAll("h1").length} <h1>`,
    });
  return F;
}

(async () => {
  const url = /^https?:\/\//.test(target)
    ? target
    : "file://" + path.resolve(target);
  fs.mkdirSync(out, { recursive: true });
  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.error(`Browser indisponível: ${String(e.message).split("\n")[0]}\nInstale com: npx playwright install chromium`);
    process.exit(2);
  }
  const report = [];
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });
    await page.goto(url, { waitUntil: "networkidle" });
    const findings = await page.evaluate(inPage, vp.name === "mobile");
    // foco por teclado: percorre até 12 elementos focáveis (pára ao completar o ciclo) e exige indicador visível
    const visited = new Set();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const r = await page.evaluate(() => {
        const e = document.activeElement;
        if (!e || e === document.body) return null;
        const s = getComputedStyle(e);
        const has =
          (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) ||
          s.boxShadow !== "none";
        return {
          key: `${e.tagName.toLowerCase()} "${(e.textContent || "").trim().slice(0, 24)}"`,
          has,
        };
      });
      if (!r) continue;
      if (visited.has(r.key)) break;
      visited.add(r.key);
      if (!r.has)
        findings.push({
          id: "focus-visible",
          msg: `sem indicador de foco: ${r.key}`,
        });
    }
    await page.screenshot({
      path: path.join(out, `${vp.name}.png`),
      fullPage: true,
    });
    report.push({ viewport: vp.name, findings });
    await page.close();
  }
  await browser.close();
  report.forEach((r) => {
    console.log(`\n== ${r.viewport} ==`);
    if (!r.findings.length) console.log("✅ sem achados");
    r.findings.forEach((f) => console.log(`⚠️  [${f.id}] ${f.msg}`));
  });
  console.log(`\nScreenshots em ${out}/ · experimental: confirme visualmente.`);
  process.exit(report.some((r) => r.findings.length) ? 1 : 0);
})();
