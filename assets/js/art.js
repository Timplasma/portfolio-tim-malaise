/* Generative cover art, used whenever an entry has no real image yet.
   Art.render(kind, seed, color) returns an inline SVG string.
   kinds: beams, grid, rings, wave, bars */
(function () {
  'use strict';
  var uid = 0;

  function rng(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function f(n) { return Math.round(n * 100) / 100; }

  var kinds = {
    beams: function (r, c, id) {
      var n = 4 + Math.floor(r() * 3), s = '';
      s += '<defs><linearGradient id="g' + id + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="' + c + '" stop-opacity=".8"/>' +
        '<stop offset=".55" stop-color="' + c + '" stop-opacity=".14"/>' +
        '<stop offset="1" stop-color="' + c + '" stop-opacity="0"/></linearGradient>' +
        '<radialGradient id="f' + id + '" cx=".5" cy="1" r=".75">' +
        '<stop offset="0" stop-color="' + c + '" stop-opacity=".32"/>' +
        '<stop offset="1" stop-color="' + c + '" stop-opacity="0"/></radialGradient></defs>';
      s += '<rect width="800" height="500" fill="#0A0F1F"/>';
      s += '<rect y="250" width="800" height="250" fill="url(#f' + id + ')"/>';
      var fix = '';
      for (var i = 0; i < n; i++) {
        var sx = 90 + 620 * (i + 0.5) / n + (r() - 0.5) * 40;
        var a = (r() - 0.5) * 56, b = a + (r() - 0.5) * 30;
        var len = 640, half = len * Math.tan((3.5 + r() * 5) * Math.PI / 180);
        s += '<g transform="translate(' + f(sx) + ' 0)"><polygon class="beam" style="--a:' + f(a) + 'deg;--b:' + f(b) + 'deg;--d:-' + f(r() * 5) + 's" points="0,0 ' + f(-half) + ',' + len + ' ' + f(half) + ',' + len + '" fill="url(#g' + id + ')"/></g>';
        fix += '<rect x="' + f(sx - 9) + '" y="4" width="18" height="16" rx="3" fill="#27335E"/>';
      }
      s += '<rect width="800" height="5" fill="#1B2547"/>' + fix;
      return s;
    },

    grid: function (r, c) {
      var s = '<rect width="800" height="500" fill="#0A0F1F"/>', cols = 20, rows = 12, cells = [], i, j;
      for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
        var x = 20 + i * 40, y = 30 + j * 40;
        if (r() < 0.13) {
          cells.push([x, y]);
          s += '<circle class="tw" style="--d:-' + f(r() * 2) + 's" cx="' + x + '" cy="' + y + '" r="5" fill="' + c + '"/>';
        } else {
          s += '<circle cx="' + x + '" cy="' + y + '" r="1.8" fill="' + c + '" fill-opacity=".28"/>';
        }
      }
      var pts = cells.slice(0, 7).map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
      if (cells.length > 2) s += '<polyline points="' + pts + '" fill="none" stroke="' + c + '" stroke-opacity=".45" stroke-width="1.5"/>';
      s += '<circle cx="' + f(200 + r() * 400) + '" cy="' + f(150 + r() * 200) + '" r="' + f(90 + r() * 70) + '" fill="none" stroke="' + c + '" stroke-opacity=".3"/>';
      return s;
    },

    rings: function (r, c) {
      var cx = f(300 + r() * 200), cy = f(220 + r() * 60), s = '<rect width="800" height="500" fill="#0A0F1F"/>';
      s += '<line x1="0" y1="' + cy + '" x2="800" y2="' + cy + '" stroke="' + c + '" stroke-opacity=".18"/>';
      s += '<line x1="' + cx + '" y1="0" x2="' + cx + '" y2="500" stroke="' + c + '" stroke-opacity=".18"/>';
      s += '<g class="spin" style="transform-origin:' + cx + 'px ' + cy + 'px">';
      for (var k = 1; k <= 5; k++) {
        var rad = 38 + k * 46;
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rad + '" fill="none" stroke="' + c + '" stroke-opacity="' + f(0.7 - k * 0.1) + '" stroke-width="1.5"' + (k % 2 ? ' stroke-dasharray="' + (6 + Math.floor(r() * 18)) + ' ' + (6 + Math.floor(r() * 14)) + '"' : '') + '/>';
        if (k % 2 === 0 || r() > 0.4) {
          var ang = r() * Math.PI * 2;
          s += '<circle cx="' + f(cx + Math.cos(ang) * rad) + '" cy="' + f(cy + Math.sin(ang) * rad) + '" r="' + (6 + Math.floor(r() * 5)) + '" fill="' + c + '"/>';
        }
      }
      return s + '</g>';
    },

    wave: function (r, c) {
      var s = '<rect width="800" height="500" fill="#0A0F1F"/>', p1 = r() * 6, p2 = r() * 6;
      for (var i = 0; i < 70; i++) {
        var h = 24 + 270 * Math.abs(Math.sin(i * 0.16 + p1) * 0.6 + Math.sin(i * 0.41 + p2) * 0.4);
        s += '<rect class="bar" style="--d:-' + f(i * 0.04) + 's" x="' + (14 + i * 11) + '" y="' + f(250 - h / 2) + '" width="7" height="' + f(h) + '" rx="3" fill="' + c + '" fill-opacity="' + f(0.35 + (h / 300) * 0.6) + '"/>';
      }
      return s;
    },

    bars: function (r, c) {
      var s = '<rect width="800" height="500" fill="#0A0F1F"/>';
      for (var i = 0; i < 7; i++) {
        var y = 40 + i * 64, seg = 4 + Math.floor(r() * 9);
        s += '<rect x="110" y="' + y + '" width="580" height="46" rx="6" fill="#121A33" stroke="' + c + '" stroke-opacity=".25"/>';
        s += '<circle class="led" style="--d:-' + f(r() * 1.5) + 's" cx="140" cy="' + (y + 23) + '" r="5" fill="' + c + '"/>';
        s += '<circle cx="162" cy="' + (y + 23) + '" r="5" fill="' + c + '" fill-opacity=".3"/>';
        for (var k = 0; k < seg; k++) s += '<rect x="' + (210 + k * 38) + '" y="' + (y + 15) + '" width="30" height="16" rx="3" fill="' + c + '" fill-opacity="' + f(0.25 + r() * 0.5) + '"/>';
      }
      return s;
    }
  };

  window.Art = {
    kinds: Object.keys(kinds),
    render: function (kind, seed, color) {
      var id = 'a' + (++uid), k = kinds[kind] ? kind : 'beams';
      var r = rng((seed || 1) * 9973 + k.length * 31);
      var body = kinds[k](r, color || '#FFB26B', id);
      return '<svg class="art art-' + k + '" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + body + '</svg>';
    }
  };
})();
