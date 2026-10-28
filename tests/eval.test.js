"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { summarize, CRIT, LEGACY_CRIT } = require("../tools/eval-summary");

const mk = (id, condition, value, criteria = CRIT) => ({
  prompt_id: id,
  condition,
  scores: Object.fromEntries(criteria.map((criterion) => [criterion, value])),
});

test("rubrica v2: dez critérios e ganho consistente são reconhecidos", () => {
  assert.strictEqual(CRIT.length, 10);
  const runs = [];
  for (let id = 1; id <= 6; id++) {
    runs.push(mk(id, "with_repo", 2), mk(id, "without_repo", 1));
  }
  const result = summarize({ runs });
  assert.strictEqual(result.schema, "v2");
  assert.strictEqual(result.max_score, 20);
  assert.strictEqual(result.pairs, 6);
  assert.strictEqual(result.wins, 6);
  assert.match(result.verdict, /COMPENSA/);
});

test("rubrica v2: empate significa ausência de ganho", () => {
  const runs = [];
  for (let id = 1; id <= 6; id++) {
    runs.push(mk(id, "with_repo", 1), mk(id, "without_repo", 1));
  }
  assert.match(summarize({ runs }).verdict, /Sem ganho/);
});

test("amostra inferior a cinco pares não pode declarar vitória", () => {
  const runs = [mk(1, "with_repo", 2), mk(1, "without_repo", 0)];
  assert.match(summarize({ runs }).verdict, /insuficiente/);
});

test("resultados históricos com oito critérios continuam suportados", () => {
  assert.strictEqual(LEGACY_CRIT.length, 8);
  const runs = [];
  for (let id = 1; id <= 6; id++) {
    runs.push(
      mk(id, "with_repo", 2, LEGACY_CRIT),
      mk(id, "without_repo", 1, LEGACY_CRIT)
    );
  }
  const result = summarize({ runs });
  assert.strictEqual(result.schema, "legacy");
  assert.strictEqual(result.max_score, 16);
  assert.strictEqual(result.pairs, 6);
  assert.match(result.verdict, /COMPENSA/);
});

test("não mistura resultados antigos e novos na mesma escala", () => {
  const runs = [
    mk(1, "with_repo", 2, CRIT),
    mk(1, "without_repo", 0, CRIT),
    mk(2, "with_repo", 2, LEGACY_CRIT),
    mk(2, "without_repo", 0, LEGACY_CRIT),
  ];
  const result = summarize({ runs });
  assert.strictEqual(result.schema, "v2");
  assert.strictEqual(result.pairs, 1);
  assert.match(result.verdict, /insuficiente/);
});

test("notas nulas, fora da escala ou incompletas são ignoradas", () => {
  const result = summarize({
    runs: [
      { prompt_id: 1, condition: "with_repo", scores: { brief: null } },
      { ...mk(2, "with_repo", 2), scores: { ...mk(2, "with_repo", 2).scores, brief: 3 } },
    ],
  });
  assert.strictEqual(result.pairs, 0);
});
