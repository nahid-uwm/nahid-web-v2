/* =================================================================
   CYBERPUNK / SCI-FI THEME RUNTIME
   - Boot screen
   - Top HUD chrome (clock, coords, signal, sys)
   - Bottom data ticker
   - Side data streams (hex rain)
   - Scroll progress bar
   - Section codes (// SYS:NN_LABEL)
   - Stat count-up animation
   ================================================================= */

(function () {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─────────────────────────────────────────────────────────────
    // BOOT SCREEN
    // ─────────────────────────────────────────────────────────────
    function bootScreen() {
        if (sessionStorage.getItem('boot_done')) return Promise.resolve();
        if (reduced) return Promise.resolve();

        const lines = [
            { t: '> NAHID.OS v2.4.1 — INITIALIZING...', d: 0 },
            { t: '> LOADING NEURAL_INTERFACE.dll',     d: 90 },
            { t: '> ESTABLISHING UPLINK [██████████]', d: 80, c: 'ok' },
            { t: '> CALIBRATING HUD_OVERLAY...',       d: 70 },
            { t: '> SYNCING /var/research/active',     d: 60 },
            { t: '> LOADING /var/projects/*.idx',      d: 60 },
            { t: '> [WARN] CAFFEINE LEVELS NOMINAL',   d: 50, c: 'warn' },
            { t: '> ACCESS GRANTED.',                   d: 40, c: 'ok' },
            { t: '> WELCOME, OPERATOR.',                d: 80, c: 'ok' },
            { t: 'NAHID HASAN',                         d: 100, c: 'big' },
        ];

        const screen = document.createElement('div');
        screen.className = 'boot-screen';
        const cursor = document.createElement('span');
        cursor.className = 'boot-cursor';
        document.body.appendChild(screen);

        return new Promise(resolve => {
            let acc = 0;
            lines.forEach((ln, i) => {
                acc += ln.d;
                setTimeout(() => {
                    const div = document.createElement('div');
                    div.className = 'boot-line' + (ln.c ? ' ' + ln.c : '');
                    div.textContent = ln.t;
                    screen.appendChild(div);
                    if (i === lines.length - 1) screen.appendChild(cursor);
                }, acc);
            });
            // Fade out
            setTimeout(() => {
                screen.classList.add('fade-out');
                sessionStorage.setItem('boot_done', '1');
                setTimeout(() => { screen.remove(); resolve(); }, 500);
            }, acc + 600);
        });
    }

    // ─────────────────────────────────────────────────────────────
    // TOP HUD CHROME
    // ─────────────────────────────────────────────────────────────
    function topHUD() {
        const bar = document.createElement('div');
        bar.className = 'hud-chrome-top';
        bar.innerHTML = `
            <div class="hud-group">
                <div class="hud-cell">
                    <span class="live-dot"></span>
                    <span class="hud-label">SYS</span>
                    <span class="hud-value">ONLINE</span>
                </div>
                <div class="hud-cell collapsible">
                    <span class="hud-label">ID</span>
                    <span class="hud-value">NAHID.OS_v2.4</span>
                </div>
                <div class="hud-cell collapsible">
                    <span class="hud-label">ZONE</span>
                    <span class="hud-value">WI-MIL/UWM</span>
                </div>
            </div>
            <div class="hud-group">
                <div class="hud-cell collapsible">
                    <span class="hud-label">SIG</span>
                    <span class="hud-bars">
                        <i></i><i></i><i></i><i></i><i class="dim"></i>
                    </span>
                </div>
                <div class="hud-cell">
                    <span class="hud-label">COORD</span>
                    <span class="hud-value" id="hudCoord">000.0</span>
                </div>
                <div class="hud-cell">
                    <span class="hud-label">UTC</span>
                    <span class="hud-value" id="hudClock">--:--:--</span>
                </div>
            </div>
        `;
        document.body.appendChild(bar);

        const clockEl = bar.querySelector('#hudClock');
        function updateClock() {
            const d = new Date();
            const pad = n => String(n).padStart(2, '0');
            clockEl.textContent = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
        }
        updateClock();
        setInterval(updateClock, 1000);

        // Bars cycle (subtle signal flicker)
        const bars = bar.querySelectorAll('.hud-bars i');
        if (!reduced) {
            setInterval(() => {
                const lit = 3 + Math.floor(Math.random() * 3);
                bars.forEach((b, i) => b.classList.toggle('dim', i >= lit));
            }, 2200);
        }

        // Coord updates with scroll
        const coordEl = bar.querySelector('#hudCoord');
        function updateCoord() {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? (window.scrollY / max) * 1000 : 0;
            coordEl.textContent = pct.toFixed(1).padStart(5, '0');
        }
        window.addEventListener('scroll', updateCoord, { passive: true });
        updateCoord();
    }

    // ─────────────────────────────────────────────────────────────
    // SCROLL PROGRESS BAR
    // ─────────────────────────────────────────────────────────────
    function scrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
        function update() {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
            bar.style.width = pct + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    // ─────────────────────────────────────────────────────────────
    // SIDE DATA STREAMS (hex rain)
    // ─────────────────────────────────────────────────────────────
    function dataStreams() {
        if (reduced) return;
        const HEX = '0123456789ABCDEF';
        ['left', 'right'].forEach(side => {
            const col = document.createElement('div');
            col.className = 'data-stream ' + side;
            for (let i = 0; i < 28; i++) {
                const s = document.createElement('span');
                s.textContent = HEX[Math.floor(Math.random() * 16)];
                const dur = 6 + Math.random() * 10;
                const delay = -Math.random() * dur;
                s.style.animationDuration = dur + 's';
                s.style.animationDelay = delay + 's';
                col.appendChild(s);
            }
            document.body.appendChild(col);
            // Mutate chars over time
            setInterval(() => {
                const spans = col.querySelectorAll('span');
                const idx = Math.floor(Math.random() * spans.length);
                if (spans[idx]) spans[idx].textContent = HEX[Math.floor(Math.random() * 16)];
            }, 220);
        });
    }

    // ─────────────────────────────────────────────────────────────
    // BOTTOM TICKER
    // ─────────────────────────────────────────────────────────────
    function ticker() {
        const items = [
            'STATUS: VR LOCOMOTION STUDY ACTIVE',
            'LATEST_PUB: ATTENTION-ENHANCED U-NET (2024)',
            'AFFILIATION: HEXLAB @ UW-MILWAUKEE',
            'CURRENT_ROLE: MS CS / TA / RA',
            'STACK: GODOT // META QUEST 2 // VARJO XR-4',
            'FOCUS: VR · HCI · AI/ML · SAFETY · WELLNESS',
            'PROJECTS_INDEXED: 09',
            'PUBLICATIONS_LOGGED: 04',
            'ACCESS_LEVEL: PUBLIC // CONTACT_OPEN',
            'CAFFEINE_LEVELS: NOMINAL',
            'PRESS [TAB] TO NAVIGATE'
        ];
        const wrap = document.createElement('div');
        wrap.className = 'data-ticker';
        const tag = document.createElement('div');
        tag.className = 'ticker-tag';
        tag.textContent = '◢ SYS_FEED';
        const track = document.createElement('div');
        track.className = 'ticker-track';
        // Duplicate for seamless loop
        const html = items.map(t => `<span>${t}</span>`).join('');
        track.innerHTML = html + html;
        wrap.appendChild(tag);
        wrap.appendChild(track);
        document.body.appendChild(wrap);
    }

    // ─────────────────────────────────────────────────────────────
    // SECTION CODES (// SYS:NN_LABEL on every h2)
    // ─────────────────────────────────────────────────────────────
    function sectionCodes() {
        const map = {
            about:        '// SYS:01_PROFILE.dossier',
            research:     '// SYS:02_ACTIVE_OPS.feed',
            publications: '// SYS:03_ARCHIVE.dat',
            education:    '// SYS:04_TRAINING.log',
            projects:     '// SYS:05_FIELD_LOGS.idx',
            teaching:     '// SYS:06_SERVICE.dat',
            lab:          '// SYS:07_FACILITY.map',
            contact:      '// SYS:08_COMMS.uplink',
        };
        Object.entries(map).forEach(([id, code]) => {
            const sec = document.getElementById(id);
            if (!sec) return;
            const h2 = sec.querySelector('h2.tektur');
            if (h2) h2.setAttribute('data-code', code);
        });
    }

    // ─────────────────────────────────────────────────────────────
    // STAT COUNT-UP (hero stats)
    // ─────────────────────────────────────────────────────────────
    function statCountUp() {
        if (reduced) return;
        const stats = document.querySelectorAll('#hero .grid > .hud-card .text-2xl');
        stats.forEach(el => {
            const target = parseInt(el.textContent, 10);
            if (Number.isNaN(target)) return;
            el.textContent = '00';
            const start = performance.now();
            const dur = 1400;
            function step(now) {
                const t = Math.min(1, (now - start) / dur);
                const eased = 1 - Math.pow(1 - t, 3);
                const v = Math.round(target * eased);
                el.textContent = String(v).padStart(2, '0');
                if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    // ─────────────────────────────────────────────────────────────
    // RANDOM CHAR-SCRAMBLE on hero subtitle (cyberpunk vibe)
    // ─────────────────────────────────────────────────────────────
    function scrambleSubtitle() {
        if (reduced) return;
        const el = document.querySelector('#hero p:first-of-type');
        if (!el) return;
        const target = el.textContent;
        const CHARS = '!<>-_\\/[]{}—=+*^?#________01';
        let frame = 0;
        const queue = [];
        for (let i = 0; i < target.length; i++) {
            const from = ' ';
            const to = target[i];
            const startF = Math.floor(Math.random() * 20);
            const endF = startF + Math.floor(Math.random() * 30);
            queue.push({ from, to, startF, endF, ch: '' });
        }
        function update() {
            let out = '';
            let complete = 0;
            for (let i = 0; i < queue.length; i++) {
                const q = queue[i];
                if (frame >= q.endF) { complete++; out += q.to; }
                else if (frame < q.startF) out += q.from;
                else {
                    if (!q.ch || Math.random() < 0.28) {
                        q.ch = CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                    out += `<span style="color:var(--c-magenta);text-shadow:0 0 6px var(--c-magenta)">${q.ch}</span>`;
                }
            }
            el.innerHTML = out;
            if (complete < queue.length) {
                frame++;
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        // Run once after boot
        setTimeout(() => requestAnimationFrame(update), 200);
    }

    // ─────────────────────────────────────────────────────────────
    // INIT
    // ─────────────────────────────────────────────────────────────
    function init() {
        sectionCodes();
        topHUD();
        scrollProgress();
        dataStreams();
        ticker();
        statCountUp();
        scrambleSubtitle();
    }

    bootScreen().then(init);
})();
