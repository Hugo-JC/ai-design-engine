# Diretrizes de Design para reduzir AI Slop

Este documento reúne regras de composição, hierarquia visual, tipografia e consistência para criar interfaces muito melhor do que “templates bonitos”. O foco é impedir que a IA gere páginas genéricas, repetitivas e sem identidade de marca.

Estas regras não substituem os requisitos do produto: servem como guardrail para o desenho. Quando houver conflito entre uma regra decorativa e uma necessidade funcional real, a funcionalidade ganha, mas a solução visual deve continuar alinhada com o nicho e a identidade.

---

## 1. O princípio central: decidir antes de desenhar

- Antes de qualquer código, escrever um **DESIGN BRIEF** com nicho, público, tom, estilo, tipografia, layout e riscos de genérico.
- O `style_id` precisa de ser escolhido deliberadamente a partir do nicho e do prompt. Não improvisar, não sortear.
- Uma página só pode ter uma identidade visual dominante. Se a IA mistura 3 estilos ao mesmo tempo, perde clareza e parece gerada.
- O melhor design é aquele em que cada elemento serve uma intenção: mostrar valor, orientar ação, reforçar zona de confiança ou dar ritmo visual.

## 2. Tipografia e escala modular

- Use uma escala de texto clara: H1, H2, H3, corpo, legenda e microcopy com diferença real de peso e proporção.
- H1: `2.5rem` a `3.5rem`, peso forte, contraste alto e line-height próximo de `1.1`.
- H2: `1.75rem` a `2.25rem`, sem excesso de estilo em vez de escala.
- Corpo: `1rem`, line-height `1.5` a `1.6`.
- Legenda: `0.875rem`, line-height `1.4`.
- A hierarquia deve ser criada por combinação de tamanho, peso, contraste e espaçamento, não só por cor.
- Em títulos, mantenha `letter-spacing` entre `-0.02em` e `0em`. Evite tracking apertado ou excesso de serrilhado visual.
- Títulos com texto longo devem usar `text-wrap: balance` / `text-balance` para evitar quebras feias.

## 3. Espaçamento e respiro (grid de 8px)

- Todos os valores de `padding`, `margin` e `gap` devem ser múltiplos de 8px: `8, 16, 24, 32, 48, 64, 96, 128`.
- Evite micro-ajustes fora do grid; só use-os quando uma necessidade funcional ou de acessibilidade os justificar.
- Divisões entre secções devem ser feitas por respiro, mudança de fundo ou escala, não por linhas inventadas.
- Não use `---`,`<hr>`, `border-top` solto ou `h-px` como “lixívia visual”.

## 4. Botões, raios e hierarquia de ação

- Botões com borda quadrada sem propósito são um sinal clássico de AI Slop.
- Use rádio harmonioso com o estilo: `6px`, `8px`, `12px` ou `9999px` para pills.
- O valor `0px` só é aceitável em estética deliberada e explícita de neo-brutalismo.
- A ação principal deve ser a mais clara e o botão deve ter uma escala de visual hierarchy reconhecível.
- Secondary e ghost devem ser visivelmente menos dominantes.
- Estado hover e focus são obrigatórios em elementos interativos.

## 5. Cor e contraste: disciplina, não excesso

- A cor de destaque não deve “pintar a página”. Use-a apenas para ação, estado ativo, badge de destaque, ou um único gesto tipográfico.
- Regra do 60-30-10 para composição geral: 60% fundo, 30% estrutura e 10% accent.
- O texto deve respeitar contraste mínimo WCAG AA: 4.5:1 para texto normal e 3:1 para títulos grandes.
- Não use roxo/neon genérico como “default”. Só use se o nicho e o estilo o exigirem.
- O comportamento da paleta deve ser funcional e emocional: reforçar identidade, não apenas “parecer moderno”.

## 6. Layout e arquitetura de informação

- Escolher um arquétipo de hero e secções em vez de repetir um layout estático por defeito.
- O split “texto à esquerda + imagem à direita” não deve ser automático.
- Hero, grids, cards e lista de prova social devem ter ritmo real e não parecer montados por bloco JSON.
- Máximo de 2 elementos flutuantes por hero. Nunca cobrir o objeto principal da ilustração.
- Se a visualização principal não é reconhecível, não force a ilustração: escolha um vetor reconhecível ou uma fotografia contextual.

## 7. Divisores disfarçados contam como divisores

- `border-t`, `border-b`, `divide-y`, `border-top`, `h-px` usados como separadores entre blocos são tratados como linhas horizontais.
- Bordas internas em cards, inputs e botões continuam permitidas.
- O compromisso visual da página deve ser “um bloco que respira”, não “linhas para preencher espaço”.

## 8. Copy e texto de marca

- Evite frases vazias como “inovação para o futuro” ou “a plataforma que muda a forma como você trabalha”.
- A cópia deve ser específica do nicho: sabor, processo, prova, contexto, uso real, tom de marca.
- Um bom headline faz sentido e sensação. “Café torrado lentamente em pequenas lotes” é melhor do que “a melhor experiência de café”.
- Não misture mais de uma ideia principal em um título. O destaque visual deve reforçar uma mensagem, não cinco.
- Quando houver unidade de medida, ligue número e unidade com espaço não separável (`1.200&nbsp;m`, `72&nbsp;h`).

## 9. Regras de acabamento e consistência

- Decisões de estilo (style_id, modo, tipografia, hero e referências) devem ser fixadas no DESIGN BRIEF e seguidas até ao fim.
- A página deve parecer que saiu de uma direção visual definida, não de várias tentativas de IA no mesmo canvas.
- O raio, a cor, o contraste, o grid e a hierarquia precisam ser coerentes entre hero, cards, CTA e secções.
- Quando houver divergência, prefira consistência visual em vez de improviso local.

## 10. Checklist de qualidade antes de entregar

Antes de fechar a interface, confirme:

- [ ] Escolhi um `style_id` e um nicho coerentes.
- [ ] Evitei linhas artificiais, divisores e `---`.
- [ ] O grid e o espaçamento respeitam o sistema de 8px.
- [ ] O CTA principal está claro e os botões têm contraste e hover/focus.
- [ ] O texto e a imagem comunicam uma ideia real do produto.
- [ ] A paleta está sob controle e a cor de destaque não domina a página.
- [ ] O hero usa um arquétipo apropriado e não o split genérico por defeito.
- [ ] A interface tem identidade, não parece um template universal.

## 11. Resumo prático

Se uma página parecesse boa no primeiro olhar, mas não tem identidade, a IA provavelmente criou um “template neutro”. Para evitar isso, o design precisa de contexto, disciplina e decisão ativa. Não se escreve apenas código: escreve-se direção.
