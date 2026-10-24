#!/usr/bin/env node
"use strict";
// Integridade do próprio repo: tokens, contrastes, presets, referências cruzadas e deriva entre ficheiros.
// Uso: node tools/lint-repo.js   (exit 1 se houver erros)
const fs = require("fs");
const path = require("path");
const C = require("./lib/color");
const ROOT = path.resolve(__dirname, "..");
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const norm = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const errors = [],
  warns = [];
const E = (m) => errors.push(m),
  W = (m) => warns.push(m);

const pkg = JSON.parse(rd("package.json"));
const stylesDoc = JSON.parse(rd("02-styles-and-tokens/design-styles.json"));
const cat = JSON.parse(rd("03-references/local-presets.json"));
const sourceCatalog = JSON.parse(rd("03-references/reference-sources.json"));
const major = parseInt(pkg.version, 10);
if (stylesDoc.version !== major)
  E(
    `design-styles.json version (${stylesDoc.version}) ≠ major do package.json (${major})`,
  );
if (cat.version !== major)
  E(
    `local-presets.json version (${cat.version}) ≠ major do package.json (${major})`,
  );
const top = (rd("CHANGELOG.md").match(/^## \[(\d+\.\d+\.\d+(?:-[\w.]+)?)\]/m) ||
  [])[1];
if (top !== pkg.version)
  E(`CHANGELOG (${top}) ≠ package.json (${pkg.version})`);

// ---- estilos ----
const REQ = [
  "name",
  "description",
  "keywords",
  "mode",
  "colors",
  "radius",
  "font_display",
  "font_body",
  "heading_tracking_range",
  "intensity",
  "accent_mode",
  "accent_usage",
];
const COL = [
  "background",
  "surface",
  "border",
  "text_primary",
  "text_secondary",
  "accent",
];
for (const [id, s] of Object.entries(stylesDoc.styles)) {
  REQ.forEach((k) => {
    if (s[k] === undefined) E(`[${id}] falta o campo "${k}"`);
  });
  if (!s.colors) continue;
  COL.forEach((k) => {
    if (!C.parseColor(s.colors[k])) E(`[${id}] cor inválida em colors.${k}`);
  });
  if (!["calm", "balanced", "loud"].includes(s.intensity))
    E(`[${id}] intensity inválida`);
  if (!["ui", "product"].includes(s.accent_mode))
    E(`[${id}] accent_mode inválido`);
  if (s.heading_tracking_range && s.heading_tracking_range[0] < -0.02)
    E(`[${id}] heading_tracking_range[0] < -0.02em`);
  if (s.radius === "0px" && !s.border_width)
    E(`[${id}] radius 0px só é aceitável em neo-brutalismo (border_width)`);
  const bg = C.parseColor(s.colors.background);
  if (!bg) continue;
  const solid = (v) => {
    const c = C.parseColor(v);
    return c && c.a < 1 ? C.blend(c, bg) : c;
  };
  const ck = (label, a, b, min) => {
    const r = C.contrast(a, b);
    if (r !== null && r < min)
      E(`[${id}] contraste ${label} ${r.toFixed(2)}:1 < ${min}:1`);
  };
  ck("texto/fundo", solid(s.colors.text_primary), bg, 4.5);
  ck("texto2/fundo", solid(s.colors.text_secondary), bg, 4.5);
  ck(
    "texto/superfície",
    solid(s.colors.text_primary),
    solid(s.colors.surface),
    4.5,
  );
  ck(
    "texto2/superfície",
    solid(s.colors.text_secondary),
    solid(s.colors.surface),
    4.5,
  );
  const accs = [s.colors.accent, ...(s.accent_alternatives || [])];
  accs.forEach((a, i) => {
    const c = C.parseColor(a);
    if (!c) {
      E(`[${id}] accent inválido: ${a}`);
      return;
    }
    if (!s.border_width) ck(`accent${i ? " alt " + a : ""}/fundo`, c, bg, 3);
    const on = C.bestOn(c);
    if (on.ratio < 4.5)
      E(
        `[${id}] nenhum texto (preto/branco) atinge 4.5:1 sobre o accent ${a} (${on.ratio.toFixed(2)})`,
      );
    if (C.isGenericPurple(c) && !s.allow_purple)
      E(`[${id}] accent ${a} é roxo/índigo genérico (anti-pattern 1)`);
  });
}

// ---- presets ----
const arch = rd("03-references/layout-archetypes.md");
const refs = rd("03-references/curated-references.md");
const hasArch = (id) =>
  new RegExp(`^\\|\\s*${id}\\s*\\|`, "m").test(arch) ||
  new RegExp(`^- \\*\\*${id}\\b`, "m").test(arch);
const allIds = new Set(Object.values(cat.pattern_ids).flat());
allIds.forEach((id) => {
  if (!hasArch(id))
    E(`padrão ${id} está em pattern_ids mas não em layout-archetypes.md`);
});
const termOwner = new Map(),
  seenId = new Set();
cat.presets.forEach((p) => {
  if (seenId.has(p.id)) E(`preset duplicado: ${p.id}`);
  seenId.add(p.id);
  const sids = [p.style_id, ...(p.variants || []).map((v) => v.style_id)];
  sids.forEach((s) => {
    if (!stylesDoc.styles[s]) E(`[${p.id}] style_id inexistente: ${s}`);
  });
  const pt = p.patterns || {};
  [
    pt.hero,
    ...(p.hero_alternatives || []),
    ...(pt.features || []),
    ...(pt.social_proof || []),
    pt.navigation,
    pt.footer,
  ].forEach((id) => {
    if (!id || !allIds.has(id)) E(`[${p.id}] padrão inválido: ${id}`);
  });
  (p.dossier || []).forEach((h) => {
    if (!refs.split("\n").some((l) => l.trim() === `### ${h}`))
      E(`[${p.id}] dossiê não encontrado em curated-references.md: "${h}"`);
  });
  (p.sources || []).forEach((s) => {
    if (!/^https:\/\//.test(s.url)) E(`[${p.id}] fonte sem https: ${s.name}`);
  });
  p.match_terms.forEach((t) => {
    const n = norm(t);
    if (termOwner.has(n) && termOwner.get(n) !== p.id)
      E(`termo "${t}" repetido em ${termOwner.get(n)} e ${p.id}`);
    termOwner.set(n, p.id);
  });
});
(cat.non_niche_terms || []).forEach((t) => {
  if (termOwner.has(norm(t))) E(`non_niche_terms contém termo de nicho: ${t}`);
});
if (!stylesDoc.styles[cat.fallback.style_id])
  E("fallback com style_id inexistente");

// ---- catálogo de referências v3.1 ----
const nicheIds = new Set(cat.presets.map((p) => p.id));
const sourceIds = new Set();
for (const s of sourceCatalog.sources || []) {
  if (sourceIds.has(s.id)) E(`fonte duplicada: ${s.id}`);
  sourceIds.add(s.id);
  if (!/^https:\/\//.test(s.url)) E(`[fonte ${s.id}] URL deve usar https`);
  if (
    !["gallery", "app-ui", "packaging", "typography", "motion-code"].includes(
      s.kind,
    )
  )
    E(`[fonte ${s.id}] kind inválido`);
  (s.access || []).forEach((a) => {
    if (!["url", "screenshot", "connector"].includes(a))
      E(`[fonte ${s.id}] access inválido: ${a}`);
  });
  (s.niches || []).forEach((n) => {
    if (!nicheIds.has(n)) E(`[fonte ${s.id}] nicho inexistente: ${n}`);
  });
  if (
    !["untested", "ok", "js-only", "blocked", "login", "error"].includes(
      s.fetch_status,
    )
  )
    E(`[fonte ${s.id}] fetch_status inválido`);
}
const allowedMedia = /\.(mp4|mov|webm|mkv|png|jpe?g|webp|pdf|epub)$/i;
for (const collection of ["videos", "books", "mobbin"]) {
  const manifestPath = `07-library/${collection}/manifest.json`;
  if (!exists(manifestPath)) continue;
  try {
    const manifest = JSON.parse(rd(manifestPath));
    const ids = new Set();
    for (const item of manifest.items || []) {
      if (ids.has(item.id)) E(`id de item duplicado: ${item.id}`);
      ids.add(item.id);
      (item.niches || []).forEach((n) => {
        if (!nicheIds.has(n)) E(`[${item.id}] nicho inválido: ${n}`);
      });
      (item.archetypes || []).forEach((a) => {
        if (!allIds.has(a)) E(`[${item.id}] arquétipo inválido: ${a}`);
      });
      if (item.status !== "raw" && !exists(`07-library/${item.notes_path}`))
        E(`[${item.id}] notes_path inexistente`);
      if (item.type === "video" && !String(item.source_url || "").trim())
        E(`[${item.id}] vídeo sem source_url`);
    }
  } catch (e) {
    E(`${manifestPath} inválido: ${e.message}`);
  }
}
const ignore = rd(".gitignore");
[
  "mp4",
  "mov",
  "webm",
  "mkv",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "pdf",
  "epub",
].forEach((ext) => {
  if (!ignore.includes(`07-library/**/*.${ext}`))
    E(`.gitignore sem regra para ${ext}`);
});
try {
  const tracked = require("child_process")
    .execFileSync("git", ["ls-files", "07-library"], {
      cwd: ROOT,
      encoding: "utf8",
    })
    .split(/\r?\n/)
    .filter(Boolean);
  tracked
    .filter((f) => allowedMedia.test(f))
    .forEach((f) => E(`media pessoal rastreado: ${f}`));
} catch {
  W("não foi possível verificar media rastreado pelo Git");
}

// ---- documentos ----
const DOCS = [
  ".cursorrules",
  "AGENTS.md",
  "CORE.md",
  "README.md",
  "MASTER-PROJECT-SPEC.md",
  "04-agent-prompts/system-prompt-auditor.md",
];
DOCS.forEach((d) => {
  if (!exists(d)) {
    E(`documento em falta: ${d}`);
    return;
  }
  const txt = rd(d);
  for (const m of txt.matchAll(
    /`((?:0[1-6]-[\w-]+|tools|tests)\/[\w./-]+\.(?:md|json|js|html)|(?:CORE|AGENTS|CHANGELOG|README|MASTER-PROJECT-SPEC)\.md)`/g,
  )) {
    if (!exists(m[1]) && !/results\.json$/.test(m[1]))
      E(`${d} refere ficheiro inexistente: ${m[1]}`);
  }
});
// fonte única: o mapa nicho→style_id vive em local-presets.json; não pode reaparecer duplicado
if (
  /\|\s*Nicho \/ palavras-chave\s*\|\s*`style_id`/i.test(
    rd("03-references/personality-extractor.md"),
  )
)
  E(
    "personality-extractor.md voltou a ter uma tabela nicho→style_id (fonte única: local-presets.json)",
  );
if (!/\.cursorrules/.test(".cursorrules") || rd(".cursorrules").length > 2600)
  W(".cursorrules > 2.6 KB: mantenha-o curto e aponte para CORE.md");
if (rd("CORE.md").length > 5200)
  W("CORE.md > 5.2 KB: o núcleo deve caber numa página");

console.log(
  `\n🔎 lint-repo v${pkg.version}: ${Object.keys(stylesDoc.styles).length} estilos · ${cat.presets.length} presets · ${allIds.size} padrões`,
);
warns.forEach((w) => console.log("⚠️  " + w));
errors.forEach((e) => console.log("❌ " + e));
console.log(
  errors.length ? `\n${errors.length} erro(s).` : "\n✅ Repo consistente.",
);
process.exit(errors.length ? 1 : 0);
