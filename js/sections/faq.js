// faq.js - lógica da seção FAQ

export function initFaq() {
  const faqCards = document.querySelectorAll('[data-faq]');
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      // Fecha todos os outros cards
      faqCards.forEach(c => {
        c.classList.remove('active');
        const q = c.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      // Toggle do card clicado
      if (!isActive) {
        card.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
// ===== FAQ ACCORDION =====
function initFAQ() {
  const faqCards = document.querySelectorAll('[data-faq]');
  
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');
    const answer = card.querySelector('.faq-answer');
    
    if (!question || !answer) return;
    
    question.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Fecha todos os outros cards
      faqCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
          const otherAnswer = otherCard.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.display = 'none';
        }
      });
      
      // Toggle do card clicado
      if (isActive) {
        card.classList.remove('active');
        answer.style.display = 'none';
      } else {
        card.classList.add('active');
        answer.style.display = 'block';
      }
    });
  });
}