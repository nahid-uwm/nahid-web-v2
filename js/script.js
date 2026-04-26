const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
const isWindows = /Windows/i.test(navigator.userAgent);

// =============================================================
// CUSTOM CURSOR — opt-in, lerp-smoothed, morphs by hover target
// =============================================================
const cursor = document.querySelector('.custom-cursor');

let cursorX = -100, cursorY = -100;          // rendered position
let targetX = -100, targetY = -100;          // mouse position
let cursorEnabled = false;

function enableCustomCursor() {
    if (!cursor) return;
    if (isTouchDevice || prefersReducedMotion || !isFinePointer) return;
    document.documentElement.classList.add('has-custom-cursor');
    cursorEnabled = true;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => cursor.classList.remove('cursor-click'));

    // Hover state — match the original behavior (scale + color)
    const HOVER_SEL = 'button, a, .hud-card, .gear-item, .progress-dot, [role="button"], input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest && e.target.closest(HOVER_SEL)) cursor.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest && e.target.closest(HOVER_SEL)) cursor.classList.remove('cursor-hover');
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

    // Lerp loop — use left/top so CSS transform is free for hover scale
    function tick() {
        cursorX += (targetX - cursorX) * 0.25;
        cursorY += (targetY - cursorY) * 0.25;
        cursor.style.left = cursorX + 'px';
        cursor.style.top  = cursorY + 'px';
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

enableCustomCursor();

// =============================================================
// LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER
// =============================================================
let lenis = null;
if (window.Lenis && !prefersReducedMotion) {
    lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }
}

// =============================================================
// HERO TEXT SPLIT REVEAL
// =============================================================
(function splitHeroText() {
    if (prefersReducedMotion) return;
    document.querySelectorAll('.char-reveal[data-split]').forEach(el => {
        const text = el.dataset.split;
        el.innerHTML = '';
        [...text].forEach((ch, i) => {
            const span = document.createElement('span');
            span.className = 'char' + (ch === ' ' ? ' space' : '');
            span.textContent = ch === ' ' ? ' ' : ch;
            span.style.setProperty('--cd', (i * 35) + 'ms');
            el.appendChild(span);
        });
        // restore data-text for glitch effect
        el.dataset.text = text;
    });
})();

// =============================================================
// MAGNETIC BUTTONS
// =============================================================
(function magneticButtons() {
    if (prefersReducedMotion || isTouchDevice) return;
    const RADIUS = 80, STRENGTH = 0.35;
    document.querySelectorAll('.hud-button').forEach(btn => {
        let rafId = 0;
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);
            if (dist > RADIUS) return;
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                btn.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
            });
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2)';
            btn.style.transform = 'translate(0, 0)';
            setTimeout(() => { btn.style.transition = ''; }, 500);
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.2s ease';
        });
    });
})();

// =============================================================
// CARD HOVER FX — cursor-tracked spotlight + animated HUD corners
// =============================================================
(function cardHoverFx() {
    if (isTouchDevice) return;
    const TAG_LABELS = ['TRACKING', 'SCANNING', 'LOCKED', 'ANALYZING', 'ACTIVE', 'ONLINE'];
    document.querySelectorAll('.hud-card').forEach((card, i) => {
        // Inject futuristic HUD layers (idempotent)
        if (!card.querySelector('.hc')) {
            ['tl','tr','bl','br'].forEach(pos => {
                const el = document.createElement('i');
                el.className = 'hc ' + pos;
                card.appendChild(el);
            });
        }
        if (!card.querySelector('.scan')) {
            const scan = document.createElement('div');
            scan.className = 'scan';
            card.appendChild(scan);
        }
        if (!card.querySelector('.reticle')) {
            const r = document.createElement('div');
            r.className = 'reticle';
            card.appendChild(r);
        }
        if (!card.querySelector('.hc-tag')) {
            const tag = document.createElement('div');
            tag.className = 'hc-tag';
            tag.textContent = TAG_LABELS[i % TAG_LABELS.length];
            card.appendChild(tag);
        }
        if (prefersReducedMotion) return;

        let rafId = 0;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                card.style.setProperty('--mx', x + '%');
                card.style.setProperty('--my', y + '%');
            });
        });
    });
})();

// =============================================================
// STARFIELD (with parallax scroll offset)
// =============================================================
let starfieldScrollY = 0;
function createStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield || prefersReducedMotion) return;

    const numStars = 200;
    const stars = [];
    let mouseX = -1000;
    let mouseY = -1000;

    function randomStarColor() {
        const r = Math.random() * 100;
        if (r < 30) return '#cce8ff';
        if (r < 80) return '#ffffff';
        return '#ffe4b0';
    }

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        star.style.left = initialX + '%';
        star.style.top  = initialY + '%';

        const roll = Math.random();
        let type, size, baseOpacity, color, depth;

        if (roll < 0.60) {
            type = 'normal';
            size = Math.random() * 1.5 + 0.5;
            baseOpacity = Math.random() * 0.2 + 0.15;
            color = randomStarColor();
            depth = 0.15 + Math.random() * 0.25;
        } else if (roll < 0.90) {
            type = 'twinkler';
            size = Math.random() * 1.5 + 0.5;
            baseOpacity = 0;
            color = randomStarColor();
            depth = 0.15 + Math.random() * 0.25;
        } else {
            type = 'giant';
            size = Math.random() * 2 + 2.5;
            baseOpacity = Math.random() * 0.3 + 0.4;
            color = '#ffe4b0';
            depth = 0.05 + Math.random() * 0.1;
        }

        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.background = color;
        star.style.opacity = baseOpacity;

        starfield.appendChild(star);

        stars.push({
            element: star, x: initialX, y: initialY, type, size, baseOpacity, color, depth,
            twinkleSpeed: Math.random() * 0.0015 + 0.0005,
            twinklePhase: Math.random() * Math.PI * 2,
            pulseSpeed:   Math.random() * 0.0008 + 0.0003,
            pulsePhase:   Math.random() * Math.PI * 2,
            alive: true,
        });
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    let shockwave = null;
    document.addEventListener('mousedown', (e) => {
        if (isTouchDevice) return;
        shockwave = { x: e.clientX, y: e.clientY, time: performance.now() };
        const ring = document.createElement('div');
        ring.style.cssText = [
            `position:fixed`,`left:${e.clientX}px`,`top:${e.clientY}px`,
            `width:4px`,`height:4px`,`border-radius:50%`,
            `border:1px solid rgba(34,211,238,0.35)`,
            `box-shadow:0 0 8px 2px rgba(34,211,238,0.12)`,
            `transform:translate(-50%,-50%) scale(1)`,
            `animation:click-wave 0.7s ease-out forwards`,
            `pointer-events:none`,`z-index:9998`
        ].join(';');
        document.body.appendChild(ring);
        setTimeout(() => ring.remove(), 750);
    });

    function triggerSupernova() {
        const candidates = stars.filter(s => {
            if (!s.alive) return false;
            const sx = (s.x / 100) * window.innerWidth;
            const sy = (s.y / 100) * window.innerHeight;
            return Math.hypot(mouseX - sx, mouseY - sy) > 200;
        });
        if (!candidates.length) return;

        const star = candidates[Math.floor(Math.random() * candidates.length)];
        star.alive = false;
        const el = star.element;

        el.style.transition = 'width 0.2s, height 0.2s, opacity 0.15s, box-shadow 0.15s, background 0.1s';
        el.style.width = '8px';
        el.style.height = '8px';
        el.style.opacity = '1';
        el.style.background = '#ffffff';
        el.style.boxShadow = '0 0 14px rgba(255,255,255,0.9), 0 0 28px rgba(34,211,238,0.5)';

        const nova = document.createElement('div');
        nova.style.cssText = `position:absolute;left:${star.x}%;top:${star.y}%;width:0;height:0;pointer-events:none;z-index:1;perspective:300px;transform-style:preserve-3d;`;
        const core = document.createElement('div'); core.className = 'supernova-core'; nova.appendChild(core);
        const ringA = document.createElement('div'); ringA.className = 'supernova-ring-a'; nova.appendChild(ringA);
        const ringB = document.createElement('div'); ringB.className = 'supernova-ring-b'; nova.appendChild(ringB);
        starfield.appendChild(nova);

        setTimeout(() => {
            el.style.transition = 'all 0.5s ease';
            el.style.opacity = '0';
            el.style.width = '1px';
            el.style.height = '1px';
            el.style.boxShadow = 'none';
        }, 250);
        setTimeout(() => nova.remove(), 1600);
        setTimeout(() => {
            star.x = Math.random() * 100;
            star.y = Math.random() * 100;
            el.style.left = star.x + '%';
            el.style.top = star.y + '%';
            el.style.width = star.size + 'px';
            el.style.height = star.size + 'px';
            el.style.background = star.color;
            el.style.boxShadow = 'none';
            el.style.transition = 'opacity 1.2s ease';
            el.style.opacity = star.type === 'twinkler' ? '0' : String(star.baseOpacity);
            star.alive = true;
        }, 1700);
        setTimeout(triggerSupernova, 8000 + Math.random() * 7000);
    }
    setTimeout(triggerSupernova, 6000 + Math.random() * 4000);

    function createShootingStar() {
        const el = document.createElement('div');
        const sx = 5 + Math.random() * 50;
        const sy = 3 + Math.random() * 35;
        const len = 90 + Math.random() * 70;
        el.style.cssText = [
            `position:absolute`,`left:${sx}%`,`top:${sy}%`,
            `width:${len}px`,`height:1.5px`,
            `background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.25) 30%,rgba(255,255,255,0.95) 100%)`,
            `border-radius:2px`,`transform:rotate(35deg)`,`opacity:0`,
            `animation:shooting-star-anim 0.8s ease-out forwards`,
            `pointer-events:none`,`z-index:1`
        ].join(';');
        starfield.appendChild(el);
        setTimeout(() => el.remove(), 900);
        setTimeout(createShootingStar, 20000 + Math.random() * 25000);
    }
    setTimeout(createShootingStar, 9000 + Math.random() * 8000);

    const SHOCKWAVE_DURATION = 700;
    const SHOCKWAVE_MAX_RADIUS = 350;
    const SHOCKWAVE_RING_WIDTH = 60;

    function animate(timestamp) {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const repulsionRadius = 170;

        if (shockwave && timestamp - shockwave.time > SHOCKWAVE_DURATION) shockwave = null;

        stars.forEach(star => {
            if (!star.alive) return;
            const sx = (star.x / 100) * W;
            const sy = (star.y / 100) * H;
            const dx = mouseX - sx;
            const dy = mouseY - sy;
            const dist = Math.hypot(dx, dy);

            // Parallax offset by depth
            let offY = -starfieldScrollY * star.depth;
            let moveX = 0, moveY = 0;
            let isRepulsed = false;

            if (dist < repulsionRadius && dist > 0) {
                isRepulsed = true;
                const force = Math.pow(1 - dist / repulsionRadius, 2);
                const angle = Math.atan2(dy, dx);
                moveX = Math.cos(angle) * force * -65 + (-Math.sin(angle) * force * 14);
                moveY = Math.sin(angle) * force * -65 + ( Math.cos(angle) * force * 14);
                const trailX = Math.cos(angle) * force * 12;
                const trailY = Math.sin(angle) * force * 12;
                star.element.style.opacity = '1';
                star.element.style.background = '#22d3ee';
                star.element.style.boxShadow =
                    `0 0 ${(8 * force).toFixed(1)}px rgba(34,211,238,0.9),` +
                    `${trailX.toFixed(1)}px ${trailY.toFixed(1)}px ${(6 * force).toFixed(1)}px rgba(34,211,238,0.35)`;
            }

            if (shockwave) {
                const elapsed = timestamp - shockwave.time;
                const progress = elapsed / SHOCKWAVE_DURATION;
                const waveR = SHOCKWAVE_MAX_RADIUS * progress;
                const sdx = sx - shockwave.x;
                const sdy = sy - shockwave.y;
                const sdist = Math.hypot(sdx, sdy);
                if (sdist > 0 && Math.abs(sdist - waveR) < SHOCKWAVE_RING_WIDTH) {
                    const proximity = 1 - Math.abs(sdist - waveR) / SHOCKWAVE_RING_WIDTH;
                    const sforce = proximity * (1 - progress);
                    const sangle = Math.atan2(sdy, sdx);
                    moveX += Math.cos(sangle) * sforce * 25;
                    moveY += Math.sin(sangle) * sforce * 25;
                }
            }

            star.element.style.transform = `translate(${moveX}px,${(moveY + offY).toFixed(1)}px)`;

            if (!isRepulsed) {
                star.element.style.background = star.color;
                if (star.type === 'twinkler') {
                    const t = 0.1 + 0.28 * (0.5 + 0.5 * Math.sin(timestamp * star.twinkleSpeed + star.twinklePhase));
                    star.element.style.opacity = String(t);
                    star.element.style.boxShadow = 'none';
                } else if (star.type === 'giant') {
                    const pulse = star.baseOpacity + 0.18 * Math.sin(timestamp * star.pulseSpeed + star.pulsePhase);
                    const gi = 0.25 + 0.25 * Math.sin(timestamp * star.pulseSpeed + star.pulsePhase);
                    star.element.style.opacity = String(Math.max(0, Math.min(1, pulse)));
                    star.element.style.boxShadow = `0 0 ${(3 + 3 * gi).toFixed(1)}px rgba(255,228,176,${(gi * 0.7).toFixed(2)})`;
                } else {
                    star.element.style.opacity = String(star.baseOpacity);
                    star.element.style.boxShadow = 'none';
                }
            }
        });

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// Track scroll for parallax
window.addEventListener('scroll', () => {
    starfieldScrollY = window.scrollY;
}, { passive: true });

// =============================================================
// MOBILE MENU
// =============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    if (lenis) mobileMenu.classList.contains('open') ? lenis.stop() : lenis.start();
}
function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
}
hamburger.addEventListener('click', toggleMobileMenu);
const closeMenuBtn = document.getElementById('closeMenuBtn');
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
});

// =============================================================
// SMOOTH SCROLL NAV
// =============================================================
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -60, duration: 1.4 });
    else target.scrollIntoView({ behavior: 'smooth' });
}
window.scrollToSection = scrollToSection;

// =============================================================
// PROGRESS DOTS — IntersectionObserver-driven
// =============================================================
const progressDots = document.querySelectorAll('.progress-dot');
const sections = document.querySelectorAll('section[id]');
const dotById = {};
progressDots.forEach(dot => {
    dotById[dot.dataset.section] = dot;
    dot.addEventListener('click', () => scrollToSection(dot.dataset.section));
});

if (sections.length) {
    const sIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.35) {
                progressDots.forEach(d => d.classList.remove('active'));
                const id = entry.target.id;
                if (dotById[id]) dotById[id].classList.add('active');
            }
        });
    }, { threshold: [0.35, 0.6] });
    sections.forEach(s => sIo.observe(s));
}

// =============================================================
// TOOLTIPS
// =============================================================
const tooltip = document.getElementById('tooltip');
document.querySelectorAll('.gear-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!tooltip) return;
        tooltip.textContent = item.dataset.tooltip;
        tooltip.classList.add('show');
        const rect = item.getBoundingClientRect();
        const rawLeft = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
        tooltip.style.left = Math.max(8, Math.min(rawLeft, window.innerWidth - tooltip.offsetWidth - 8)) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    });
    item.addEventListener('mouseleave', () => tooltip && tooltip.classList.remove('show'));
});

// =============================================================
// CV DOWNLOAD
// =============================================================
function setupDownloadButton(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL091dGxpbmVzIDIgMCBSCi9QYWdlcyAzIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvT3V0bGluZXMKL0NvdW50IDAKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9Db3VudCAxCi9LaWRzIFs0IDAgUl0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA5IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjcyIDcyMCBUZAooTUQgTkFISUQgSEFTQU4gLSBDVikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovTmFtZSAvRjEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMjAgMDAwMDAgbiAKMDAwMDAwMDE3NyAwMDAwMCBuIAowMDAwMDAwMzY0IDAwMDAwIG4gCjAwMDAwMDA0NTggMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA3Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo1NjUKJSVFT0Y=';
        link.download = 'MD_Nahid_Hasan_CV.pdf';
        link.click();
    });
}
setupDownloadButton('downloadCV');
setupDownloadButton('downloadCV2');

// =============================================================
// NAV LINKS (delegated)
// =============================================================
document.addEventListener('click', (e) => {
    const link = e.target.closest('nav a[href^="#"], .mobile-link[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// =============================================================
// IMAGE ERROR FALLBACK (emoji)
// =============================================================
document.addEventListener('error', function (e) {
    if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
        const img = e.target;
        const parent = img.parentElement;
        if (parent && parent.classList.contains('aspect-[3/2]')) {
            let emoji = '🖼️';
            const src = img.src.toLowerCase();
            if (src.includes('evaluating') || src.includes('walking')) emoji = '🚶‍♂️';
            else if (src.includes('blind') || src.includes('driver')) emoji = '🚛';
            else if (src.includes('shore')) emoji = '🌊';
            else if (src.includes('saber')) emoji = '⚔️';
            else if (src.includes('accessible')) emoji = '♿';
            else if (src.includes('bimanual')) emoji = '🤏';
            else if (src.includes('climb')) emoji = '🧗‍♂️';
            else if (src.includes('slicing')) emoji = '🔪';
            else if (src.includes('shooting')) emoji = '🎯';
            else if (src.includes('breathing')) emoji = '🧘‍♂️';
            else if (src.includes('eating')) emoji = '🍎';
            else if (src.includes('painting')) emoji = '🎨';
            else if (src.includes('hex')) emoji = '🔬';
            parent.innerHTML = `<span class="text-4xl">${emoji}</span>`;
        }
    }
}, true);

// =============================================================
// INIT STARFIELD
// =============================================================
createStarfield();

// =============================================================
// YOUTUBE LAZY LOAD
// =============================================================
window.loadVideo = function (element, videoId) {
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    element.innerHTML = '';
    element.appendChild(iframe);
    element.onclick = null;
    element.classList.remove('cursor-pointer');
};

const videoContainer = document.getElementById('videoContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');
if (videoContainer && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        const cardWidth = videoContainer.querySelector('.hud-card').offsetWidth;
        videoContainer.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
        const cardWidth = videoContainer.querySelector('.hud-card').offsetWidth;
        videoContainer.scrollBy({ left: (cardWidth + 24), behavior: 'smooth' });
    });
}

// =============================================================
// SECTION ENTRY ANIMATIONS — GSAP if loaded, fallback IO
// =============================================================
(function entryAnimations() {
    if (prefersReducedMotion) return;
    const cards = document.querySelectorAll('.hud-card');

    // Attach card-image class for reveal masks
    cards.forEach(card => {
        const wrap = card.querySelector('[class*="aspect-"]');
        if (wrap) {
            wrap.classList.add('card-image', 'reveal-mask');
        }
    });

    if (window.gsap && window.ScrollTrigger) {
        // Per-card stagger entry
        gsap.utils.toArray('.hud-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 36,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
                delay: (i % 4) * 0.06,
            });
        });

        // Reveal mask images
        gsap.utils.toArray('.card-image.reveal-mask').forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 90%',
                onEnter: () => el.classList.add('is-revealed'),
            });
        });

        // Section heading reveal
        gsap.utils.toArray('section h2').forEach(h => {
            gsap.from(h, {
                opacity: 0,
                y: 24,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: h, start: 'top 85%' },
            });
        });

        // Hero parallax — push title up as you scroll out
        const heroTitle = document.querySelector('#hero h1');
        if (heroTitle) {
            gsap.to(heroTitle, {
                yPercent: -30,
                opacity: 0.3,
                ease: 'none',
                scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
            });
        }
    } else {
        // Fallback IO
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const card = entry.target;
                const delay = Number(card.dataset.entryDelay || 0);
                setTimeout(() => {
                    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    setTimeout(() => { card.style.transition = ''; card.style.transform = ''; }, 700);
                }, delay);
                io.unobserve(card);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px)';
            card.dataset.entryDelay = String((i % 4) * 90);
            io.observe(card);
        });
    }
})();
