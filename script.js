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

/* ── Beehiiv newsletter form ──
   Replace the two constants below with your real values.
   PUBLICATION_ID: found in your Beehiiv dashboard URL (pub_xxxxxxxx)
   API_KEY:        Settings → API → Generate key
   ──────────────────────────────────────────────────────── */
const BEEHIIV_PUBLICATION_ID = 'PUBLICATION_ID';   // ← replace
const BEEHIIV_API_KEY         = 'YOUR_API_KEY';     // ← replace

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
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            name,
            reactivate_existing: true,
            send_welcome_email: true,
          }),
        }
      );

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
      console.error('Beehiiv error:', err);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Subscribe to Tidings';
    }
  });
}
