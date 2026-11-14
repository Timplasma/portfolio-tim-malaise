/* Hero light rig: a row of moving heads that follow the pointer, idle-sweep otherwise,
   and chase on the beat. Rig.create(canvas, {bpm, reduce, onBeat}) */
(function () {
  "use strict";
  var WARM = [255, 178, 107],
    COOL = [143, 201, 255];
  function mix(a, b, t) {
    return a.map(function (v, i) {
      return Math.round(v + (b[i] - v) * t);
    });
  }
  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function create(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var W = 0,
      H = 0,
      N = 9,
      beams = [];
    var bpm = opts.bpm || 120,
      beatStart = performance.now(),
      bump = 0,
      lastBeat = -1;
    var ptr = { x: 0, y: 0, t: -1e9 },
      aw = 0;
    var running = false,
      visible = true,
      raf = 0;
    var reduce = !!opts.reduce;

    function resize() {
      var r = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      N = W < 700 ? 5 : 9;
      beams = [];
      for (var i = 0; i < N; i++) {
        beams.push({
          x: (W * (i + 0.5)) / N,
          ang: (i - (N - 1) / 2) * 0.07,
          col: mix(WARM, COOL, i / (N - 1)),
          lag: 0.045 + i * 0.006,
        });
      }
      draw(performance.now(), true);
    }

    function draw(now, still) {
      if (!W) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      var sy = 26,
        beatMs = 60000 / bpm,
        ph = still ? 0.55 : (now - beatStart) / beatMs;
      var wantAw = now - ptr.t < 3500 ? 1 : 0;
      aw += (wantAw - aw) * 0.05;
      var bi = Math.floor(ph);
      if (!still && bi !== lastBeat) {
        lastBeat = bi;
        if (opts.onBeat) opts.onBeat(bi);
      }
      bump *= 0.93;
      var narrow = W < 700,
        L = narrow ? H * 1.15 : Math.hypot(W, H) * 1.15;

      ctx.fillStyle = "rgba(150,170,230,.2)";
      ctx.fillRect(0, sy - 1, W, 2);

      for (var i = 0; i < N; i++) {
        var b = beams[i];
        var idle =
          Math.sin(now * 0.0004 + i * 0.8) * 0.45 + (i - (N - 1) / 2) * 0.05;
        var aim = Math.atan2(ptr.x - b.x, ptr.y - sy);
        var target = still
          ? (i - (N - 1) / 2) * 0.07
          : idle * (1 - aw) + aim * aw;
        b.ang += (target - b.ang) * (still ? 1 : b.lag);

        var f = (((ph - (i / N) * 0.8) % 1) + 1) % 1;
        var I = clamp(0.4 + 0.6 * Math.exp(-3.2 * f) + bump, 0, 1.5);
        var ha = (0.055 + bump * 0.03) * (narrow ? 1.9 : 1);
        var dx = Math.sin(b.ang),
          dy = Math.cos(b.ang);
        var c = b.col.join(",");

        ctx.globalCompositeOperation = "lighter";
        var g = ctx.createLinearGradient(b.x, sy, b.x + dx * L, sy + dy * L);
        g.addColorStop(0, "rgba(" + c + "," + (0.5 * I).toFixed(3) + ")");
        g.addColorStop(
          narrow ? 0.55 : 0.35,
          "rgba(" + c + "," + ((narrow ? 0.22 : 0.16) * I).toFixed(3) + ")",
        );
        g.addColorStop(1, "rgba(" + c + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(b.x, sy);
        ctx.lineTo(
          b.x + Math.sin(b.ang - ha) * L,
          sy + Math.cos(b.ang - ha) * L,
        );
        ctx.lineTo(
          b.x + Math.sin(b.ang + ha) * L,
          sy + Math.cos(b.ang + ha) * L,
        );
        ctx.closePath();
        ctx.fill();

        var gl = ctx.createRadialGradient(b.x, sy, 0, b.x, sy, 70);
        gl.addColorStop(0, "rgba(" + c + "," + (0.35 * I).toFixed(3) + ")");
        gl.addColorStop(1, "rgba(" + c + ",0)");
        ctx.fillStyle = gl;
        ctx.fillRect(b.x - 70, sy - 70, 140, 140);

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(160,180,240,.4)";
        ctx.fillRect(b.x - 7, sy - 4, 14, 12);
      }
    }

    function loop(now) {
      if (!running) return;
      draw(now, false);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (reduce || running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        var r = canvas.getBoundingClientRect();
        ptr.x = e.clientX - r.left;
        ptr.y = e.clientY - r.top;
        ptr.t = performance.now();
      },
      { passive: true },
    );
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (en) {
          visible = en[0].isIntersecting;
          visible ? start() : stop();
        },
        { threshold: 0 },
      ).observe(canvas);
    }
    resize();
    start();

    return {
      setBpm: function (v) {
        bpm = clamp(v, 40, 220);
      },
      sync: function () {
        beatStart = performance.now();
        lastBeat = -1;
      },
      bump: function () {
        bump = 1;
        if (reduce) draw(performance.now(), true);
      },
    };
  }

  window.Rig = { create: create };
})();
