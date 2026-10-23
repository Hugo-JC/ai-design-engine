# Router de Referências Local-First

Use `local-presets.json` como catálogo de referência offline. Os presets descrevem princípios de composição e pistas de pesquisa, não réplicas de sites, textos, assets ou sistemas proprietários. Consulte também `layout-archetypes.md`, `personality-extractor.md`, `curated-references.md` e `02-styles-and-tokens/design-styles.json` quando estiverem disponíveis localmente.

## Encaminhamento determinístico

1. Leia o pedido e identifique o **nicho principal**: o produto, serviço, público ou atividade que a página representa. Não trate adjetivos de tom (como “premium”, “moderno” ou “agressivo”) como nicho.
2. Normalize para minúsculas e ignore acentos; compare expressões do pedido com `match_terms`. Prefira a expressão coincidente mais específica. Se ainda houver empate, escolha o primeiro preset na ordem do JSON. Não escolha aleatoriamente.
3. Se nenhum preset corresponder, use `fallback`. Para um pedido sem nicho explícito, mantenha esse fallback e registe a razão no brief.
4. Use o `style_id` do preset. Aplique uma variante apenas quando uma das expressões em `when_any` estiver claramente no pedido; se várias variantes corresponderem, prevalece a primeira listada. Os IDs de estilo são chaves de `design-styles.json`; não invente IDs nem valores de tokens.
5. Use apenas IDs de padrão presentes em `layout-archetypes.md`. Escolha a estrutura que o conteúdo real suporta (por exemplo, H5 exige um produto reconhecível); adapte-a ao nicho, tom e acessibilidade. Registe `style_id`, arquétipo de hero e justificação no DESIGN BRIEF.
6. Aplique as pistas de `principles` e `pattern_cues` como abstrações. Use `sources[].url` para estudar princípios públicos — nunca copie layouts distintivos, imagens, textos, identidade ou componentes proprietários.

## MCP e pesquisa externa

O catálogo local é suficiente para uma primeira decisão e deve ser o caminho padrão. Não faça pesquisas externas só para confirmar o nicho, selecionar um estilo já mapeado ou preencher referências genéricas. Use uma fonte MCP externa apenas quando estiver disponível, autorizada e realmente útil para uma necessidade concreta não respondida localmente, como verificar um padrão público atual ou localizar documentação específica. Limite a pesquisa a essa questão; se o acesso falhar, não estiver autorizado ou não acrescentar valor, continue com o catálogo local sem bloquear o trabalho.

Uma pesquisa externa pode acrescentar uma URL ou uma pista de padrão, mas não altera a regra de seleção: nicho principal, variante explicitamente pedida, tokens locais e padrões válidos determinam o resultado. Informe no brief quando a decisão foi inteiramente local ou quando uma consulta externa útil a complementou.
