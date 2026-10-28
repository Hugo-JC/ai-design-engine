#!/usr/bin/env node
"use strict";
// Resume a avaliação cega em 05-evals. Uso: node tools/eval-summary.js [05-evals/results.json]
const fs = require("fs");
const path = require("path");

const CRIT = [
  "brief",
  "hierarchy",
  "identity",
  "responsive",
  "accessibility",
  "interaction",
  "trust",
  "implementation",
  "performance",
  "originality",
];
const LEGACY_CRIT = [
  "identity",
  "hierarchy",
  "color",
  "rhythm",
  "composition",
  "copy",
  "polish",
  "realbrand",
];

function isComplete(scores, criteria) {
  return Boolean(
    scores &&
      criteria.every(
        (key) => Number.isInteger(scores[key]) && scores[key] >= 0 && scores[key] <= 2
      )
  );
}

function hasKeys(scores, criteria) {
  return Boolean(scores && criteria.every((key) => Object.prototype.hasOwnProperty.call(scores, key)));
}

function schemaFor(run) {
  // Detect the rubric even when the template is still blank; completeness is checked separately.
  if (hasKeys(run.scores, CRIT)) return "v2";
  if (hasKeys(run.scores, LEGACY_CRIT)) return "legacy";
  return null;
}

function summarize(data) {
  const allRuns = (data.runs || [])
    .filter((run) => run && run.scores)
    .map((run) => ({ ...run, schema: schemaFor(run) }))
    .filter((run) => run.schema);
  // Prefer the new rubric when present; otherwise retain support for legacy result files.
  const schema = allRuns.some((run) => run.schema === "v2") ? "v2" : "legacy";
  const criteria = schema === "v2" ? CRIT : LEGACY_CRIT;
  const runs = allRuns.filter(
    (run) =>
      run.schema === schema &&
      isComplete(run.scores, schema === "v2" ? CRIT : LEGACY_CRIT)
  );
  const maxScore = criteria.length * 2;
  const total = (run) => criteria.reduce((sum, key) => sum + run.scores[key], 0);
  const mean = (values) =>
    values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : NaN;
  const by = (condition) => runs.filter((run) => run.condition === condition);
  const withRepo = by("with_repo");
  const withRefs = by("with_repo_refs");
  const withoutRepo = by("without_repo");

  function pairDiffs(left, right) {
    return left.flatMap((a) => {
      const b = right.find((candidate) => candidate.prompt_id === a.prompt_id);
      return b ? [{ id: a.prompt_id, d: total(a) - total(b) }] : [];
    });
  }

  const pairs = pairDiffs(withRepo, withoutRepo);
  const wins = pairs.filter((pair) => pair.d > 0).length;
  const losses = pairs.filter((pair) => pair.d < 0).length;
  const ties = pairs.length - wins - losses;
  const diff = mean(pairs.map((pair) => pair.d));
  const refPairs = pairDiffs(withRefs, withRepo);
  const refWins = refPairs.filter((pair) => pair.d > 0).length;
  const refDiff = mean(refPairs.map((pair) => pair.d));
  const perCrit = criteria.map((criterion) => ({
    criterion,
    with: mean(withRepo.map((run) => run.scores[criterion])),
    without: mean(withoutRepo.map((run) => run.scores[criterion])),
  }));

  // Keep the former 2/16 threshold proportional on the new 20-point scale.
  const minimumGain = maxScore * 0.125;
  let verdict;
  if (pairs.length < 5) {
    verdict = `Amostra insuficiente (${pairs.length} pares completos; mínimo 5).`;
  } else if (diff >= minimumGain && wins / pairs.length >= 0.6) {
    verdict = `O repo COMPENSA: ganho médio ≥ ${minimumGain.toFixed(1)}/${maxScore} e vence em ≥ 60% dos pares.`;
  } else if (diff >= minimumGain / 4) {
    verdict = "Ganho PEQUENO: o repo ajuda, mas pouco. Ver critérios onde não ajuda.";
  } else {
    verdict = "Sem ganho mensurável: simplificar o repo antes de o expandir.";
  }

  return {
    schema,
    criteria,
    max_score: maxScore,
    pairs: pairs.length,
    mean_with: mean(withRepo.map(total)),
    mean_without: mean(withoutRepo.map(total)),
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
      losses: refPairs.filter((pair) => pair.d < 0).length,
      verdict:
        refPairs.length < 5
          ? `Amostra insuficiente (${refPairs.length} pares completos; mínimo 5).`
          : refDiff >= minimumGain && refWins / refPairs.length >= 0.6
            ? "As referências COMPENSAM: ganho médio proporcional e vitórias ≥ 60%."
            : "As referências ainda não demonstram ganho mensurável.",
    },
  };
}

if (require.main === module) {
  const file = path.resolve(
    process.argv[2] || path.join(__dirname, "../05-evals/results.json")
  );
  if (!fs.existsSync(file)) {
    console.error(
      `Sem resultados em ${file}. Copie 05-evals/results.template.json para results.json e preencha as notas (0-2) e evidências.`
    );
    process.exit(1);
  }
  const result = summarize(JSON.parse(fs.readFileSync(file, "utf8")));
  const fmt = (value) => (Number.isFinite(value) ? value.toFixed(1) : "n/a");
  console.log(
    `\\nRubrica: ${result.schema} · pares completos: ${result.pairs} · COM repo ${fmt(result.mean_with)}/${result.max_score} · SEM repo ${fmt(result.mean_without)}/${result.max_score} · Δ ${fmt(result.mean_diff)}`
  );
  console.log(`Vitórias ${result.wins} · empates ${result.ties} · derrotas ${result.losses}\\n`);
  result.per_criterion.forEach((criterion) =>
    console.log(
      `${criterion.criterion.padEnd(16)} com ${fmt(criterion.with)} · sem ${fmt(criterion.without)} · Δ ${fmt(criterion.with - criterion.without)}`
    )
  );
  console.log(`\\n➡️  ${result.verdict}\\n`);
  console.log(
    `Referências vs repo: ${result.refs.pairs} pares · Δ ${fmt(result.refs.mean_diff)} · vitórias ${result.refs.wins} · ${result.refs.verdict}\\n`
  );
}

module.exports = { summarize, CRIT, LEGACY_CRIT };
