/* ============================================
   RANTEL — script.js
   Animations, Cursor, Scroll Effects
   ============================================ */

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor expand on interactive elements
document.querySelectorAll('a, button, .dest-card, .spec, .info-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursorFollower.style.width  = '50px';
    cursorFollower.style.height = '50px';
    cursorFollower.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    cursorFollower.style.width  = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.borderColor = 'var(--accent1)';
  });
});

/* ---- Navbar Scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Scroll Reveal (Intersection Observer) ---- */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay * 1000);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.05}s`;
  revealObserver.observe(el);
});

/* ---- Hero Text Line Reveal ---- */
document.querySelectorAll('.hero-title .line').forEach((line, i) => {
  const text = line.textContent;
  const hasClass = line.classList.contains('gradient-text');
  const inner = document.createElement('span');
  inner.textContent = text;
  inner.style.setProperty('--i', i);
  line.textContent = '';
  if (hasClass) inner.classList.add('gradient-text');
  line.appendChild(inner);
  // If gradient-text was on line, re-apply to inner span
  if (hasClass) line.classList.remove('gradient-text');
});

/* ---- Particle Generator ---- */
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#6c63ff', '#00d4ff', '#ff6b35', '#f5c842'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 20}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 10 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ---- Parallax on Scroll ---- */
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroImg) {
    heroImg.style.transform = `scale(1.1) translateY(${scrollY * 0.25}px)`;
  }
  // Cars section big text parallax
  const bgText = document.querySelector('.cars-bg-text');
  if (bgText) {
    const rect = bgText.parentElement.getBoundingClientRect();
    bgText.style.transform = `translate(-50%, calc(-50% + ${rect.top * 0.1}px))`;
  }
});

/* ---- Counter Animation ---- */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const isFloat = target % 1 !== 0;
  const formatted = typeof target === 'string';
  const duration = 1500;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = (isFloat ? start.toFixed(1) : Math.floor(start)).toLocaleString() + suffix;
  }, stepTime);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      if (text === '500+') animateCounter(el, 500, '+');
      else if (text === '3') animateCounter(el, 3);
      else if (text === '₹0') { el.textContent = '₹0'; }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

/* ---- Tilt Effect on Vehicle Cards ---- */
document.querySelectorAll('.feature-img-wrap').forEach(wrap => {
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    wrap.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    wrap.style.transition = 'transform 0.5s ease';
  });
  wrap.addEventListener('mouseenter', () => {
    wrap.style.transition = 'transform 0.1s ease';
  });
});

/* ---- Destination Card Tilt ---- */
document.querySelectorAll('.dest-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-10px) scale(1.02) perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.4s';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

/* ---- Smooth Section Entrance ---- */
document.querySelectorAll('.stat-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

/* ---- Contact Form Submit → WhatsApp ---- */
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const btn = document.getElementById('submit-btn');

  const name        = document.getElementById('name').value.trim();
  const phone       = document.getElementById('phone').value.trim();
  const vehicleEl   = document.getElementById('vehicle');
  const vehicleText = vehicleEl.options[vehicleEl.selectedIndex].text;
  const pickup      = document.getElementById('pickup').value;

  const message =
    `🏍 *New Booking – Patel Tour And Travel*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `🚗 *Vehicle:* ${vehicleText}\n` +
    `📅 *Pickup Date:* ${pickup}\n\n` +
    `📍 Sahastradhara Road, Near IT Park, Dehradun`;

  const encoded = encodeURIComponent(message);
  const waURL   = `https://wa.me/919899204769?text=${encoded}`;

  btn.innerHTML = '<span>Opening WhatsApp...</span>';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('show');
    window.open(waURL, '_blank');
  }, 800);
}

/* ---- Spec tags staggered reveal ---- */
document.querySelectorAll('.feature-specs').forEach(specs => {
  const items = specs.querySelectorAll('.spec');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${0.1 + i * 0.08}s`;
  });
});

/* ---- Scroll Progress Line ---- */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: 0%;
  background: linear-gradient(90deg, #6c63ff, #00d4ff);
  z-index: 9999;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

/* ---- Stagger Destination Cards ---- */
document.querySelectorAll('.dest-card').forEach((card, i) => {
  card.setAttribute('data-reveal', '');
  card.dataset.delay = i * 0.1;
  revealObserver.observe(card);
});

/* ---- Info Cards stagger ---- */
document.querySelectorAll('.info-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

console.log('%c🏍 Patel Tour And Travel – Ride Dehradun!', 'color: #6c63ff; font-size: 20px; font-weight: bold;');
console.log('%cExplore Uttarakhand in style.', 'color: #00d4ff; font-size: 13px;');

/* Stagger service cards reveal */
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
  revealObserver.observe(card);
});

/* Stagger service cards reveal */
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
  revealObserver.observe(card);
});
