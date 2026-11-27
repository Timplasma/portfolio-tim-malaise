/* Portfolio logic. You should not need to edit this file:
   content lives in data/content.js */
(function () {
  "use strict";
  var D = window.PORTFOLIO,
    Art = window.Art,
    Rig = window.Rig;
  if (!D) return;

  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var html = document.documentElement;
  html.classList.add("js");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine) html.classList.add("fine");
  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  /* ------------------------------------------------------------ i18n */
  var UI = {
    en: {
      skip: "Skip to content",
      menu: "Menu",
      top: "Back to top",
      "nav.light": "Sound & Light",
      "nav.code": "Code",
      "nav.about": "About",
      "nav.contact": "Contact",
      tap: "Tap tempo",
      all: "All",
      "light.title": "Sound & Light",
      "light.intro":
        "Shows and events I programmed or operated.",
      "code.title": "Code",
      "code.intro":
        "Personal and school projects.",
      "col.cue": "Cue",
      "col.event": "Event",
      "col.type": "Type",
      "col.where": "Place, date",
      "col.role": "Role",
      "about.title": "About",
      looking: "Currently looking for",
      focus: "Fields of interest",
      "contact.title": "Contact",
      "contact.intro":
        "Please feel free to get in touch if you’d like to find out more about me!",
      copy: "Copy address",
      copied: "Address copied",
      cv: "Download CV",
      write: "Send an email",
      role: "Role",
      date: "Date",
      place: "Place",
      tools: "Key words",
      close: "Close",
      prev: "Previous",
      next: "Next",
      example: "Example",
      open: "Open",
      zoom: "Zoom",
      "zone.light": "Sound & Light",
      "zone.code": "Code",
      yt: "Watch on YouTube",
      lbclose: "Close image",
      lbprev: "Previous image",
      lbnext: "Next image",
    },
    fr: {
      skip: "Aller au contenu",
      menu: "Menu",
      top: "Haut de page",
      "nav.light": "Son & Lumière",
      "nav.code": "Informatique",
      "nav.about": "À propos",
      "nav.contact": "Contact",
      tap: "Tap tempo",
      all: "Tout",
      "light.title": "Son & Lumière",
      "light.intro":
        "Les shows et événements que j'ai programmés ou opérés.",
      "code.title": "Informatique",
      "code.intro":
        "Projets personnels et scolaires.",
      "col.cue": "Cue",
      "col.event": "Événement",
      "col.type": "Type",
      "col.where": "Lieu, date",
      "col.role": "Rôle",
      "about.title": "À propos",
      looking: "Actuellement à la recherche de",
      focus: "Domaines visés",
      "contact.title": "Contact",
      "contact.intro":
        "N'hésitez pas à me contacter pour en savoir d'avantage sur moi !",
      copy: "Copier l'adresse",
      copied: "Adresse copiée",
      cv: "Télécharger le CV",
      write: "Envoyer un e-mail",
      role: "Rôle",
      date: "Date",
      place: "Lieu",
      tools: "Mots clés",
      close: "Fermer",
      prev: "Précédent",
      next: "Suivant",
      example: "Exemple",
      open: "Ouvrir",
      zoom: "Agrandir",
      "zone.light": "Son & Lumière",
      "zone.code": "Informatique",
      yt: "Voir sur YouTube",
      lbclose: "Fermer l'image",
      lbprev: "Image précédente",
      lbnext: "Image suivante",
    },
  };
  var lang = "en";
  try {
    var saved = localStorage.getItem("portfolio-lang");
    if (saved === "fr" || saved === "en") lang = saved;
    else if (/^fr/i.test(navigator.language || "")) lang = "fr";
  } catch (e) {
    if (/^fr/i.test(navigator.language || "")) lang = "fr";
  }

  function t(k) {
    return (UI[lang] && UI[lang][k]) || UI.en[k] || k;
  }
  function L(v) {
    if (v == null) return "";
    if (typeof v === "string" || Array.isArray(v)) return v;
    return v[lang] != null
      ? v[lang]
      : v.en != null
        ? v.en
        : Object.keys(v).length
          ? v[Object.keys(v)[0]]
          : "";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function hash(s) {
    var h = 2166136261;
    s = String(s);
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (Math.abs(h) % 9973) + 1;
  }
  function fmtDate(s) {
    if (!s) return "";
    var m = String(s).match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
    if (!m) return String(s);
    if (!m[2]) return m[1];
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +(m[3] || 1)));
    var o = {
      month: m[3] ? "long" : "short",
      year: "numeric",
      timeZone: "UTC",
    };
    if (m[3]) o.day = "numeric";
    try {
      return new Intl.DateTimeFormat(
        lang === "fr" ? "fr-FR" : "en-GB",
        o,
      ).format(d);
    } catch (e) {
      return m[1];
    }
  }
  function paras(v) {
    return Array.isArray(v) ? v : String(v || "").split(/\n\s*\n/);
  }

  /* ------------------------------------------------------------ data */
  var ZONES = {
    light: { color: "#FFB26B", art: "beams" },
    code: { color: "#8FC9FF", art: "grid" },
  };
  var ENTRIES = [],
    BY_ID = {};
  ["light", "code"].forEach(function (z) {
    (D[z] || []).forEach(function (e) {
      var o = {};
      for (var k in e) o[k] = e[k];
      o.zone = z;
      ENTRIES.push(o);
      BY_ID[o.id] = o;
    });
  });
  function dstr(e) {
    return String(e.date || "");
  }
  var LIGHT = ENTRIES.filter(function (e) {
    return e.zone === "light";
  });
  LIGHT.slice()
    .sort(function (a, b) {
      return dstr(a).localeCompare(dstr(b));
    });
  LIGHT.sort(function (a, b) {
    return dstr(b).localeCompare(dstr(a));
  }).forEach(function (e, i) {
      e.cue = i + 1;
    });
  var CODE = ENTRIES.filter(function (e) {
    return e.zone === "code";
  });
  var LISTS = { light: LIGHT, code: CODE };
  var showBadge = D.site.showSampleBadges !== false;

  function artFor(e, kind, seed, color) {
    var a = e.art || {};
    return Art.render(
      kind || a.kind || ZONES[e.zone].art,
      seed != null ? seed : a.seed != null ? a.seed : hash(e.id),
      color || e.color || ZONES[e.zone].color,
    );
  }
  function coverHTML(e) {
    return e.cover
      ? '<img src="' +
          esc(e.cover) +
          '" alt="' +
          esc(L(e.coverAlt) || L(e.title)) +
          '" loading="lazy" decoding="async">'
      : artFor(e);
  }
  function badge(e) {
    return showBadge && e.sample
      ? '<span class="badge">' + esc(t("example")) + "</span>"
      : "";
  }
  function catKey(e) {
    var c = e.category;
    return !c ? "" : typeof c === "string" ? c : c.en || "";
  }
  function chars(text, start) {
    var i = start || 0;
    return String(text)
      .split(" ")
      .map(function (w) {
        return (
          '<span class="w" aria-hidden="true">' +
          Array.from(w)
            .map(function (c) {
              return (
                '<span class="ch" style="--i:' + i++ + '">' + esc(c) + "</span>"
              );
            })
            .join("") +
          "</span>"
        );
      })
      .join(" ");
  }

  /* ------------------------------------------------------------ render: static + hero */
  function renderStatic() {
    html.lang = lang;
    $$("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    $$(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    $("#hero-role").textContent = L(D.site.role);
    $("#hero-statement").textContent = L(D.site.statement);
    $("#hero-avail").textContent = L(D.site.availability);
    $("#foot-left").textContent =
      "© " + new Date().getFullYear() + " " + D.site.name;
    $("#lb-x").setAttribute("aria-label", t("lbclose"));
    $("#lb-prev").setAttribute("aria-label", t("lbprev"));
    $("#lb-next").setAttribute("aria-label", t("lbnext"));
    $("#case").setAttribute("aria-label", t("close"));
  }
  var nameBuilt = false;
  function buildName() {
    if (nameBuilt) return;
    nameBuilt = true;
    var h = $("#name"),
      parts = String(D.site.name).split(" "),
      i = 0;
    h.setAttribute("aria-label", D.site.name);
    h.innerHTML = parts
      .map(function (p) {
        var s = '<span class="line">' + chars(p, i) + "</span>";
        i += p.length;
        return s;
      })
      .join("");
    $("#brand").textContent = D.site.name;
  }
  function renderTicker() {
    var items = (D.site.ticker || [])
      .map(function (s) {
        return "<span>" + esc(s) + "</span>";
      })
      .join("");
    $("#ticker").innerHTML = items + items;
  }

  /* ------------------------------------------------------------ render: lists */
  var filters = { light: "all", code: "all" };
  function renderFilters(zone) {
    var list = LISTS[zone],
      keys = [];
    list.forEach(function (e) {
      var k = catKey(e);
      if (k && keys.indexOf(k) < 0) keys.push(k);
    });
    var box = $("#" + zone + "-filters");
    if (keys.length < 2) {
      box.innerHTML = "";
      return;
    }
    box.innerHTML =
      '<button type="button" class="chip-btn" data-filter="all" aria-pressed="' +
      (filters[zone] === "all") +
      '">' +
      esc(t("all")) +
      "</button>" +
      keys
        .map(function (k) {
          var e = list.filter(function (x) {
            return catKey(x) === k;
          })[0];
          return (
            '<button type="button" class="chip-btn" data-filter="' +
            esc(k) +
            '" aria-pressed="' +
            (filters[zone] === k) +
            '">' +
            esc(L(e.category)) +
            "</button>"
          );
        })
        .join("");
  }
  function renderLight() {
    $("#light-list").innerHTML = LIGHT.map(function (e, i) {
      return (
        '<li class="cue rv" style="--d:' +
        (i % 8) * 60 +
        'ms" data-cat="' +
        esc(catKey(e)) +
        '">' +
        '<button type="button" class="cue-row" data-open="' +
        esc(e.id) +
        '" data-cursor="view">' +
        '<span class="cue-no">' +
        e.cue +
        "</span>" +
        '<span class="cue-title">' +
        esc(L(e.title)) +
        badge(e) +
        "</span>" +
        '<span class="cue-cat">' +
        esc(L(e.category)) +
        "</span>" +
        '<span class="cue-meta">' +
        esc([L(e.place), fmtDate(e.date)].filter(Boolean).join(", ")) +
        "</span>" +
        '<span class="cue-role">' +
        esc(L(e.role)) +
        "</span></button></li>"
      );
    }).join("");
    $$("#light-list .cue-row").forEach(function (row) {
      var e = BY_ID[row.dataset.open];
      row.addEventListener("pointerenter", function (ev) {
        if (ev.pointerType === "mouse") peekShow(e);
      });
      row.addEventListener("pointerleave", peekHide);
    });
  }
  function renderCode() {
    $("#code-list").innerHTML = CODE.map(function (e, i) {
      return (
        '<article class="card rv" style="--d:' +
        (i % 6) * 70 +
        'ms" data-cat="' +
        esc(catKey(e)) +
        '">' +
        '<button type="button" class="card-btn" data-open="' +
        esc(e.id) +
        '" data-cursor="view">' +
        '<div class="card-art">' +
        coverHTML(e) +
        "</div>" +
        '<div class="card-body"><div class="card-top"><span>' +
        esc(L(e.category)) +
        badge(e) +
        "</span><span>" +
        esc(fmtDate(e.date)) +
        "</span></div>" +
        "<h3>" +
        esc(L(e.title)) +
        "</h3><p>" +
        esc(L(e.summary)) +
        "</p>" +
        '<ul class="chips">' +
        (e.tags || [])
          .map(function (g) {
            return "<li>" + esc(g) + "</li>";
          })
          .join("") +
        "</ul></div></button></article>"
      );
    }).join("");
    $$("#code-list .card-btn").forEach(function (b) {
      b.addEventListener("pointermove", function (ev) {
        if (ev.pointerType !== "mouse" || reduce) return;
        var r = b.getBoundingClientRect(),
          x = (ev.clientX - r.left) / r.width,
          y = (ev.clientY - r.top) / r.height;
        b.style.setProperty("--mx", x * 100 + "%");
        b.style.setProperty("--my", y * 100 + "%");
        b.style.setProperty("--ry", (x - 0.5) * 5 + "deg");
        b.style.setProperty("--rx", (0.5 - y) * 4 + "deg");
      });
      b.addEventListener("pointerleave", function () {
        b.style.setProperty("--ry", "0deg");
        b.style.setProperty("--rx", "0deg");
      });
    });
    layoutCards();
  }
  function layoutCards() {
    var vis = $$("#code-list .card").filter(function (c) {
      return !c.hidden;
    });
    vis.forEach(function (c, i) {
      c.classList.remove("w7", "w5");
      var m = i % 5;
      if (m === 0) c.classList.add("w7");
      else if (m === 1) c.classList.add("w5");
    });
  }
  function applyFilter(zone) {
    var sel = zone === "light" ? "#light-list .cue" : "#code-list .card",
      n = 0;
    $$(sel).forEach(function (el) {
      var ok = filters[zone] === "all" || el.dataset.cat === filters[zone];
      el.hidden = !ok;
      if (ok) {
        el.classList.add("in");
        el.classList.remove("pop");
        void el.offsetWidth;
        el.style.setProperty("--d", n++ * 50 + "ms");
        if (!reduce) el.classList.add("pop");
      }
    });
    if (zone === "code") layoutCards();
    $$("#" + zone + "-filters .chip-btn").forEach(function (b) {
      b.setAttribute(
        "aria-pressed",
        String(b.dataset.filter === filters[zone]),
      );
    });
  }

  function renderAbout() {
    $("#about-bio").innerHTML = paras(L(D.about.text))
      .map(function (p) {
        return "<p>" + esc(p) + "</p>";
      })
      .join("");
    $("#about-skills").innerHTML = (D.about.skills || [])
      .map(function (g) {
        return (
          "<div><h3>" +
          esc(L(g.title)) +
          "</h3><ul>" +
          g.items
            .map(function (i) {
              return "<li>" + esc(L(i)) + "</li>";
            })
            .join("") +
          "</ul></div>"
        );
      })
      .join("");
    $("#looking").innerHTML =
      "<h3>" +
      esc(t("looking")) +
      "</h3><p>" +
      esc(L(D.site.availability)) +
      "</p>" +
      (D.site.focus
        ? '<ul class="chips">' +
          D.site.focus
            .map(function (f) {
              return "<li>" + esc(L(f)) + "</li>";
            })
            .join("") +
          "</ul>"
        : "");
  }
  function renderContact() {
    var s = D.site,
      links = (s.links || [])
        .map(function (l) {
          return (
            '<a class="btn" href="' +
            esc(l.url) +
            '" target="_blank" rel="noopener">' +
            esc(l.label) +
            "</a>"
          );
        })
        .join("");
    $("#contact-body").innerHTML =
      '<a class="mail" href="mailto:' +
      esc(s.email) +
      '">' +
      esc(s.email) +
      "</a>" +
      '<div class="actions"><button type="button" class="btn primary" id="copy-mail">' +
      esc(t("copy")) +
      "</button>" +
      (s.cv
        ? '<a class="btn" href="' +
          esc(s.cv) +
          '" download>' +
          esc(t("cv")) +
          "</a>"
        : "") +
      links +
      "</div>";
    $("#copy-mail").addEventListener("click", function () {
      function done() {
        toast(t("copied"));
      }
      try {
        navigator.clipboard.writeText(s.email).then(done, function () {
          selectMail();
        });
      } catch (e) {
        selectMail();
      }
    });
  }
  function selectMail() {
    var el = $(".mail"),
      r = document.createRange();
    r.selectNodeContents(el);
    var sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
  }
  var toastT;
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.classList.add("on");
    clearTimeout(toastT);
    toastT = setTimeout(function () {
      el.classList.remove("on");
    }, 1800);
  }

  /* ------------------------------------------------------------ reveal */
  var io =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (items) {
            items.forEach(function (it) {
              if (it.isIntersecting) {
                it.target.classList.add("in");
                io.unobserve(it.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
        )
      : null;
  function observe(all) {
    $$(".rv:not(.in), .h2:not(.in)").forEach(function (el) {
      if (all || !io) el.classList.add("in");
      else io.observe(el);
    });
    setTimeout(function () {
      $$(".rv:not(.in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight * 1.2) el.classList.add("in");
      });
    }, 1500);
  }

  function renderAll(first) {
    renderStatic();
    buildName();
    renderTicker();
    renderFilters("light");
    renderFilters("code");
    renderLight();
    renderCode();
    renderAbout();
    renderContact();
    applyFilter("light");
    applyFilter("code");
    $$(".cue, .card").forEach(function (el) {
      el.classList.remove("pop");
    });
    $$(".cue, .card").forEach(function (el) {
      if (first) el.classList.remove("in");
    });
    observe(!first);
    if (caseOpen) fillCase(BY_ID[currentId], true);
  }

  /* ------------------------------------------------------------ cue preview + cursor + kinetic name */
  var peek = $("#peek"),
    peekOn = false,
    px = 0,
    py = 0,
    tx = -200,
    ty = -200,
    rot = 0;
  function peekShow(e) {
    if (!fine) return;
    peek.innerHTML = coverHTML(e);
    peek.classList.add("on");
    peekOn = true;
  }
  function peekHide() {
    peek.classList.remove("on");
    peekOn = false;
  }

  var cur = $("#cursor"),
    cx = -100,
    cy = -100,
    curMode = "";
  var mx = -1e4,
    my = -1e4,
    pointerSeen = 0,
    heroVisible = true;
  window.addEventListener(
    "pointermove",
    function (e) {
      tx = e.clientX;
      ty = e.clientY;
      mx = e.clientX;
      my = e.clientY;
      pointerSeen = performance.now();
      if (!fine) return;
      cur.classList.add("on");
      var el = e.target.closest ? e.target.closest("[data-cursor]") : null,
        mode = el ? el.dataset.cursor : "";
      if (mode !== curMode) {
        curMode = mode;
        cur.classList.toggle("big", !!mode);
        cur.firstElementChild.textContent =
          mode === "view" ? t("open") : mode === "zoom" ? t("zoom") : "";
      }
    },
    { passive: true },
  );
  document.addEventListener("pointerleave", function () {
    cur.classList.remove("on");
  });

  var nameChars = [];
  function frame(now) {
    if (fine) {
      cx += (tx - cx) * (reduce ? 1 : 0.22);
      cy += (ty - cy) * (reduce ? 1 : 0.22);
      cur.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
    }
    if (peekOn) {
      px += (tx - px) * 0.14;
      py += (ty - py) * 0.14;
      rot += (clamp((tx - px) * 0.06, -9, 9) - rot) * 0.2;
      var x = Math.min(px + 34, innerWidth - 320),
        y = clamp(py - 90, 70, innerHeight - 200);
      peek.style.transform =
        "translate3d(" + x + "px," + y + "px,0) rotate(" + rot + "deg)";
    }
    if (heroVisible && !reduce && nameChars.length) {
      var live = now - pointerSeen < 3500 && pointerSeen > 0;
      for (var i = 0; i < nameChars.length; i++) {
        var o = nameChars[i],
          target;
        if (live) {
          var r = o.el.getBoundingClientRect(),
            d = Math.hypot(
              mx - (r.left + r.width / 2),
              my - (r.top + r.height / 2),
            );
          target = 86 + 54 * Math.exp(-(d * d) / (2 * 200 * 200));
        } else {
          target =
            100 + (pointerSeen ? 0 : 10 * Math.sin(now * 0.0016 - i * 0.55));
        }
        o.w += (target - o.w) * 0.14;
        if (Math.abs(o.w - o.shown) > 0.4) {
          o.shown = o.w;
          o.el.style.fontVariationSettings = '"wdth" ' + o.w.toFixed(1);
        }
      }
    }
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------ colour temperature */
  var WARM = [255, 178, 107],
    COOL = [143, 201, 255];
  var navLinks = $$(".nav a"),
    secs = ["light", "code", "about", "contact"].map(function (id) {
      return $("#" + id);
    });
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = innerHeight,
        top = $("#code").getBoundingClientRect().top;
      var tt = clamp((vh * 0.9 - top) / (vh * 0.6), 0, 1);
      var c = WARM.map(function (v, i) {
        return Math.round(v + (COOL[i] - v) * tt);
      });
      html.style.setProperty("--accent", "rgb(" + c.join(",") + ")");
      $("#kelvin").textContent =
        Math.round((3200 + 3300 * tt) / 100) * 100 + " K";
      $("#temp-mark").style.left = tt * 100 + "%";
      var active = "";
      secs.forEach(function (s) {
        if (s.getBoundingClientRect().top < vh * 0.4) active = s.id;
      });
      navLinks.forEach(function (a) {
        a.setAttribute(
          "aria-current",
          String(a.getAttribute("href") === "#" + active),
        );
      });
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ------------------------------------------------------------ case study */
  var hideAnim = null;
  var caseEl = $("#case"),
    caseOpen = false,
    currentId = null,
    lastFocus = null,
    origin = null,
    lbItems = [],
    pushedByUs = false;
  var inertEls = ["header.bar", "main", "footer.foot"].map(function (s) {
    return $(s);
  });

  function figBtn(im, e, idx) {
    var inner = im.src
      ? '<img src="' +
        esc(im.src) +
        '" alt="' +
        esc(L(im.alt) || L(im.caption) || "") +
        '" loading="lazy" decoding="async">'
      : artFor(
          e,
          (im.art && im.art.kind) || null,
          im.art && im.art.seed != null ? im.art.seed : hash(e.id) + idx * 7,
          im.art && im.art.color,
        );
    var n = lbItems.push({ html: inner, caption: L(im.caption) }) - 1;
    return (
      '<button type="button" class="fig" data-lb="' +
      n +
      '" data-cursor="zoom" aria-label="' +
      esc(t("zoom") + ": " + (L(im.caption) || L(e.title))) +
      '">' +
      inner +
      "</button>"
    );
  }
  function cap(b) {
    return L(b.caption)
      ? "<figcaption>" + esc(L(b.caption)) + "</figcaption>"
      : "";
  }
  var BLOCKS = {
    text: function (b) {
      return (
        '<section class="blk blk-text">' +
        (b.title ? "<h3>" + esc(L(b.title)) + "</h3>" : "<div></div>") +
        '<div class="prose">' +
        paras(L(b.body))
          .map(function (p) {
            return "<p>" + esc(p) + "</p>";
          })
          .join("") +
        "</div></section>"
      );
    },
    image: function (b, e) {
      return (
        '<figure class="blk blk-image">' +
        figBtn(b, e, 0) +
        cap(b) +
        "</figure>"
      );
    },
    gallery: function (b, e) {
      return (
        '<div class="blk blk-gallery">' +
        (b.images || [])
          .map(function (im, i) {
            return "<figure>" + figBtn(im, e, i) + cap(im) + "</figure>";
          })
          .join("") +
        "</div>"
      );
    },
    video: function (b) {
      return (
        '<figure class="blk blk-video"><video controls playsinline preload="metadata"' +
        (b.poster ? ' poster="' + esc(b.poster) + '"' : "") +
        '><source src="' +
        esc(b.src) +
        '"></video>' +
        cap(b) +
        "</figure>"
      );
    },
    youtube: function (b) {
      var id = encodeURIComponent(b.id);
      return (
        '<figure class="blk blk-video"><div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/' +
        id +
        '" title="' +
        esc(L(b.caption) || "Video") +
        '" loading="lazy" allowfullscreen></iframe></div>' +
        '<a href="https://youtu.be/' +
        id +
        '" target="_blank" rel="noopener">' +
        esc(t("yt")) +
        "</a>" +
        cap(b) +
        "</figure>"
      );
    },
    quote: function (b) {
      return (
        '<figure class="blk blk-quote"><blockquote>' +
        esc(L(b.text)) +
        "</blockquote>" +
        (b.by ? "<p>" + esc(L(b.by)) + "</p>" : "") +
        "</figure>"
      );
    },
    specs: function (b) {
      return (
        '<section class="blk blk-specs">' +
        (b.title ? "<h3>" + esc(L(b.title)) + "</h3>" : "") +
        '<dl class="specs">' +
        (b.items || [])
          .map(function (i) {
            return (
              "<div><dt>" +
              esc(L(i.k)) +
              "</dt><dd>" +
              esc(L(i.v)) +
              "</dd></div>"
            );
          })
          .join("") +
        "</dl></section>"
      );
    },
    links: function (b) {
      return (
        '<div class="blk actions">' +
        (b.items || [])
          .map(function (l) {
            return (
              '<a class="btn" href="' +
              esc(l.url) +
              '" target="_blank" rel="noopener">' +
              esc(L(l.label)) +
              "</a>"
            );
          })
          .join("") +
        "</div>"
      );
    },
  };

  function caseHTML(e) {
    lbItems = [];
    var list = LISTS[e.zone],
      i = list.indexOf(e),
      n = list.length;
    var prev = list[(i - 1 + n) % n],
      next = list[(i + 1) % n];
    var meta = [
      [t("role"), L(e.role)],
      [t("date"), fmtDate(e.date)],
      [t("place"), L(e.place)],
      [t("tools"), (e.tags || []).join(", ")],
    ].filter(function (r) {
      return r[1];
    });
    var body = (e.blocks || [])
      .map(function (b) {
        return BLOCKS[b.type] ? BLOCKS[b.type](b, e) : "";
      })
      .join("");
    return (
      '<div class="case-bar"><span class="case-zone">' +
      esc(t("zone." + e.zone)) +
      '</span><button type="button" class="case-close" id="case-close">' +
      esc(t("close")) +
      "</button></div>" +
      '<div class="wrap case-wrap">' +
      '<header class="case-head"><p class="case-cat">' +
      esc(L(e.category)) +
      badge(e) +
      "</p>" +
      '<h2 class="case-title" aria-label="' +
      esc(L(e.title)) +
      '">' +
      chars(L(e.title)) +
      "</h2>" +
      '<p class="lead">' +
      esc(L(e.summary)) +
      "</p></header>" +
      '<dl class="meta">' +
      meta
        .map(function (r) {
          return (
            "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"
          );
        })
        .join("") +
      "</dl>" +
      '<div class="case-cover">' +
      coverHTML(e) +
      "</div>" +
      body +
      (n > 1
        ? '<nav class="case-nav"><button type="button" data-open="' +
          esc(prev.id) +
          '"><small>' +
          esc(t("prev")) +
          "</small><b>" +
          esc(L(prev.title)) +
          "</b></button>" +
          '<button type="button" data-open="' +
          esc(next.id) +
          '"><small>' +
          esc(t("next")) +
          "</small><b>" +
          esc(L(next.title)) +
          "</b></button></nav>"
        : "") +
      "</div>"
    );
  }
  function fillCase(e, keepScroll) {
    var st = caseEl.scrollTop;
    caseEl.innerHTML = caseHTML(e);
    caseEl.setAttribute("aria-label", L(e.title));
    document.title = L(e.title) + " | " + D.site.name;
    caseEl.scrollTop = keepScroll ? st : 0;
  }
  function setInert(on) {
    inertEls.forEach(function (el) {
      if (el) {
        if (on) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      }
    });
  }

  function showCase(id) {
    var e = BY_ID[id];
    if (!e) return;
    currentId = id;
    if (caseOpen) {
      fillCase(e);
      caseEl.scrollTo(0, 0);
      return;
    }
    if (hideAnim) {
      hideAnim.cancel();
      hideAnim = null;
    }
    caseEl.getAnimations().forEach(function (an) {
      an.cancel();
    });
    lastFocus = document.activeElement;
    fillCase(e);
    caseOpen = true;
    caseEl.hidden = false;
    caseEl.scrollTop = 0;
    html.classList.add("lock");
    setInert(true);
    peekHide();
    curMode = "";
    cur.classList.remove("big");
    var o = origin || { x: innerWidth / 2, y: innerHeight / 2 };
    origin = o;
    var R =
      Math.hypot(
        Math.max(o.x, innerWidth - o.x),
        Math.max(o.y, innerHeight - o.y),
      ) + 4;
    if (!reduce && caseEl.animate) {
      var a = caseEl.animate(
        [
          { clipPath: "circle(0px at " + o.x + "px " + o.y + "px)" },
          { clipPath: "circle(" + R + "px at " + o.x + "px " + o.y + "px)" },
        ],
        { duration: 750, easing: "cubic-bezier(.7,0,.2,1)" },
      );
      a.onfinish = a.oncancel = function () {
        caseEl.style.clipPath = "";
      };
    }
    var cb = $("#case-close");
    if (cb) cb.focus({ preventScroll: true });
  }
  function hideCase() {
    if (!caseOpen) return;
    caseOpen = false;
    currentId = null;
    document.title = D.site.name + " Portfolio";
    var done = function () {
      caseEl.scrollTop = 0;
      caseEl.hidden = true;
      caseEl.innerHTML = "";
      caseEl.style.clipPath = "";
      html.classList.remove("lock");
      setInert(false);
      if (lastFocus && lastFocus.focus && document.contains(lastFocus))
        lastFocus.focus({ preventScroll: true });
    };
    var o = origin || { x: innerWidth / 2, y: innerHeight / 2 };
    var R =
      Math.hypot(
        Math.max(o.x, innerWidth - o.x),
        Math.max(o.y, innerHeight - o.y),
      ) + 4;
    if (!reduce && caseEl.animate) {
      var a = caseEl.animate(
        [
          { clipPath: "circle(" + R + "px at " + o.x + "px " + o.y + "px)" },
          { clipPath: "circle(0px at " + o.x + "px " + o.y + "px)" },
        ],
        { duration: 550, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" },
      );
      hideAnim = a;
      a.onfinish = function () {
        hideAnim = null;
        done();
        a.cancel();
      };
    } else done();
  }

  /* routing: #entry-id opens a case study, #light/#code/#about/#contact scroll */
  function sync() {
    var id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (BY_ID[id]) {
      if (currentId !== id) showCase(id);
    } else if (caseOpen) hideCase();
  }
  addEventListener("hashchange", sync);
  function go(id, ev) {
    if (ev && ev.clientX != null) {
      var el = ev.target.closest ? ev.target.closest("[data-open]") : null;
      if (ev.detail === 0 && el) {
        var r = el.getBoundingClientRect();
        origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      } else if (!caseOpen) origin = { x: ev.clientX, y: ev.clientY };
    }
    if (location.hash === "#" + id) {
      showCase(id);
      return;
    }
    if (caseOpen) {
      location.replace("#" + id);
      return;
    }
    pushedByUs = true;
    location.hash = id;
  }
  function closeCase() {
    if (!caseOpen) return;
    if (pushedByUs && history.length > 1) {
      pushedByUs = false;
      history.back();
    } else {
      location.hash = "";
      setTimeout(sync, 0);
    }
  }

  /* ------------------------------------------------------------ lightbox */
  var lb = $("#lb"),
    lbIndex = 0,
    lbOpen = false;
  function lbShow(i) {
    if (!lbItems.length) return;
    lbIndex = (i + lbItems.length) % lbItems.length;
    var it = lbItems[lbIndex];
    $("#lb-stage").innerHTML = it.html;
    $("#lb-cap").textContent = it.caption || "";
    $$(".lb-prev, .lb-next").forEach(function (b) {
      b.hidden = lbItems.length < 2;
    });
    if (!lbOpen) {
      lbOpen = true;
      lb.hidden = false;
      $("#lb-x").focus({ preventScroll: true });
    }
  }
  function lbClose() {
    if (!lbOpen) return;
    lbOpen = false;
    lb.hidden = true;
  }

  /* ------------------------------------------------------------ events */
  document.addEventListener("click", function (e) {
    var op = e.target.closest("[data-open]");
    if (op) {
      e.preventDefault();
      go(op.dataset.open, e);
      return;
    }
    var f = e.target.closest(".chip-btn[data-filter]");
    if (f) {
      var zone = f.closest("[data-zone]").dataset.zone;
      filters[zone] = f.dataset.filter;
      applyFilter(zone);
      return;
    }
    var lbBtn = e.target.closest("[data-lb]");
    if (lbBtn) {
      lbShow(+lbBtn.dataset.lb);
      return;
    }
    if (e.target.closest("#case-close")) {
      closeCase();
      return;
    }
    if (
      e.target.closest("#lb-x") ||
      e.target === lb ||
      e.target.id === "lb-stage"
    ) {
      lbClose();
      return;
    }
    if (e.target.closest("#lb-prev")) {
      lbShow(lbIndex - 1);
      return;
    }
    if (e.target.closest("#lb-next")) {
      lbShow(lbIndex + 1);
      return;
    }
    var lg = e.target.closest(".lang button");
    if (lg) {
      lang = lg.dataset.lang;
      try {
        localStorage.setItem("portfolio-lang", lang);
      } catch (x) {}
      renderAll(false);
      return;
    }
    if (e.target.closest(".nav a")) {
      closeMenu();
      return;
    }
    if (e.target.closest("#to-top")) {
      scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (lbOpen) lbClose();
      else if (caseOpen) closeCase();
      else closeMenu();
    } else if (lbOpen && e.key === "ArrowLeft") lbShow(lbIndex - 1);
    else if (lbOpen && e.key === "ArrowRight") lbShow(lbIndex + 1);
    else if (e.key === "Tab" && caseOpen && !lbOpen) {
      var f = $$("button, a[href], video", caseEl).filter(function (n) {
        return !n.hidden && n.offsetParent !== null;
      });
      if (!f.length) return;
      var first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  var menuBtn = $("#menu-btn");
  function closeMenu() {
    $("#nav").classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  menuBtn.addEventListener("click", function () {
    var o = $("#nav").classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(o));
  });

  /* ------------------------------------------------------------ hero rig + tap tempo */
  var bpm = 120,
    taps = [];
  var rig = Rig.create($("#rig"), {
    bpm: bpm,
    reduce: reduce,
    onBeat: function () {
      var d = $("#tap-dot");
      d.classList.add("on");
      setTimeout(function () {
        d.classList.remove("on");
      }, 90);
    },
  });
  $("#tap").addEventListener("click", function () {
    var n = performance.now();
    if (taps.length && n - taps[taps.length - 1] > 2000) taps = [];
    taps.push(n);
    taps = taps.slice(-6);
    if (taps.length >= 2) {
      var sum = 0;
      for (var i = 1; i < taps.length; i++) sum += taps[i] - taps[i - 1];
      bpm = clamp(Math.round(60000 / (sum / (taps.length - 1))), 40, 220);
      $("#bpm").textContent = bpm;
      rig.setBpm(bpm);
    }
    rig.sync();
    rig.bump();
  });
  $(".hero").addEventListener("pointerdown", function (e) {
    if (!e.target.closest("button, a")) rig.bump();
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(function (en) {
      heroVisible = en[0].isIntersecting;
    }).observe($(".hero"));

  /* ------------------------------------------------------------ boot */
  renderAll(true);
  nameChars = $$("#name .ch").map(function (el) {
    return { el: el, w: 100, shown: 100 };
  });
  onScroll();
  requestAnimationFrame(frame);
  sync();
})();
