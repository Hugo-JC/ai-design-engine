# Router de Referências Local-First

Use `local-presets.json` como catálogo de referência offline. Os presets descrevem princípios de composição e pistas de pesquisa, não réplicas de sites, textos, assets ou sistemas proprietários. Consulte também `layout-archetypes.md`, `personality-extractor.md`, `curated-references.md` e `02-styles-and-tokens/design-styles.json` quando estiverem disponíveis localmente.

## Encaminhamento determinístico (v3: executável)

O algoritmo está implementado em `tools/route.js`; `node tools/route.js "<pedido>" --context` devolve o resultado, o brief e o pacote de contexto. O texto abaixo é a especificação que o código cumpre (e que os testes em `tests/route.test.js` verificam).

1. Identifique o **nicho principal**: o produto, serviço, público ou atividade que a página representa. Adjetivos de tom (“premium”, “moderno”, “agressivo”) não são nicho (lista em `non_niche_terms`).
2. **Normalização:** minúsculas, sem acentos, pontuação → espaço. A comparação é por **palavra/expressão inteira** (nunca por substring: “bar” não casa com “barato”) e tolera plural regular (`+s`, `+es`).
3. **Seleção do preset:** vence a expressão coincidente **mais específica** (mais caracteres normalizados); empate → o primeiro preset do array. Exemplo: “clínica de saúde” → `clinic-healthcare` (“clinica”, 7) e não `wellness-health-beauty` (“saude”, 5).
4. **Variante:** só se uma expressão de `when_any` estiver no pedido; havendo várias, a primeira listada.
5. **Sem preset:** pontuar as `keywords` de `design-styles.json` (ignorando `non_niche_terms`). Melhor pontuação (>0) decide; empate → ordem do catálogo; pontuação 0 → `fallback`. O caminho (`preset`, `keywords` ou `fallback`) e a razão ficam no brief. *(Isto resolve a contradição da v2, em que o router mandava para o fallback e o extrator mandava escolher por parecer.)*
6. **Tom:** ajusta só a intensidade (ver `personality-extractor.md`); nunca troca o nicho.
7. Use apenas IDs de padrão de `layout-archetypes.md`. Escolha a estrutura que o conteúdo real suporta (H5 exige um produto reconhecível); `hero_alternatives` lista outras opções válidas para o nicho. Registe `style_id`, arquétipo de hero e justificação no DESIGN BRIEF.
8. Aplique `principles` e `pattern_cues` como abstrações. Use `sources[].url` para estudar princípios públicos, nunca para copiar layouts, imagens, textos, identidade ou componentes proprietários.

## MCP e pesquisa externa

O catálogo local é suficiente para uma primeira decisão e deve ser o caminho padrão. Não faça pesquisas externas só para confirmar o nicho, selecionar um estilo já mapeado ou preencher referências genéricas. Use uma fonte MCP externa apenas quando estiver disponível, autorizada e realmente útil para uma necessidade concreta não respondida localmente, como verificar um padrão público atual ou localizar documentação específica. Limite a pesquisa a essa questão; se o acesso falhar, não estiver autorizado ou não acrescentar valor, continue com o catálogo local sem bloquear o trabalho.

Uma pesquisa externa pode acrescentar uma URL ou uma pista de padrão, mas não altera a regra de seleção: nicho principal, variante explicitamente pedida, tokens locais e padrões válidos determinam o resultado. Informe no brief quando a decisão foi inteiramente local ou quando uma consulta externa útil a complementou.
