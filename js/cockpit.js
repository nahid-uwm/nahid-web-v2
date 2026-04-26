/* =================================================================
   COCKPIT / SHIP-DOCK HUD RUNTIME
   - Builds left rail (4 gauges + reactor)
   - Builds right rail (sector jump list + radar)
   - Builds 4 corner bezels with labels
   - Animates gauge values over time
   ================================================================= */

(function () {
    if (window.matchMedia('(max-width: 1023px)').matches) return; // mobile/tablet skips rails
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─────────────────────────────────────────────────────────────
    // LEFT RAIL — 4 gauges
    // ─────────────────────────────────────────────────────────────
    function buildLeftRail() {
        const rail = document.createElement('aside');
        rail.className = 'ship-rail-left';
        rail.setAttribute('aria-label', 'Ship instruments');
        rail.innerHTML = `
            <div class="rail-header">SYS // METRICS</div>
            <div class="rail-gauges">
                <div class="ship-gauge" data-key="POWR" data-target="86">
                    <div class="bar-value">86</div>
                    <div class="bar-track"><div class="bar-fill"></div></div>
                    <div class="bar-label">POWR</div>
                </div>
                <div class="ship-gauge" data-key="SHLD" data-target="74">
                    <div class="bar-value">74</div>
                    <div class="bar-track"><div class="bar-fill"></div></div>
                    <div class="bar-label">SHLD</div>
                </div>
                <div class="ship-gauge warn" data-key="COOL" data-target="62">
                    <div class="bar-value">62</div>
                    <div class="bar-track"><div class="bar-fill"></div></div>
                    <div class="bar-label">COOL</div>
                </div>
                <div class="ship-gauge" data-key="NAV" data-target="92">
                    <div class="bar-value">92</div>
                    <div class="bar-track"><div class="bar-fill"></div></div>
                    <div class="bar-label">NAV</div>
                </div>
            </div>
            <div class="rail-footer">
                <div class="reactor"></div>
                CORE
            </div>
        `;
        document.body.appendChild(rail);

        // Initial fill animation
        requestAnimationFrame(() => {
            rail.querySelectorAll('.ship-gauge').forEach(g => {
                const t = parseInt(g.dataset.target, 10);
                g.querySelector('.bar-fill').style.height = t + '%';
            });
        });

        // Subtle drift
        if (!reduced) {
            const gauges = rail.querySelectorAll('.ship-gauge');
            setInterval(() => {
                gauges.forEach(g => {
                    const base = parseInt(g.dataset.target, 10);
                    const drift = Math.round((Math.random() - 0.5) * 8);
                    const v = Math.max(20, Math.min(99, base + drift));
                    g.querySelector('.bar-fill').style.height = v + '%';
                    g.querySelector('.bar-value').textContent = String(v).padStart(2, '0');
                });
            }, 2400);
        }
    }

    // ─────────────────────────────────────────────────────────────
    // RIGHT RAIL — sector jump + radar
    // ─────────────────────────────────────────────────────────────
    function buildRightRail() {
        const sectors = [
            { id: 'hero',         label: 'HOMEBASE' },
            { id: 'about',        label: 'PROFILE'  },
            { id: 'research',     label: 'OPS'      },
            { id: 'publications', label: 'ARCHIVE'  },
            { id: 'education',    label: 'TRAIN'    },
            { id: 'projects',     label: 'FIELD'    },
            { id: 'teaching',     label: 'SVC'      },
            { id: 'lab',          label: 'FAC'      },
            { id: 'contact',      label: 'COMMS'    },
        ];

        const rail = document.createElement('aside');
        rail.className = 'ship-rail-right';
        rail.setAttribute('aria-label', 'Sector navigation');
        rail.innerHTML = `
            <div class="rail-header">SECTOR // JUMP</div>
            <nav class="ship-sector-list" id="sectorList">
                ${sectors.map((s, i) => `
                    <button class="ship-sector" data-section="${s.id}" aria-label="Jump to ${s.label}">
                        <span class="led"></span>
                        <span class="num">${String(i).padStart(2, '0')}</span>
                        <span class="label">${s.label}</span>
                    </button>
                `).join('')}
            </nav>
            <div class="ship-radar-wrap">
                <div class="radar-label">RADAR</div>
                <div class="ship-radar" aria-hidden="true">
                    <span class="crosshair-h"></span>
                    <span class="crosshair-v"></span>
                    <span class="sweep"></span>
                    <span class="blip"></span>
                    <span class="blip"></span>
                    <span class="blip"></span>
                </div>
            </div>
        `;
        document.body.appendChild(rail);

        // Wire sector clicks → existing scrollToSection
        rail.querySelectorAll('.ship-sector').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.section;
                if (window.scrollToSection) window.scrollToSection(id);
            });
        });

        // Sync active sector with scroll position via IO
        const sections = sectors.map(s => document.getElementById(s.id)).filter(Boolean);
        const buttonById = {};
        rail.querySelectorAll('.ship-sector').forEach(b => buttonById[b.dataset.section] = b);

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0.35) {
                    rail.querySelectorAll('.ship-sector').forEach(b => b.classList.remove('active'));
                    const b = buttonById[entry.target.id];
                    if (b) {
                        b.classList.add('active');
                        b.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                }
            });
        }, { threshold: [0.35, 0.6] });
        sections.forEach(s => io.observe(s));
    }

    // ─────────────────────────────────────────────────────────────
    // VIEWPORT CORNER BEZELS
    // ─────────────────────────────────────────────────────────────
    function buildCorners() {
        const corners = [
            { pos: 'tl', text: '<span class="key">SHIP</span>UWM-NAHID-01' },
            { pos: 'tr', text: '<span class="key">OPS</span>LIVE / PUBLIC' },
            { pos: 'bl', text: '<span class="key">PWR</span>NOMINAL' },
            { pos: 'br', text: '<span class="key">DOCK</span>CARBONWEB' },
        ];
        corners.forEach(c => {
            const el = document.createElement('div');
            el.className = 'ship-corner ' + c.pos;
            el.innerHTML = `<span class="rivet"></span><span class="corner-label">${c.text}</span>`;
            document.body.appendChild(el);
        });
    }

    // ─────────────────────────────────────────────────────────────
    // INIT
    // ─────────────────────────────────────────────────────────────
    function init() {
        buildLeftRail();
        buildRightRail();
        buildCorners();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
