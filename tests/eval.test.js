'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { summarize, CRIT } = require('../tools/eval-summary');
const mk = (id, cond, v) => ({ prompt_id: id, condition: cond, scores: Object.fromEntries(CRIT.map((c) => [c, v])) });
test('eval-summary: com repo claramente melhor → compensa', () => {
  const runs = []; for (let i = 1; i <= 6; i++) { runs.push(mk(i, 'with_repo', 2), mk(i, 'without_repo', 1)); }
  const r = summarize({ runs }); assert.strictEqual(r.wins, 6); assert.match(r.verdict, /COMPENSA/);
});
test('eval-summary: empate → sem ganho; amostra curta → aviso', () => {
  const runs = []; for (let i = 1; i <= 6; i++) { runs.push(mk(i, 'with_repo', 1), mk(i, 'without_repo', 1)); }
  assert.match(summarize({ runs }).verdict, /Sem ganho/);
  assert.match(summarize({ runs: [mk(1, 'with_repo', 2), mk(1, 'without_repo', 0)] }).verdict, /insuficiente/);
});
test('eval-summary: ignora notas nulas (template por preencher)', () => {
  const r = summarize({ runs: [{ prompt_id: 1, condition: 'with_repo', scores: { identity: null } }] }); assert.strictEqual(r.pairs, 0);
});
