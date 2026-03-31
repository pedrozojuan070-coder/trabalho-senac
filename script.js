// ============================================================
//  SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger cards inside the section
        const cards = entry.target.querySelectorAll('.card, .inter-card');
        cards.forEach((card, idx) => {
          card.style.transitionDelay = `${idx * 80}ms`;
        });
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => observer.observe(el));

// ============================================================
//  BOTÃO "VER IMPORTÂNCIA"
// ============================================================
const btnImportancia = document.getElementById('btn-importancia');
const importanciaBox = document.getElementById('importancia-box');

btnImportancia.addEventListener('click', () => {
  const isVisible = importanciaBox.classList.contains('visible');
  if (isVisible) {
    importanciaBox.classList.remove('visible');
    btnImportancia.textContent = 'Ver Importância ↗';
  } else {
    importanciaBox.classList.add('visible');
    btnImportancia.textContent = 'Ocultar ↑';
  }
});

// ============================================================
//  HOVER NOS AUTORES — EASTER EGG SUTIL
// ============================================================
const authorJuan  = document.getElementById('author-juan');
const authorHigor = document.getElementById('author-higor');

const tips = {
  'author-juan':  'Desenvolvedor & Designer 🚀',
  'author-higor': 'Desenvolvedor & Criativo 🎨',
};

function showTip(el, id) {
  if (el.querySelector('.author-tip')) return;
  const tip = document.createElement('span');
  tip.className = 'author-tip';
  tip.textContent = tips[id];
  tip.style.cssText = `
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.1);
    color: #f0ede8;
    font-size: 11px;
    padding: 5px 12px;
    border-radius: 999px;
    white-space: nowrap;
    pointer-events: none;
    animation: fadeIn 0.2s ease;
  `;
  el.style.position = 'relative';
  el.appendChild(tip);
}

function removeTip(el) {
  const tip = el.querySelector('.author-tip');
  if (tip) tip.remove();
}

[authorJuan, authorHigor].forEach((el) => {
  el.addEventListener('mouseenter', () => showTip(el, el.id));
  el.addEventListener('mouseleave', () => removeTip(el));
});
