const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealEls = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const setActiveLink = () => {
  let currentId = 'home';

  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      currentId = section.id;
    }
  });

  navAnchors.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach((el) => revealObserver.observe(el));

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formSuccess.style.display = 'block';
  contactForm.reset();
});
