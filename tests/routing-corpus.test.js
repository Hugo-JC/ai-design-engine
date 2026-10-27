'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { route } = require('../tools/route');
const C = require('../05-evals/routing-corpus.json');
const cat = require('../03-references/local-presets.json');

for (const k of ['dev', 'heldout', 'fresh', 'coverage']) {
  test(`corpus ${k}: preset correto ≥ 95%`, () => {
    const ok = C[k].filter((e) => route(e.prompt).preset_id === e.expected_preset).length / C[k].length;
    assert.ok(ok >= 0.95, `${k}: ${(ok * 100).toFixed(0)}%`);
  });
  test(`corpus ${k}: estilo correto ≥ 95%`, () => {
    const ok = C[k].filter((e) => route(e.prompt).style_id === e.expected_style).length / C[k].length;
    assert.ok(ok >= 0.95, `${k}: ${(ok * 100).toFixed(0)}%`);
  });
}
test('negativos: nenhum nicho fora do catálogo casa com um preset', () => {
  const fp = C.negatives.filter((e) => route(e.prompt).selection_path === 'preset').map((e) => e.prompt);
  assert.deepStrictEqual(fp, []);
});
test('conflitos de tom: palavras de tom não escolhem o nicho', () => {
  const bad = C.conflicts.filter((e) => route(e.prompt).preset_id !== e.expected_preset).map((e) => e.prompt);
  assert.deepStrictEqual(bad, []);
});
test('ambíguos devolvem os candidatos esperados como alternativas', () => {
  for (const e of C.ambiguous) {
    const r = route(e.prompt);
    const ids = [r.preset_id, ...r.alternatives.map((a) => a.preset_id)];
    assert.ok(e.expected_candidates.every((c) => ids.includes(c)), e.prompt);
  }
});
test('match só por termo fraco → confiança low e weak_only', () => {
  const r = route('Loja online de ferramentas');
  assert.strictEqual(r.weak_only, true);
  assert.strictEqual(r.confidence, 'low');
});
test('termo forte vence termo fraco (loja online de velas)', () => {
  assert.strictEqual(route('Loja online de velas aromáticas').preset_id, 'handmade-crafts-candles');
});
test('empate entre nichos com estilos diferentes → confiança low', () => {
  assert.strictEqual(route('Hotel para cães').confidence, 'low');
});
test('o brief pede confirmação quando a confiança é baixa', () => {
  const { brief } = require('../tools/route');
  assert.match(brief(route('Hotel para cães')), /CONFIRMAR O NICHO/);
});
test('cada preset aparece pelo menos uma vez no corpus (cobertura de testes)', () => {
  const used = new Set([...C.dev, ...C.heldout, ...C.fresh, ...C.coverage].map((e) => e.expected_preset));
  const missing = cat.presets.map((p) => p.id).filter((id) => !used.has(id));
  assert.deepStrictEqual(missing, []);
});
