/* =================================================================
   MODERN MINIMAL — runtime
   - Section eyebrows ("01 / PROFILE") + big stroke numbers (data-num)
   - Stat count-up
   - Top scroll-progress hairline
   ================================================================= */

(function () {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Map: section id → { label, num }. Order matches DOM sequence.
    const SECTIONS = [
        { id: 'about',        label: 'PROFILE'      },
        { id: 'research',     label: 'RESEARCH'     },
        { id: 'publications', label: 'PUBLICATIONS' },
        { id: 'projects',     label: 'PROJECTS'     },
        { id: 'videos',       label: 'TALKS'        },
        { id: 'teaching',     label: 'EXPERIENCE'   },
        { id: 'education',    label: 'EDUCATION'    },
        { id: 'lab',          label: 'LAB'          },
        { id: 'contact',      label: 'CONTACT'      },
    ];

    // Section numbers + injected eyebrow
    function annotateSections() {
        SECTIONS.forEach((s, i) => {
            const sec = document.getElementById(s.id);
            if (!sec) return;
            const h2 = sec.querySelector('h2.tektur');
            if (!h2) return;
            const num = String(i + 1).padStart(2, '0');
            h2.setAttribute('data-num', num);
            // Inject eyebrow once
            if (!sec.querySelector('.section-eyebrow')) {
                const eb = document.createElement('span');
                eb.className = 'section-eyebrow';
                eb.innerHTML = `<span class="num">${num}</span><span class="slash">/</span>${s.label}`;
                h2.parentNode.insertBefore(eb, h2);
            }
        });
    }

    // Stat count-up
    function statCountUp() {
        if (reduced) return;
        const stats = document.querySelectorAll('#hero .grid > .hud-card .text-2xl');
        stats.forEach((el, i) => {
            const target = parseInt(el.textContent, 10);
            if (Number.isNaN(target)) return;
            el.textContent = '0';
            const start = performance.now() + i * 80;
            const dur = 1200;
            function step(now) {
                const t = Math.max(0, Math.min(1, (now - start) / dur));
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = String(Math.round(target * eased));
                if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    // Top hairline scroll progress
    function scrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress-modern';
        document.body.appendChild(bar);
        function update() {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
            bar.style.width = pct + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    function init() {
        annotateSections();
        statCountUp();
        scrollProgress();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
