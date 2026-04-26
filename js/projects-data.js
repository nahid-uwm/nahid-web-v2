/* Project data — single source for all detail pages */
window.PROJECTS = {
    'vr-rhythm-saber': {
        title: 'VR Rhythm Saber Combat',
        cover: 'image/projects/VR RHYTHM SABER COMBAT.png',
        year: '2024',
        role: 'Solo developer',
        engine: 'Godot 4.x',
        domain: 'Therapy · Rehabilitation',
        status: 'Prototype',
        statusVariant: 'active',
        tags: ['Godot', 'Therapy', 'Music-Driven', 'Upper-Limb Rehab'],
        summary: 'Hand therapy as a music-driven VR game. Players slice cubes to practice sensory coordination, range of motion, and hand-eye timing for upper-limb rehab.',
        focus: 'Turning repetitive rehabilitation exercises into engaging, music-synced gameplay that motivates patients to move further and longer.',
        overview: [
            'Designed to support upper-limb rehabilitation by translating clinical range-of-motion targets into a music-driven slicing game. Cubes spawn in time with the beat, encouraging patients to reach across larger arcs as the song progresses.',
            'Each session can be scaled in difficulty, tempo, and target spawn radius — letting therapists tune the experience to each patient\'s recovery stage. Visual and audio feedback give immediate reinforcement when targets are hit cleanly.'
        ],
        features: [
            'Music-synced target spawn timing for natural rhythm',
            'Configurable spawn radius for graded range-of-motion training',
            'Real-time scoring on cut accuracy and timing',
            'Tempo + difficulty scaling for rehab progression',
            'Compatible with standard XR controllers'
        ],
        youtube: null,
        links: [],
        gallery: []
    },

    'accessible-vr-locomotion': {
        title: 'Accessible VR Locomotion',
        cover: 'image/projects/ACCESSIBLE VR LOCOMOTION.png',
        year: '2024',
        role: 'Solo developer',
        engine: 'Godot 4.x',
        domain: 'Accessibility · HCI',
        status: 'Active research',
        statusVariant: 'active',
        tags: ['Godot', 'Accessibility', 'Locomotion', 'Motor Rehab'],
        summary: 'Hand-based forward/back movement with head-angle steering — mirroring how wheelchair users propel themselves. Doubles as motor rehab and neck therapy.',
        focus: 'Designing VR locomotion that maps onto real-world wheelchair self-propulsion, opening immersive environments to seated and mobility-impaired users.',
        overview: [
            'Conventional VR locomotion (thumbstick or teleport) excludes users who navigate the physical world differently. This project maps forward and backward motion to natural hand-propulsion gestures and uses head angle for direction.',
            'Beyond access, the same input pattern doubles as a structured motor-rehabilitation exercise — patients regain shoulder rotation and neck mobility while playing.'
        ],
        features: [
            'Hand-propulsion input scheme matching wheelchair biomechanics',
            'Head-angle steering for hands-free direction control',
            'Adjustable propulsion sensitivity for varied strength',
            'Built-in calibration for arm length and seated posture',
            'Motor-rehab telemetry for therapist review'
        ],
        youtube: null,
        links: [],
        gallery: []
    },

    'bimanual-vr-manipulation': {
        title: 'Bimanual VR Manipulation',
        cover: 'image/projects/BIMANUAL VR MANIPULATION.png',
        year: '2024',
        role: 'Solo developer',
        engine: 'Godot 4.x',
        domain: 'Education · Engineering',
        status: 'Prototype',
        statusVariant: 'active',
        tags: ['Godot', 'Education', 'Two-Handed', 'Engineering'],
        summary: 'Two-handed object manipulation with real-time scaling. Built for engineering tasks like engine inspection and motor-function therapy.',
        focus: 'Replicating real-world two-handed object handling so trainees can inspect, scale, and disassemble complex machinery in VR.',
        overview: [
            'Engineering training often requires hands-on exposure to large or expensive equipment. This project lets users grab, scale, rotate, and pull apart objects with both hands — moving close to inspect details, then pulling back to see the whole.',
            'The same bimanual primitive supports motor-function rehabilitation tasks where coordinated two-hand movement is the therapeutic goal.'
        ],
        features: [
            'Coordinated two-hand grab, rotate, and scale',
            'Smooth zoom-in inspection without menus',
            'Configurable object disassembly hierarchy',
            'Haptic feedback on contact and snap-back',
            'Recordable session for therapist review'
        ],
        youtube: null,
        links: [],
        gallery: []
    },

    'vr-climbing': {
        title: 'VR Climbing',
        cover: 'image/projects/vrclimb.jpg',
        year: '2023',
        role: 'Solo developer',
        engine: 'Unreal Engine 5',
        domain: 'Therapy · Phobia exposure',
        status: 'Released',
        statusVariant: 'ok',
        tags: ['Unreal', 'Therapy', 'Height Phobia', 'Upper-Body Rehab'],
        summary: 'Two-handed climbing for upper-body rehab and exposure-based training for height phobia.',
        focus: 'Combining grip-based VR climbing mechanics with measured exposure therapy for users overcoming height phobia.',
        overview: [
            'Climbing in VR exercises shoulders, arms, and core — but it also recreates the height context many people instinctively avoid. This project pairs natural grab-and-pull mechanics with controllable exposure intensity so users can ladder themselves toward higher elevations.',
            'Therapists can configure starting altitude, hand-strength assist, and panic-reset behaviour — letting clinical use coexist with general fitness play.'
        ],
        features: [
            'Two-handed grab + pull-up climbing',
            'Configurable height progression for graded exposure',
            'Optional fall-recovery and ledge assists',
            'Real-time grip strength + reach telemetry',
            'Safe-cancel zone reachable from any altitude'
        ],
        youtube: 'rwYDdCRlKCE',
        links: [
            { label: 'Behance gallery', href: 'https://www.behance.net/gallery/183357879/VR-CLIMBING' },
            { label: 'YouTube demo', href: 'https://www.youtube.com/watch?v=rwYDdCRlKCE' }
        ],
        gallery: []
    },

    'slicing-in-vr': {
        title: 'Slicing in VR',
        cover: 'image/projects/vr slicing.jpg',
        year: '2023',
        role: 'Solo developer',
        engine: 'Unreal Engine 5',
        domain: 'Physics · Interaction',
        status: 'Released',
        statusVariant: 'ok',
        tags: ['Unreal', 'Physics', 'Mesh Cutting', 'VR Interaction'],
        summary: 'VR slicing interaction in Unreal — advanced object physics and real-time mesh cuts.',
        focus: 'Building stable, performant real-time mesh slicing as a reusable interaction primitive for VR experiences.',
        overview: [
            'Cutting through arbitrary geometry in real time is a core VR mechanic for cooking, surgery, and combat games — but mesh slicing tends to break under fast or compound motions.',
            'This project implements a robust slicing system that handles non-convex geometry, splits collision and rendering, and gives clean cross-section feedback to users.'
        ],
        features: [
            'Real-time arbitrary-plane mesh cutting',
            'Cross-section cap generation for clean cut faces',
            'Stable collision separation post-slice',
            'Slice-velocity gating to avoid accidental cuts',
            'Stackable slices on already-sliced geometry'
        ],
        youtube: '0rsNQhLoc88',
        links: [
            { label: 'YouTube demo', href: 'https://www.youtube.com/watch?v=0rsNQhLoc88' }
        ],
        gallery: []
    },

    'shooting-in-vr': {
        title: 'Shooting in VR',
        cover: 'image/projects/vr shooting.jpg',
        year: '2023',
        role: 'Solo developer',
        engine: 'Unreal Engine 5',
        domain: 'Mechanics · Interaction',
        status: 'Released',
        statusVariant: 'ok',
        tags: ['Unreal', 'Mechanics', 'Hit Detection', 'VR Interaction'],
        summary: 'Immersive shooting mechanics with real-time hit detection in Unreal Engine.',
        focus: 'A polished VR shooting interaction with grounded recoil, accurate hit detection, and reload feel.',
        overview: [
            'Most VR shooters compromise on either feel or fairness — recoil that pushes the controller off-target, or perfect-aim systems that ignore physical input. This project tunes the middle ground.',
            'Aim is driven by the actual barrel orientation, recoil applies haptic force without losing register, and reload uses physically-grabbed magazines for tactile commitment.'
        ],
        features: [
            'Barrel-aligned hit detection',
            'Haptic recoil that respects controller position',
            'Physically grabbed magazine reload',
            'Distance-based bullet spread modeling',
            'Surface-aware impact effects'
        ],
        youtube: 'doI7oWqkkTw',
        links: [
            { label: 'YouTube demo', href: 'https://www.youtube.com/watch?v=doI7oWqkkTw' }
        ],
        gallery: []
    },

    'vr-breathing-therapy': {
        title: 'VR Breathing Therapy',
        cover: 'image/projects/vr breathing.png',
        year: '2023',
        role: 'Solo developer',
        engine: 'Unreal Engine 5',
        domain: 'Mindfulness · Mental health',
        status: 'Released',
        statusVariant: 'ok',
        tags: ['Unreal', 'Mindfulness', 'Therapy', 'Wellness'],
        summary: 'Structured breathing in a calm VR space. Visual and auditory relaxation cues for mental well-being.',
        focus: 'Pairing structured breathing protocols with calming spatial environments to help users manage anxiety and stress.',
        overview: [
            'Breathing exercises are an evidence-based anxiety intervention but are easy to skip without a guiding cue. In VR, the environment itself becomes the cue: a soft visual rhythm tracks the inhale-hold-exhale pattern, ambient sound rises and falls with it, and the user\'s focus is held in a peaceful space.',
            'Sessions are short (3–5 minutes), customisable, and can be paired with biometric input for adaptive pacing.'
        ],
        features: [
            'Visual breathing pacer with inhale / hold / exhale phases',
            'Ambient soundscape synced to breath rhythm',
            'Selectable breathing protocols (4-7-8, box, coherent)',
            'Calm spatial environments with soft motion',
            'Optional heart-rate input for adaptive pacing'
        ],
        youtube: 'xWGP84gCquY',
        links: [
            { label: 'YouTube demo', href: 'https://www.youtube.com/watch?v=xWGP84gCquY&t=25s' }
        ],
        gallery: []
    },

    'healthy-eating-trainer': {
        title: 'Healthy Eating Trainer',
        cover: 'image/projects/virtual eating habit.jpg',
        year: '2022',
        role: 'Solo developer',
        engine: 'Python · OpenCV · MediaPipe',
        domain: 'Education · HCI',
        status: 'Released',
        statusVariant: 'ok',
        tags: ['Python', 'Computer Vision', 'Education', 'HCI'],
        summary: 'Child-centric educational game in Python. Face-tracking mechanics teach healthy eating habits.',
        focus: 'Using face-tracking to make nutrition education interactive — kids "eat" virtual food with real mouth movements.',
        overview: [
            'Nutrition education is hard to keep playful for young children. This project tracks mouth open/close events through the webcam and lets kids physically "eat" virtual healthy options that fly toward them, while dodging unhealthy ones.',
            'Built in Python with OpenCV and MediaPipe, runs on a laptop with no extra hardware — making it easy to deploy in classrooms or at home.'
        ],
        features: [
            'Real-time face landmark tracking via webcam',
            'Mouth-open detection drives in-game eating',
            'Healthy vs. unhealthy item scoring',
            'Increasing difficulty across levels',
            'Runs on a standard laptop, no controllers'
        ],
        youtube: 'Zb_mTyWeHYc',
        links: [
            { label: 'YouTube demo', href: 'https://www.youtube.com/watch?v=Zb_mTyWeHYc' }
        ],
        gallery: []
    },

    'virtual-painting': {
        title: 'Virtual Painting',
        cover: 'image/projects/virtual painting.jpg',
        year: '2022',
        role: 'Solo developer',
        engine: 'Python · OpenCV · MediaPipe',
        domain: 'HCI · Computer Vision',
        status: 'Released',
        statusVariant: 'ok',
        tags: ['Python', 'Computer Vision', 'HCI', 'AI'],
        summary: 'Hand-tracking + computer vision merge AI with HCI for mid-air drawing.',
        focus: 'Mid-air drawing using only a webcam — no stylus, no touchscreen, just hand gestures.',
        overview: [
            'Tracks the user\'s index finger via a webcam and paints a continuous brush stroke onto a virtual canvas. Different finger configurations switch tools, change colour, and clear the canvas — all without touching anything.',
            'A study in low-friction creative interfaces: anyone with a webcam can draw without specialised hardware.'
        ],
        features: [
            'Real-time finger tracking via webcam',
            'Gesture-based colour and tool switching',
            'Smoothed brush stroke rendering',
            'Save / clear / undo via gesture',
            'Runs on a standard laptop'
        ],
        youtube: 'vHOl_k28R18',
        links: [
            { label: 'YouTube demo', href: 'https://www.youtube.com/watch?v=vHOl_k28R18' }
        ],
        gallery: []
    }
};
