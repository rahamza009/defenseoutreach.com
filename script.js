/* ============================================================
   Defense Outreach — script.js
   ============================================================ */

/* ── Mobile nav ── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* ── Smooth scroll for anchor CTAs ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Animated stat counters ── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isDecimal = 'decimal' in el.dataset;
  const duration = 1800;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ── Segmentation bar animation ── */
const segObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.seg-bar').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      segObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.segment-visual').forEach(el => segObserver.observe(el));

/* ── IDEAS photo slider ── */
const ideasScroll = document.getElementById('ideasScroll');
const ideasPrev   = document.querySelector('.ideas-arrow-prev');
const ideasNext   = document.querySelector('.ideas-arrow-next');

if (ideasScroll && ideasPrev && ideasNext) {
  const scrollAmount = 500;
  ideasPrev.addEventListener('click', () => {
    ideasScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  ideasNext.addEventListener('click', () => {
    ideasScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* ── Newsletter form — proxied through /api/subscribe (keeps API key server-side) ── */
const signupForm = document.getElementById('signup-form');
const formMessage = document.getElementById('form-message');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name  = document.getElementById('sub-name').value.trim();
    const email = document.getElementById('sub-email').value.trim();
    const btn   = signupForm.querySelector('button[type="submit"]');

    if (!name || !email) return;

    btn.disabled = true;
    btn.textContent = 'Subscribing…';
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        formMessage.className = 'form-message success';
        formMessage.textContent = "You're in. First issue coming soon.";
        signupForm.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Something went wrong. Please try again or reach out on LinkedIn.';
      console.error('Subscribe error:', err);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Subscribe to Tidings';
    }
  });
}
