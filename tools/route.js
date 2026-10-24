#!/usr/bin/env node
"use strict";
// Router determinístico: pedido → style_id + padrões + brief + pacote de contexto.
// Uso: node tools/route.js "<pedido>" [--json | --brief | --context]
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const norm = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
// Casa palavra/expressão inteira; tolera plural regular (+s / +es) na última palavra do termo.
const has = (hay, term) => {
  const t = norm(term),
    H = " " + hay + " ";
  return [t, t + "s", t + "es"].some((f) => H.includes(" " + f + " "));
};

function route(prompt) {
  const cat = JSON.parse(read("03-references/local-presets.json"));
  const styles = JSON.parse(
    read("02-styles-and-tokens/design-styles.json"),
  ).styles;
  const text = norm(prompt);
  const nonNiche = new Set((cat.non_niche_terms || []).map(norm));

  // 1) preset por nicho: expressão mais específica (mais caracteres); empate → ordem do catálogo
  let best = null;
  cat.presets.forEach((p, i) => {
    const hits = p.match_terms.filter((t) => has(text, t));
    if (!hits.length) return;
    const spec = Math.max(...hits.map((t) => norm(t).length));
    if (!best || spec > best.spec) best = { p, i, hits, spec };
  });

  let out = {
    prompt,
    preset_id: null,
    matched_terms: [],
    variant_applied: null,
    selection_path: null,
    reason: "",
  };
  let base,
    patterns,
    extra = {};
  if (best) {
    base = best.p.style_id;
    out.preset_id = best.p.id;
    out.matched_terms = best.hits;
    out.selection_path = "preset";
    out.reason = `preset "${best.p.id}" (termos: ${best.hits.join(", ")})`;
    patterns = best.p.patterns;
    extra = {
      hero_alternatives: best.p.hero_alternatives || [],
      dossier: best.p.dossier || [],
      sources: best.p.sources || [],
      principles: best.p.principles || [],
    };
    const v = (best.p.variants || []).find((x) =>
      x.when_any.some((t) => has(text, t)),
    );
    if (v) {
      out.variant_applied = {
        style_id: v.style_id,
        because: v.when_any.filter((t) => has(text, t)),
      };
      base = best.p.style_id;
      out.style_id = v.style_id;
    }
  } else {
    // 2) sem nicho mapeado: pontuar keywords dos estilos (ignorando adjetivos de tom)
    let top = null;
    Object.entries(styles).forEach(([id, s], i) => {
      const hits = (s.keywords || []).filter(
        (k) => !nonNiche.has(norm(k)) && has(text, k),
      );
      if (hits.length && (!top || hits.length > top.hits.length))
        top = { id, hits, i };
    });
    patterns = cat.fallback.patterns;
    extra = {
      hero_alternatives: [],
      dossier: [],
      sources: [],
      principles: cat.fallback.principles || [],
    };
    if (top) {
      base = top.id;
      out.selection_path = "keywords";
      out.matched_terms = top.hits;
      out.reason = `sem preset de nicho; keywords do estilo "${top.id}" (${top.hits.join(", ")}). Registar a justificação no brief.`;
    } else {
      base = cat.fallback.style_id;
      out.selection_path = "fallback";
      out.reason =
        "sem nicho nem keywords reconhecidos; fallback local. Se faltar informação essencial, fazer UMA pergunta curta.";
    }
  }
  out.base_style_id = base;
  out.style_id = out.style_id || base;
  const style = styles[out.style_id];
  if (!style) throw new Error(`style_id inexistente: ${out.style_id}`);

  // 3) tom: só ajusta intensidade
  const tone = {
    loud: cat.tones.loud.filter((t) => has(text, t)),
    calm: cat.tones.calm.filter((t) => has(text, t)),
  };
  out.tone_words = tone;
  out.intensity =
    tone.loud.length > tone.calm.length
      ? "loud"
      : tone.calm.length > tone.loud.length
        ? "calm"
        : style.intensity || "balanced";
  out.patterns = patterns;
  Object.assign(out, extra);
  out.tokens = style;
  return out;
}

function brief(r, refs = null) {
  const t = r.tokens;
  const tone = [...r.tone_words.loud, ...r.tone_words.calm];
  const legacyRefs = (r.sources || [])
    .slice(0, 2)
    .map((s) => `${s.name} (${(s.pattern_cues || [])[0] || "padrão"})`)
    .join("; ");
  return [
    "DESIGN BRIEF",
    `- Nicho / público: ${r.preset_id || "(sem nicho mapeado)"} — <preencher público>`,
    `- Tom: ${tone.length ? tone.join(", ") : "<preencher>"} → intensidade ${r.intensity}`,
    `- style_id + justificação: ${r.style_id}${r.variant_applied ? ` (variante: ${r.variant_applied.because.join(", ")})` : ""} — ${r.reason}`,
    `- Modo e tipografia: ${t.mode} · ${t.typography}`,
    `- Arquétipo de hero + motivo: ${r.patterns.hero}${r.hero_alternatives.length ? ` (alternativas: ${r.hero_alternatives.join(", ")})` : ""} — <justificar com o conteúdo real>`,
    "- Elemento visual principal (se relevante): <preencher>",
    `- Referências${Array.isArray(refs) ? " (nível)" : "/padrões (opcional)"}: ${Array.isArray(refs) ? (refs.length ? refs.map((x) => `${x.level} ${x.id} → ${x.extract} | não copiar: ${x.do_not_copy}`).join("; ") : "só dossiê do repo (L4)") : legacyRefs || "<opcional>"}`,
    "- Risco principal a evitar: <preencher>",
  ].join("\n");
}

function archetypeLines(r) {
  const md = read("03-references/layout-archetypes.md").split("\n");
  const p = r.patterns;
  const ids = [
    p.hero,
    ...(r.hero_alternatives || []),
    ...(p.features || []),
    ...(p.social_proof || []),
    p.navigation,
    p.footer,
  ].filter(Boolean);
  return [...new Set(ids)].map(
    (id) =>
      md.find(
        (l) =>
          new RegExp(`^\\|\\s*${id}\\s*\\|`).test(l) ||
          new RegExp(`^- \\*\\*${id}\\b`).test(l),
      ) || `${id}: (ver layout-archetypes.md)`,
  );
}

function dossierText(r) {
  const md = read("03-references/curated-references.md").split("\n");
  return (r.dossier || [])
    .map((h) => {
      const i = md.findIndex((l) => l.trim() === `### ${h}`);
      if (i < 0) return `(dossiê "${h}" não encontrado)`;
      let j = i + 1;
      while (j < md.length && !/^#{2,3} /.test(md[j])) j++;
      return md.slice(i, j).join("\n").trim();
    })
    .join("\n\n");
}

function context(r, refs = null, capabilities = null) {
  const t = r.tokens,
    c = t.colors;
  const share = { calm: 10, balanced: 15, loud: 25 }[r.intensity];
  return [
    brief(r, refs),
    "",
    "## Tokens",
    `style_id=${r.style_id} · modo=${t.mode} · intensidade=${r.intensity} (accent ≤ ${share}% da superfície) · accent_mode=${t.accent_mode}`,
    `cores: bg ${c.background} · surface ${c.surface} · border ${c.border} · texto ${c.text_primary} · texto2 ${c.text_secondary} · accent ${c.accent}`,
    `accent alternativos (só se o pedido não fixar cores): ${(t.accent_alternatives || []).join(", ") || "—"}`,
    `raio ${t.radius} · fontes ${t.font_display} + ${t.font_body}${t.font_mono ? " + " + t.font_mono : ""} · tracking de títulos ${t.heading_tracking_range.join("em a ")}em`,
    `uso do accent: ${t.accent_usage}`,
    "",
    "## Arquétipos",
    ...archetypeLines(r).map((l) => "- " + l.replace(/^- /, "")),
    "",
    "## Princípios do nicho",
    ...(r.principles || []).map((x) => "- " + x),
    "",
    "## Dossiê do nicho",
    dossierText(r) || "(sem dossiê)",
    "",
    ...(refs
      ? [
          "## Referências (máx. 3)",
          `Capacidades: conector=${capabilities.connectors.join(",") || "—"} · biblioteca=${capabilities.library} · playwright=${capabilities.playwright ? "sim" : "não"} · modo=${refs[0] ? refs[0].level : "L4"}`,
          ...refs.map(
            (x, i) =>
              `${i + 1}. [${x.level}] ${x.id} — acesso: ${x.access} → extrair: ${x.extract} | não copiar: ${x.do_not_copy}`,
          ),
          "",
        ]
      : []),
    "Depois de construir: node tools/validate-design.js <ficheiro> --style " +
      r.style_id,
  ].join("\n");
}

function main() {
  const args = process.argv.slice(2);
  const flags = args.filter((a) => a.startsWith("--"));
  const prompt = args
    .filter((a) => !a.startsWith("--"))
    .join(" ")
    .trim();
  if (!prompt) {
    console.error(
      'Uso: node tools/route.js "<pedido>" [--json|--brief|--context]',
    );
    process.exit(1);
  }
  const r = route(prompt);
  let refs = null,
    capabilities = null;
  if (flags.includes("--refs")) {
    const fs = require("fs"),
      path = require("path");
    const root = path.resolve(__dirname, "..");
    const configFile = path.join(root, "ade.config.json");
    const config = fs.existsSync(configFile)
      ? JSON.parse(fs.readFileSync(configFile, "utf8"))
      : {};
    const rc = config.references || {};
    const connectorNames = [
      ...new Set([
        ...(rc.connectors || []),
        ...Object.keys(
          require("../03-references/reference-sources.json").connectors,
        ).filter((n) =>
          Object.keys(process.env).some((k) => k.toLowerCase().includes(n)),
        ),
      ]),
    ];
    capabilities = {
      connectors: rc.offline ? [] : connectorNames,
      library:
        config.beta && config.beta.library === true
          ? fs.existsSync(path.join(root, rc.library_path || "07-library"))
            ? "on"
            : "vazia"
          : "off",
      playwright: (() => {
        try {
          require.resolve("playwright");
          return true;
        } catch {
          return false;
        }
      })(),
    };
    refs = require("./ref-search").search(prompt, { max: rc.max_refs || 3 });
  }
  if (flags.includes("--json"))
    console.log(
      JSON.stringify(
        { ...r, ...(refs ? { references: refs, capabilities } : {}) },
        null,
        2,
      ),
    );
  else if (flags.includes("--context"))
    console.log(context(r, refs, capabilities));
  else if (flags.includes("--brief")) console.log(brief(r, refs));
  else {
    console.log(
      `style_id:   ${r.style_id}${r.variant_applied ? `  (variante de ${r.base_style_id})` : ""}`,
    );
    console.log(`caminho:    ${r.selection_path} — ${r.reason}`);
    console.log(`intensidade:${r.intensity}`);
    console.log(
      `hero:       ${r.patterns.hero}  features: ${r.patterns.features.join("/")}  prova: ${r.patterns.social_proof.join("/")}  nav: ${r.patterns.navigation}  rodapé: ${r.patterns.footer}`,
    );
    console.log(
      "\n(use --brief para o esqueleto do DESIGN BRIEF ou --context para o pacote de contexto compacto)",
    );
  }
}
if (require.main === module) main();
module.exports = { route, brief, context, norm };
