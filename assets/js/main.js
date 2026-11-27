(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) return;

  const ICONS = {
    github:
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
    mail:
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
    twitter:
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4l11.733 16h4.267l-11.733-16z"></path><path d="M4 20l6.768-6.768m2.46-2.46L20 4"></path></svg>',
    globe:
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    external:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
  };

  let activeCategory = "全部";
  let lastFocusedTrigger = null;
  let toastTimer = null;

  function $(id) {
    return document.getElementById(id);
  }

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === "string") el.textContent = text;
    return el;
  }

  function showToast(message) {
    const toast = $("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 2400);
  }

  /* ------------------------------------------------------------------------
     Render Content from SITE_DATA
     ------------------------------------------------------------------------ */

  function renderSocialChips(container) {
    if (!container || !Array.isArray(data.socials)) return;
    container.innerHTML = "";

    data.socials.forEach(function (item) {
      const link = createEl("a", "social-chip");
      link.href = item.href;
      if (item.href && !item.href.startsWith("mailto:")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      const iconWrap = createEl("span");
      iconWrap.innerHTML = ICONS[item.icon] || ICONS.globe;
      const label = createEl("span", "", item.label);
      link.appendChild(iconWrap);
      link.appendChild(label);
      container.appendChild(link);
    });
  }

  function renderProfile() {
    const p = data.profile;
    if (!p) return;

    document.title = p.pageTitle || p.name + " · 个人主页";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && p.tagline) metaDesc.setAttribute("content", p.tagline);

    $("brand-name").textContent = p.brand || p.name;
    $("hero-badge-text").textContent = p.badge || "";
    $("hero-prefix").textContent = p.headlinePrefix || "你好，我是";
    $("hero-name").textContent = p.name;
    $("hero-accent").textContent = p.headlineAccent || "";
    $("hero-tagline").textContent = p.tagline || "";

    const resumeBtn = $("hero-resume");
    if (p.resumeUrl) {
      resumeBtn.href = p.resumeUrl;
      resumeBtn.hidden = false;
    } else {
      resumeBtn.hidden = true;
    }

    $("card-name").textContent = p.name;
    $("card-location").textContent = p.location || "";

    const factsList = $("profile-facts");
    if (factsList && Array.isArray(p.facts)) {
      factsList.innerHTML = "";
      p.facts.forEach(function (fact) {
        const row = createEl("div", "fact-row");
        row.appendChild(createEl("dt", "", fact.label));
        row.appendChild(createEl("dd", fact.highlight ? "fact-available" : "", fact.value));
        factsList.appendChild(row);
      });
    }

    const avatarBox = $("profile-avatar");
    avatarBox.innerHTML = "";
    if (p.avatarUrl) {
      const img = document.createElement("img");
      img.src = p.avatarUrl;
      img.alt = p.name;
      avatarBox.appendChild(img);
    } else {
      avatarBox.textContent = p.initials || p.name.slice(0, 2);
    }

    renderSocialChips($("hero-socials"));
    renderSocialChips($("contact-socials"));

    if (p.email) {
      $("contact-mailto").href = "mailto:" + p.email;
      $("contact-email-text").textContent = p.email;
    }

    $("footer-year").textContent = String(new Date().getFullYear());
    $("footer-name").textContent = p.name;
    if (data.footer && data.footer.note) {
      $("footer-note").textContent = data.footer.note;
    }
  }

  function renderAbout() {
    const about = data.about;
    if (!about) return;

    $("about-title").textContent = about.title || "关于我";
    $("about-subtitle").textContent = about.subtitle || "";

    const paraWrap = $("about-paragraphs");
    paraWrap.innerHTML = "";
    (about.paragraphs || []).forEach(function (text) {
      paraWrap.appendChild(createEl("p", "", text));
    });

    const statsWrap = $("about-highlights");
    statsWrap.innerHTML = "";
    (about.highlights || []).forEach(function (stat) {
      const card = createEl("div", "stat-card");
      card.appendChild(createEl("div", "stat-value", stat.value));
      card.appendChild(createEl("div", "stat-label", stat.label));
      statsWrap.appendChild(card);
    });
  }

  function renderSkills() {
    const grid = $("skills-grid");
    if (!grid) return;
    grid.innerHTML = "";

    (data.skills || []).forEach(function (group) {
      const card = createEl("article", "skill-card reveal");
      card.appendChild(createEl("h3", "skill-card-title", group.category));
      if (group.description) {
        card.appendChild(createEl("p", "skill-card-desc", group.description));
      }
      const tags = createEl("div", "tag-list");
      (group.items || []).forEach(function (skill) {
        tags.appendChild(createEl("span", "tag", skill));
      });
      card.appendChild(tags);
      grid.appendChild(card);
    });
  }

  function renderProjectFilters() {
    const bar = $("project-filters");
    if (!bar) return;
    bar.innerHTML = "";

    const categories =
      Array.isArray(data.projectCategories) && data.projectCategories.length > 0
        ? data.projectCategories
        : ["全部"];

    categories.forEach(function (cat) {
      const btn = createEl("button", "filter-btn", cat);
      btn.type = "button";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", cat === activeCategory ? "true" : "false");
      if (cat === activeCategory) btn.classList.add("is-active");

      btn.addEventListener("click", function () {
        activeCategory = cat;
        renderProjectFilters();
        renderProjects(true);
      });
      bar.appendChild(btn);
    });
  }

  function renderProjects(immediateVisible) {
    const grid = $("projects-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = (data.projects || []).filter(function (project) {
      return activeCategory === "全部" || project.category === activeCategory;
    });

    filtered.forEach(function (project) {
      const card = createEl(
        "article",
        immediateVisible ? "project-card reveal is-visible" : "project-card reveal"
      );

      const head = createEl("div", "project-card-head");
      head.appendChild(createEl("span", "project-category", project.category));
      head.appendChild(createEl("span", "project-year", project.year || ""));
      card.appendChild(head);

      card.appendChild(createEl("h3", "project-title", project.title));
      card.appendChild(createEl("p", "project-summary", project.summary));

      const tags = createEl("div", "tag-list");
      (project.tags || []).forEach(function (tag) {
        tags.appendChild(createEl("span", "tag", tag));
      });
      card.appendChild(tags);

      const footer = createEl("div", "project-footer");
      const detailBtn = createEl("button", "text-link text-link-primary", "查看详情 →");
      detailBtn.type = "button";
      detailBtn.addEventListener("click", function () {
        openProjectModal(project, detailBtn);
      });
      footer.appendChild(detailBtn);

      const links = createEl("div", "project-links");
      if (project.repoUrl && project.repoUrl !== "#") {
        const repoLink = createEl("a", "text-link");
        repoLink.href = project.repoUrl;
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        repoLink.innerHTML = "源码 " + ICONS.external;
        links.appendChild(repoLink);
      }
      if (project.demoUrl && project.demoUrl !== "#") {
        const demoLink = createEl("a", "text-link");
        demoLink.href = project.demoUrl;
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";
        demoLink.innerHTML = "在线演示 " + ICONS.external;
        links.appendChild(demoLink);
      }
      footer.appendChild(links);

      card.appendChild(footer);
      grid.appendChild(card);
    });
  }

  function renderTimeline() {
    const list = $("timeline-list");
    if (!list) return;
    list.innerHTML = "";

    (data.timeline || []).forEach(function (entry) {
      const item = createEl("li", "timeline-item reveal");
      const head = createEl("div", "timeline-head");
      head.appendChild(createEl("h3", "timeline-role", entry.role));
      head.appendChild(createEl("span", "timeline-period", entry.period));
      item.appendChild(head);

      if (entry.org) {
        item.appendChild(createEl("p", "timeline-org", entry.org));
      }
      if (entry.description) {
        item.appendChild(createEl("p", "timeline-desc", entry.description));
      }
      list.appendChild(item);
    });
  }

  function renderContact() {
    if (!data.contact) return;
    $("contact-title").textContent = data.contact.title || "保持联系";
    $("contact-description").textContent = data.contact.description || "";
  }

  /* ------------------------------------------------------------------------
     Project Detail Modal
     ------------------------------------------------------------------------ */

  function openProjectModal(project, triggerEl) {
    const backdrop = $("project-modal");
    if (!backdrop) return;

    lastFocusedTrigger = triggerEl || document.activeElement;
    $("modal-meta").textContent = [project.category, project.year].filter(Boolean).join(" · ");
    $("modal-title").textContent = project.title;
    $("modal-description").textContent = project.description || project.summary;

    const highlightsWrap = $("modal-highlights-wrap");
    const highlightsList = $("modal-highlights");
    highlightsList.innerHTML = "";
    if (Array.isArray(project.highlights) && project.highlights.length > 0) {
      highlightsWrap.hidden = false;
      project.highlights.forEach(function (point) {
        highlightsList.appendChild(createEl("li", "", point));
      });
    } else {
      highlightsWrap.hidden = true;
    }

    const tagsWrap = $("modal-tags");
    tagsWrap.innerHTML = "";
    (project.tags || []).forEach(function (tag) {
      tagsWrap.appendChild(createEl("span", "tag", tag));
    });

    const actions = $("modal-actions");
    actions.innerHTML = "";

    if (project.repoUrl && project.repoUrl !== "#") {
      const repoBtn = createEl("a", "btn btn-primary", "访问 GitHub 仓库");
      repoBtn.href = project.repoUrl;
      repoBtn.target = "_blank";
      repoBtn.rel = "noopener noreferrer";
      actions.appendChild(repoBtn);
    }

    if (project.demoUrl && project.demoUrl !== "#") {
      const demoBtn = createEl("a", "btn btn-secondary", "打开在线演示");
      demoBtn.href = project.demoUrl;
      demoBtn.target = "_blank";
      demoBtn.rel = "noopener noreferrer";
      actions.appendChild(demoBtn);
    }

    const closeAction = createEl("button", "btn btn-ghost", "关闭");
    closeAction.type = "button";
    closeAction.addEventListener("click", closeProjectModal);
    actions.appendChild(closeAction);

    backdrop.hidden = false;
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("modal-close").focus();
  }

  function closeProjectModal() {
    const backdrop = $("project-modal");
    if (!backdrop || backdrop.hidden) return;
    backdrop.hidden = true;
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
      lastFocusedTrigger.focus();
    }
  }

  function setupModalEvents() {
    const backdrop = $("project-modal");
    const closeBtn = $("modal-close");
    if (!backdrop || !closeBtn) return;

    closeBtn.addEventListener("click", closeProjectModal);
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) closeProjectModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !backdrop.hidden) {
        closeProjectModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Theme Toggle & Navigation
     ------------------------------------------------------------------------ */

  function setupThemeToggle() {
    const btn = $("theme-toggle");
    if (!btn) return;

    function applyTheme(theme, persist) {
      document.documentElement.setAttribute("data-theme", theme);
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "切换到浅色模式" : "切换到深色模式"
      );
      if (persist) {
        try {
          localStorage.setItem("site-theme", theme);
        } catch (e) {
          // ignore storage errors
        }
      }
    }

    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current, false);

    btn.addEventListener("click", function () {
      const now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(now, true);
      showToast(now === "dark" ? "已切换为深色模式" : "已切换为浅色模式");
    });

    if (window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", function (event) {
        try {
          if (!localStorage.getItem("site-theme")) {
            applyTheme(event.matches ? "dark" : "light", false);
          }
        } catch (e) {
          applyTheme(event.matches ? "dark" : "light", false);
        }
      });
    }
  }

  function setupMobileMenu() {
    const toggle = $("mobile-menu-toggle");
    const menu = $("mobile-nav");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.hidden = !open;
    }

    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!expanded);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !menu.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function setupCopyEmail() {
    const btn = $("copy-email-btn");
    if (!btn) return;

    btn.addEventListener("click", function () {
      const email = data.profile && data.profile.email;
      if (!email) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(email)
          .then(function () {
            showToast("已复制邮箱：" + email);
          })
          .catch(function () {
            fallbackCopy(email);
          });
      } else {
        fallbackCopy(email);
      }
    });
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast("已复制邮箱：" + text);
    } catch (e) {
      showToast("请手动复制邮箱：" + text);
    }
    document.body.removeChild(textarea);
  }

  function setupScrollEffects() {
    const header = $("site-header");
    function onScroll() {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    // Active section nav link
    const navLinks = Array.from(document.querySelectorAll(".site-nav .nav-link"));
    const sections = navLinks
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length > 0) {
      const sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const id = "#" + entry.target.id;
              navLinks.forEach(function (link) {
                link.classList.toggle("is-active", link.getAttribute("href") === id);
              });
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      sections.forEach(function (sec) {
        sectionObserver.observe(sec);
      });
    }
  }

  /* ------------------------------------------------------------------------
     Init
     ------------------------------------------------------------------------ */

  renderProfile();
  renderAbout();
  renderSkills();
  renderProjectFilters();
  renderProjects(false);
  renderTimeline();
  renderContact();

  setupThemeToggle();
  setupMobileMenu();
  setupModalEvents();
  setupCopyEmail();
  setupScrollEffects();
})();
