"use strict";
// Utilitários de cor partilhados (WCAG). Sem dependências.
const NAMED = { black: "#000000", white: "#ffffff", transparent: null };

function parseColor(input) {
  if (input == null) return null;
  let s = String(input).trim().toLowerCase();
  if (s in NAMED) {
    if (NAMED[s] === null) return { r: 0, g: 0, b: 0, a: 0 };
    s = NAMED[s];
  }
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    if (h.length === 6) h += "ff";
    if (h.length !== 8) return null;
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: parseInt(h.slice(6, 8), 16) / 255,
    };
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/);
  if (m) {
    let a = m[4] === undefined ? 1 : parseFloat(m[4]);
    if (m[5] === "%") a /= 100;
    return { r: +m[1], g: +m[2], b: +m[3], a };
  }
  return null;
}
const lin = (v) => {
  v /= 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};
const luminance = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
function contrast(a, b) {
  const A = typeof a === "string" ? parseColor(a) : a,
    B = typeof b === "string" ? parseColor(b) : b;
  if (!A || !B) return null;
  const [hi, lo] = [luminance(A), luminance(B)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
function blend(fg, bg) {
  // fg com alpha sobre bg opaco
  const a = fg.a;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}
function toHex(c) {
  return "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}
function hsl(c) {
  const r = c.r / 255,
    g = c.g / 255,
    b = c.b / 255,
    mx = Math.max(r, g, b),
    mn = Math.min(r, g, b),
    l = (mx + mn) / 2;
  if (mx === mn) return { h: 0, s: 0, l };
  const d = mx - mn,
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: h * 60, s, l };
}
// Roxo/índigo "genérico de IA": matiz 255–305°, saturação razoável, nem muito escuro nem muito claro.
function isGenericPurple(c) {
  const { h, s, l } = hsl(c);
  return h >= 255 && h <= 305 && s >= 0.35 && l >= 0.25 && l <= 0.8;
}
function bestOn(c) {
  const k = contrast(c, "#0a0a0a"),
    w = contrast(c, "#ffffff");
  return k >= w ? { color: "#0A0A0A", ratio: k } : { color: "#FFFFFF", ratio: w };
}
module.exports = {
  parseColor,
  contrast,
  luminance,
  blend,
  toHex,
  hsl,
  isGenericPurple,
  bestOn,
};
