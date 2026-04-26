/* v2 — interactions, sound, reveal, theme. Vanilla, no deps. */
(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const ls = window.localStorage;

    /* -------------------- Sound system -------------------- */
    const Sound = (() => {
        let ctx = null;
        let enabled = ls.getItem('v2.sound') === '1';
        const userActed = { v: false };

        const ensure = () => {
            if (!ctx) {
                try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
                catch { ctx = null; }
            }
            if (ctx && ctx.state === 'suspended') ctx.resume();
            return ctx;
        };

        const tone = ({ freq = 880, dur = 0.06, type = 'sine', vol = 0.05, slide = 0 }) => {
            if (!enabled || !userActed.v) return;
            const c = ensure(); if (!c) return;
            const t0 = c.currentTime;
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, t0);
            if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(80, freq + slide), t0 + dur);
            gain.gain.setValueAtTime(0.0001, t0);
            gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
            osc.connect(gain).connect(c.destination);
            osc.start(t0); osc.stop(t0 + dur + 0.02);
        };

        return {
            hover: () => tone({ freq: 1400, dur: 0.04, type: 'sine', vol: 0.025 }),
            click: () => tone({ freq: 720, dur: 0.05, type: 'square', vol: 0.04, slide: 200 }),
            confirm: () => { tone({ freq: 660, dur: 0.05, type: 'sine', vol: 0.05 }); setTimeout(() => tone({ freq: 990, dur: 0.07, type: 'sine', vol: 0.05 }), 60); },
            error: () => tone({ freq: 220, dur: 0.16, type: 'sawtooth', vol: 0.04, slide: -60 }),
            isOn: () => enabled,
            toggle: () => { enabled = !enabled; ls.setItem('v2.sound', enabled ? '1' : '0'); return enabled; },
            markUserActed: () => { userActed.v = true; ensure(); }
        };
    })();

    /* -------------------- Theme toggle -------------------- */
    const initTheme = () => {
        const saved = ls.getItem('v2.theme');
        const sysLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        const theme = saved || (sysLight ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', theme);

        const btn = $('#themeToggle');
        if (!btn) return;
        const sync = () => {
            const t = document.documentElement.getAttribute('data-theme');
            btn.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} theme`);
            btn.querySelector('.icon-sun').style.display = t === 'dark' ? 'none' : 'block';
            btn.querySelector('.icon-moon').style.display = t === 'dark' ? 'block' : 'none';
        };
        sync();
        btn.addEventListener('click', () => {
            Sound.markUserActed(); Sound.click();
            const cur = document.documentElement.getAttribute('data-theme');
            const next = cur === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            ls.setItem('v2.theme', next);
            sync();
        });
    };

    /* -------------------- Sound toggle UI -------------------- */
    const initSoundToggle = () => {
        const btn = $('#soundToggle');
        if (!btn) return;
        const sync = () => {
            const on = Sound.isOn();
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            btn.setAttribute('aria-label', `Sound ${on ? 'on' : 'off'}`);
            btn.querySelector('.icon-on').style.display = on ? 'block' : 'none';
            btn.querySelector('.icon-off').style.display = on ? 'none' : 'block';
        };
        sync();
        btn.addEventListener('click', () => {
            Sound.markUserActed();
            const on = Sound.toggle();
            sync();
            if (on) Sound.confirm();
        });
    };

    /* -------------------- Nav scroll state + active link -------------------- */
    const initNav = () => {
        const nav = $('.nav');
        if (!nav) return;
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        // active link tracking
        const links = $$('.nav-link[href^="#"]');
        const map = new Map();
        links.forEach(l => {
            const id = l.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) map.set(target, l);
        });
        if (map.size && 'IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const link = map.get(e.target);
                    if (!link) return;
                    if (e.isIntersecting) {
                        links.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
            map.forEach((_, t) => obs.observe(t));
        }
    };

    /* -------------------- Mobile menu -------------------- */
    const initMobileMenu = () => {
        const burger = $('#burger');
        const menu = $('#mobileMenu');
        if (!burger || !menu) return;
        const toggle = (open) => {
            const o = open ?? !burger.classList.contains('open');
            burger.classList.toggle('open', o);
            menu.classList.toggle('open', o);
            burger.setAttribute('aria-expanded', o ? 'true' : 'false');
            document.body.style.overflow = o ? 'hidden' : '';
        };
        burger.addEventListener('click', () => { Sound.markUserActed(); Sound.click(); toggle(); });
        $$('.mobile-menu .nav-link').forEach(l => l.addEventListener('click', () => toggle(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
    };

    /* -------------------- Reveal on scroll -------------------- */
    const initReveal = () => {
        if (reduceMotion) {
            $$('.reveal').forEach(el => el.classList.add('in'));
            return;
        }
        if (!('IntersectionObserver' in window)) {
            $$('.reveal').forEach(el => el.classList.add('in'));
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        $$('.reveal').forEach(el => obs.observe(el));
    };

    /* -------------------- Counter (count up when in view) -------------------- */
    const initCounters = () => {
        if (reduceMotion) return;
        const counters = $$('[data-count]');
        if (!counters.length || !('IntersectionObserver' in window)) return;

        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const animate = (el) => {
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const dur = 900;
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min(1, (now - start) / dur);
                const v = Math.round(target * ease(t));
                el.textContent = v + suffix;
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
            });
        }, { threshold: 0.4 });
        counters.forEach(c => { c.textContent = '0'; obs.observe(c); });
    };

    /* -------------------- Sound bindings on interactive elements -------------------- */
    const initSoundBindings = () => {
        const click = (e) => { Sound.markUserActed(); Sound.click(); };
        const hover = () => Sound.hover();

        $$('.btn, .nav-link, .icon-btn, .vid .thumb').forEach(el => {
            el.addEventListener('click', click);
            el.addEventListener('mouseenter', hover);
        });

        // first interaction unlocks audio
        const unlock = () => { Sound.markUserActed(); window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); };
        window.addEventListener('pointerdown', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
    };

    /* -------------------- Carousel controls -------------------- */
    const initCarousel = () => {
        const track = $('#videoCarousel');
        if (!track) return;
        const left = $('#carLeft'), right = $('#carRight');
        const step = () => Math.min(track.clientWidth * 0.9, 600);
        left?.addEventListener('click', () => { Sound.markUserActed(); Sound.click(); track.scrollBy({ left: -step(), behavior: 'smooth' }); });
        right?.addEventListener('click', () => { Sound.markUserActed(); Sound.click(); track.scrollBy({ left: step(), behavior: 'smooth' }); });
    };

    /* -------------------- YouTube embed (replace thumb on click) -------------------- */
    window.loadVideo = function (el, id) {
        Sound.markUserActed(); Sound.confirm();
        const wrap = el.closest('.thumb') || el;
        wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen frameborder="0" style="width:100%;height:100%;position:absolute;inset:0;border:0;"></iframe>`;
    };

    /* -------------------- Copy-to-clipboard buttons -------------------- */
    const initCopyButtons = () => {
        const fallbackCopy = (text) => {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch {}
            document.body.removeChild(ta);
        };
        $$('.btn-copy, .contact-copy').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                Sound.markUserActed();
                const val = btn.dataset.copy || '';
                if (!val) return;
                let ok = false;
                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(val);
                        ok = true;
                    } else {
                        fallbackCopy(val);
                        ok = true;
                    }
                } catch { ok = false; }
                if (ok) {
                    btn.classList.add('copied');
                    Sound.confirm();
                    clearTimeout(btn._t);
                    btn._t = setTimeout(() => btn.classList.remove('copied'), 1600);
                } else {
                    Sound.error();
                }
            });
        });
    };

    /* -------------------- CV download (placeholder — opens email if no asset) -------------------- */
    const initCV = () => {
        $$('#downloadCV, #downloadCV2').forEach(b => {
            b.addEventListener('click', () => {
                Sound.markUserActed(); Sound.confirm();
                window.location.href = 'mailto:hasan26@uwm.edu?subject=CV%20request';
            });
        });
    };

    /* -------------------- Smooth anchor scrolling helper -------------------- */
    const initSmooth = () => {
        $$('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const id = a.getAttribute('href');
                if (id.length < 2) return;
                const t = document.querySelector(id);
                if (!t) return;
                e.preventDefault();
                t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            });
        });
    };

    /* -------------------- Boot -------------------- */
    const ready = () => {
        initTheme();
        initSoundToggle();
        initNav();
        initMobileMenu();
        initReveal();
        initCounters();
        initSoundBindings();
        initCarousel();
        initCV();
        initCopyButtons();
        initSmooth();
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else { ready(); }
})();
