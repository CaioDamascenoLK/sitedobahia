// ============================================================
//  BOVESPA PROJECT – script.js
//  Colégio UNASP · 3º Ano · 2026
//  🔵⚪ BAHIA EASTER EGG ⚪🔵
// ============================================================

(function () {
  'use strict';

  // ── REFS ────────────────────────────────────────
  const logoBahia      = document.getElementById('logo-bahia');
  const bhLogoClose    = document.getElementById('bh-logo-close');
  const bahiaOverlay   = document.getElementById('bahia-overlay');
  const siteNormal     = document.getElementById('site-normal');
  const audio          = document.getElementById('bahia-audio');

  let bahiaMode = false;

  // ── CONFETTI ────────────────────────────────────
  function launchConfetti() {
    const colors = ['#003087', '#0041a8', '#ffffff', '#aac4ff', '#4477cc', '#ffd700', '#e8f0ff'];
    for (let i = 0; i < 90; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      const size = Math.random() * 10 + 5;
      el.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration: ${Math.random() * 2 + 2.5}s;
        animation-delay: ${Math.random() * 1.2}s;
      `;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }

  // ── ACTIVATE BAHIA ───────────────────────────────
  function activateBahia() {
    if (bahiaMode) return;
    bahiaMode = true;

    // Show overlay, hide normal site
    bahiaOverlay.classList.remove('hidden');
    siteNormal.style.display = 'none';

    // Scroll overlay to top
    bahiaOverlay.scrollTop = 0;
    // Also scroll window to top (for fixed header)
    window.scrollTo(0, 0);

    // Play hino
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // autoplay blocked — user already clicked so it should work, but just in case
        console.log('Audio play blocked by browser.');
      });
    }

    // Confetti!
    launchConfetti();
    setTimeout(launchConfetti, 700);
  }

  // ── DEACTIVATE BAHIA ─────────────────────────────
  function deactivateBahia() {
    if (!bahiaMode) return;
    bahiaMode = false;

    // Hide overlay, show normal site
    bahiaOverlay.classList.add('hidden');
    siteNormal.style.display = '';

    // Stop hino
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // Scroll back to top of normal site
    window.scrollTo(0, 0);
  }

  // ── EVENTS ──────────────────────────────────────
  if (logoBahia)   logoBahia.addEventListener('click', activateBahia);
  if (bhLogoClose) bhLogoClose.addEventListener('click', deactivateBahia);

  // Smooth scroll inside Bahia overlay
  document.querySelectorAll('.bh-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = bahiaOverlay.querySelector(link.getAttribute('href'));
      if (target) {
        const headerH = document.querySelector('.bh-header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + bahiaOverlay.scrollTop - headerH - 16;
        bahiaOverlay.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Smooth scroll inside normal site
  document.querySelectorAll('#site-normal nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const headerH = document.getElementById('site-header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── SCROLL REVEAL (normal site) ──────────────────
  const revealEls = document.querySelectorAll(
    '.info-card, .prof-card, .risco-card, .investor-card, .bolsa-item, .step-box, .tl-body, .ab-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ── CONSOLE EGG ─────────────────────────────────
  console.log('%c🔵⚪ BAHIA CAMPEÃO! ⚪🔵', 'color:white;background:#003087;font-size:18px;padding:8px 16px;border-radius:6px;font-family:serif');
  console.log('%cBovespa Project · Colégio UNASP · 2026', 'color:#0f2d52;font-size:13px');

})();