# Claude (Claude Code, Claude.ai, API)
- **Claude Code:** carrega `CLAUDE.md` da raiz (gerado de `agents/PROTOCOL.md`). Tem execução de código: cumpre o protocolo com os comandos reais.
- **Claude.ai (chat):** não lê o repo sozinho. Anexa o ficheiro gerado por `node tools/bundle.js "<pedido>"` (ADE-CONTEXT.md) ou cola `BOOTSTRAP.md` nas instruções do Projeto.
- Sem execução de código no chat: faz o brief à mão e, no fim, cita por regra a linha do código que a cumpre. Diz que não correste o validador.
- Estado: formato conhecido; confirmar na documentação atual do produto.
