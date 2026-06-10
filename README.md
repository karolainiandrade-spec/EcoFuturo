# 🌱 EcoFuturo

> **Semear o presente, colher o futuro.**  
> Site institucional moderno, responsivo e acessível — construído com HTML, CSS e JavaScript puros.

---

## 📋 Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Preview](#preview)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Como usar](#como-usar)
- [Design System](#design-system)
- [Acessibilidade](#acessibilidade)
- [Performance](#performance)
- [Licença](#licença)

---

## Sobre o projeto

O **EcoFuturo** é um site institucional focado em sustentabilidade, criado como exemplo de boas práticas de desenvolvimento front-end em 2026. O projeto não utiliza nenhum framework ou biblioteca externa — apenas **HTML semântico**, **CSS moderno** e **JavaScript vanilla**.

O objetivo é demonstrar que é possível construir interfaces elegantes, responsivas e acessíveis sem dependências externas, com código limpo, comentado e fácil de manter.

---

## Preview

```
┌─────────────────────────────────────────┐
│  EcoFuturo    Início Projetos Impacto   │  ← Header sticky
├─────────────────────────────────────────┤
│                                         │
│  Sustentabilidade em ação               │
│  O futuro que                           │  ← Hero com troca
│  plantamos hoje        🌿              │     de tema
│                                         │
│  [ Mudar atmosfera ]  Ver projetos →    │
├─────────────────────────────────────────┤
│  🌱 Hortas   ☀️ Energia   ♻️ Reciclagem │  ← Cards
├─────────────────────────────────────────┤
│   3.200      48       120      15       │  ← Contadores
│  Famílias  Projetos   CO₂   Cidades     │     animados
├─────────────────────────────────────────┤
│  EcoFuturo  |  Contato  |  Redes       │  ← Footer
└─────────────────────────────────────────┘
```

---

## Funcionalidades

- **Hero interativo** — botão que alterna entre 5 temas de cor com transição suave (floresta, oceano, aurora, terra)
- **Cards de projetos** — 3 iniciativas sustentáveis com hover animado e borda colorida temática
- **Contadores animados** — números da seção de impacto animam com easing suave ao entrar na tela (Intersection Observer + requestAnimationFrame)
- **Menu hamburguer** — navegação colapsável em mobile com suporte a teclado e tecla `Escape`
- **Nav ativa** — link do menu destacado automaticamente conforme a seção visível
- **Responsividade** — layout adaptado para desktop, tablet (900px) e mobile (600px)

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** semântico | Estrutura e acessibilidade |
| **CSS3** moderno | Custom Properties, `clamp()`, Grid, Flexbox, `backdrop-filter` |
| **JavaScript ES2022** | Intersection Observer, `requestAnimationFrame`, módulos IIFE |
| **Google Fonts** | `DM Serif Display` + `Inter` (única dependência externa) |

> Nenhum framework, nenhuma biblioteca JS, nenhum pré-processador CSS.

---

## Estrutura de arquivos

```
ecofuturo/
├── index.html      # Estrutura semântica completa (HTML5)
├── style.css       # Tokens de design, reset, componentes e responsividade
├── script.js       # Interatividade: menu, temas, contadores, nav ativa
└── README.md       # Este arquivo
```

### `index.html`
Contém toda a marcação semântica do site:
- `<header>` com nav e botão hamburguer
- `<main>` com seções hero, projetos e impacto
- `<footer>` com contato e redes sociais
- Atributos ARIA em todos os elementos interativos

### `style.css`
Organizado em camadas bem definidas:
1. **Tokens** — Custom Properties para cores, tipografia e espaçamentos
2. **Reset** — normalização cross-browser mínima e cirúrgica
3. **Layout** — container centralizado com padding fluido
4. **Componentes** — header, botões, cards, contadores, footer
5. **Temas** — 5 variações do hero via `[data-tema]`
6. **Responsividade** — 2 breakpoints (`@media` em 900px e 600px)

### `script.js`
4 módulos IIFE independentes:
1. **Menu mobile** — abre/fecha com ARIA e suporte a `Escape`
2. **Troca de tema** — cicla entre 5 temas no hero
3. **Contadores** — anima valores com Intersection Observer
4. **Nav ativa** — destaca link da seção visível

---

## Como usar

### Opção 1 — Abrir direto no navegador

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ecofuturo.git

# Entre na pasta
cd ecofuturo

# Abra o arquivo
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Opção 2 — Servidor local (recomendado)

Com Python (já vem instalado na maioria dos sistemas):

```bash
# Python 3
python -m http.server 3000

# Acesse no navegador:
# http://localhost:3000
```

Com Node.js:

```bash
npx serve .
```

Com VS Code: instale a extensão **Live Server** e clique em "Go Live".

---

## Design System

### Paleta de cores

| Nome | Hex | Uso |
|---|---|---|
| `--cor-fundo` | `#F0F2EF` | Background principal |
| `--cor-superficie` | `#FFFFFF` | Cards e seções elevadas |
| `--cor-primaria` | `#2D4A3E` | Verde-musgo — cor dominante |
| `--cor-acento` | `#C8973A` | Dourado-terra — destaques |
| `--cor-verde-medio` | `#5A8A74` | Eyebrows e elementos secundários |
| `--cor-texto` | `#1C2820` | Texto principal |
| `--cor-texto-suave` | `#5A6860` | Texto secundário |

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display | `DM Serif Display` | Títulos e hero |
| Corpo | `Inter` | Parágrafos e UI |

Escala tipográfica fluida com `clamp()` — nenhum breakpoint necessário para texto.

### Temas do Hero

| `data-tema` | Cor |
|---|---|
| `padrao` | `#2D4A3E` Verde-musgo |
| `floresta` | `#1E3A2F` Verde-escuro |
| `oceano` | `#1A3550` Azul-profundo |
| `aurora` | `#3B2A4A` Violeta |
| `terra` | `#4A2E1A` Marrom |

---

## Acessibilidade

O projeto segue as diretrizes **WCAG 2.2** (nível AA):

- ✅ Todos os elementos interativos têm `aria-label` ou texto descritivo
- ✅ Estados de foco visíveis em todos os controles (`:focus-visible`)
- ✅ Menu mobile com `aria-expanded` e `aria-controls`
- ✅ `aria-current="page"` no link de nav da seção ativa
- ✅ `aria-live="polite"` no botão de tema (anuncia mudanças)
- ✅ `aria-hidden="true"` em ícones e elementos decorativos
- ✅ `prefers-reduced-motion` respeita preferência do sistema
- ✅ Contraste de cores adequado (mínimo 4.5:1)
- ✅ Navegação 100% funcional por teclado

---

## Performance

Técnicas aplicadas para carregamento rápido:

- **Zero dependências JS** — sem jQuery, sem frameworks
- **Fontes com `preconnect`** — reduz latência de DNS
- **`font-display: swap`** — evita texto invisível durante carregamento
- **CSS com `clamp()`** — elimina breakpoints desnecessários
- **Intersection Observer** — substitui `scroll` events (sem jank)
- **`requestAnimationFrame`** — animações na thread correta
- **`backdrop-filter`** no header sticky com hardware acceleration
- **SVG inline** — sem requisição HTTP adicional para a ilustração do hero

---

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 🌱 e CSS puro
</p>
