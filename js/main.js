/* ==========================================================================
   Knotty Girlz — site scripts (vanilla JS, no libraries)
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile hamburger menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    var closeMenu = function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Header shadow once the page scrolls ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Footer copyright year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Gentle fade-in as sections scroll into view ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Shop page: build product cards from data/products.json ----------
     Lisa edits that file through the admin page (/admin/). Each product has
     name, price, category, image, alt, and optionally description.
     The photo box is a CSS square, so the cards don't need image sizes. */
  var CATEGORY_LABELS = {
    shirts: "Custom Shirts",
    jewelry: "Jewelry",
    tunics: "Tunics & Tops",
    pants: "Pants",
    beachwear: "Beachwear",
    gifts: "Gifts & Totes",
    accessories: "Hats & Accessories"
  };

  function escapeHtml(text) {
    return String(text == null ? "" : text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function productCard(p) {
    // Straight quotes in the contact link so the form reads "'Tis", not "‘Tis".
    var linkName = encodeURIComponent(String(p.name).replace(/[‘’]/g, "'"));
    return '<article class="product-card" data-category="' + escapeHtml(p.category) + '">' +
      '<div class="img-wrap"><img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.alt || p.name) +
        '" loading="lazy"></div>' +
      '<div class="product-body">' +
        '<span class="product-tag">' + escapeHtml(CATEGORY_LABELS[p.category] || p.category) + '</span>' +
        '<h3>' + escapeHtml(p.name) + '</h3>' +
        (p.description ? '<p class="product-desc">' + escapeHtml(p.description) + '</p>' : "") +
        '<p class="product-price">' + escapeHtml(p.price) + '</p>' +
        '<a class="btn btn-primary" href="contact.html?product=' + linkName + '">Inquire / Order</a>' +
      '</div>' +
    '</article>';
  }

  var productGrid = document.querySelector(".product-grid");
  if (productGrid) {
    fetch("data/products.json", { cache: "no-cache" })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        productGrid.innerHTML = (data.products || []).map(productCard).join("");
        setUpFilters();
      })
      .catch(function () {
        productGrid.innerHTML = '<p class="empty-msg">Sorry, the shop didn&rsquo;t load. Please refresh the page.</p>';
      });
  }

  /* ---------- Shop page: category filter buttons ----------
     Each product card has data-category="shirts|jewelry|tunics|pants|beachwear|gifts|accessories".
     Links like shop.html?category=jewelry open with that filter selected. */
  function setUpFilters() {
    var filterButtons = document.querySelectorAll(".filter-btn");
    var products = document.querySelectorAll(".product-card");
    var emptyMsg = document.querySelector(".empty-msg");

    function applyFilter(category) {
      var shown = 0;
      filterButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(btn.dataset.filter === category));
      });
      products.forEach(function (card) {
        var match = category === "all" || card.dataset.category === category;
        card.hidden = !match;
        if (match) shown++;
      });
      if (emptyMsg) emptyMsg.hidden = shown > 0;
    }

    if (filterButtons.length) {
      filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          applyFilter(btn.dataset.filter);
          var url = new URL(window.location);
          if (btn.dataset.filter === "all") url.searchParams.delete("category");
          else url.searchParams.set("category", btn.dataset.filter);
          history.replaceState(null, "", url);
        });
      });

      var startCategory = new URLSearchParams(window.location.search).get("category");
      var valid = Array.prototype.some.call(filterButtons, function (b) {
        return b.dataset.filter === startCategory;
      });
      applyFilter(valid ? startCategory : "all");
    }
  }

  /* ---------- Pre-fill forms from "Inquire / Order" links ----------
     contact.html?product=Sea%20Glass%20Earrings fills the product field. */
  var params = new URLSearchParams(window.location.search);
  var productField = document.getElementById("product");
  if (productField && params.get("product")) {
    productField.value = params.get("product");
    var messageField = document.getElementById("message");
    if (messageField && !messageField.value) {
      messageField.value = "Hi! I'm interested in the " + params.get("product") + ". ";
    }
  }
  var itemType = document.getElementById("item-type");
  if (itemType && params.get("item")) {
    Array.prototype.forEach.call(itemType.options, function (opt) {
      if (opt.value === params.get("item")) itemType.value = opt.value;
    });
  }

  /* ---------- Custom order form: keep uploads under Netlify's size limit ---------- */
  var fileInput = document.getElementById("design-image");
  if (fileInput) {
    var MAX_MB = 8;
    fileInput.addEventListener("change", function () {
      var file = fileInput.files[0];
      if (file && file.size > MAX_MB * 1024 * 1024) {
        fileInput.setCustomValidity("Please choose an image smaller than " + MAX_MB + " MB.");
        fileInput.reportValidity();
      } else {
        fileInput.setCustomValidity("");
      }
    });
  }
})();
