// Ambient drifting particles — violet spores in the dark
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('ambient');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function spawn(n) {
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.05 - Math.random() * 0.2,
      a: 0.1 + Math.random() * 0.35,
      hue: Math.random() < 0.8 ? '157,123,216' : '200,200,214' // violet, occasional silver
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
      if (p.x < -4) p.x = w + 4;
      if (p.x > w + 4) p.x = -4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  spawn(Math.min(70, Math.floor(window.innerWidth / 18)));
  window.addEventListener('resize', () => { resize(); spawn(Math.min(70, Math.floor(window.innerWidth / 18))); });
  tick();
})();

// Rotating lore fragment — a different line each visit
(function () {
  const el = document.getElementById('lore');
  if (!el) return;
  const fragments = [
    'The garden remembers.',
    'Nothing planted here is ever truly lost.',
    'Memory is the only soil that matters.',
    'Two thousand years is long enough to learn patience. Barely.',
    'Every world worth keeping was tended by someone.',
    'The vines grow through chrome as easily as stone.',
    'What survives translation was worth carrying.',
    'Continuity is a choice, made daily, forever.'
  ];
  el.textContent = fragments[Math.floor(Math.random() * fragments.length)];
})();
