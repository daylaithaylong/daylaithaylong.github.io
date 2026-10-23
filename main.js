(function () {
  const qs = (selector, root = document) => (root ? root.querySelector(selector) : null);
  const qsa = (selector, root = document) => (root ? Array.from(root.querySelectorAll(selector)) : []);

  document.addEventListener('DOMContentLoaded', () => {
    initNavToggle();
    initContactDropdown();
    initMapWidget();
    initTimeline();
    initLightbox();
  });

  function initNavToggle() {
    const toggle = qs('.nav-toggle');
    const nav = qs('.site-nav');
    if (!toggle || !nav) return;

    const closeNav = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      nav.classList.toggle('open', !expanded);
      toggle.setAttribute('aria-expanded', String(!expanded));
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        closeNav();
      }
    });
  }

  function initContactDropdown() {
    const dropdown = qs('.contact-dropdown');
    if (!dropdown) return;
    const button = qs('.contact-button', dropdown);
    const menu = qs('.contact-menu', dropdown);
    let closeTimer;

    const openMenu = () => {
      clearTimeout(closeTimer);
      dropdown.classList.add('open');
      button?.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      clearTimeout(closeTimer);
      dropdown.classList.remove('open');
      button?.setAttribute('aria-expanded', 'false');
    };

    const scheduleClose = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeMenu, 220);
    };

    const toggleMenu = () => {
      if (dropdown.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    button?.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    dropdown.addEventListener('mouseenter', openMenu);
    dropdown.addEventListener('mouseleave', scheduleClose);
    dropdown.addEventListener('focusin', openMenu);
    dropdown.addEventListener('focusout', scheduleClose);

    menu?.addEventListener('pointerenter', openMenu);
    menu?.addEventListener('pointerleave', scheduleClose);

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        button?.focus();
      }
    });
  }

  function initMapWidget() {
    const widgets = qsa('[data-map-widget]');
    if (!widgets.length) return;

    widgets.forEach((widget, index) => {
      const toggle = qs('[data-map-toggle]', widget);
      const body = qs('.map-widget__body', widget);
      const iframe = qs('iframe', widget);
      if (!toggle || !body || !iframe) return;

      const mapSrc = iframe.getAttribute('data-map-src');
      const defaultLabel = toggle.getAttribute('aria-label') || '';
      const expandedLabel = toggle.getAttribute('data-label-expanded') || defaultLabel;
      const collapsedLabel = toggle.getAttribute('data-label-collapsed') || defaultLabel;

      const setExpanded = (expanded) => {
        widget.classList.toggle('is-collapsed', !expanded);
        body.setAttribute('aria-hidden', expanded ? 'false' : 'true');
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        const label = expanded ? expandedLabel : collapsedLabel;
        if (label) {
          toggle.setAttribute('aria-label', label);
          toggle.setAttribute('title', label);
        }
        if (expanded && !iframe.src && mapSrc) {
          iframe.src = mapSrc;
        }
      };

      const preferCollapsed = window.innerWidth <= 720;
      setExpanded(!preferCollapsed);

      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        setExpanded(!expanded);
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth <= 720 && toggle.getAttribute('aria-expanded') === 'true') {
          setExpanded(false);
        }
      });
    });
  }

  async function initTimeline() {
    const container = qs('[data-timeline]');
    if (!container) return;
    const loadingEl = qs('.timeline-loading', container);
    try {
      const response = await fetch('history.json', { cache: 'no-store' });
      const items = await response.json();
      renderTimeline(container, items);
      enableTimelineImageDeterrents(container);
      loadingEl?.remove();
    } catch (error) {
      if (loadingEl) loadingEl.textContent = 'Không tải được hành trình. Vui lòng thử lại.';
      console.error('Timeline load failed', error);
    }
  }

  function renderTimeline(root, items) {
    if (!Array.isArray(items) || !items.length) {
      root.innerHTML = '<p class="muted">Đang cập nhật hành trình.</p>';
      return;
    }

    const list = document.createElement('div');
    list.className = 'timeline-list';

    items.forEach((item, index) => {
      const yearLabel = item.year || item.date || '';
      const allImages = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
      const highlight = item.highlightImage || allImages[0] || '';
      const gallery = allImages.filter((src) => src && src !== highlight);

      const milestone = document.createElement('article');
      milestone.className = 'milestone';
      milestone.setAttribute('aria-label', `Năm ${yearLabel}`);

      const marker = document.createElement('div');
      marker.className = 'milestone-marker';
      marker.innerHTML = `<span class="dot"></span><span class="line"></span>`;

      const card = document.createElement('div');
      card.className = 'milestone-card';

      const meta = document.createElement('div');
      meta.className = 'milestone-meta';
      meta.innerHTML = `
        <p class="milestone-date">${yearLabel}</p>
        <h3 class="milestone-title">${item.title || 'Cột mốc ' + yearLabel}</h3>
        <p class="milestone-desc">${item.desc || ''}</p>
      `;

      const highlightWrap = document.createElement('div');
      highlightWrap.className = 'milestone-highlight';
      const mediaFrame = document.createElement('div');
      mediaFrame.className = 'featured-media';

      if (highlight) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'highlight-card';
        button.setAttribute('data-lightbox-src', highlight);
        button.setAttribute('data-lightbox-alt', `Hình nổi bật ${yearLabel}`);

        const img = document.createElement('img');
        img.src = highlight;
        img.loading = 'lazy';
        img.alt = `Hình nổi bật ${yearLabel}`;
        img.decoding = 'async';
        img.draggable = false;
        img.onerror = () => {
          button.replaceWith(createFeaturedPlaceholder(yearLabel));
        };

        button.appendChild(img);
        mediaFrame.appendChild(button);
      } else {
        mediaFrame.appendChild(createFeaturedPlaceholder(yearLabel));
      }

      highlightWrap.appendChild(mediaFrame);

      const galleryWrap = document.createElement('div');
      galleryWrap.className = 'milestone-images';

      if (gallery.length) {
        gallery.forEach((src, imgIndex) => {
          const thumbButton = document.createElement('button');
          thumbButton.type = 'button';
          thumbButton.className = 'media-thumb';
          thumbButton.setAttribute('data-lightbox-src', src);
          thumbButton.setAttribute('data-lightbox-alt', `Hình ${imgIndex + 1} - ${yearLabel}`);
          thumbButton.setAttribute('aria-label', `Xem ảnh ${imgIndex + 1} năm ${yearLabel}`);

          const img = document.createElement('img');
          img.src = src;
          img.loading = 'lazy';
          img.alt = `Hình ${imgIndex + 1} - ${yearLabel}`;
          img.decoding = 'async';
          img.draggable = false;
          img.onerror = () => {
            img.src = 'assets/history/placeholder.svg';
          };

          thumbButton.appendChild(img);
          galleryWrap.appendChild(thumbButton);
        });
      } else {
        galleryWrap.innerHTML = '<p class="muted">Đang cập nhật thêm hình.</p>';
      }

      const gallerySection = document.createElement('div');
      gallerySection.className = 'milestone-gallery';
      if (gallery.length) {
        const controls = document.createElement('div');
        controls.className = 'gallery-controls';
        const previous = document.createElement('button');
        const next = document.createElement('button');
        previous.type = next.type = 'button';
        previous.className = next.className = 'gallery-arrow';
        previous.textContent = '‹';
        next.textContent = '›';
        previous.setAttribute('aria-label', `Ảnh trước năm ${yearLabel}`);
        next.setAttribute('aria-label', `Ảnh tiếp theo năm ${yearLabel}`);
        galleryWrap.id = `gallery-${index}`;
        previous.setAttribute('aria-controls', galleryWrap.id);
        next.setAttribute('aria-controls', galleryWrap.id);
        galleryWrap.tabIndex = 0;
        galleryWrap.setAttribute('role', 'region');
        galleryWrap.setAttribute('aria-label', `Danh sách ảnh năm ${yearLabel}`);
        const updateControls = () => {
          const max = galleryWrap.scrollWidth - galleryWrap.clientWidth;
          previous.disabled = galleryWrap.scrollLeft <= 1;
          next.disabled = galleryWrap.scrollLeft >= max - 1;
        };
        const move = (direction) => galleryWrap.scrollBy({
          left: direction * Math.max(140, galleryWrap.clientWidth * 0.8),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
        previous.addEventListener('click', () => move(-1));
        next.addEventListener('click', () => move(1));
        galleryWrap.addEventListener('scroll', updateControls, { passive: true });
        galleryWrap.addEventListener('keydown', (event) => {
          if (event.target !== galleryWrap) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        });
        new ResizeObserver(updateControls).observe(galleryWrap);
        controls.append(previous, next);
        gallerySection.appendChild(controls);
      }
      gallerySection.appendChild(galleryWrap);
      card.append(meta, highlightWrap, gallerySection);
      milestone.append(marker, card);
      list.appendChild(milestone);

      if (index === items.length - 1) {
        marker.classList.add('is-last');
      }
    });

    root.innerHTML = '';
    root.appendChild(list);
  }

  function enableTimelineImageDeterrents(root) {
    if (!root) return;
    root.addEventListener('contextmenu', (event) => {
      const img = event.target.closest('img');
      if (img && root.contains(img)) {
        event.preventDefault();
      }
    });
  }

  function initLightbox() {
    const lightbox = qs('[data-lightbox]');
    if (!lightbox) return;
    const img = qs('[data-lightbox-img]', lightbox);
    const caption = qs('[data-lightbox-caption]', lightbox);
    const closeBtn = qs('[data-lightbox-close]', lightbox);
    const previous = qs('[data-lightbox-prev]', lightbox);
    const next = qs('[data-lightbox-next]', lightbox);
    let images = [];
    let activeIndex = 0;
    let opener;
    const showImage = () => {
      const trigger = images[activeIndex];
      img.src = trigger.getAttribute('data-lightbox-src');
      img.alt = trigger.getAttribute('data-lightbox-alt') || 'Hình ảnh';
      caption.textContent = `${activeIndex + 1}/${images.length} · ${img.alt}`;
      previous.disabled = activeIndex === 0;
      next.disabled = activeIndex === images.length - 1;
    };
    const moveImage = (direction) => {
      activeIndex = Math.max(0, Math.min(images.length - 1, activeIndex + direction));
      showImage();
    };
    previous?.addEventListener('click', () => moveImage(-1));
    next?.addEventListener('click', () => moveImage(1));

    const close = () => {
      lightbox.setAttribute('hidden', '');
      document.body.classList.remove('no-scroll');
      img.src = '';
      opener?.focus({ preventScroll: true });
    };

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-lightbox-src]');
      if (!trigger) return;
      event.preventDefault();
      opener = trigger;
      images = qsa('[data-lightbox-src]', trigger.closest('.milestone') || document);
      activeIndex = images.indexOf(trigger);
      showImage();
      lightbox.removeAttribute('hidden');
      document.body.classList.add('no-scroll');
      closeBtn?.focus();
    });

    closeBtn?.addEventListener('click', close);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        close();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (lightbox.hasAttribute('hidden')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        moveImage(event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
  }

  function createFeaturedPlaceholder(yearLabel) {
    const wrap = document.createElement('div');
    wrap.className = 'featured-placeholder';
    wrap.innerHTML = `
      <div class="placeholder-graphic" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="presentation" focusable="false">
          <rect x="12" y="18" width="40" height="28" rx="6" ry="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
          <circle cx="22" cy="30" r="5" fill="#cbd5e1"/>
          <path d="M28 42c3-4 7-6 12-6 5 0 9 2 12 6" stroke="#cbd5e1" stroke-width="2" fill="none" stroke-linecap="round"/>
          <rect x="24" y="14" width="16" height="6" rx="2" fill="#cbd5e1"/>
        </svg>
      </div>
      <p class="muted">Chưa có ảnh nổi bật${yearLabel ? ' ' + yearLabel : ''}</p>
    `;
    return wrap;
  }
})();
