/* ============================================================
   PINNACLE CHIROPRACTIC — Shared Layout Components
   Nav + Footer injected on every page
   ============================================================ */

// ---- NAV ----
const NAV_HTML = `
<header class="site-header">
  <div class="demo-banner" role="status">
    <span>Concept preview</span>
    Actions are intentionally disabled.
  </div>
  <div class="container header-inner">

    <a href="/index.html" class="site-logo" aria-label="Pinnacle Chiropractic home">
      <span class="wordmark">Pinnacle Chiropractic</span>
      <span class="tagline">Clinton Township, MI</span>
    </a>

    <nav class="site-nav" id="site-nav" aria-label="Main navigation">
      <ul class="nav-links">

        <li><a href="/index.html">Home</a></li>

        <li class="nav-dropdown">
          <a href="/pages/services.html" aria-haspopup="true">Services</a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="/pages/condition-low-back.html">Low Back Pain &amp; Sciatica</a></li>
            <li><a href="/pages/condition-neck.html">Neck Pain &amp; Headaches</a></li>
            <li><a href="/pages/condition-sports.html">Sports Injury</a></li>
            <li><a href="/pages/condition-prenatal.html">Prenatal / Webster Technique</a></li>
            <li><a href="/pages/services.html">All Services</a></li>
          </ul>
        </li>

        <li><a href="/pages/new-patient.html">New Patients</a></li>
        <li><a href="/pages/blog.html">Blog</a></li>
        <li><a href="/pages/about.html">About</a></li>
        <li><a href="/pages/contact.html">Contact</a></li>

        <li>
          <a href="https://pinnaclechiro.janeapp.com" class="nav-cta" target="_blank" rel="noopener">
            Book Now
          </a>
        </li>

      </ul>

      <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

  </div>
</header>
`;

// ---- PREVIEW / LAUNCH SETTINGS ----
// Keep previewMode true while the concept site is public. Before launch, add
// the real URLs below and switch previewMode to false.
const SITE_CONFIG = Object.freeze({
  previewMode: true,
  bookingUrl: '',
  phoneUrl: '',
  directionsUrl: '',
  contactEndpoint: '',
  newsletterEndpoint: ''
});

// ---- FOOTER ----
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="wordmark">Pinnacle Chiropractic</div>
        <p>Hands-on chiropractic care for athletes, families, and everyone in between — rooted in Macomb County.</p>
        <address class="footer-address">
          Clinton Township, MI<br>
          Exact address published at launch<br>
          <a href="tel:5865550100">(586) 555-0100</a>
        </address>
      </div>

      <div class="footer-col">
        <h4>Care</h4>
        <ul>
          <li><a href="/pages/condition-low-back.html">Low Back Pain</a></li>
          <li><a href="/pages/condition-neck.html">Neck Pain</a></li>
          <li><a href="/pages/condition-sports.html">Sports Injury</a></li>
          <li><a href="/pages/condition-prenatal.html">Prenatal Care</a></li>
          <li><a href="/pages/services.html">All Services</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Practice</h4>
        <ul>
          <li><a href="/pages/about.html">About Dr. Pinnacle</a></li>
          <li><a href="/pages/new-patient.html">New Patients</a></li>
          <li><a href="/pages/blog.html">Blog</a></li>
          <li><a href="/pages/contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Hours</h4>
        <ul>
          <li style="color:var(--slate-light);font-size:var(--text-sm)">Mon &amp; Wed: 9am – 6pm</li>
          <li style="color:var(--slate-light);font-size:var(--text-sm)">Tue &amp; Thu: 11am – 7pm</li>
          <li style="color:var(--slate-light);font-size:var(--text-sm)">Friday: 9am – 1pm</li>
          <li style="color:var(--slate-light);font-size:var(--text-sm)">Sat – Sun: Closed</li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <span>&copy; 2026 Pinnacle Chiropractic, LLC. All rights reserved.</span>
      <span>
        <a href="/pages/privacy.html">Privacy Policy</a>
        &nbsp;&middot;&nbsp;
        <a href="/pages/hipaa.html">HIPAA Notice</a>
        &nbsp;&middot;&nbsp;
        <a href="https://pinnaclechiro.janeapp.com" target="_blank" rel="noopener">Book Online</a>
      </span>
    </div>
  </div>
</footer>

<div class="mobile-action-bar" aria-label="Quick actions">
  <a href="/pages/new-patient.html" class="mobile-action-secondary">New patient info</a>
  <a href="https://pinnaclechiro.janeapp.com" class="mobile-action-primary">Book a visit</a>
</div>

<dialog class="preview-dialog" id="preview-dialog" aria-labelledby="preview-dialog-title">
  <button class="preview-dialog-close" type="button" aria-label="Close preview notice">×</button>
  <span class="preview-dialog-kicker">Concept preview</span>
  <h2 id="preview-dialog-title">This action will be connected before launch.</h2>
  <p id="preview-dialog-copy">No information has been sent and no appointment has been created.</p>
  <button class="btn btn-primary preview-dialog-button" type="button">Continue browsing</button>
</dialog>
`;

// ---- INJECT + INIT ----
document.addEventListener('DOMContentLoaded', () => {

  // Inject nav before first element
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // Inject footer at end of body
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Highlight active nav link
  const currentPath = (window.location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkFile = link.getAttribute('href').split('/').pop().replace(/\.html$/, '');
    if (linkFile === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });

  if (currentPath.startsWith('condition-')) {
    document.querySelector('.nav-dropdown > a')?.setAttribute('aria-current', 'page');
  }

  // Mobile toggle
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('site-nav');
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.classList.toggle('nav-open', open);
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const dialog = document.getElementById('preview-dialog');
  const dialogCopy = document.getElementById('preview-dialog-copy');
  const showPreviewNotice = message => {
    if (!dialog) return;
    dialogCopy.textContent = message;
    if (typeof dialog.showModal === 'function') dialog.showModal();
  };

  dialog?.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  const actionLinks = {
    booking: document.querySelectorAll('a[href*="pinnaclechiro.janeapp.com"]'),
    phone: document.querySelectorAll('a[href^="tel:"]'),
    directions: document.querySelectorAll('a[href*="maps.google.com"]')
  };

  const configureAction = (links, liveUrl, previewMessage) => {
    links.forEach(link => {
      if (!SITE_CONFIG.previewMode && liveUrl) {
        link.href = liveUrl;
        return;
      }
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.href = '#preview-action';
      link.addEventListener('click', event => {
        event.preventDefault();
        showPreviewNotice(previewMessage);
      });
    });
  };

  configureAction(
    actionLinks.booking,
    SITE_CONFIG.bookingUrl,
    'Online scheduling is disabled on this concept site. No appointment has been created.'
  );
  configureAction(
    actionLinks.phone,
    SITE_CONFIG.phoneUrl,
    'The displayed phone number is a placeholder and calling is disabled.'
  );
  configureAction(
    actionLinks.directions,
    SITE_CONFIG.directionsUrl,
    'The practice address is intentionally withheld until launch.'
  );

  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showPreviewNotice('This sample article will be connected to its full page before launch.');
    });
  });

  const setupForm = (form, endpoint, previewMessage) => {
    if (!form) return;
    const submitButton = form.querySelector('[data-form-submit]');
    const status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.append(status);

    if (SITE_CONFIG.previewMode || !endpoint) {
      submitButton?.addEventListener('click', () => {
        status.textContent = previewMessage;
        status.className = 'form-status is-preview';
        showPreviewNotice(previewMessage);
      });
      return;
    }

    submitButton.type = 'submit';
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const originalLabel = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      status.textContent = '';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        status.textContent = 'Thanks — your message was sent successfully.';
        status.className = 'form-status is-success';
      } catch (error) {
        status.textContent = 'We could not send that message. Please use the phone number above.';
        status.className = 'form-status is-error';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    });
  };

  setupForm(
    document.querySelector('form[name="contact"]'),
    SITE_CONFIG.contactEndpoint,
    'Demo mode: your contact information was not sent or stored.'
  );
  setupForm(
    document.querySelector('form[name="newsletter"]'),
    SITE_CONFIG.newsletterEndpoint,
    'Demo mode: your email address was not sent or stored.'
  );

});
