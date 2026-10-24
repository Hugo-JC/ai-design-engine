"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const bin = path.join(__dirname, "../tools/validate-design.js");
const fx = (n) => path.join(__dirname, "fixtures", n);
const run = (...a) => {
  const r = spawnSync("node", [bin, ...a, "--json"], { encoding: "utf8" });
  return { code: r.status, data: JSON.parse(r.stdout) };
};
const ids = (d) => d[0].findings.map((f) => f.id);

test("good.html: 0 avisos com tokens do estilo (CSS-aware: hover/focus em CSS não dão falso positivo)", () => {
  const { data } = run(fx("good.html"), "--style", "dark_craft_ink");
  assert.deepStrictEqual(
    data[0].findings.filter((f) => f.severity === "warn"),
    [],
  );
});
test("bad.html: apanha as falhas plantadas", () => {
  const found = ids(run(fx("bad.html"), "--strict").data);
  for (const id of [
    "hr",
    "purple",
    "tracking",
    "square-btn",
    "hover",
    "focus",
    "outline",
    "generic-copy",
    "img-alt",
    "div-click",
    "html-lang",
    "viewport",
    "tiny-text",
    "motion",
    "grid",
    "contrast",
    "divider",
    "nbsp",
  ])
    assert.ok(
      found.includes(id),
      `devia detetar: ${id} (obtido: ${found.join(",")})`,
    );
});
test("--strict termina com código 1 quando há avisos", () => {
  assert.strictEqual(run(fx("bad.html"), "--strict").code, 1);
  assert.strictEqual(
    run(fx("good.html"), "--strict", "--style", "dark_craft_ink").code,
    0,
  );
});
test("roxo permitido quando o token o define", () => {
  // saas_dark_modern v3 já não usa índigo; bad.html continua a ser apanhado
  assert.ok(
    ids(run(fx("bad.html"), "--style", "saas_dark_modern").data).includes(
      "purple",
    ),
  );
});
test("estado de hover Tailwind é reconhecido", () => {
  const tmp = path.join(require("os").tmpdir(), "tw.html");
  require("fs").writeFileSync(
    tmp,
    '<html lang="pt"><body><a href="/" class="px-4 py-2 hover:bg-zinc-800 focus-visible:ring-2">Ir</a></body></html>',
  );
  const f = ids(run(tmp).data);
  assert.ok(!f.includes("hover") && !f.includes("focus"));
});
test("texto decorativo aria-hidden não conta para contraste", () => {
  const tmp = path.join(require("os").tmpdir(), "dec.html");
  require("fs").writeFileSync(
    tmp,
    '<html lang="pt"><head><meta name="viewport" content="x"><style>body{background:#000;color:#fff}.wm{color:#111}</style></head><body><h1 class="t">x</h1><div class="wm" aria-hidden="true">REFRI</div></body></html>',
  );
  assert.ok(!ids(run(tmp).data).includes("contrast"));
});
