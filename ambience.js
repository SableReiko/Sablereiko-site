/* ═══════════════════════════════════════════════════════════
   SABLEREIKO.COM — ambience
   Falling ash, in three depths, drifting from the cursor.
   Self-contained: include with
     <script src="ambience.js" defer></script>
   on any page. No markup or CSS changes required.

   Behavior notes:
   - Renders BEHIND the content (z-index:-1), so text and
     plates are never obscured.
   - Respects prefers-reduced-motion: the effect simply
     does not start.
   - Pauses when the tab is hidden. Adapts particle count
     to viewport size.
   - Three layers (back/mid/front) give parallax depth; the
     whole field shifts gently toward the pointer, and nearby
     flakes are nudged aside as it passes.
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* ── the ash ─────────────────────────────────────────── */
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "-1",
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const LAYERS = [
    { speedMul: 0.55, sizeMul: 0.65, alphaMul: 0.55, parallax: 5,  share: 0.45 }, // back
    { speedMul: 1,    sizeMul: 1,    alphaMul: 1,    parallax: 11, share: 0.35 }, // mid
    { speedMul: 1.6,  sizeMul: 1.45, alphaMul: 1.15, parallax: 20, share: 0.20 }, // front
  ];
  const REPEL_RADIUS = 90;

  let W, H, flakes;

  function size() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    const target = Math.min(70, Math.max(24, Math.round(W / 24)));
    flakes = [];
    for (const layer of LAYERS) {
      const count = Math.max(1, Math.round(target * layer.share));
      for (let i = 0; i < count; i++) flakes.push(newFlake(layer));
    }
  }

  function newFlake(layer) {
    const violet = Math.random() < 1 / 14; // the rare ember
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: (0.6 + Math.random() * 1.7) * layer.sizeMul,      // radius
      vy: (0.12 + Math.random() * 0.35) * layer.speedMul,  // fall speed
      drift: 0.4 + Math.random() * 1.1,                    // sway width
      phase: Math.random() * Math.PI * 2,                  // sway offset
      wobble: 0.003 + Math.random() * 0.006,                // sway speed
      a: (0.06 + Math.random() * 0.16) * layer.alphaMul,   // alpha
      ivx: 0, ivy: 0,                                       // pointer impulse
      violet,
      layer,
    };
  }

  /* ── pointer: smoothed parallax offset + proximity nudge ── */
  let pointerActive = false;
  let mouseX = 0, mouseY = 0;
  let smX = 0, smY = 0; // smoothed, normalized -1..1 from center

  addEventListener("pointermove", (e) => {
    pointerActive = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  addEventListener("pointerleave", () => { pointerActive = false; }, { passive: true });

  let running = true;
  let t = 0;

  function frame() {
    if (!running) return;
    t++;

    const targetSmX = pointerActive ? (mouseX - W / 2) / (W / 2) : 0;
    const targetSmY = pointerActive ? (mouseY - H / 2) / (H / 2) : 0;
    smX += (targetSmX - smX) * 0.05;
    smY += (targetSmY - smY) * 0.05;

    ctx.clearRect(0, 0, W, H);
    for (const f of flakes) {
      f.y += f.vy;
      f.x += Math.sin(t * f.wobble + f.phase) * f.drift * 0.15;

      if (pointerActive) {
        const dx = f.x - mouseX;
        const dy = f.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const force = (1 - dist / REPEL_RADIUS) * 0.6;
          f.ivx += (dx / dist) * force;
          f.ivy += (dy / dist) * force;
        }
      }
      f.x += f.ivx;
      f.y += f.ivy;
      f.ivx *= 0.9;
      f.ivy *= 0.9;

      if (f.y > H + 4) { f.y = -4; f.x = Math.random() * W; }
      if (f.x > W + 4) f.x = -4;
      if (f.x < -4) f.x = W + 4;

      const dx = smX * f.layer.parallax;
      const dy = smY * f.layer.parallax * 0.5;

      ctx.beginPath();
      ctx.arc(f.x + dx, f.y + dy, f.r, 0, Math.PI * 2);
      ctx.fillStyle = f.violet
        ? "rgba(139,92,246," + (f.a + 0.08) + ")"
        : "rgba(236,233,227," + f.a + ")";
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { running = false; }
    else if (!running) { running = true; requestAnimationFrame(frame); }
  });

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(size, 150);
  }, { passive: true });

  size();
  requestAnimationFrame(frame);
})();
