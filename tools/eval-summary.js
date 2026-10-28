#!/usr/bin/env node
"use strict";
// Resume a avaliação cega com/sem repo (05-evals). Uso: node tools/eval-summary.js [05-evals/results.json]
const fs = require("fs");
const path = require("path");
const CRIT = [
  "identity",
  "hierarchy",
  "color",
  "rhythm",
  "composition",
  "copy",
  "polish",
  "realbrand",
];
function summarize(data) {
  const runs = (data.runs || []).filter(
    (r) => r.scores && CRIT.every((c) => Number.isInteger(r.scores[c]))
  );
  const total = (r) => CRIT.reduce((a, c) => a + r.scores[c], 0);
  const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
  const by = (cond) => runs.filter((r) => r.condition === cond);
  const w = by("with_repo"),
    wr = by("with_repo_refs"),
    o = by("without_repo");
  const pairs = [];
  w.forEach((a) => {
    const b = o.find((x) => x.prompt_id === a.prompt_id);
    if (b) pairs.push({ id: a.prompt_id, d: total(a) - total(b) });
  });
  const wins = pairs.filter((p) => p.d > 0).length,
    losses = pairs.filter((p) => p.d < 0).length,
    ties = pairs.length - wins - losses;
  const diff = mean(pairs.map((p) => p.d));
  const refPairs = [];
  wr.forEach((a) => {
    const b = w.find((x) => x.prompt_id === a.prompt_id);
    if (b) refPairs.push({ id: a.prompt_id, d: total(a) - total(b) });
  });
  const refDiff = mean(refPairs.map((p) => p.d));
  const refWins = refPairs.filter((p) => p.d > 0).length;
  const perCrit = CRIT.map((c) => ({
    criterion: c,
    with: mean(w.map((r) => r.scores[c])),
    without: mean(o.map((r) => r.scores[c])),
  }));
  let verdict;
  if (pairs.length < 5)
    verdict = `Amostra insuficiente (${pairs.length} pares; mínimo 5). Preencha mais prompts.`;
  else if (diff >= 2 && wins / pairs.length >= 0.6)
    verdict = "O repo COMPENSA: ganho médio ≥ 2/16 e vence em ≥ 60% dos pares.";
  else if (diff >= 0.5)
    verdict = "Ganho PEQUENO: o repo ajuda, mas pouco. Ver critérios onde não ajuda.";
  else verdict = "Sem ganho mensurável: simplificar o repo antes de o expandir.";
  return {
    pairs: pairs.length,
    mean_with: mean(w.map(total)),
    mean_without: mean(o.map(total)),
    mean_diff: diff,
    wins,
    ties,
    losses,
    per_criterion: perCrit,
    verdict,
    refs: {
      pairs: refPairs.length,
      mean_diff: refDiff,
      wins: refWins,
      losses: refPairs.filter((p) => p.d < 0).length,
      verdict:
        refPairs.length < 5
          ? `Amostra insuficiente (${refPairs.length} pares; mínimo 5).`
          : refDiff >= 2 && refWins / refPairs.length >= 0.6
            ? "As referências COMPENSAM: ganho médio ≥ 2/16 e vitórias ≥ 60%."
            : "As referências ainda não demonstram ganho mensurável.",
    },
  };
}
if (require.main === module) {
  const file = path.resolve(process.argv[2] || path.join(__dirname, "../05-evals/results.json"));
  if (!fs.existsSync(file)) {
    console.error(
      `Sem resultados em ${file}. Copie 05-evals/results.template.json para results.json e preencha as notas (0-2).`
    );
    process.exit(1);
  }
  const r = summarize(JSON.parse(fs.readFileSync(file, "utf8")));
  console.log(
    `\nPares: ${r.pairs} · média COM repo ${r.mean_with.toFixed(1)}/16 · SEM repo ${r.mean_without.toFixed(1)}/16 · Δ ${r.mean_diff.toFixed(1)}`
  );
  console.log(`Vitórias ${r.wins} · empates ${r.ties} · derrotas ${r.losses}\n`);
  r.per_criterion.forEach((c) =>
    console.log(
      `${c.criterion.padEnd(12)} com ${c.with.toFixed(2)} · sem ${c.without.toFixed(2)} · Δ ${(c.with - c.without).toFixed(2)}`
    )
  );
  console.log(`\n➡️  ${r.verdict}\n`);
  console.log(
    `Referências vs repo: ${r.refs.pairs} pares · Δ ${r.refs.mean_diff.toFixed(1)} · vitórias ${r.refs.wins} · ${r.refs.verdict}\n`
  );
}
module.exports = { summarize, CRIT };
