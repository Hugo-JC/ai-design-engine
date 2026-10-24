#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
function search(prompt, options = {}) {
  const configFile = path.join(root, "ade.config.json");
  const config = fs.existsSync(configFile)
    ? JSON.parse(fs.readFileSync(configFile, "utf8"))
    : {};
  const refs = config.references || {};
  const max = Math.min(
    3,
    Math.max(0, Number(options.max || refs.max_refs || 3)),
  );
  if (refs.enabled === false) return [];
  const catalog = JSON.parse(
    fs.readFileSync(
      path.join(root, "03-references/reference-sources.json"),
      "utf8",
    ),
  );
  const presets = JSON.parse(
    fs.readFileSync(
      path.join(root, "03-references/local-presets.json"),
      "utf8",
    ),
  );
  const preset = options.preset
    ? presets.presets.find((p) => p.id === options.preset)
    : presets.presets.find(
        (p) =>
          norm(prompt).includes(p.id.replace(/-/g, " ")) ||
          p.match_terms.some((t) => norm(prompt).includes(norm(t))),
      );
  const niche = options.preset || (preset && preset.id);
  const archetype = options.archetype || (preset && preset.patterns.hero);
  const terms = `${prompt || ""} ${options.trait || ""}`.toLowerCase();
  const output = [];
  const confConnectors = (refs.connectors || []).map(norm);
  if (!refs.offline)
    for (const name of confConnectors) {
      const c = catalog.connectors[name];
      if (c)
        output.push({
          id: name,
          level: "L1",
          access: "connector",
          why: "Conector declarado em ade.config.json",
          extract: c.use_for.join(", "),
          do_not_copy: "identidade, conteúdo e layouts completos",
        });
    }
  if (config.beta && config.beta.library === true) {
    const lib = path.resolve(root, refs.library_path || "07-library");
    for (const collection of ["videos", "books", "mobbin"]) {
      const mf = path.join(lib, collection, "manifest.json");
      if (!fs.existsSync(mf)) continue;
      const manifest = JSON.parse(fs.readFileSync(mf, "utf8"));
      for (const item of manifest.items || []) {
        if (!["indexed", "summarized"].includes(item.status)) continue;
        let score = 0;
        if (niche && (item.niches || []).includes(niche)) score += 4;
        if (archetype && (item.archetypes || []).includes(archetype))
          score += 3;
        if (
          (item.traits || []).some(
            (t) => terms.includes(t.replace(/-/g, " ")) || terms.includes(t),
          )
        )
          score += 2;
        if (score)
          output.push({
            id: item.id,
            level: "L2",
            access: "notes",
            why: `correspondência (pontuação ${score})`,
            extract: (item.extract || []).join("; ") || "consultar notes.md",
            do_not_copy:
              (item.do_not_copy || []).join(", ") ||
              "marca, copy e composição integral",
            score,
            rating: item.rating || 0,
            order: output.length,
            notes_path: path.join(lib, item.notes_path || ""),
          });
      }
    }
  }
  if (!refs.offline && niche && preset) {
    for (const source of preset.sources || [])
      output.push({
        id: source.name,
        level: "L3",
        access: "url",
        url: source.url,
        why: "fonte pública associada ao preset",
        extract:
          (source.pattern_cues || []).join(", ") ||
          "padrões abstratos do nicho",
        do_not_copy: "logótipo, copy, imagens e layout integral",
      });
    for (const source of catalog.sources.filter((s) =>
      (s.niches || []).includes(niche),
    ))
      output.push({
        id: source.id,
        level: "L3",
        access:
          source.fetch_status === "blocked" || source.fetch_status === "login"
            ? "screenshot"
            : "url",
        url: source.url,
        why: source.purpose,
        extract: source.traits.join(", "),
        do_not_copy: source.license_note,
      });
  }
  output.push({
    id: (preset && (preset.dossier || [])[0]) || "dossiê do repo",
    level: "L4",
    access: "offline",
    why: "base local sempre disponível",
    extract: "princípios e arquétipos do router",
    do_not_copy: "não aplicável",
  });
  const unique = output.filter(
    (x, i, a) => a.findIndex((y) => y.id === x.id) === i,
  );
  return unique
    .sort(
      (a, b) =>
        ({ L1: 0, L2: 1, L3: 2, L4: 3 })[a.level] -
          { L1: 0, L2: 1, L3: 2, L4: 3 }[b.level] ||
        (b.score || 0) - (a.score || 0) ||
        (b.rating || 0) - (a.rating || 0) ||
        (a.order || 0) - (b.order || 0),
    )
    .slice(0, max);
}
if (require.main === module) {
  const args = process.argv.slice(2);
  const val = (f) => {
    const i = args.indexOf(f);
    return i < 0 ? undefined : args[i + 1];
  };
  const prompt = args
    .filter(
      (x) =>
        !x.startsWith("--") &&
        !["--preset", "--archetype", "--trait", "--max"].includes(x),
    )
    .join(" ");
  const result = search(prompt, {
    preset: val("--preset"),
    archetype: val("--archetype"),
    trait: val("--trait"),
    max: val("--max"),
  });
  if (args.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else
    result.forEach((r) =>
      console.log(
        `[${r.level}] ${r.id} — acesso: ${r.access} → extrair: ${r.extract} | não copiar: ${r.do_not_copy}`,
      ),
    );
}
module.exports = { search };
