'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { route, norm, brief, context } = require('../tools/route');

const prompts = JSON.parse(fs.readFileSync(path.join(__dirname, '../05-evals/prompts.json'), 'utf8')).prompts;

for (const p of prompts) {
  test(`router #${p.id}: ${p.prompt.slice(0, 48)}…`, () => {
    const r = route(p.prompt);
    assert.strictEqual(r.style_id, p.expected_style_id);
    assert.strictEqual(r.selection_path, p.expected_path);
    assert.strictEqual(r.patterns.hero, p.expected_hero);
    if (p.expected_intensity) assert.strictEqual(r.intensity, p.expected_intensity);
  });
}

test('normalização ignora acentos e pontuação', () => assert.strictEqual(norm('E-commerce, Café!'), 'e commerce cafe'));
test('"bar" não casa por substring (barato, barbearia)', () => {
  assert.notStrictEqual(route('loja barata de capas').preset_id, 'tattoo-barber-nightlife');
});
test('expressão mais específica vence (clínica > saúde)', () => {
  assert.strictEqual(route('clínica de saúde').preset_id, 'clinic-healthcare');
  assert.strictEqual(route('marca de saúde e bem-estar').preset_id, 'wellness-health-beauty');
});
test('plurais regulares casam (refrigerantes, clínicas)', () => {
  assert.strictEqual(route('marca de refrigerantes').preset_id, 'beverage-packaging-loud');
  assert.strictEqual(route('rede de clínicas').preset_id, 'clinic-healthcare');
});
test('determinismo: 20 execuções iguais', () => {
  const a = JSON.stringify(route('refrigerante energético jovem'));
  for (let i = 0; i < 20; i++) assert.strictEqual(JSON.stringify(route('refrigerante energético jovem')), a);
});
test('tom nunca troca o nicho', () => {
  assert.strictEqual(route('banco calmo e elegante').style_id, route('banco agressivo e rápido').style_id);
});
test('brief e contexto têm o formato esperado', () => {
  const r = route('site para um estúdio de tatuagem');
  assert.match(brief(r), /^DESIGN BRIEF\n- Nicho/);
  const c = context(r);
  assert.match(c, /## Tokens/); assert.match(c, /\| H3 \|/); assert.match(c, /### Tatuagem/);
});
