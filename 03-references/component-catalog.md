# Catálogo de Componentes: Padrão Slop vs. Padrão Elite

Este guia mostra como transformar código genérico gerado por IA em interfaces modernas e de alta conversão.

---

## 1. Card de Recurso / Feature Card

### ❌ Antes (AI Slop - Errado)
- Card sufocado, sem espaçamento interno correto.
- Borda e sombra excessivamente pesadas.
- Falta de hierarquia entre título e texto.
- Divisor horizontal inútil (`<hr>`).

```html
<!-- ERRADO: Design poluído e apertado -->
<div class="bg-black border border-gray-500 p-2 shadow-2xl rounded-none">
  <h3 class="text-white text-lg font-bold">Automação Rápida</h3>
  <hr class="my-2">
  <p class="text-gray-300 text-base">Nossa ferramenta automatiza seus processos de forma rápida e eficiente para sua empresa crescer.</p>
  <button class="bg-purple-600 text-white p-2 w-full mt-2 rounded-none">Saiba Mais</button>
</div>

<!-- CORRETO: Design elegante, legível e moderno -->
<div class="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl flex flex-col gap-4 hover:border-white/20 transition-all">
  <div class="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-teal-300">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
  </div>
  
  <div class="space-y-1">
    <h3 class="text-white text-lg font-semibold tracking-tight">Automação Rápida</h3>
    <p class="text-zinc-400 text-sm leading-relaxed">Nossa ferramenta otimiza seus fluxos de trabalho com precisão e sem complicação.</p>
  </div>

  <button class="w-full mt-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl border border-white/5 transition-colors focus:ring-2 focus:ring-teal-400/50 outline-none">
    Saiba mais
  </button>
</div>
```

---

## 2. Título de Hero + Lista de Factos

Problemas reais encontrados em testes: letras coladas no título, linha divisória acima dos bullets e quebra desigual da lista.

### ❌ Antes (AI Slop - Errado)
```html
<!-- ERRADO: tracking exagerado, divisor disfarçado, flex-wrap com quebra irregular, headline descritiva -->
<h1 class="text-7xl font-semibold tracking-tighter">Café orgânico, torrado devagar para a sua manhã.</h1>
<ul class="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 mt-10 text-sm text-zinc-400">
  <li>Cultivo orgânico</li>
  <li>Torra artesanal em pequenos lotes</li>
  <li>Enviado em 48 horas</li>
</ul>
```

### ✅ Depois (Elite - Correto)
```html
<!-- CORRETO: tracking controlado, text-balance, grid sem divisor, headline sensorial -->
<h1 class="text-5xl md:text-6xl font-semibold tracking-[-0.01em] leading-[1.05] text-balance text-stone-50">
  O café que sabe a <em class="italic text-amber-400">manhã devagar</em>.
</h1>

<ul class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-stone-400">
  <li class="flex flex-col gap-1">
    <span class="text-stone-50 font-medium">Cultivo orgânico</span>
    <span>Certificado, de pequenos produtores</span>
  </li>
  <li class="flex flex-col gap-1">
    <span class="text-stone-50 font-medium">Torra em pequenos lotes</span>
    <span>À mão, todas as semanas</span>
  </li>
  <li class="flex flex-col gap-1">
    <span class="text-stone-50 font-medium">Enviado em 48&nbsp;h</span>
    <span>Fresco, na sua porta</span>
  </li>
</ul>
```

---

## 3. Cards Flutuantes sobre Ilustração

### ❌ Antes (AI Slop - Errado)
```html
<!-- ERRADO: card cobre o corpo do objeto, valor e unidade partem em linhas diferentes -->
<div class="relative">
  <img src="/chavena.svg" alt="" class="w-full">
  <div class="absolute left-0 top-1/2 w-48 rounded-xl bg-stone-800 p-4">
    <p class="font-semibold">Serra da Mantiqueira, 1.200 m</p>
  </div>
</div>
```

### ✅ Depois (Elite - Correto)
```html
<!-- CORRETO: card ancorado à margem (sobreposição ≤ 20%), unidade ligada ao número -->
<div class="relative">
  <img src="/chavena.svg" alt="Chávena de café com vapor" class="w-full">
  <div class="absolute -left-4 bottom-8 w-56 rounded-2xl bg-stone-800/90 p-4 backdrop-blur flex flex-col gap-1">
    <span class="text-[11px] uppercase tracking-[0.12em] text-stone-400">Origem do lote</span>
    <p class="font-semibold text-stone-50 text-balance">Serra da Mantiqueira, 1.200&nbsp;m</p>
    <p class="text-sm text-stone-400">Colheita manual · Processo lavado</p>
  </div>
</div>
```
