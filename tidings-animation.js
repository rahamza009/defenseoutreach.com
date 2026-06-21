/* ============================================================
   Defense Outreach — tidings-animation.js
   Tidings Demo: 7 scenes, ~38 seconds
   Scenes:
     1. Website popup / list signup        (0–5s)
     2. Subscriber segmentation            (5–11s)
     3. Newsletter template + send         (11–17s)
     4. Direct communication template      (17–22s)
     5. Engagement metrics dashboard       (22–29s)
     6. Network / long-term connections    (29–34s)
     7. End card CTA                       (34–40s)
   ============================================================ */

(function () {
  'use strict';

  /* ── Timing config (ms) ── */
  const TOTAL = 40000;
  const SCENES = [
    { label: 'List Building',    start:     0, end:  5000 },
    { label: 'Segmentation',     start:  5000, end: 11000 },
    { label: 'Newsletter',       start: 11000, end: 17000 },
    { label: 'Direct Comms',     start: 17000, end: 22000 },
    { label: 'Engagement',       start: 22000, end: 29000 },
    { label: 'Connections',      start: 29000, end: 34000 },
    { label: 'Get Tidings',      start: 34000, end: 40000 },
  ];

  /* ── Scene HTML builders ── */

  function scenePopup() {
    return `
      <div class="td-scene-inner td-popup-scene">
        <div class="td-browser">
          <div class="td-browser-bar">
            <span class="td-dot r"></span><span class="td-dot y"></span><span class="td-dot g"></span>
            <span class="td-url">www.defenseoutreach.com</span>
          </div>
          <div class="td-browser-body">
            <div class="td-bg-page">
              <div class="td-bg-line" style="width:60%;opacity:.15"></div>
              <div class="td-bg-line" style="width:40%;opacity:.1;margin-top:10px"></div>
              <div class="td-bg-line" style="width:70%;opacity:.08;margin-top:10px"></div>
            </div>
            <div class="td-popup" id="td-popup">
              <div class="td-popup-header">
                <span class="td-popup-logo">Defense Outreach</span>
                <span class="td-popup-tag">Join the Tidings List</span>
              </div>
              <p class="td-popup-sub">Communication insights for defense &amp; aerospace leaders.</p>
              <div class="td-popup-fields">
                <div class="td-input-wrap">
                  <span class="td-input-label">Full Name</span>
                  <div class="td-fake-input" id="td-name-input"><span class="td-cursor">|</span></div>
                </div>
                <div class="td-input-wrap">
                  <span class="td-input-label">Work Email</span>
                  <div class="td-fake-input" id="td-email-input"><span class="td-cursor">|</span></div>
                </div>
              </div>
              <button class="td-popup-btn" id="td-popup-btn">Subscribe to Tidings</button>
              <div class="td-popup-success" id="td-popup-success">
                <span class="td-success-check">✓</span> You're in. First issue coming soon.
              </div>
            </div>
          </div>
        </div>
        <div class="td-scene-caption">
          <strong>Step 1</strong> — Visitors subscribe directly from your website
        </div>
      </div>`;
  }

  function sceneSegmentation() {
    const subs = [
      { initials: 'RH', name: 'R. Hamza',       company: 'Defense Outreach',   tag: 'INDUSTRY',  color: '#f5c124' },
      { initials: 'MJ', name: 'M. Johnson',      company: 'Lockheed Partners',  tag: 'INDUSTRY',  color: '#f5c124' },
      { initials: 'SC', name: 'S. Chen',         company: 'Apex Systems',       tag: 'VENDOR',    color: '#6ee7b7' },
      { initials: 'AT', name: 'A. Torres',       company: 'Orbital Supplies',   tag: 'SUPPLIER',  color: '#93c5fd' },
      { initials: 'KW', name: 'K. Williams',     company: 'DefensePro LLC',     tag: 'VENDOR',    color: '#6ee7b7' },
      { initials: 'JP', name: 'J. Patterson',    company: 'General Public',     tag: 'PUBLIC',    color: '#d1d5db' },
    ];
    const rows = subs.map((s, i) => `
      <div class="td-sub-row td-sub-row--${i}" style="animation-delay:${i * 0.18}s">
        <div class="td-avatar" style="background:${s.color}22;color:${s.color};border:1px solid ${s.color}44">${s.initials}</div>
        <div class="td-sub-info">
          <span class="td-sub-name">${s.name}</span>
          <span class="td-sub-company">${s.company}</span>
        </div>
        <span class="td-tag" style="background:${s.color}18;color:${s.color};border:1px solid ${s.color}44">${s.tag}</span>
      </div>`).join('');

    return `
      <div class="td-scene-inner td-segment-scene">
        <div class="td-panel">
          <div class="td-panel-header">
            <span class="td-panel-title">Subscriber List</span>
            <span class="td-panel-count">1,247 contacts</span>
          </div>
          <div class="td-segment-legend">
            <span class="td-leg" style="color:#f5c124">● Industry</span>
            <span class="td-leg" style="color:#6ee7b7">● Vendors</span>
            <span class="td-leg" style="color:#93c5fd">● Suppliers</span>
            <span class="td-leg" style="color:#d1d5db">● Public</span>
          </div>
          <div class="td-sub-list">${rows}</div>
        </div>
        <div class="td-segment-arrow">
          <div class="td-arrow-label">Auto-segmented on signup</div>
          <div class="td-arrow-line"></div>
        </div>
        <div class="td-segment-tags">
          <div class="td-seg-box" style="border-color:#f5c12444;background:#f5c12408">
            <span class="td-seg-count" style="color:#f5c124">247</span>
            <span class="td-seg-label">Industry</span>
          </div>
          <div class="td-seg-box" style="border-color:#6ee7b744;background:#6ee7b708">
            <span class="td-seg-count" style="color:#6ee7b7">389</span>
            <span class="td-seg-label">Vendors</span>
          </div>
          <div class="td-seg-box" style="border-color:#93c5fd44;background:#93c5fd08">
            <span class="td-seg-count" style="color:#93c5fd">312</span>
            <span class="td-seg-label">Suppliers</span>
          </div>
          <div class="td-seg-box" style="border-color:#d1d5db44;background:#d1d5db08">
            <span class="td-seg-count" style="color:#d1d5db">299</span>
            <span class="td-seg-label">Public</span>
          </div>
        </div>
        <div class="td-scene-caption">
          <strong>Step 2</strong> — Every subscriber is automatically segmented
        </div>
      </div>`;
  }

  function sceneNewsletter() {
    return `
      <div class="td-scene-inner td-newsletter-scene">
        <div class="td-email-client">
          <div class="td-email-toolbar">
            <span class="td-toolbar-label">New Campaign</span>
            <span class="td-segment-select"><span style="color:#f5c124">●</span> Industry — 247 contacts</span>
          </div>
          <div class="td-template-preview">
            <div class="td-tpl-header">
              <span class="td-tpl-logo">Defense Outreach</span>
              <span class="td-tpl-issue">Partner Brief · June 2024</span>
            </div>
            <div class="td-tpl-body">
              <div class="td-tpl-heading">Program Update: Q3 Capability Expansion</div>
              <div class="td-tpl-line" style="width:100%"></div>
              <div class="td-tpl-line" style="width:88%"></div>
              <div class="td-tpl-line" style="width:75%"></div>
              <div class="td-tpl-cta">Read Full Brief →</div>
            </div>
            <div class="td-tpl-footer">Sent via Tidings · Unsubscribe</div>
          </div>
        </div>
        <div class="td-send-animation" id="td-send-anim">
          <div class="td-envelope td-env-1">✉</div>
          <div class="td-envelope td-env-2">✉</div>
          <div class="td-envelope td-env-3">✉</div>
          <div class="td-envelope td-env-4">✉</div>
        </div>
        <div class="td-send-status" id="td-send-status">
          <span class="td-status-icon">✓</span> Delivered to 247 industry contacts
        </div>
        <div class="td-scene-caption">
          <strong>Step 3</strong> — 2× monthly newsletters, fully written &amp; sent
        </div>
      </div>`;
  }

  function sceneDirect() {
    return `
      <div class="td-scene-inner td-direct-scene">
        <div class="td-urgent-badge" id="td-urgent">⚡ TIME-SENSITIVE</div>
        <div class="td-direct-card">
          <div class="td-direct-header">
            <span class="td-direct-from">From: Defense Outreach</span>
            <span class="td-direct-to">To: <span style="color:#6ee7b7">Vendor Segment — 389 contacts</span></span>
            <span class="td-direct-time">Drafted &amp; sent within 24 hours</span>
          </div>
          <div class="td-direct-body">
            <div class="td-direct-subject">SUBJECT: Program Schedule Update — Action Required</div>
            <div class="td-direct-text">
              <div class="td-tpl-line" style="width:95%"></div>
              <div class="td-tpl-line" style="width:88%"></div>
              <div class="td-tpl-line" style="width:70%"></div>
            </div>
            <div class="td-direct-sig">
              <div class="td-tpl-line" style="width:30%"></div>
              <div class="td-tpl-line" style="width:22%;margin-top:4px;opacity:.5"></div>
            </div>
          </div>
        </div>
        <div class="td-direct-sent" id="td-direct-sent">
          <span class="td-status-icon">✓</span> Sent to 389 vendor contacts · 2:47 PM
        </div>
        <div class="td-scene-caption">
          <strong>Step 4</strong> — Time-sensitive updates drafted &amp; deployed in 24 hrs
        </div>
      </div>`;
  }

  function sceneMetrics() {
    const metrics = [
      { label: 'Open Rate',      value: 68,   unit: '%',  color: '#f5c124', note: 'Industry avg: 21%' },
      { label: 'Click Rate',     value: 42,   unit: '%',  color: '#6ee7b7', note: 'Industry avg: 3%'  },
      { label: 'Reply Rate',     value: 12,   unit: '%',  color: '#93c5fd', note: 'Organic engagement' },
      { label: 'Deliverability', value: 99.2, unit: '%',  color: '#a78bfa', note: 'Platform-managed'  },
    ];
    const bars = metrics.map((m, i) => `
      <div class="td-metric-row">
        <div class="td-metric-label">${m.label}</div>
        <div class="td-metric-bar-wrap">
          <div class="td-metric-bar" id="td-bar-${i}" style="background:${m.color};width:0%"></div>
        </div>
        <div class="td-metric-value" id="td-val-${i}" style="color:${m.color}">0${m.unit}</div>
        <div class="td-metric-note">${m.note}</div>
      </div>`).join('');

    return `
      <div class="td-scene-inner td-metrics-scene">
        <div class="td-dashboard">
          <div class="td-dash-header">
            <span class="td-dash-title">Engagement Dashboard</span>
            <span class="td-dash-period">Last 30 days · All campaigns</span>
          </div>
          <div class="td-metrics-list" id="td-metrics-list">
            ${bars}
          </div>
          <div class="td-dash-footer">
            <span class="td-dash-stat"><span style="color:#f5c124">1,247</span> subscribers</span>
            <span class="td-dash-stat"><span style="color:#6ee7b7">8</span> campaigns sent</span>
            <span class="td-dash-stat"><span style="color:#93c5fd">0</span> unsubscribes</span>
          </div>
        </div>
        <div class="td-scene-caption">
          <strong>Step 5</strong> — Real signal on who's reading and engaging
        </div>
      </div>`;
  }

  function sceneNetwork() {
    return `
      <div class="td-scene-inner td-network-scene">
        <svg class="td-network-svg" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">
          <!-- Connection lines -->
          <line class="td-net-line" x1="250" y1="160" x2="130" y2="80"  stroke="#f5c124" stroke-width="1.5" stroke-dasharray="4 3" opacity="0"/>
          <line class="td-net-line" x1="250" y1="160" x2="370" y2="80"  stroke="#6ee7b7" stroke-width="1.5" stroke-dasharray="4 3" opacity="0"/>
          <line class="td-net-line" x1="250" y1="160" x2="100" y2="230" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="4 3" opacity="0"/>
          <line class="td-net-line" x1="250" y1="160" x2="400" y2="230" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4 3" opacity="0"/>
          <line class="td-net-line" x1="250" y1="160" x2="250" y2="295" stroke="#d1d5db" stroke-width="1.5" stroke-dasharray="4 3" opacity="0"/>
          <!-- Center node -->
          <circle cx="250" cy="160" r="36" fill="#220d38" stroke="#f5c124" stroke-width="2"/>
          <text x="250" y="155" text-anchor="middle" fill="#f5c124" font-size="9" font-weight="700" font-family="Inter,sans-serif">Defense</text>
          <text x="250" y="168" text-anchor="middle" fill="#f5c124" font-size="9" font-weight="700" font-family="Inter,sans-serif">Outreach</text>
          <!-- Satellite nodes -->
          <g class="td-net-node" opacity="0">
            <circle cx="130" cy="80" r="28" fill="#220d38" stroke="#f5c124" stroke-width="1.5"/>
            <text x="130" y="76" text-anchor="middle" fill="#f5c124" font-size="8" font-family="Inter,sans-serif">Industry</text>
            <text x="130" y="88" text-anchor="middle" fill="#f5c124" font-size="8" font-family="Inter,sans-serif">Partners</text>
          </g>
          <g class="td-net-node" opacity="0">
            <circle cx="370" cy="80" r="28" fill="#220d38" stroke="#6ee7b7" stroke-width="1.5"/>
            <text x="370" y="76" text-anchor="middle" fill="#6ee7b7" font-size="8" font-family="Inter,sans-serif">Vendors</text>
            <text x="370" y="88" text-anchor="middle" fill="#6ee7b7" font-size="8" font-family="Inter,sans-serif">247 contacts</text>
          </g>
          <g class="td-net-node" opacity="0">
            <circle cx="100" cy="230" r="28" fill="#220d38" stroke="#93c5fd" stroke-width="1.5"/>
            <text x="100" y="226" text-anchor="middle" fill="#93c5fd" font-size="8" font-family="Inter,sans-serif">Suppliers</text>
            <text x="100" y="238" text-anchor="middle" fill="#93c5fd" font-size="8" font-family="Inter,sans-serif">312 contacts</text>
          </g>
          <g class="td-net-node" opacity="0">
            <circle cx="400" cy="230" r="28" fill="#220d38" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="400" y="226" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="Inter,sans-serif">Customers</text>
            <text x="400" y="238" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="Inter,sans-serif">199 contacts</text>
          </g>
          <g class="td-net-node" opacity="0">
            <circle cx="250" cy="295" r="28" fill="#220d38" stroke="#d1d5db" stroke-width="1.5"/>
            <text x="250" y="291" text-anchor="middle" fill="#d1d5db" font-size="8" font-family="Inter,sans-serif">Public</text>
            <text x="250" y="303" text-anchor="middle" fill="#d1d5db" font-size="8" font-family="Inter,sans-serif">299 contacts</text>
          </g>
          <!-- Touchpoint badges -->
          <g class="td-net-badge" opacity="0">
            <rect x="162" y="100" width="68" height="18" rx="9" fill="#f5c12420" stroke="#f5c12440"/>
            <text x="196" y="113" text-anchor="middle" fill="#f5c124" font-size="7.5" font-family="Inter,sans-serif">12 mo · 24 sends</text>
          </g>
          <g class="td-net-badge" opacity="0">
            <rect x="295" y="100" width="60" height="18" rx="9" fill="#6ee7b720" stroke="#6ee7b740"/>
            <text x="325" y="113" text-anchor="middle" fill="#6ee7b7" font-size="7.5" font-family="Inter,sans-serif">8 mo · 16 sends</text>
          </g>
        </svg>
        <div class="td-network-stat">
          <span class="td-net-stat-val" id="td-net-count">0</span>
          <span class="td-net-stat-label">lasting relationships built</span>
        </div>
        <div class="td-scene-caption">
          <strong>Step 6</strong> — Every send deepens a relationship you own
        </div>
      </div>`;
  }

  function sceneEndCard() {
    return `
      <div class="td-scene-inner td-endcard-scene">
        <div class="td-endcard-content">
          <div class="td-end-line1" id="td-end-l1">Stop thinking.</div>
          <div class="td-end-line2" id="td-end-l2">Build your own communication channel.</div>
          <div class="td-end-divider" id="td-end-div"></div>
          <div class="td-end-line3" id="td-end-l3">
            Get <em>Tidings</em> from Defense Outreach
          </div>
          <a href="https://www.linkedin.com/in/rahamza009/" target="_blank" rel="noopener"
             class="td-end-cta" id="td-end-cta">
            Start Today — DM on LinkedIn
          </a>
        </div>
      </div>`;
  }

  /* ── Main controller ── */
  class TidingsDemo {
    constructor(el) {
      this.el       = el;
      this.elapsed  = 0;
      this.playing  = false;
      this.raf      = null;
      this.lastTs   = null;
      this.sceneIdx = -1;
      this.metricsAnimated = false;
      this.networkAnimated = false;

      this.render();
      this.bindEvents();
      this.watchIntersection();
    }

    render() {
      this.el.innerHTML = `
        <div class="td-screen">
          <div class="td-scene" id="td-scene-0">${scenePopup()}</div>
          <div class="td-scene" id="td-scene-1">${sceneSegmentation()}</div>
          <div class="td-scene" id="td-scene-2">${sceneNewsletter()}</div>
          <div class="td-scene" id="td-scene-3">${sceneDirect()}</div>
          <div class="td-scene" id="td-scene-4">${sceneMetrics()}</div>
          <div class="td-scene" id="td-scene-5">${sceneNetwork()}</div>
          <div class="td-scene" id="td-scene-6">${sceneEndCard()}</div>
        </div>
        <div class="td-controls">
          <button class="td-btn-play" id="td-btn-play">▶ Play Demo</button>
          <div class="td-progress-wrap">
            <div class="td-progress-fill" id="td-progress-fill"></div>
          </div>
          <div class="td-step-labels" id="td-step-labels">
            ${SCENES.map((s, i) => `<span class="td-step-label" data-idx="${i}">${s.label}</span>`).join('')}
          </div>
        </div>`;

      // Show first scene
      this.showScene(0);
    }

    bindEvents() {
      const btn = this.el.querySelector('#td-btn-play');
      btn.addEventListener('click', () => this.playing ? this.pause() : this.play());
    }

    watchIntersection() {
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !this.playing && this.elapsed === 0) {
          setTimeout(() => this.play(), 600);
        }
      }, { threshold: 0.4 });
      obs.observe(this.el);
    }

    play() {
      this.playing = true;
      this.el.querySelector('#td-btn-play').textContent = '⏸ Pause';
      if (this.elapsed >= TOTAL) { this.elapsed = 0; this.sceneIdx = -1; this.metricsAnimated = false; this.networkAnimated = false; }
      this.lastTs = null;
      this.raf = requestAnimationFrame(ts => this.tick(ts));
    }

    pause() {
      this.playing = false;
      this.el.querySelector('#td-btn-play').textContent = '▶ Resume';
      cancelAnimationFrame(this.raf);
    }

    tick(ts) {
      if (!this.lastTs) this.lastTs = ts;
      const delta = ts - this.lastTs;
      this.lastTs = ts;
      this.elapsed = Math.min(this.elapsed + delta, TOTAL);

      // Progress bar
      const pct = (this.elapsed / TOTAL) * 100;
      const fill = this.el.querySelector('#td-progress-fill');
      if (fill) fill.style.width = pct + '%';

      // Detect current scene
      let idx = SCENES.length - 1;
      for (let i = 0; i < SCENES.length; i++) {
        if (this.elapsed < SCENES[i].end) { idx = i; break; }
      }
      if (idx !== this.sceneIdx) {
        this.showScene(idx);
        this.sceneIdx = idx;
      }

      // Scene-specific animations
      this.runSceneAnimations(idx);

      if (this.elapsed < TOTAL) {
        this.raf = requestAnimationFrame(ts => this.tick(ts));
      } else {
        this.playing = false;
        this.el.querySelector('#td-btn-play').textContent = '↺ Replay';
      }
    }

    showScene(idx) {
      this.el.querySelectorAll('.td-scene').forEach((s, i) => {
        s.classList.toggle('td-scene--active', i === idx);
      });
      // Step labels
      this.el.querySelectorAll('.td-step-label').forEach((l, i) => {
        l.classList.toggle('td-step-label--active', i === idx);
      });
      // Scene-specific enter animations
      if (idx === 0) this.animatePopup();
      if (idx === 2) this.animateNewsletter();
      if (idx === 3) this.animateDirect();
    }

    /* ── Scene-specific animations ── */

    animatePopup() {
      const nameInput  = document.getElementById('td-name-input');
      const emailInput = document.getElementById('td-email-input');
      const btn        = document.getElementById('td-popup-btn');
      const success    = document.getElementById('td-popup-success');
      if (!nameInput) return;

      const typeInto = (el, text, cb) => {
        let i = 0;
        const cursor = el.querySelector('.td-cursor');
        const iv = setInterval(() => {
          if (i < text.length) {
            el.textContent = text.slice(0, ++i);
            const c = document.createElement('span');
            c.className = 'td-cursor';
            c.textContent = '|';
            el.appendChild(c);
          } else {
            clearInterval(iv);
            if (cb) cb();
          }
        }, 60);
      };

      setTimeout(() => typeInto(nameInput, 'Col. J. Harrington', () => {
        setTimeout(() => typeInto(emailInput, 'j.harrington@aerodefense.mil', () => {
          setTimeout(() => {
            if (btn) btn.classList.add('td-btn-click');
            setTimeout(() => {
              if (btn)     btn.style.display = 'none';
              if (success) success.style.opacity = '1';
            }, 400);
          }, 500);
        }), 300);
      }), 600);
    }

    animateNewsletter() {
      const sendAnim   = document.getElementById('td-send-anim');
      const sendStatus = document.getElementById('td-send-status');
      if (!sendAnim) return;
      setTimeout(() => {
        sendAnim.classList.add('td-send--active');
        setTimeout(() => {
          if (sendStatus) sendStatus.classList.add('td-send-status--visible');
        }, 1800);
      }, 2500);
    }

    animateDirect() {
      const urgent = document.getElementById('td-urgent');
      const sent   = document.getElementById('td-direct-sent');
      if (!urgent) return;
      urgent.classList.add('td-urgent--pulse');
      setTimeout(() => {
        if (sent) sent.classList.add('td-direct-sent--visible');
      }, 2800);
    }

    runSceneAnimations(idx) {
      // Metrics bars — animate once when scene 4 is entered
      if (idx === 4 && !this.metricsAnimated) {
        this.metricsAnimated = true;
        const targets = [
          { bar: 'td-bar-0', val: 'td-val-0', max: 68,   unit: '%',  dur: 1600 },
          { bar: 'td-bar-1', val: 'td-val-1', max: 42,   unit: '%',  dur: 1400 },
          { bar: 'td-bar-2', val: 'td-val-2', max: 12,   unit: '%',  dur: 1200 },
          { bar: 'td-bar-3', val: 'td-val-3', max: 99.2, unit: '%',  dur: 1800 },
        ];
        targets.forEach((t, i) => {
          setTimeout(() => {
            const bar = document.getElementById(t.bar);
            const val = document.getElementById(t.val);
            if (!bar || !val) return;
            bar.style.transition = `width ${t.dur}ms ease-out`;
            bar.style.width = t.max + '%';
            const start = performance.now();
            const iv = setInterval(() => {
              const prog = Math.min((performance.now() - start) / t.dur, 1);
              const cur  = (t.max * prog).toFixed(t.max % 1 === 0 ? 0 : 1);
              val.textContent = cur + t.unit;
              if (prog >= 1) clearInterval(iv);
            }, 30);
          }, i * 200);
        });
      }

      // Network nodes
      if (idx === 5 && !this.networkAnimated) {
        this.networkAnimated = true;
        const lines  = document.querySelectorAll('.td-net-line');
        const nodes  = document.querySelectorAll('.td-net-node');
        const badges = document.querySelectorAll('.td-net-badge');
        const count  = document.getElementById('td-net-count');

        lines.forEach((l, i)  => setTimeout(() => { l.style.transition='opacity .6s'; l.style.opacity='0.6'; }, i * 200));
        nodes.forEach((n, i)  => setTimeout(() => { n.style.transition='opacity .5s'; n.style.opacity='1';   }, 400 + i * 180));
        badges.forEach((b, i) => setTimeout(() => { b.style.transition='opacity .5s'; b.style.opacity='1';   }, 1600 + i * 200));

        if (count) {
          let n = 0;
          const iv = setInterval(() => {
            count.textContent = ++n;
            if (n >= 1247) clearInterval(iv);
          }, 2);
        }
      }
    }
  }

  /* ── Init on DOM ready ── */
  function init() {
    const container = document.getElementById('tidings-demo-container');
    if (container) new TidingsDemo(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
