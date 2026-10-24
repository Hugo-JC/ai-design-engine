"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { search } = require("../tools/ref-search");
const { classify } = require("../tools/ref-check");
const { route } = require("../tools/route");
const { execFileSync } = require("node:child_process");
test("ref-search é determinístico e limita resultados a três", () => {
  const a = search("site para marca de refrigerante");
  for (let i = 0; i < 20; i++)
    assert.deepEqual(search("site para marca de refrigerante"), a);
  assert.ok(a.length <= 3);
});
test("ref-search funciona sem biblioteca BETA e só devolve níveis estáveis", () => {
  const results = search("site para marca de refrigerante");
  assert.ok(results.every((item) => item.level !== "L2"));
  assert.ok(results.some((item) => item.level === "L3" || item.level === "L4"));
});
test("ref-check distingue HTML rico, shell SPA, bloqueio e login", () => {
  assert.equal(
    classify(
      200,
      "https://example.test",
      "<main>" + "conteudo ".repeat(100) + "</main>",
    ),
    "ok",
  );
  assert.equal(
    classify(200, "https://example.test", '<div id="root"></div>'),
    "js-only",
  );
  assert.equal(classify(403, "https://example.test", "blocked"), "blocked");
  assert.equal(classify(200, "https://example.test/login", "form"), "login");
});
test("route conserva a resposta sem --refs e a rota normal", () => {
  assert.equal(route("site para refrigerante").style_id, "loud_beverage_dark");
});
test("--refs acrescenta capacidades; sem a flag mantém a saída v3", () => {
  const base = execFileSync(
    process.execPath,
    ["tools/route.js", "site para refrigerante", "--context"],
    { encoding: "utf8" },
  );
  const refs = execFileSync(
    process.execPath,
    ["tools/route.js", "site para refrigerante", "--context", "--refs"],
    { encoding: "utf8" },
  );
  assert.doesNotMatch(base, /## Referências \(máx\. 3\)/);
  assert.match(refs, /Capacidades:.*modo=L[1-4]/);
  assert.ok((refs.match(/^\d+\. \[L[1-4]\]/gm) || []).length <= 3);
});
