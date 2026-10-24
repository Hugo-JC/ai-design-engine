# AGENTS.md — AI Design Engine v3

Ao gerar UI, páginas ou layouts de frontend:

1. Leia `CORE.md` (1 página). Não carregue o repo inteiro.
2. Execute `node tools/route.js "<pedido do utilizador>" --context --refs` e use o resultado como base do DESIGN BRIEF, tokens e referências (máx. 3).
3. Implemente. Pedido explícito do utilizador > tokens do estilo.
4. Valide com `node tools/validate-design.js <ficheiro> --style <style_id>` e confirme o resultado renderizado. O validador é estático e heurístico.
5. Entregue com o brief e diga o que não foi verificado.

Mais contexto: `README.md`. Integridade do repo: `node tools/lint-repo.js`. Testes: `npm test`.
