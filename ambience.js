/* ═══════════════════════════════════════════════════════════
   SABLEREIKO.COM — ambience
   Falling ash.
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

  let W, H, flakes;

  function size() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    const target = Math.min(70, Math.max(24, Math.round(W / 24)));
    flakes = Array.from({ length: target }, newFlake);
  }

  function newFlake() {
    const violet = Math.random() < 1 / 14; // the rare ember
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 1.7,            // radius
      vy: 0.12 + Math.random() * 0.35,          // fall speed
      drift: 0.4 + Math.random() * 1.1,         // sway width
      phase: Math.random() * Math.PI * 2,       // sway offset
      wobble: 0.003 + Math.random() * 0.006,    // sway speed
      a: 0.06 + Math.random() * 0.16,           // alpha
      violet,
    };
  }

  let running = true;
  let t = 0;

  function frame() {
    if (!running) return;
    t++;

    ctx.clearRect(0, 0, W, H);
    for (const f of flakes) {
      f.y += f.vy;
      f.x += Math.sin(t * f.wobble + f.phase) * f.drift * 0.15;

      if (f.y > H + 4) { f.y = -4; f.x = Math.random() * W; }
      if (f.x > W + 4) f.x = -4;
      if (f.x < -4) f.x = W + 4;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
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
