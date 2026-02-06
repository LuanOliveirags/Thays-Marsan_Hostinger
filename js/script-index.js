/*
=========================================================
ETAPA 3 · INTERAÇÕES E SCRIPTS DO SITE
- Centraliza listeners e funções que sustentam animações e navegação.
- Mantém o comportamento original sem adicionar novas features.
=========================================================
*/
// ETAPA 2 · Dispara funcionalidades assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initMenuMobile();
  initSmoothScroll();
  initHeaderScroll();
  initActiveMenuOnScroll();
  initResultsCarousel();
  initHeroParallax();
  initVideoSwitch();
});

// ETAPA 1 · Esconde o preloader ao finalizar o carregamento
window.addEventListener('load', () => {
  const loader = document.getElementById('preloader');
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500);
});

// ETAPA 3.1 · Controla o menu mobile em telas reduzidas
function initMenuMobile() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
}

// ETAPA 3.2 · Habilita rolagem suave para links internos
function initSmoothScroll() {
  const header = document.querySelector('.header');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const targetSelector = anchor.getAttribute('href');
      if (!targetSelector) return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      event.preventDefault();
      const offset = target.offsetTop - (header ? header.offsetHeight : 0);

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });
  });
}

// ETAPA 3.3 · Alterna o estilo do cabeçalho ao rolar a página
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ETAPA 3.4 · Destaca o link ativo conforme a seção visível
function initActiveMenuOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const menuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  if (!sections.length || !menuLinks.length) return;

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    menuLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

// ETAPA 3.5 · Gerencia o carrossel de resultados
function initResultsCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const autoplayDelay = 5000;
  let autoRotate = totalSlides > 1 ? setInterval(() => goToSlide(currentSlide + 1), autoplayDelay) : null;

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  function resetAutoRotate() {
    if (!autoRotate) return;
    clearInterval(autoRotate);
    autoRotate = setInterval(() => goToSlide(currentSlide + 1), autoplayDelay);
  }

  function handleNext() {
    goToSlide(currentSlide + 1);
    resetAutoRotate();
  }

  function handlePrev() {
    goToSlide(currentSlide - 1);
    resetAutoRotate();
  }

  if (nextBtn) nextBtn.addEventListener('click', handleNext);
  if (prevBtn) prevBtn.addEventListener('click', handlePrev);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (index === currentSlide) return;
      goToSlide(index);
      resetAutoRotate();
    });
  });

  showSlide(currentSlide);
}

// ETAPA 3.6 · Aplica leve efeito parallax no hero
function initHeroParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = `${Math.max(0, 1 - scrolled / 600)}`;
  });
}

// ETAPA EXTRA · Destaca automaticamente o card de consultoria centralizado na tela
(function initConsultoriaFocusOnScroll() {
  const cards = document.querySelectorAll('.plan-card');
  if (!('IntersectionObserver' in window) || cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    let maxRatio = 0;
    let mostVisible = null;
    entries.forEach(entry => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        mostVisible = entry.target;
      }
    });
    cards.forEach(card => card.classList.remove('active'));
    if (mostVisible) mostVisible.classList.add('active');
  }, {
    threshold: Array.from({length: 11}, (_, i) => i / 10) // 0, 0.1, ..., 1
  });

  cards.forEach(card => observer.observe(card));
}());

// ETAPA EXTRA · Destaca automaticamente o card de processo centralizado na tela
(function initProcessCardFocusOnScroll() {
  const cards = document.querySelectorAll('.process-card');
  if (!('IntersectionObserver' in window) || cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    let maxRatio = 0;
    let mostVisible = null;
    entries.forEach(entry => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        mostVisible = entry.target;
      }
    });
    cards.forEach(card => card.classList.remove('active'));
    if (mostVisible) mostVisible.classList.add('active');
  }, {
    threshold: Array.from({length: 11}, (_, i) => i / 10) // 0, 0.1, ..., 1
  });

  cards.forEach(card => observer.observe(card));
}());

// Troca dinâmica dos vídeos na seção "Mito ou Verdade?"
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('mainVideo');
  const btns = document.querySelectorAll('.video-btn');
  if (!video || !btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('active')) return;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const src = btn.getAttribute('data-src');
      const source = video.querySelector('source');
      if (source) {
        source.setAttribute('src', src);
        video.load();
        video.play();
      }
    });
  });
});
