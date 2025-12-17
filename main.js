(function () {
  const qs = (selector, root = document) => (root ? root.querySelector(selector) : null);
  const qsa = (selector, root = document) => (root ? Array.from(root.querySelectorAll(selector)) : []);

  document.addEventListener('DOMContentLoaded', () => {
    initNavToggle();
    initContactDropdown();
    initTimeline();
    initLightbox();
    initVideoLibrary();
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
        highlightWrap.appendChild(button);
      } else {
        highlightWrap.appendChild(createFeaturedPlaceholder(yearLabel));
      }

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

      card.append(meta, highlightWrap, galleryWrap);
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

    const close = () => {
      lightbox.setAttribute('hidden', '');
      document.body.classList.remove('no-scroll');
      img.src = '';
    };

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-lightbox-src]');
      if (!trigger) return;
      event.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const alt = trigger.getAttribute('data-lightbox-alt') || trigger.getAttribute('alt') || 'Hình ảnh';
      img.src = src;
      img.alt = alt;
      caption.textContent = alt;
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
      if (!lightbox.hasAttribute('hidden') && event.key === 'Escape') {
        close();
      }
    });
  }

  async function initVideoLibrary() {
    const grid = qs('[data-video-grid]');
    if (!grid) return;
    const filterWrap = qs('[data-video-filters]');
    const searchInput = qs('[data-video-search]');
    const modal = qs('[data-video-modal]');
    const modalTitle = qs('[data-video-title]', modal);
    const modalFrame = modal ? qs('iframe', modal) : null;
    const modalClose = qs('[data-video-close]', modal);

    const state = { tag: 'all', query: '' };
    let videos = [];

    const closeModal = () => {
      if (modal) {
        modal.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }
      if (modalFrame) {
        modalFrame.src = '';
      }
    };

    try {
      const response = await fetch('videos.json', { cache: 'no-store' });
      videos = await response.json();
    } catch (error) {
      grid.innerHTML = '<p class="muted">Không tải được danh sách video.</p>';
      console.error('Video load failed', error);
      return;
    }

    const allTags = Array.from(
      new Set(
        videos
          .map((item) => item.tags || [])
          .flat()
          .filter(Boolean)
      )
    );

    if (filterWrap) {
      const allButton = createFilterChip('Tất cả', 'all', state);
      filterWrap.appendChild(allButton);
      allTags.forEach((tag) => {
        filterWrap.appendChild(createFilterChip(tag, tag, state));
      });
      setActiveFilter(filterWrap, state.tag);
    }

    const render = () => {
      const query = state.query.trim().toLowerCase();
      const filtered = videos.filter((video) => {
        const matchTag = state.tag === 'all' || (video.tags || []).includes(state.tag);
        const matchQuery =
          !query ||
          (video.title && video.title.toLowerCase().includes(query)) ||
          (video.desc && video.desc.toLowerCase().includes(query)) ||
          (video.tags || []).some((tag) => tag.toLowerCase().includes(query));
        return matchTag && matchQuery;
      });

      if (!filtered.length) {
        grid.innerHTML = '<p class="muted">Không tìm thấy video phù hợp.</p>';
        return;
      }

      grid.innerHTML = '';
      filtered.forEach((video) => {
        const card = document.createElement('article');
        card.className = 'video-card';
        card.innerHTML = `
          <button class="video-thumb" type="button" data-video-id="${video.id}">
            <img src="${video.thumbnail}" alt="Xem video: ${video.title}" loading="lazy">
            <span class="play-badge" aria-hidden="true">▶</span>
          </button>
          <div class="video-body">
            <h3 class="video-title">${video.title || ''}</h3>
            <p class="video-desc">${video.desc || ''}</p>
            <div class="video-tags">
              ${(video.tags || [])
                .map((tag) => `<span class="chip">${tag}</span>`)
                .join('')}
            </div>
            <button class="ghost-link" type="button" data-video-id="${video.id}">Xem</button>
          </div>
        `;
        grid.appendChild(card);
      });
    };

    const openVideo = (videoId) => {
      const video = videos.find((item) => item.id === videoId);
      if (!video || !modal || !modalFrame) return;
      const embedUrl =
        video.provider === 'youtube'
          ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&modestbranding=1`
          : video.url;
      modalFrame.src = embedUrl;
      if (modalTitle) modalTitle.textContent = video.title || 'Video';
      modal.classList.add('is-open');
      document.body.classList.add('no-scroll');
      modalClose?.focus();
    };

    render();

    searchInput?.addEventListener('input', (event) => {
      state.query = event.target.value;
      render();
    });

    filterWrap?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter-value]');
      if (!button) return;
      state.tag = button.getAttribute('data-filter-value');
      setActiveFilter(filterWrap, state.tag);
      render();
    });

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-video-id]');
      if (!trigger) return;
      openVideo(trigger.getAttribute('data-video-id'));
    });

    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  function createFilterChip(label, value, state) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'filter-chip';
    chip.textContent = label;
    chip.setAttribute('data-filter-value', value);
    chip.setAttribute('aria-pressed', value === state.tag ? 'true' : 'false');
    return chip;
  }

  function setActiveFilter(container, activeValue) {
    qsa('[data-filter-value]', container).forEach((chip) => {
      const isActive = chip.getAttribute('data-filter-value') === activeValue;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
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
