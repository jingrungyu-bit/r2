/* ═══════════════════════════════════════════════════
   menu-app.js — 阿深 Thai Restaurant
   Language switching, rendering, modal, scroll-spy
═══════════════════════════════════════════════════ */

let currentLang = 'zh';
let savedScrollY = 0;
let scrollSpyActive = true;

/* ── Bootstrap ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  setHeaderOffset();
  renderStoreInfo();
  renderAllSections();
  bindLangBar();
  bindCatTabs();
  bindModal();
  initScrollSpy();
  window.addEventListener('resize', setHeaderOffset);
});

/* ── Header offset ──────────────────────────────── */
function setHeaderOffset() {
  const h = document.getElementById('sticky-header').offsetHeight;
  document.getElementById('page-content').style.paddingTop = h + 'px';
  // Update scroll-margin-top for smooth jump targets
  document.querySelectorAll('.menu-section').forEach(function (s) {
    s.style.scrollMarginTop = (h + 8) + 'px';
  });
}

/* ── Translation helper ─────────────────────────── */
function t(obj) {
  if (!obj || typeof obj !== 'object') return obj || '';
  return obj[currentLang] || obj.zh || '';
}

/* ── Store info ─────────────────────────────────── */
function renderStoreInfo() {
  // Tagline
  document.getElementById('store-tagline').textContent = t(STORE.tagline);

  // Address + phone
  var bar = document.getElementById('store-info-bar');
  var addrRow = document.getElementById('info-address');
  var phoneRow = document.getElementById('info-phone');
  var addrText = document.getElementById('info-address-text');
  var phoneText = document.getElementById('info-phone-text');

  var hasAddr = STORE.address && t(STORE.address);
  var hasPhone = STORE.phone;

  if (hasAddr) {
    addrText.textContent = t(STORE.address);
    addrRow.style.display = 'flex';
  } else {
    addrRow.style.display = 'none';
  }
  if (hasPhone) {
    phoneText.textContent = STORE.phone;
    phoneRow.style.display = 'flex';
  } else {
    phoneRow.style.display = 'none';
  }
  bar.style.display = (hasAddr || hasPhone) ? 'flex' : 'none';
}

/* ── Render all sections ────────────────────────── */
function renderAllSections() {
  // Section titles
  CATEGORY_ORDER.forEach(function (cat) {
    var titleEl = document.getElementById('title-' + cat);
    if (titleEl) titleEl.textContent = t(CATEGORY_LABELS[cat]);
  });
  // Category tab labels
  document.querySelectorAll('.cat-tab').forEach(function (btn) {
    var cat = btn.dataset.cat;
    btn.textContent = t(CATEGORY_TAB_LABELS[cat]);
  });
  // Item cards
  CATEGORY_ORDER.forEach(function (cat) {
    var listEl = document.getElementById('list-' + cat);
    if (!listEl) return;
    var items = MENU_ITEMS.filter(function (i) { return i.category === cat; });
    listEl.innerHTML = items.map(renderCardHTML).join('');
  });
  // Bind card clicks
  document.querySelectorAll('.item-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var item = MENU_ITEMS.find(function (i) { return i.id === card.dataset.id; });
      if (item) openModal(item);
    });
  });
}

/* ── Card HTML ──────────────────────────────────── */
function renderCardHTML(item) {
  var mediaHTML = item.image
    ? '<img src="images/' + item.image + '" alt="" loading="lazy">'
    : '<span style="line-height:1">' + item.emoji + '</span>';

  return '<div class="item-card" data-id="' + item.id + '" role="button" tabindex="0">'
    + '<div class="card-media">' + mediaHTML + '</div>'
    + '<div class="card-body">'
    + '<div class="card-name">' + escHtml(t(item.names)) + '</div>'
    + renderCardPricesHTML(item)
    + renderCardTagsHTML(item.tags)
    + '</div>'
    + '</div>';
}

function renderCardPricesHTML(item) {
  var p = item.price;
  // Single price, no label
  if (p.length === 1 && !p[0].label) {
    if (p[0].value === 'market') {
      return '<div class="price-market">' + t(MARKET_PRICE) + '</div>';
    }
    var noteHTML = t(item.note) ? '<div class="card-note">' + escHtml(t(item.note)) + '</div>' : '';
    return '<div class="price-single">NT$' + p[0].value + '</div>' + noteHTML;
  }
  // Multiple options or labelled single
  var rows = p.map(function (opt) {
    var val = opt.value === 'market'
      ? '<span class="price-market">' + t(MARKET_PRICE) + '</span>'
      : '<span class="price-value">NT$' + opt.value + '</span>';
    var lbl = opt.label ? '<span class="price-label">' + escHtml(t(opt.label)) + '</span>' : '';
    return '<div class="price-row">' + lbl + '<span class="price-dots"></span>' + val + '</div>';
  }).join('');
  var noteHTML = t(item.note) ? '<div class="card-note">' + escHtml(t(item.note)) + '</div>' : '';
  return '<div class="card-prices">' + rows + '</div>' + noteHTML;
}

function renderCardTagsHTML(tags) {
  if (!tags || !tags.length) return '';
  var badges = tags.map(function (code) {
    var def = TAGS_DEF[code];
    if (!def) return '';
    return '<span class="tag-badge tag-' + code + '">'
      + def.icon + ' ' + escHtml(def[currentLang] || def.zh)
      + '</span>';
  }).join('');
  return '<div class="card-tags">' + badges + '</div>';
}

/* ── Language switcher ──────────────────────────── */
function bindLangBar() {
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.lang === currentLang) return;
      currentLang = btn.dataset.lang;
      // Update html lang attribute for font rendering
      var langMap = { zh: 'zh-TW', en: 'en', ja: 'ja', ko: 'ko' };
      document.documentElement.lang = langMap[currentLang];
      document.querySelectorAll('.lang-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.lang === currentLang);
      });
      renderStoreInfo();
      renderAllSections();
      setHeaderOffset();
    });
  });
}

/* ── Category tabs ──────────────────────────────── */
function bindCatTabs() {
  document.querySelectorAll('.cat-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var cat = tab.dataset.cat;
      var section = document.getElementById('section-' + cat);
      if (!section) return;
      scrollSpyActive = false;
      setActiveTab(cat);
      var headerH = document.getElementById('sticky-header').offsetHeight;
      var top = section.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // Re-enable spy after scroll settles
      setTimeout(function () { scrollSpyActive = true; }, 900);
    });
  });
}

function setActiveTab(cat) {
  document.querySelectorAll('.cat-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.cat === cat);
  });
}

/* ── Scroll Spy ─────────────────────────────────── */
function initScrollSpy() {
  var headerH = document.getElementById('sticky-header').offsetHeight;
  var observer = new IntersectionObserver(function (entries) {
    if (!scrollSpyActive) return;
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var cat = entry.target.id.replace('section-', '');
        setActiveTab(cat);
      }
    });
  }, {
    rootMargin: '-' + (headerH + 10) + 'px 0px -60% 0px',
    threshold: 0,
  });
  CATEGORY_ORDER.forEach(function (cat) {
    var el = document.getElementById('section-' + cat);
    if (el) observer.observe(el);
  });
}

/* ── Modal ──────────────────────────────────────── */
function bindModal() {
  var overlay = document.getElementById('modal-overlay');
  var closeBtn = document.getElementById('modal-close-btn');
  var sheet = document.getElementById('modal-sheet');

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Swipe down to close
  var swipeStartY = 0;
  var swipeStartScroll = 0;
  sheet.addEventListener('touchstart', function (e) {
    swipeStartY = e.touches[0].clientY;
    swipeStartScroll = sheet.scrollTop;
  }, { passive: true });
  sheet.addEventListener('touchmove', function (e) {
    var dy = e.touches[0].clientY - swipeStartY;
    if (dy > 0 && swipeStartScroll <= 0) {
      sheet.style.transition = 'none';
      sheet.style.transform = 'translateY(' + dy + 'px)';
      e.preventDefault();
    }
  }, { passive: false });
  sheet.addEventListener('touchend', function (e) {
    var dy = e.changedTouches[0].clientY - swipeStartY;
    sheet.style.transition = '';
    if (dy > 90) {
      closeModal();
    } else {
      sheet.style.transform = '';
    }
  }, { passive: true });
}

function openModal(item) {
  savedScrollY = window.scrollY;
  var content = document.getElementById('modal-content');
  content.innerHTML = renderModalHTML(item);
  var overlay = document.getElementById('modal-overlay');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setupPinchZoom();
}

function closeModal() {
  var overlay = document.getElementById('modal-overlay');
  var sheet = document.getElementById('modal-sheet');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  sheet.style.transform = '';
  document.body.style.overflow = '';
  window.scrollTo(0, savedScrollY);
}

/* ── Modal HTML ─────────────────────────────────── */
function renderModalHTML(item) {
  // Media
  var mediaHTML = item.image
    ? '<img class="modal-img" id="modal-media" src="images/' + item.image + '" alt="">'
    : '<span class="modal-emoji" id="modal-media">' + item.emoji + '</span>';

  // Prices
  var pricesHTML = renderModalPricesHTML(item);

  // Tags
  var tagsHTML = '';
  if (item.tags && item.tags.length) {
    var badges = item.tags.map(function (code) {
      var def = TAGS_DEF[code];
      if (!def) return '';
      return '<span class="modal-tag tag-' + code + '">'
        + def.icon + ' ' + escHtml(def[currentLang] || def.zh) + '</span>';
    }).join('');
    tagsHTML = '<div class="modal-tags">' + badges + '</div>';
  }

  // Desc + note
  var extras = '';
  var descText = t(item.desc);
  var noteText = t(item.note);
  if (descText || noteText) {
    extras = '<div class="modal-divider"></div>';
    if (descText) {
      extras += '<div class="modal-field-label">'
        + { zh: '說明', en: 'Description', ja: '説明', ko: '설명' }[currentLang]
        + '</div><div class="modal-field-text">' + escHtml(descText) + '</div>';
    }
    if (noteText) {
      extras += '<div class="modal-field-label">'
        + { zh: '備註', en: 'Note', ja: '備考', ko: '비고' }[currentLang]
        + '</div><div class="modal-field-text">' + escHtml(noteText) + '</div>';
    }
  }

  return '<div class="modal-media-wrap" id="modal-media-wrap">' + mediaHTML + '</div>'
    + '<div class="modal-body">'
    + '<div class="modal-name">' + escHtml(t(item.names)) + '</div>'
    + pricesHTML
    + tagsHTML
    + extras
    + '</div>';
}

function renderModalPricesHTML(item) {
  var p = item.price;
  var rows = '';
  if (p.length === 1 && !p[0].label) {
    var valHTML = p[0].value === 'market'
      ? '<span class="modal-price-market">' + t(MARKET_PRICE) + '</span>'
      : '<span class="modal-price-single">NT$' + p[0].value + '</span>';
    rows = '<div class="modal-price-row">' + valHTML + '</div>';
  } else {
    rows = p.map(function (opt) {
      var lbl = opt.label ? '<span class="modal-price-label">' + escHtml(t(opt.label)) + '</span>' : '';
      var val = opt.value === 'market'
        ? '<span class="modal-price-market">' + t(MARKET_PRICE) + '</span>'
        : '<span class="modal-price-value">NT$' + opt.value + '</span>';
      return '<div class="modal-price-row">' + lbl + val + '</div>';
    }).join('');
  }
  return '<div class="modal-prices">' + rows + '</div>';
}

/* ── Pinch-to-zoom on modal media ───────────────── */
function setupPinchZoom() {
  var wrap = document.getElementById('modal-media-wrap');
  var media = document.getElementById('modal-media');
  if (!wrap || !media) return;

  var initialDist = 0;
  var baseScale = 1;
  var currentScale = 1;

  function dist(t1, t2) {
    var dx = t1.clientX - t2.clientX;
    var dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  wrap.addEventListener('touchstart', function (e) {
    if (e.touches.length === 2) {
      initialDist = dist(e.touches[0], e.touches[1]);
      baseScale = currentScale;
      e.preventDefault();
    }
  }, { passive: false });

  wrap.addEventListener('touchmove', function (e) {
    if (e.touches.length === 2) {
      var d = dist(e.touches[0], e.touches[1]);
      currentScale = Math.min(4, Math.max(1, baseScale * (d / initialDist)));
      media.style.transform = 'scale(' + currentScale + ')';
      e.preventDefault();
    }
  }, { passive: false });

  wrap.addEventListener('touchend', function (e) {
    if (e.touches.length < 2) {
      if (currentScale < 1.1) {
        currentScale = 1;
        media.style.transform = 'scale(1)';
      }
    }
  }, { passive: true });

  // Double-tap to reset
  var lastTap = 0;
  wrap.addEventListener('touchend', function () {
    var now = Date.now();
    if (now - lastTap < 300) {
      currentScale = 1;
      media.style.transform = 'scale(1)';
    }
    lastTap = now;
  }, { passive: true });
}

/* ── Utility ────────────────────────────────────── */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}