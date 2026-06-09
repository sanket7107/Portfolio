const typingPhrases = [
  'AI models.',
  'Power BI dashboards.',
  'secure networks.',
  'data-driven solutions.',
  'actionable insights.'
];

const typingElement = document.getElementById('typing');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function updateTyping() {
  const currentPhrase = typingPhrases[phraseIndex];
  if (!isDeleting) {
    typingElement.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(updateTyping, 1500);
      return;
    }
  } else {
    typingElement.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    }
  }
  setTimeout(updateTyping, isDeleting ? 80 : 120);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.body.classList.toggle('dark-theme', theme === 'dark');
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      document.body.classList.toggle('dark-theme', nextTheme === 'dark');
      themeToggle.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('site-theme', nextTheme);
    });
  }
  localStorage.setItem('site-theme', theme);
}

function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        card.style.display = filter === 'all' || category === filter ? 'grid' : 'none';
      });
    });
  });
}

function initializeWhatsappContact() {
  const form = document.getElementById('contact-form');
  const sendButton = document.getElementById('whatsapp-send');
  const formMessage = document.getElementById('form-message');

  if (!form || !sendButton || !formMessage) return;

  sendButton.addEventListener('click', () => {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Please enter your name, email, and message before sending.';
      formMessage.style.color = 'var(--primary-strong)';
      return;
    }

    const encodedText = encodeURIComponent(
      `Hello Sanket, my name is ${name}.\n\nEmail: ${email}\n\nMessage: ${message}`
    );
    const whatsappUrl = `https://wa.me/917770042101?text=${encodedText}`;

    formMessage.textContent = 'Opening WhatsApp chat...';
    formMessage.style.color = 'var(--accent)';
    window.open(whatsappUrl, '_blank');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeFilters();
  initializeWhatsappContact();
  updateTyping();
});
