/* APJ Capital: interactions. No dependencies. */
(function () {
  "use strict";

  /* ---- mobile menu ---------------------------------------------------- */
  var burger = document.querySelector(".burger");
  var drawer = document.querySelector(".drawer");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (burger) burger.setAttribute("aria-expanded", String(open));
    if (drawer) drawer.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });
  }
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
  });

  /* ---- scroll reveal -------------------------------------------------- */
  var batch = { last: 0, i: 0 }; /* items revealed in the same wave */
  var revealables = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseFloat(entry.target.dataset.revealDelay || 0);
        /* batch-based capped stagger: items entering in the same frame get a
           small per-item offset, capped so a large batch never becomes a show */
        if (!delay) {
          var now = Date.now();
          if (now - batch.last > 60) { /* new batch: reset the offset */
            batch.last = now;
            batch.i = 0;
          }
          delay = Math.min(batch.i++ * 75, 450);
        }
        setTimeout(function () { entry.target.classList.add("is-in"); }, delay);
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- count-up stats ------------------------------------------------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.dataset.count);
        var decimals = (el.dataset.count.split(".")[1] || "").length;
        if (reduce) {
          el.textContent = target.toFixed(decimals);
          return;
        }
        var start = performance.now();
        var dur = 1400;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- engagement accordions ------------------------------------------ */
  document.querySelectorAll(".eng__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.dataset.open = String(!open);
    });
  });


  /* ---- pillar modals ---------------------------------------------------- */
  /* Native <dialog> handles the top layer, Escape and focus containment.
     We only wire the triggers, the close button and the backdrop, then return
     focus to whichever card opened it. */
  var pillarTriggers = document.querySelectorAll("[data-pillar]");

  function openPillar(trigger) {
    var dialog = document.getElementById(trigger.dataset.pillar);
    if (!dialog) return;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      /* very old browsers: show it in the normal flow and mark it open */
      dialog.setAttribute("open", "");
    }
  }

  pillarTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openPillar(trigger);
    });
  });

  document.querySelectorAll(".pmodal").forEach(function (dialog) {
    dialog.querySelectorAll("[data-pillar-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    });

    /* a click that lands on the dialog element itself is a click on the
       backdrop, since the panel is the only child that fills it */
    dialog.addEventListener("click", function (e) {
      if (e.target !== dialog) return;
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    });

    dialog.addEventListener("close", function () {
      var active = document.activeElement;
      if (active && active.dataset && active.dataset.pillar) active.focus();
    });
  });

  /* ---- services sub-nav arrows ---------------------------------------- */
  /* Injects swipe arrows on the pill-chip service bar (mobile/tablet only,
     and only when the chips actually overflow). Pure enhancement: without
     JS the row stays swipeable by touch. */
  document.querySelectorAll(".subnav").forEach(function (subnav) {
    var list = subnav.querySelector("ul");
    if (!list) return;

    var prev = document.createElement("button");
    var next = document.createElement("button");
    [prev, next].forEach(function (btn) {
      btn.type = "button";
      btn.className = "subnav__arrow";
      btn.setAttribute("aria-hidden", "true");
      btn.tabIndex = -1;
    });
    prev.innerHTML = "&#8592;";
    next.innerHTML = "&#8594;";
    subnav.querySelector(".shell").prepend(prev);
    subnav.querySelector(".shell").append(next);

    function step() {
      var chip = list.querySelector("li");
      return chip ? chip.getBoundingClientRect().width * 2 : 160;
    }
    function update() {
      var max = list.scrollWidth - list.clientWidth;
      prev.classList.toggle("is-off", list.scrollLeft <= 2);
      next.classList.toggle("is-off", list.scrollLeft >= max - 2);
      subnav.classList.toggle("has-arrows", max > 2);
    }
    prev.addEventListener("click", function () {
      list.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      list.scrollBy({ left: step(), behavior: "smooth" });
    });
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* ---- footer year ---------------------------------------------------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
})();