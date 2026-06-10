/**
 * EcoFuturo — script.js
 * Interatividade pura com JavaScript vanilla (sem frameworks).
 *
 * Funcionalidades:
 *  1. Menu hamburguer mobile (abrir/fechar)
 *  2. Troca de tema da seção hero ao clicar no botão
 *  3. Animação de contadores na seção de impacto (Intersection Observer)
 *  4. Fechar menu ao clicar em um link de navegação (UX mobile)
 */

'use strict';

/* ----------------------------------------------------------
   UTILITÁRIOS
   ---------------------------------------------------------- */

/**
 * Atalho para querySelector — seleciona UM elemento.
 * @param {string} seletor - Seletor CSS
 * @param {Element} [base=document] - Elemento raiz da busca
 * @returns {Element|null}
 */
const $ = (seletor, base = document) => base.querySelector(seletor);

/**
 * Atalho para querySelectorAll — seleciona TODOS os elementos.
 * @param {string} seletor - Seletor CSS
 * @param {Element} [base=document] - Elemento raiz da busca
 * @returns {NodeList}
 */
const $$ = (seletor, base = document) => base.querySelectorAll(seletor);


/* ----------------------------------------------------------
   1. MENU HAMBURGUER MOBILE
   Alterna visibilidade do nav em telas pequenas.
   ---------------------------------------------------------- */
(function iniciarMenuMobile() {
  const botaoMenu = $('#navToggle');
  const navPrincipal = $('#mainNav');

  if (!botaoMenu || !navPrincipal) return;

  botaoMenu.addEventListener('click', () => {
    const estaAberto = botaoMenu.getAttribute('aria-expanded') === 'true';

    // Atualiza estado ARIA (acessibilidade)
    botaoMenu.setAttribute('aria-expanded', String(!estaAberto));

    // Alterna a classe visual no nav
    navPrincipal.classList.toggle('nav-aberta', !estaAberto);
  });

  // Fecha o menu ao clicar em qualquer link de navegação
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      botaoMenu.setAttribute('aria-expanded', 'false');
      navPrincipal.classList.remove('nav-aberta');
    });
  });

  // Fecha o menu ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navPrincipal.classList.contains('nav-aberta')) {
      botaoMenu.setAttribute('aria-expanded', 'false');
      navPrincipal.classList.remove('nav-aberta');
      botaoMenu.focus(); // Devolve foco ao botão (acessibilidade)
    }
  });
})();


/* ----------------------------------------------------------
   2. TROCA DE TEMA DO HERO
   Cada clique no botão "Mudar atmosfera" alterna o data-tema
   do elemento .hero, ativando diferentes variáveis CSS.
   ---------------------------------------------------------- */
(function iniciarTemaHero() {
  const botao = $('#btnTema');
  const secaoHero = $('.hero');

  if (!botao || !secaoHero) return;

  // Lista de temas disponíveis (mapeados no CSS via [data-tema])
  const temas = [
    { nome: 'floresta', rotulo: 'Floresta' },
    { nome: 'oceano',   rotulo: 'Oceano'   },
    { nome: 'aurora',   rotulo: 'Aurora'   },
    { nome: 'terra',    rotulo: 'Terra'    },
    { nome: 'padrao',   rotulo: 'Floresta' }, // Volta ao início
  ];

  let indiceAtual = 0;

  botao.addEventListener('click', () => {
    // Avança para o próximo tema na lista (circular)
    indiceAtual = (indiceAtual + 1) % temas.length;
    const tema = temas[indiceAtual];

    // Define o atributo data-tema no elemento hero
    // O CSS cuida da transição de cor via custom property
    secaoHero.setAttribute('data-tema', tema.nome);

    // Feedback visual no botão
    botao.textContent = `→ ${tema.rotulo}`;

    // Restaura texto original após 1,5s
    setTimeout(() => {
      botao.textContent = 'Mudar atmosfera';
    }, 1500);
  });
})();


/* ----------------------------------------------------------
   3. CONTADORES ANIMADOS (Intersection Observer)
   Os números na seção de impacto animam de 0 até o valor
   final quando a seção entra na área visível do viewport.
   Usa requestAnimationFrame para performance otimizada.
   ---------------------------------------------------------- */
(function iniciarContadores() {
  const elementosContador = $$('.numero-valor[data-target]');

  if (!elementosContador.length) return;

  /**
   * Anima um elemento de 0 até seu valor-alvo.
   * @param {Element} el - Elemento a animar
   * @param {number} duracao - Duração em milissegundos
   */
  function animarContador(el, duracao = 1800) {
    const valorFinal = parseInt(el.dataset.target, 10);
    const inicio = performance.now();

    function passo(agora) {
      const decorrido = agora - inicio;
      const progresso = Math.min(decorrido / duracao, 1);

      // Easing "ease-out-quart" para desaceleração suave
      const progressoSuave = 1 - Math.pow(1 - progresso, 4);
      const valorAtual = Math.round(progressoSuave * valorFinal);

      el.textContent = valorAtual.toLocaleString('pt-BR');

      if (progresso < 1) {
        requestAnimationFrame(passo);
      } else {
        // Garante que o valor final é exato
        el.textContent = valorFinal.toLocaleString('pt-BR');
      }
    }

    requestAnimationFrame(passo);
  }

  // Intersection Observer: dispara a animação quando o elemento
  // entra no viewport (threshold 30% visível)
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          // Para de observar após animar (evita re-animação ao rolar)
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  elementosContador.forEach(el => observador.observe(el));
})();


/* ----------------------------------------------------------
   4. DESTAQUE DO LINK DE NAV ATIVO
   Marca o link correspondente à seção visível no momento.
   Usa IntersectionObserver para performance (sem scroll events).
   ---------------------------------------------------------- */
(function iniciarNavAtiva() {
  const secoes = $$('section[id], footer[id]');
  const links   = $$('.nav-link');

  if (!secoes.length || !links.length) return;

  const mapaLinks = {};
  links.forEach(link => {
    // Extrai o hash do href (ex: "#projetos" → "projetos")
    const id = link.getAttribute('href').replace('#', '');
    mapaLinks[id] = link;
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(entrada => {
        const link = mapaLinks[entrada.target.id];
        if (!link) return;

        if (entrada.isIntersecting) {
          // Remove destaque de todos os links
          links.forEach(l => l.removeAttribute('aria-current'));
          // Destaca o link da seção visível
          link.setAttribute('aria-current', 'page');
        }
      });
    },
    {
      // Dispara quando 40% da seção está visível
      threshold: 0.4,
    }
  );

  secoes.forEach(secao => observador.observe(secao));
})();
