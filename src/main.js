document.addEventListener('DOMContentLoaded', () => {
  // 0. Anti-Inspect & Content Protection Deterrents
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    // Block F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Block Ctrl+Shift+I / J / C (Windows/Linux) & Cmd+Option+I / J / C (Mac)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(key)) {
      e.preventDefault();
      return false;
    }
    if (e.metaKey && e.altKey && ['I', 'J', 'C'].includes(key)) {
      e.preventDefault();
      return false;
    }
    // Block Ctrl+U (View Source) & Ctrl+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && ['U', 'S'].includes(key)) {
      e.preventDefault();
      return false;
    }
  });

  // 1. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }, { passive: true });

  // 2. Desktop Cursor Spotlight + Mobile Touch & Scroll Spotlight
  const aura = document.getElementById('cursor-aura');
  const ring = document.getElementById('cursor-ring');
  const isHoverDevice = window.matchMedia('(hover: hover)').matches;
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  if (isHoverDevice && aura && ring) {
    let mouseX = -500;
    let mouseY = -500;
    let ringX = -500;
    let ringY = -500;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      aura.style.opacity = '1';
      ring.style.opacity = '1';
      aura.style.left = `${mouseX}px`;
      aura.style.top = `${mouseY}px`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      aura.style.opacity = '0';
      ring.style.opacity = '0';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .exp-card').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%, -50%) scale(1.65)';
        ring.style.borderColor = 'rgba(34, 211, 238, 0.9)';
        ring.style.backgroundColor = 'rgba(34, 211, 238, 0.08)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.borderColor = 'rgba(34, 211, 238, 0.5)';
        ring.style.backgroundColor = 'transparent';
      });
    });

    spotlightCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }, { passive: true });
    });

    document.querySelectorAll('.magnetic-el').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.18;
        const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.18;
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
      });
    });
  } else {
    // Mobile & Tablet Touch-Tracking Spotlight + Center-Screen Scroll Illumination
    spotlightCards.forEach((card) => {
      const updateTouchSpotlight = (e) => {
        const touch = e.touches[0];
        if (!touch) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${touch.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${touch.clientY - rect.top}px`);
        card.classList.add('touch-lit');
      };

      card.addEventListener('touchstart', updateTouchSpotlight, { passive: true });
      card.addEventListener('touchmove', updateTouchSpotlight, { passive: true });
      card.addEventListener('touchend', () => {
        setTimeout(() => card.classList.remove('touch-lit'), 350);
      }, { passive: true });
    });

    // Light up whichever card is near the center of the mobile/tablet screen as user scrolls
    const mobileScrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.setProperty('--mouse-x', '50%');
            entry.target.style.setProperty('--mouse-y', '25%');
            entry.target.classList.add('scroll-lit');
          } else {
            entry.target.classList.remove('scroll-lit');
          }
        });
      },
      { rootMargin: '-28% 0px -28% 0px', threshold: 0.15 }
    );

    spotlightCards.forEach((card) => mobileScrollObserver.observe(card));
  }

  // 3. Universal Click & Mobile Tap Shockwave Ripple
  document.addEventListener('pointerdown', (e) => {
    const ripple = document.createElement('span');
    ripple.className = 'tap-ripple no-print';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, { passive: true });

  // 4. Unified Experience Cards -> Interactive Sanitized Proof Log Loader
  const expCards = document.querySelectorAll('.exp-card');
  const logTitleEl = document.getElementById('active-log-title');
  const logBodyEl = document.getElementById('active-log-body');

  expCards.forEach((card) => {
    card.addEventListener('click', () => {
      expCards.forEach((c) => c.classList.remove('border-cyan-400/50'));
      card.classList.add('border-cyan-400/50');

      if (logTitleEl && card.dataset.logTitle) {
        logTitleEl.textContent = card.dataset.logTitle;
      }
      if (logBodyEl && card.dataset.log) {
        logBodyEl.textContent = card.dataset.log;
      }
    });
  });

  // 5. Interactive Recruiter Role-Lens Highlighter
  const lensBtns = document.querySelectorAll('.lens-btn');

  lensBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      lensBtns.forEach((b) => {
        b.className = 'lens-btn min-h-[36px] px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:border-cyan-400 transition';
      });
      btn.className = 'lens-btn min-h-[36px] px-3 py-1 rounded-xl bg-cyan-400 text-slate-950 font-bold transition';

      expCards.forEach((card) => {
        const roles = (card.dataset.roles || '').split(' ');
        if (role === 'all' || roles.includes(role)) {
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0.32';
        }
      });
    });
  });

  // 6. One-Click Clipboard Copy + Toast
  const toast = document.getElementById('copy-toast');
  const toastText = document.getElementById('copy-toast-text');
  let toastTimeout;

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      const label = btn.dataset.label || 'Copied!';
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        if (toast && toastText) {
          toastText.textContent = label;
          toast.classList.remove('-translate-y-6', 'opacity-0');
          clearTimeout(toastTimeout);
          toastTimeout = setTimeout(() => {
            toast.classList.add('-translate-y-6', 'opacity-0');
          }, 2300);
        }
      } catch {
        window.location.href = value.includes('@') ? `mailto:${value}` : `tel:${value}`;
      }
    });
  });

  // 7. Skill Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.filter;
      filterBtns.forEach((b) => {
        b.className = 'filter-btn min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:border-cyan-400 transition';
      });
      btn.className = 'filter-btn min-h-[38px] px-3.5 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-bold transition';

      skillCards.forEach((card) => {
        card.style.display = target === 'all' || card.dataset.category === target ? 'block' : 'none';
      });
    });
  });

  // 8. Scroll-Reveal & Animated Counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-block').forEach((el) => observer.observe(el));

  document.querySelectorAll('.count-up').forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = cur.toLocaleString();
      }
    }, 25);
  });
});