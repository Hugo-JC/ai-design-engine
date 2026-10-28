# Roadmap de qualidade — v4 alpha

O router e o validador determinístico ajudam na consistência; não provam que a interface é útil, acessível ou visualmente superior. O trabalho seguinte deve reduzir essa lacuna com avaliações reproduzíveis.

## Prioridade P0 — concluir a avaliação visual existente

Seguir o procedimento em [README.md](README.md) e usar a rubrica existente. Antes de comparar, fixar:
- mesma prompt e requisitos funcionais;
- mesmo modelo, versão, ferramentas e limite de tokens;
- mesmo viewport, conteúdo e condições de renderização;
- screenshots desktop (1440 px) e mobile (390 px);
- pares A/B com nomes aleatórios e avaliadores sem saber qual usou o engine.

Registar também falhas de execução e iterações, não apenas a melhor screenshot. Publicar amostra, limitações e resultados negativos. Não declarar vitória com menos de cinco pares.

## Prioridade P1 — expandir a rubrica

Manter a rubrica atual compatível e acrescentar critérios separados, cada um com evidência observável:

1. **Correspondência ao briefing:** nicho, público, idioma, conteúdo e tarefa principal corretos.
2. **Hierarquia e legibilidade:** ordem visual, comprimentos de linha, escala tipográfica e densidade.
3. **Identidade visual:** escolhas específicas ao produto; ausência de estética genérica sem motivo.
4. **Layout responsivo:** conteúdo e ações utilizáveis em mobile, sem overflow.
5. **Acessibilidade:** semântica, teclado, foco, contraste, labels e movimento reduzido.
6. **Interação e estados:** loading, vazio, erro, sucesso, disabled e feedback de ação.
7. **Conteúdo e confiança:** claims e dados reais separados de placeholders; sem métricas inventadas.
8. **Qualidade de implementação:** tokens, componentes reutilizáveis, código compreensível e ausência de erros.
9. **Performance:** peso de imagens, fontes, animações e custo de renderização.
10. **Originalidade contextual:** variação de composição e componentes de acordo com a tarefa, sem variação decorativa gratuita.

Usar escala com âncoras concretas (0 = ausente/prejudicial; 1 = parcial/inconsistente; 2 = claro e demonstrado). Cada pontuação deve citar uma área da screenshot, linha de código ou saída de teste. Se não houver evidência, marcar “não avaliado” em vez de presumir sucesso.

## Prioridade P1 — avaliações automáticas

- Executar `npm test`, `npm run lint` e `npm run agents:check` em CI para Node suportado.
- Adicionar casos de router para prompts ambíguos, conflitos de nicho, termos lusófonos e pedidos explícitos de marca/cores.
- Tratar o validador como análise estática: avisos heurísticos não equivalem a uma auditoria visual.
- Quando existir HTML executável, usar Playwright para screenshots desktop/mobile e verificação de consola/overflow.
- Integrar axe-core ou outra ferramenta de acessibilidade como sinal complementar; não declarar WCAG conforme apenas por passar um scanner.
- Testar movimento reduzido, navegação só por teclado, zoom e estados de formulário manualmente.

## Prioridade P2 — biblioteca de conhecimento

A biblioteca deve armazenar **notas originais**, metadados, links e resultados de testes, não dumps de livros ou transcrições. Consultar:
- [reading-list.md](../07-library/reading-list.md)
- [workflow de vídeos](../07-library/videos/README.md)

Para cada princípio importado: fonte → paráfrase própria → contexto → contraexemplo → heurística testável → caso de avaliação → decisão. Não promover tendências estéticas ou opiniões de um autor a regras universais.

## Métricas que valem a pena acompanhar

| Métrica | O que responde | Cuidado |
| --- | --- | --- |
| Diferença média A/B por critério | Em que dimensão o engine ajuda | Médias escondem regressões por nicho |
| Vitórias/empates/derrotas por par | Consistência da melhoria | Exige pares comparáveis e avaliação cega |
| Taxa de prompts com router incorreto | Qualidade do roteamento | O resultado esperado também pode estar errado |
| Avisos do validador por tipo | Problemas recorrentes de implementação | Menos avisos não significa melhor design |
| Falhas de acessibilidade encontradas | Barreiras observáveis | Scanner automático não cobre toda a experiência |
| Tempo e número de iterações | Custo de obter resultado aceitável | Não otimizar tempo à custa da qualidade |
| Resultados por nicho e viewport | Onde funciona ou falha | Reportar amostras pequenas e incerteza |

## Critério de conclusão

Uma melhoria só deve ser considerada confirmada quando:
1. os testes automáticos passam;
2. o caso novo cobre a mudança;
3. a comparação visual usa condições equivalentes;
4. as limitações e o que não foi testado ficam documentados.

Se a qualidade não melhorar, simplificar ou remover a regra em vez de acumular mais instruções.
