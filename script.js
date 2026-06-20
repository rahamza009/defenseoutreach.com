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
