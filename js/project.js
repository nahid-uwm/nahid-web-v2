/* Project detail page renderer */
(() => {
    'use strict';
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const data = (window.PROJECTS || {})[id];

    const stage = $('#projectStage');
    const notFound = $('#projectNotFound');

    if (!data) {
        if (stage) stage.hidden = true;
        if (notFound) notFound.hidden = false;
        document.title = 'Project not found — MD Nahid Hasan';
        return;
    }

    /* doc title + canonical */
    document.title = `${data.title} — MD Nahid Hasan`;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${data.title} — MD Nahid Hasan`);

    /* helpers */
    const set = (sel, val) => { const el = $(sel); if (el && val != null) el.textContent = val; };

    /* mission id from project key (zero-padded index in PROJECTS object) */
    const ids = Object.keys(window.PROJECTS);
    const idx = ids.indexOf(id) + 1;
    set('#projMissionId', `MISSION // ${String(idx).padStart(4, '0')}`);

    set('#projTitle', data.title);
    set('#projSummary', data.summary);
    set('#projFocusText', data.focus);
    set('#projYear', data.year);
    set('#projRole', data.role);
    set('#projEngine', data.engine);
    set('#projDomain', data.domain);
    set('#projDomain2', data.domain);
    set('#projFrameNum', String(idx).padStart(3, '0'));

    /* status pill — assign variant class */
    const status = $('#projStatus');
    if (status) {
        status.textContent = data.status;
        status.classList.add(data.statusVariant || 'active');
    }

    /* hero image */
    const heroImg = $('#projHeroImg');
    if (heroImg) {
        heroImg.src = data.cover;
        heroImg.alt = data.title;
    }

    /* tags */
    const tagsEl = $('#projTags');
    if (tagsEl && data.tags) {
        tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
    }

    /* overview paragraphs */
    const overviewEl = $('#projOverview');
    if (overviewEl && data.overview) {
        overviewEl.innerHTML = data.overview.map(p => `<p>${p}</p>`).join('');
    }

    /* capabilities — numbered cards with HUD chrome */
    const capsEl = $('#projCaps');
    if (capsEl && data.features && data.features.length) {
        capsEl.innerHTML = data.features.map((f, i) => `
            <div class="cap-card">
                <div class="cap-head">
                    <span class="cap-num">CAP / ${String(i + 1).padStart(2, '0')}</span>
                    <span class="cap-pip" aria-hidden="true"></span>
                </div>
                <p class="cap-text">${f}</p>
            </div>
        `).join('');
    } else {
        const block = $('#capabilities');
        if (block) block.hidden = true;
    }

    /* video embed or empty-state */
    const videoBlock = $('#projVideoBlock');
    if (videoBlock) {
        if (data.youtube) {
            videoBlock.innerHTML = `
                <div class="demo-wrap">
                    <span class="hud-corner tl" aria-hidden="true"></span>
                    <span class="hud-corner tr" aria-hidden="true"></span>
                    <span class="hud-corner bl" aria-hidden="true"></span>
                    <span class="hud-corner br" aria-hidden="true"></span>
                    <iframe src="https://www.youtube.com/embed/${data.youtube}"
                        title="${data.title} — video demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen loading="lazy"
                        referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    <div class="demo-foot">
                        <span class="demo-meta"><span class="dot"></span> SOURCE / YOUTUBE</span>
                        <span class="demo-meta">REF / ${data.youtube}</span>
                    </div>
                </div>`;
        } else {
            videoBlock.innerHTML = `
                <div class="demo-empty">
                    <span class="hud-corner tl" aria-hidden="true"></span>
                    <span class="hud-corner tr" aria-hidden="true"></span>
                    <span class="hud-corner bl" aria-hidden="true"></span>
                    <span class="hud-corner br" aria-hidden="true"></span>
                    <span class="demo-empty-lbl">// SIGNAL OFFLINE</span>
                    <p class="demo-empty-text">No public demo footage published for this project yet.</p>
                </div>`;
        }
    }

    /* external links — channel rows */
    const linksEl = $('#projLinks');
    if (linksEl) {
        if (data.links && data.links.length) {
            linksEl.innerHTML = data.links.map((l, i) => `
                <a class="channel" href="${l.href}" target="_blank" rel="noopener">
                    <span class="channel-num">CH / ${String(i + 1).padStart(2, '0')}</span>
                    <span class="channel-label">${l.label}</span>
                    <span class="channel-host">${(new URL(l.href)).hostname.replace(/^www\./, '')}</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
                </a>
            `).join('');
        } else {
            linksEl.innerHTML = `
                <div class="demo-empty channel-empty">
                    <span class="demo-empty-lbl">// NO EXTERNAL CHANNELS</span>
                    <p class="demo-empty-text">No public links shared for this project. <a href="index.html#contact" class="link-inline">Reach out</a> for more info.</p>
                </div>`;
        }
    }

    /* related — show 3 other projects */
    const relatedEl = $('#projRelated');
    if (relatedEl) {
        const others = ids.filter(k => k !== id);
        const pick = others.sort(() => Math.random() - 0.5).slice(0, 3);
        relatedEl.innerHTML = pick.map(rid => {
            const r = window.PROJECTS[rid];
            return `
            <a class="rel-card" href="project.html?id=${rid}">
                <div class="rel-media"><img src="${r.cover}" alt="${r.title}" loading="lazy"></div>
                <div class="rel-body">
                    <span class="rel-cat">${r.domain}</span>
                    <h3>${r.title}</h3>
                </div>
            </a>`;
        }).join('');
    }

    /* TOC scroll-spy — highlight active section */
    const tocLinks = $$('a[data-toc]');
    if (tocLinks.length && 'IntersectionObserver' in window) {
        const targets = tocLinks
            .map(l => ({ link: l, el: document.querySelector(l.getAttribute('href')) }))
            .filter(t => t.el);
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const target = targets.find(t => t.el === e.target);
                    if (target) {
                        tocLinks.forEach(l => l.classList.remove('is-active'));
                        target.link.classList.add('is-active');
                    }
                }
            });
        }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
        targets.forEach(t => obs.observe(t.el));
    }
})();
