#!/usr/bin/env node
"use strict";
// AI Design Engine · validador estático v3
// Uso: node tools/validate-design.js <ficheiro...> [--style <style_id>] [--accent #hex] [--allow #hex,#hex] [--strict] [--json]
// Lê HTML/JSX/TSX/Vue/Svelte e CSS (blocos <style> ou .css) e resolve variáveis CSS (:root).
// É HEURÍSTICO e estático: não renderiza. Contraste e "accent espalhado" são estimativas.
const fs = require("fs");
const path = require("path");
const C = require("./lib/color");

const argv = process.argv.slice(2);
const optVal = (n) => {
  const i = argv.indexOf(n);
  return i >= 0 ? argv[i + 1] : null;
};
const strict = argv.includes("--strict");
const asJson = argv.includes("--json");
const styleId = optVal("--style");
const accentOverride = optVal("--accent");
const allowHex = (optVal("--allow") || "")
  .split(",")
  .map((x) => x.trim().toLowerCase())
  .filter(Boolean);
const files = argv.filter(
  (a, i) =>
    !a.startsWith("--") &&
    !["--style", "--allow", "--accent"].includes(argv[i - 1]),
);

// ---------- utilitários ----------
const lineOf = (c, i) => c.slice(0, i).split("\n").length;
function findAll(content, regex) {
  const re = new RegExp(
    regex.source,
    regex.flags.includes("g") ? regex.flags : regex.flags + "g",
  );
  const hits = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    hits.push({ text: m[0], index: m.index, m });
    if (m[0] === "") re.lastIndex++;
  }
  return hits;
}
const linesOf = (content, idxs, max = 5) => {
  const ls = [...new Set(idxs.map((i) => lineOf(content, i)))];
  return `(linha${ls.length > 1 ? "s" : ""} ${ls.slice(0, max).join(", ")}${ls.length > max ? "…" : ""})`;
};
const strip = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

// ---------- CSS ----------
function extractCss(content, file) {
  if (/\.css$/i.test(file)) return [{ css: content, offset: 0 }];
  return findAll(content, /<style\b[^>]*>([\s\S]*?)<\/style>/i).map((h) => ({
    css: h.m[1],
    offset: h.index + h.text.indexOf(h.m[1]),
  }));
}
function parseDecls(body, base) {
  const out = [];
  const re = /(--[\w-]+|[a-zA-Z-]+)\s*:\s*([^;]+)/g;
  let m;
  while ((m = re.exec(body)) !== null)
    out.push({
      prop: m[1].toLowerCase(),
      value: m[2].trim(),
      index: base + m.index,
    });
  return out;
}
function parseCss(css, offset) {
  const rules = [];
  const src = strip(css);
  (function walk(str, base, ctx) {
    let i = 0;
    while (i < str.length) {
      const open = str.indexOf("{", i);
      if (open < 0) break;
      const head = str.slice(i, open).trim();
      let depth = 1,
        j = open + 1;
      while (j < str.length && depth > 0) {
        if (str[j] === "{") depth++;
        else if (str[j] === "}") depth--;
        j++;
      }
      const body = str.slice(open + 1, j - 1);
      if (head.startsWith("@")) {
        if (/^@(media|supports|layer)/.test(head))
          walk(body, base + open + 1, head);
        else if (/keyframes/.test(head))
          rules.push({
            selector: head,
            decls: [],
            keyframes: true,
            index: offset + base + i,
          });
      } else
        rules.push({
          selector: head,
          decls: parseDecls(body, offset + base + open + 1),
          ctx,
          index: offset + base + i,
        });
      i = j;
    }
  })(src, 0, null);
  return rules;
}
function makeResolver(rules) {
  const vars = {};
  rules.forEach((r) => {
    if (/^(:root|html|body)$/.test(r.selector))
      r.decls.forEach((d) => {
        if (d.prop.startsWith("--")) vars[d.prop] = d.value;
      });
  });
  const res = (v, depth = 0) =>
    depth > 6
      ? v
      : v.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\)/g, (_, n, fb) =>
          vars[n] !== undefined ? res(vars[n], depth + 1) : fb || "",
        );
  return { vars, res };
}
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|\b(?:black|white)\b/;
function firstColor(value) {
  if (/gradient\(|url\(/i.test(value)) return null;
  const m = value.match(COLOR_RE);
  return m ? C.parseColor(m[0]) : null;
}
const sizePx = (v) => {
  const m = String(v).match(/^([\d.]+)(px|rem)$/);
  return m ? parseFloat(m[1]) * (m[2] === "rem" ? 16 : 1) : null;
};

// ---------- markup ----------
const TAG_RE = /<[A-Za-z][A-Za-z0-9-]*\b[^>]*>/g;
const classesOf = (t) => {
  const m = t.match(
    /class(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/,
  );
  return m ? (m[1] || m[2] || m[3] || "").split(/\s+/).filter(Boolean) : [];
};
const idOf = (t) => {
  const m = t.match(/\bid\s*=\s*["']([^"']+)["']/);
  return m ? m[1] : null;
};
function isButtonLike(hit) {
  const t = hit.text,
    n = (t.match(/^<([A-Za-z][A-Za-z0-9]*)/) || [])[1];
  if (!n) return false;
  if (/^button$/i.test(n) || /^[A-Z][A-Za-z0-9]*Button$/.test(n)) return true;
  if (/^a$/i.test(n))
    return /\bhref\s*=/.test(t) || /\brole\s*=\s*["']?button/.test(t);
  if (/^input$/i.test(n))
    return /\btype\s*=\s*["']?(?:button|submit|reset)/i.test(t);
  return false;
}
function compoundMatches(compound, tagName, classes, id) {
  const c = compound.replace(/:[a-z-]+(\([^)]*\))?/gi, "").trim();
  if (c === "" || c === "*") return true;
  const el = (c.match(/^[a-zA-Z][\w-]*/) || [null])[0];
  if (el && el.toLowerCase() !== tagName.toLowerCase()) return false;
  const cls = [...c.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
  const ids = [...c.matchAll(/#([\w-]+)/g)].map((m) => m[1]);
  return cls.every((x) => classes.includes(x)) && ids.every((x) => x === id);
}
function cssCovers(rules, state, tagName, classes, id) {
  const pseudo =
    state === "hover"
      ? [":hover"]
      : [":focus-visible", ":focus", ":focus-within"];
  return rules.some(
    (r) =>
      !r.keyframes &&
      r.selector.split(",").some((sel) => {
        const s = sel.trim();
        if (!pseudo.some((p) => s.includes(p))) return false;
        const last =
          s
            .split(/[\s>+~]+/)
            .filter(Boolean)
            .pop() || "";
        return compoundMatches(last, tagName, classes, id);
      }),
  );
}

// ---------- validação ----------
function loadTokens() {
  if (!styleId) return null;
  const f = path.resolve(
    __dirname,
    "..",
    "02-styles-and-tokens",
    "design-styles.json",
  );
  const st = JSON.parse(fs.readFileSync(f, "utf8")).styles[styleId];
  if (!st) {
    console.error(`❌ style_id desconhecido: ${styleId}`);
    process.exit(1);
  }
  return st;
}
const GENERIC =
  /lorem ipsum|inovação para o seu futuro|soluções inovadoras|o futuro é agora|leve o seu negócio ao próximo nível|innovation for your future|experiência única|a melhor experiência|tudo o que precisa num só lugar|solução completa para|design moderno e elegante/i;

function validate(content, file, tokens) {
  const F = []; // findings
  const add = (id, severity, message, idxs) =>
    F.push({
      id,
      severity,
      message:
        message + (idxs && idxs.length ? " " + linesOf(content, idxs) : ""),
    });
  const isDoc = /<html\b/i.test(content);
  const blocks = extractCss(content, file);
  const rules = blocks.flatMap((b) => parseCss(b.css, b.offset));
  const { vars, res } = makeResolver(rules);
  const tags = findAll(content, TAG_RE);
  const bodyText = content.replace(
    /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g,
    (m) => m.replace(/[^\n]/g, " "),
  );
  const isNeo =
    styleId === "bold_neobrutalism" || (tokens && tokens.radius === "0px");

  // 1. separadores
  const hr = findAll(content, /<hr\b/i);
  if (hr.length)
    add(
      "hr",
      "warn",
      `${hr.length} tag(s) <hr>. Use espaçamento ou mudança de superfície.`,
      hr.map((h) => h.index),
    );
  if (/\.mdx?$/i.test(file)) {
    const md = findAll(content, /^\s*(?:---+|___+|\*\*\*+)\s*$/m).filter(
      (h) => lineOf(content, h.index) > 1,
    );
    if (md.length)
      add(
        "md-rule",
        "warn",
        `${md.length} linha(s) horizontal(is) Markdown.`,
        md.map((h) => h.index),
      );
  }
  const dis = [
    ...findAll(content, /\b(?:border-t|border-b|divide-y|h-px)\b/),
    ...findAll(
      content,
      /border-(?:top|bottom)\s*:\s*\d+(?:\.\d+)?px\s+(?:solid|dashed|dotted)/i,
    ),
  ];
  if (dis.length)
    add(
      "divider",
      "warn",
      `${dis.length} possível(eis) divisor(es) disfarçado(s). Se separam blocos soltos, troque por espaçamento/fundo.`,
      dis.map((h) => h.index),
    );

  // 2. botões retos
  if (!isNeo) {
    const sq = tags
      .filter(isButtonLike)
      .filter((h) => /\brounded-none\b/.test(h.text));
    const sqCss = rules.filter(
      (r) =>
        !r.keyframes &&
        /(^|[\s,>+~])(button|a?\.btn[\w-]*|\.button[\w-]*)\b/.test(
          r.selector,
        ) &&
        r.decls.some(
          (d) => d.prop === "border-radius" && /^0(px)?$/.test(d.value),
        ),
    );
    if (sq.length || sqCss.length)
      add(
        "square-btn",
        "warn",
        "Botões com border-radius 0 sem estilo neo-brutalista explícito.",
        [...sq.map((h) => h.index), ...sqCss.map((r) => r.index)],
      );
  }

  // 3. estados hover/focus (Tailwind OU CSS real)
  const btns = tags.filter(isButtonLike);
  const miss = { hover: [], focus: [] };
  btns.forEach((h) => {
    const name = h.text.match(/^<([A-Za-z][\w-]*)/)[1],
      cls = classesOf(h.text),
      id = idOf(h.text);
    const twH = cls.some((c) => /(^|:)hover:|group-hover/.test(c)),
      twF = cls.some((c) => /(^|:)focus(-visible)?:/.test(c));
    if (!twH && !cssCovers(rules, "hover", name, cls, id))
      miss.hover.push(h.index);
    if (!twF && !cssCovers(rules, "focus", name, cls, id))
      miss.focus.push(h.index);
  });
  if (miss.hover.length)
    add(
      "hover",
      "warn",
      `${miss.hover.length} botão(ões)/link(s) de ação sem estado de hover (nem em classes nem em CSS).`,
      miss.hover,
    );
  if (miss.focus.length)
    add(
      "focus",
      "warn",
      `${miss.focus.length} botão(ões)/link(s) de ação sem estado de foco visível (:focus-visible).`,
      miss.focus,
    );
  const noOutline = rules.filter(
    (r) =>
      r.decls.some(
        (d) => d.prop === "outline" && /^(none|0)\b/.test(d.value),
      ) && !/:focus-visible/.test(r.selector),
  );
  if (noOutline.length && !rules.some((r) => /:focus-visible/.test(r.selector)))
    add(
      "outline",
      "warn",
      "outline removido sem alternativa :focus-visible.",
      noOutline.map((r) => r.index),
    );

  // 4. tracking (limite do estilo - 0.01 de tolerância)
  const minTrk =
    (tokens && tokens.heading_tracking_range
      ? tokens.heading_tracking_range[0]
      : -0.02) - 0.01;
  const tight = [...findAll(content, /\btracking-tighter\b/)];
  findAll(content, /tracking-\[(-\d*\.?\d+)em\]/).forEach((h) => {
    if (parseFloat(h.m[1]) < minTrk) tight.push(h);
  });
  rules.forEach((r) =>
    r.decls.forEach((d) => {
      if (d.prop === "letter-spacing") {
        const m = res(d.value).match(/^(-[\d.]*\.?\d+)em$/);
        if (m && parseFloat(m[1]) < minTrk) tight.push({ index: d.index });
      }
    }),
  );
  if (tight.length)
    add(
      "tracking",
      "warn",
      `Tracking demasiado apertado (limite ${minTrk.toFixed(2)}em${tokens ? " do estilo" : ""}).`,
      tight.map((h) => h.index),
    );

  // 5. text-wrap em títulos
  const heads = tags.filter((h) => /^<h[1-6]\b/i.test(h.text));
  const wrapRules = rules.filter((r) =>
    r.decls.some(
      (d) => d.prop === "text-wrap" && /balance|pretty/.test(d.value),
    ),
  );
  const noWrap = heads.filter((h) => {
    if (/text-balance|text-wrap|textWrap|balance/.test(h.text)) return false;
    const name = h.text.match(/^<(h[1-6])/i)[1],
      cls = classesOf(h.text),
      id = idOf(h.text);
    return !wrapRules.some((r) =>
      r.selector.split(",").some(
        (s) =>
          compoundMatches(
            s
              .trim()
              .split(/[\s>+~]+/)
              .pop() || "",
            name,
            cls,
            id,
          ) && /h[1-6]|\./.test(s),
      ),
    );
  });
  if (noWrap.length)
    add(
      "wrap",
      "warn",
      `${noWrap.length} título(s) sem text-wrap: balance (tag, classe ou regra CSS).`,
      noWrap.map((h) => h.index),
    );

  // 6. grelha de espaçamento: base 8, meio-passo 4 até 16px
  const off = [],
    soft = [];
  const chk = (px, idx) => {
    if (px <= 0) return;
    if (px % 4 !== 0) off.push(idx);
    else if (px > 16 && px % 8 !== 0) soft.push(idx);
  };
  findAll(
    content,
    /\b(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-\[(\d+(?:\.\d+)?)px\]/,
  ).forEach((h) => chk(parseFloat(h.m[1]), h.index));
  findAll(
    content,
    /(?:^|[\s"'`])-?(?:p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)(?=$|[\s"'`])/g,
  ).forEach((h) => chk(parseFloat(h.m[1]) * 4, h.index));
  rules.forEach((r) =>
    r.decls.forEach((d) => {
      if (
        !/^(padding|margin|gap|row-gap|column-gap)(-(top|right|bottom|left))?$/.test(
          d.prop,
        )
      )
        return;
      [...res(d.value).matchAll(/(-?[\d.]+)(px|rem)\b/g)].forEach((m) =>
        chk(Math.abs(parseFloat(m[1])) * (m[2] === "rem" ? 16 : 1), d.index),
      );
    }),
  );
  if (off.length)
    add(
      "grid",
      "warn",
      `${off.length} espaçamento(s) fora da grelha (múltiplos de 4px; base 8px).`,
      off,
    );
  if (soft.length)
    add(
      "grid-info",
      "info",
      `${soft.length} espaçamento(s) >16px fora de múltiplos de 8px. Confirme se é intencional.`,
      soft,
    );

  // 7. roxo/índigo genérico
  if (!(
    tokens &&
    Object.values(tokens.colors).some((v) => {
      const c = C.parseColor(v);
      return c && C.isGenericPurple(c);
    })
  )) {
    const pu = findAll(
      content,
      /\b(?:bg|from|via|to|shadow|text|border|ring)-(?:purple|violet|fuchsia|indigo)-\d{2,3}/,
    );
    const css = [];
    rules.forEach((r) =>
      r.decls.forEach((d) => {
        if (d.prop.startsWith("--") && !COLOR_RE.test(d.value)) return;
        [...res(d.value).matchAll(new RegExp(COLOR_RE.source, "g"))].forEach(
          (m) => {
            const c = C.parseColor(m[0]);
            if (
              c &&
              c.a > 0 &&
              C.isGenericPurple(c) &&
              !allowHex.includes(C.toHex(c))
            )
              css.push(d.index);
          },
        );
      }),
    );
    if (pu.length || css.length)
      add(
        "purple",
        "warn",
        'Roxo/índigo detetado ("Padrão Roxo Genérico"). Confirme que foi pedido ou faz parte do estilo.',
        [...pu.map((h) => h.index), ...css],
      );
  }

  // 8. texto genérico, acessibilidade básica, copy
  const gen = findAll(content, new RegExp(GENERIC.source, "i"));
  if (gen.length)
    add(
      "generic-copy",
      "warn",
      "Texto genérico/placeholder. Escreva cópia específica do nicho.",
      gen.map((h) => h.index),
    );
  const noAlt = findAll(content, /<img\b(?![^>]*\balt\s*=)[^>]*>/i);
  if (noAlt.length)
    add(
      "img-alt",
      "warn",
      `${noAlt.length} <img> sem alt.`,
      noAlt.map((h) => h.index),
    );
  const divClick = findAll(
    content,
    /<div\b[^>]*\bonClick\b[^>]*>|<div\b[^>]*\bonclick\s*=[^>]*>/i,
  );
  if (divClick.length)
    add(
      "div-click",
      "warn",
      `${divClick.length} <div> clicável. Use <button> (teclado, foco, semântica).`,
      divClick.map((h) => h.index),
    );
  if (isDoc) {
    if (!/<html[^>]*\blang\s*=/i.test(content))
      add("html-lang", "warn", "<html> sem atributo lang.");
    if (!/<meta[^>]*name=["']viewport["']/i.test(content))
      add("viewport", "warn", 'Falta <meta name="viewport">.');
    const h1 = heads.filter((h) => /^<h1\b/i.test(h.text)).length;
    if (h1 !== 1)
      add("h1-count", "info", `${h1} elementos <h1> (esperado: 1).`);
  }
  const tiny = [];
  rules.forEach((r) =>
    r.decls.forEach((d) => {
      if (d.prop === "font-size") {
        const px = sizePx(res(d.value));
        if (px !== null && px < 12) tiny.push(d.index);
      }
    }),
  );
  if (tiny.length)
    add("tiny-text", "warn", `${tiny.length} font-size < 12px.`, tiny);

  // 9. movimento
  const moves =
    rules.some(
      (r) =>
        r.keyframes ||
        r.decls.some(
          (d) => d.prop === "animation" || d.prop.startsWith("animation-"),
        ),
    ) ||
    /gsap|ScrollTrigger|requestAnimationFrame|framer-motion|anime\(/.test(
      content,
    );
  if (moves && !/prefers-reduced-motion/.test(content))
    add(
      "motion",
      "warn",
      "Há animação mas nenhum tratamento de prefers-reduced-motion.",
    );

  // 10. repetição de classes
  const counts = new Map();
  findAll(content, /\bclass(?:Name)?\s*=\s*["']([^"']{50,})["']/).forEach((h) =>
    counts.set(h.m[1], (counts.get(h.m[1]) || 0) + 1),
  );
  const rep = [...counts.values()].filter((n) => n >= 3).length;
  if (rep)
    add(
      "repeat",
      "warn",
      `${rep} conjunto(s) de classes repetido(s) 3+ vezes. Se são cards, varie conteúdo, escala e hierarquia.`,
    );

  // 11. contraste estimado (CSS)
  const bgOf = (m) => {
    const d = m["background-color"] || m.background;
    return d ? firstColor(res(d.value)) : null;
  };
  const root = rules.filter((r) => /^(body|html|:root)$/.test(r.selector));
  const rootMap = {};
  root.forEach((r) =>
    r.decls.forEach((d) => {
      rootMap[d.prop] = d;
    }),
  );
  const pageBg = bgOf(rootMap);
  const hiddenTags = tags
    .filter((h) => /aria-hidden\s*=\s*["']?true/.test(h.text))
    .map((h) => ({
      name: h.text.match(/^<([A-Za-z][\w-]*)/)[1],
      cls: classesOf(h.text),
      id: idOf(h.text),
    }));
  const lowC = [];
  rules.forEach((r) => {
    if (r.keyframes || /::(placeholder|selection)/.test(r.selector)) return;
    if (
      hiddenTags.some((h) =>
        r.selector.split(",").some((s) =>
          compoundMatches(
            s
              .trim()
              .split(/[\s>+~]+/)
              .pop() || "",
            h.name,
            h.cls,
            h.id,
          ),
        ),
      )
    )
      return; // decorativo (aria-hidden)
    const m = {};
    r.decls.forEach((d) => {
      m[d.prop] = d;
    });
    if (!m.color || /-webkit-text-fill/.test(m.color.value)) return;
    let fg = firstColor(res(m.color.value));
    if (!fg || fg.a === 0) return;
    const bg = bgOf(m) || pageBg;
    if (!bg || bg.a < 1) return;
    if (fg.a < 1) fg = C.blend(fg, bg);
    const px = m["font-size"] ? sizePx(res(m["font-size"].value)) : null;
    const need = px !== null && px >= 24 ? 3 : 4.5,
      ratio = C.contrast(fg, bg);
    if (ratio !== null && ratio < need)
      lowC.push({
        i: m.color.index,
        t: `${r.selector} ${ratio.toFixed(2)}:1<${need}`,
      });
  });
  if (lowC.length)
    add(
      "contrast",
      "warn",
      `Contraste estimado abaixo de AA (estático): ${lowC
        .slice(0, 3)
        .map((x) => x.t)
        .join("; ")}${lowC.length > 3 ? "…" : ""}`,
      lowC.map((x) => x.i),
    );

  // 12. número + unidade
  const nu = findAll(
    bodyText,
    /(?<![\p{L}\d])\d[\d.,]*[ ](?:mg|ml|kg|g|km|cm|mm|m|h|min|kz|aoa|%|€)(?![\p{L}\d])/giu,
  );
  if (nu.length)
    add(
      "nbsp",
      "info",
      `${nu.length} número(s) com unidade separada por espaço normal. Use &nbsp; para não partir a linha.`,
      nu.map((h) => h.index),
    );

  // 13. tokens do estilo (só com --style)
  if (tokens) {
    const norm = (c) => C.toHex(c).toLowerCase();
    const accent = C.parseColor(accentOverride || tokens.colors.accent),
      accHex = accent ? norm(accent) : null;
    const allowed = new Set([
      ...Object.values(tokens.colors)
        .map((v) => C.parseColor(v))
        .filter(Boolean)
        .map(norm),
      ...(tokens.accent_alternatives || []).map((v) => norm(C.parseColor(v))),
      ...allowHex,
      ...(accentOverride ? [norm(C.parseColor(accentOverride))] : []),
      "#000000",
      "#ffffff",
      "#0a0a0a",
    ]);
    const seen = new Map();
    rules.forEach((r) =>
      r.decls.forEach((d) =>
        [...d.value.matchAll(new RegExp(COLOR_RE.source, "g"))].forEach((m) => {
          const c = C.parseColor(m[0]);
          if (c && c.a > 0) {
            const h = norm(c);
            if (!allowed.has(h) && !seen.has(h)) seen.set(h, d.index);
          }
        }),
      ),
    );
    [
      ...content.matchAll(
        /(?:fill|stroke|stop-color)\s*=\s*["'](#[0-9a-fA-F]{3,8})["']/g,
      ),
    ].forEach((m) => {
      const c = C.parseColor(m[1]);
      if (c) {
        const h = norm(c);
        if (!allowed.has(h) && !seen.has(h)) seen.set(h, m.index);
      }
    });
    if (seen.size)
      add(
        "palette-drift",
        "info",
        `${seen.size} cor(es) fora do token "${styleId}": ${[...seen.keys()].slice(0, 8).join(", ")}${seen.size > 8 ? "…" : ""}. Se forem cor do PRODUTO ou pedidas pelo utilizador, passe --allow.`,
        [...seen.values()].slice(0, 5),
      );
    // accent espalhado
    const kinds = new Set();
    let uses = 0;
    const accIdx = [];
    rules.forEach((r) =>
      r.decls.forEach((d) => {
        if (d.prop.startsWith("--")) return;
        const val = res(d.value).toLowerCase();
        const hit =
          accHex &&
          (val.includes(accHex) ||
            [...val.matchAll(new RegExp(COLOR_RE.source, "g"))].some((m) => {
              const c = C.parseColor(m[0]);
              return c && norm(c) === accHex;
            }));
        if (!hit) return;
        uses++;
        accIdx.push(d.index);
        kinds.add(
          /^(color|fill|stroke|-webkit-text-stroke)/.test(d.prop)
            ? "texto/ícone"
            : /^(border|outline)/.test(d.prop)
              ? "borda"
              : /^background/.test(d.prop)
                ? "fundo"
                : "sombra/efeito",
        );
      }),
    );
    const loud = tokens.intensity === "loud",
      maxUses = loud ? 14 : 8,
      maxKinds = loud ? 4 : 3;
    if (uses >= maxUses && kinds.size >= maxKinds)
      add(
        "accent-spread",
        "warn",
        `Accent (${accHex}) em ${uses} declarações e ${kinds.size} tipos (${[...kinds].join(", ")}). Reserve-o a CTA/estado ativo/1 gesto tipográfico.`,
        accIdx,
      );
    // fontes
    const lc = content.toLowerCase();
    [tokens.font_display, tokens.font_body].filter(Boolean).forEach((f) => {
      if (!lc.includes(f.toLowerCase()))
        add(
          "fonts",
          "info",
          `Fonte do token "${f}" não encontrada no ficheiro.`,
        );
    });
  }
  return F;
}

// ---------- execução ----------
if (!files.length) {
  console.error(
    "Uso: node tools/validate-design.js <ficheiro...> [--style id] [--allow #hex] [--strict] [--json]",
  );
  process.exit(1);
}
const tokens = loadTokens();
let warns = 0;
const all = [];
for (const file of files) {
  try {
    const content = fs.readFileSync(path.resolve(file), "utf8");
    const f = validate(content, file, tokens);
    warns += f.filter((x) => x.severity === "warn").length;
    all.push({ file, style: styleId || null, findings: f });
  } catch (e) {
    console.error("❌ Erro ao ler o ficheiro:", e.message);
    process.exitCode = 1;
  }
}
if (asJson) console.log(JSON.stringify(all, null, 2));
else
  for (const r of all) {
    console.log(
      `\n--- 🛡️ AI DESIGN ENGINE v3 · ${r.file}${r.style ? ` · style ${r.style}` : ""} ---`,
    );
    const w = r.findings.filter((x) => x.severity === "warn"),
      i = r.findings.filter((x) => x.severity === "info");
    if (!w.length && !i.length) console.log("✅ Sem avisos.");
    w.forEach((x) => console.log(`⚠️  [${x.id}] ${x.message}`));
    i.forEach((x) => console.log(`ℹ️  [${x.id}] ${x.message}`));
    console.log(
      `(${w.length} aviso(s), ${i.length} info) · heurístico/estático: confirme no contexto e renderizado.`,
    );
  }
if (strict && warns > 0) process.exit(1);
module.exports = { validate };
