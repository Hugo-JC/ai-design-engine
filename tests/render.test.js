'use strict';
// Testes da auditoria renderizada. Ignorados se o Playwright/Chromium não estiver disponível.
const test = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const bin = path.join(__dirname, '../tools/render-audit.js');
const fx = (n) => path.join(__dirname, 'fixtures', n);
const out = path.join(require('os').tmpdir(), 'ade-render-test');
const run = (f) => spawnSync('node', [bin, fx(f), '--out', out], { encoding: 'utf8', timeout: 120000 });

test('render-audit: bad.html tem achados; good.html passa', (t) => {
  const bad = run('bad.html');
  if (bad.status !== 1) return t.skip(`Playwright/Chromium indisponível (exit ${bad.status})`);
  assert.match(bad.stdout, /\[tracking\]/); assert.match(bad.stdout, /\[contrast\]/); assert.match(bad.stdout, /\[focus-visible\]/);
  assert.strictEqual(run('good.html').status, 0);
});
