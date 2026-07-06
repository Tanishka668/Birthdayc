/* ============================================================
   ONE MONTH TO GO — SCRIPT.JS
   ------------------------------------------------------------
   Sections match index.html. Most personalization happens in the
   CUSTOMIZATION SECTION at the top of index.html.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const CONFIG = window.COUNTDOWN_CONFIG || {
    name: 'Love',
    nicknames: ['sweetheart'],
    birthdayDate: new Date(Date.now() + 30 * 86400000).toISOString(),
  };
  const birthday = new Date(CONFIG.birthdayDate);

  document.getElementById('countdown-name').textContent = CONFIG.name;
  const songLabelEl = document.getElementById('song-label');
  if (songLabelEl && CONFIG.songTitle) {
    songLabelEl.textContent = `${CONFIG.songTitle} · ${CONFIG.songArtist || ''}`.trim();
  }

  /* ============================================================
     NIGHT SKY — slow drifting stars, behind everything
     ============================================================ */
  const skyCanvas = document.getElementById('sky-canvas');
  const skyCtx = skyCanvas.getContext('2d');
  let stars = [];

  function resizeSky() {
    skyCanvas.width = window.innerWidth;
    skyCanvas.height = window.innerHeight;
    const count = Math.floor((skyCanvas.width * skyCanvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * skyCanvas.width,
      y: Math.random() * skyCanvas.height,
      r: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.05,
      driftY: Math.random() * 0.04 + 0.01
    }));
  }
  resizeSky();
  window.addEventListener('resize', resizeSky);

  function drawSky() {
    skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
    stars.forEach((s) => {
      s.phase += s.twinkleSpeed;
      const alpha = s.baseAlpha + Math.sin(s.phase) * 0.25;
      skyCtx.globalAlpha = Math.max(alpha, 0.05);
      skyCtx.fillStyle = '#f6f1f8';
      skyCtx.beginPath();
      skyCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      skyCtx.fill();
      s.x += s.driftX;
      s.y -= s.driftY;
      if (s.y < -5) { s.y = skyCanvas.height + 5; s.x = Math.random() * skyCanvas.width; }
      if (s.x < -5) s.x = skyCanvas.width + 5;
      if (s.x > skyCanvas.width + 5) s.x = -5;
    });
    skyCtx.globalAlpha = 1;
    requestAnimationFrame(drawSky);
  }
  drawSky();

  /* ============================================================
     FLOATING HEARTS + TINY STARS (ambient, site-wide)
     ============================================================ */
  const floatingLayer = document.getElementById('floating-layer');
  const floatieSymbols = ['❤', '✦', '♡', '✧'];
  function spawnFloatie() {
    const el = document.createElement('span');
    el.className = 'floatie';
    el.textContent = floatieSymbols[Math.floor(Math.random() * floatieSymbols.length)];
    const size = Math.random() * 14 + 10;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = size + 'px';
    el.style.color = Math.random() > 0.5 ? 'rgba(240,198,214,0.8)' : 'rgba(217,176,76,0.7)';
    el.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    const duration = Math.random() * 10 + 12;
    el.style.animationDuration = duration + 's';
    floatingLayer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }
  setInterval(spawnFloatie, 1100);
  for (let i = 0; i < 5; i++) setTimeout(spawnFloatie, i * 400);

  /* ============================================================
     SECTION 1 — Nickname rotator
     ============================================================ */
  const nicknameEl = document.getElementById('nickname-rotator');
  const nicknames = (CONFIG.nicknames && CONFIG.nicknames.length) ? CONFIG.nicknames : ['love'];
  let nickIndex = 0;
  function showNickname() {
    nicknameEl.style.opacity = 0;
    setTimeout(() => {
      nicknameEl.textContent = `my ${nicknames[nickIndex]}`;
      nicknameEl.style.opacity = 1;
      nickIndex = (nickIndex + 1) % nicknames.length;
    }, 400);
  }
  showNickname();
  setInterval(showNickname, 2600);

  /* ============================================================
     SECTION 1 — Tap Here: confetti + music + scroll to countdown
     ============================================================ */
  const tapBtn = document.getElementById('tap-here-btn');
  const musicPlayer = document.getElementById('music-player');

  tapBtn.addEventListener('click', () => {
    launchConfetti(document.getElementById('opening-confetti'), 90);

    // Spotify's embed can't be started by our own script (browser/Spotify
    // security rules) — so instead, gently draw attention to the widget
    // so he notices it and taps its play button himself.
    musicPlayer.classList.add('invite-pulse');
    setTimeout(() => musicPlayer.classList.remove('invite-pulse'), 3200);

    setTimeout(() => {
      document.getElementById('countdown-section').scrollIntoView({ behavior: 'smooth' });
    }, 900);
  });

  /* ============================================================
     CONFETTI ENGINE (soft, romantic palette)
     ============================================================ */
  function launchConfetti(container, count) {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const colors = ['#f0c6d6', '#c9b6e4', '#d9b04c', '#f6f1f8'];
    const pieces = [];
    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        w: Math.random() * 6 + 4,
        h: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1.4,
        drift: Math.random() * 1.6 - 0.8,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 6 - 3
      });
    }
    let frame = 0;
    function tick() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (frame < 240) {
        requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    }
    tick();
  }

  /* ============================================================
     SCROLL-REVEAL (data-reveal elements)
     ============================================================ */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.2 });
  revealTargets.forEach((t) => revealObserver.observe(t));

  /* ============================================================
     PAGE-FLIP TRANSITIONS between sections (subtle 3D tilt-in)
     ============================================================ */
  const allSections = document.querySelectorAll('.section');
  const pageFlipObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('page-in');
    });
  }, { threshold: 0.35 });
  allSections.forEach((s) => pageFlipObserver.observe(s));

  /* ============================================================
     SIDE NAVIGATION DOTS — one per section, click to jump, active state
     ============================================================ */
  const sideNav = document.getElementById('side-nav');
  const navDots = [];
  allSections.forEach((section) => {
    const dot = document.createElement('button');
    dot.className = 'nav-dot';
    dot.setAttribute('aria-label', `Go to ${section.id.replace(/-/g, ' ')}`);
    dot.addEventListener('click', () => section.scrollIntoView({ behavior: 'smooth' }));
    sideNav.appendChild(dot);
    navDots.push({ section, dot });
  });
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const match = navDots.find((n) => n.section === entry.target);
      if (match) match.dot.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.55 });
  allSections.forEach((s) => navObserver.observe(s));

  /* ============================================================
     SECTION 2 — LIVE COUNTDOWN
     ============================================================ */
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');
  const endingDaysText = document.getElementById('ending-days-text');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);

    // Ending section headline reflects the same live day count
    const roundedDays = Math.ceil(diff / 86400000);
    endingDaysText.innerHTML = `${roundedDays} Day${roundedDays === 1 ? '' : 's'} To Go <span class="heart-flicker">❤️</span>`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============================================================
     SECTION 4 — ENVELOPE + TYPING LETTER
     ============================================================ */
  const envelope = document.getElementById('envelope');
  const letterPaper = document.getElementById('letter-paper');
  const letterClose = document.getElementById('letter-close');
  const letterTextEl = document.getElementById('letter-text');
  let letterTyped = false;

  function typeLetter() {
    if (letterTyped) return;
    letterTyped = true;
    const fullText = letterTextEl.dataset.fullText || '';
    letterTextEl.textContent = '';
    let i = 0;
    const speed = 28;
    function typeChar() {
      if (i < fullText.length) {
        letterTextEl.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      }
    }
    typeChar();
  }

  envelope.addEventListener('click', () => {
    envelope.classList.add('opened');
    setTimeout(() => {
      letterPaper.classList.add('active');
      typeLetter();
    }, 500);
  });
  letterClose.addEventListener('click', () => {
    letterPaper.classList.remove('active');
  });

  /* ============================================================
     SECTION 5 — LOCKED GIFT (gently glows, intentionally does not open)
     ============================================================ */
  const lockedGift = document.querySelector('.locked-gift');
  lockedGift.addEventListener('click', () => {
    lockedGift.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(4px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 350, easing: 'ease-in-out' }
    );
  });

});
