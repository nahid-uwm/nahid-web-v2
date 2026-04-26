# Graph Report - .  (2026-04-26)

## Corpus Check
- 49 files · ~283,117 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 154 nodes · 157 edges · 34 communities detected
- Extraction: 73% EXTRACTED · 27% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Legacy Portfolio Shell|Legacy Portfolio Shell]]
- [[_COMMUNITY_Cyberpunk Theme Runtime|Cyberpunk Theme Runtime]]
- [[_COMMUNITY_Accessible VR Research|Accessible VR Research]]
- [[_COMMUNITY_UWM Primary Logo Assets|UWM Primary Logo Assets]]
- [[_COMMUNITY_VR Game Mechanics|VR Game Mechanics]]
- [[_COMMUNITY_UWM Secondary Logo Assets|UWM Secondary Logo Assets]]
- [[_COMMUNITY_Modern Theme Script|Modern Theme Script]]
- [[_COMMUNITY_VR Health Interventions|VR Health Interventions]]
- [[_COMMUNITY_Hand Tracking CV App|Hand Tracking CV App]]
- [[_COMMUNITY_Nahid Education Affiliations|Nahid Education Affiliations]]
- [[_COMMUNITY_HEX Lab|HEX Lab]]
- [[_COMMUNITY_404 Redirects|404 Redirects]]
- [[_COMMUNITY_redirects.js Module|redirects.js Module]]
- [[_COMMUNITY_Cockpit Theme Runtime|Cockpit Theme Runtime]]
- [[_COMMUNITY_Modern Minimal Runtime|Modern Minimal Runtime]]
- [[_COMMUNITY_Hero Text Splitter|Hero Text Splitter]]
- [[_COMMUNITY_Magnetic Buttons|Magnetic Buttons]]
- [[_COMMUNITY_YouTube Lazy Loader|YouTube Lazy Loader]]
- [[_COMMUNITY_Image Error Fallback|Image Error Fallback]]
- [[_COMMUNITY_Guided Walking Speed Study|Guided Walking Speed Study]]
- [[_COMMUNITY_VR Walker Avatar|VR Walker Avatar]]
- [[_COMMUNITY_Walking Path Cue|Walking Path Cue]]
- [[_COMMUNITY_VR Locomotion Concept|VR Locomotion Concept]]
- [[_COMMUNITY_Shore Defender Game|Shore Defender Game]]
- [[_COMMUNITY_Polluted Beach Panel|Polluted Beach Panel]]
- [[_COMMUNITY_Disposal Machinery Panel|Disposal Machinery Panel]]
- [[_COMMUNITY_Disposal Control Panel|Disposal Control Panel]]
- [[_COMMUNITY_Restored Beach Panel|Restored Beach Panel]]
- [[_COMMUNITY_Ocean Cleanup Theme|Ocean Cleanup Theme]]
- [[_COMMUNITY_Driver Blind Spot Study|Driver Blind Spot Study]]
- [[_COMMUNITY_Driver Cockpit View|Driver Cockpit View]]
- [[_COMMUNITY_A-Pillar Obstruction|A-Pillar Obstruction]]
- [[_COMMUNITY_Urban Street Scene|Urban Street Scene]]
- [[_COMMUNITY_Pedestrian Safety Theme|Pedestrian Safety Theme]]

## God Nodes (most connected - your core abstractions)
1. `index.html (portfolio root)` - 10 edges
2. `init()` - 9 edges
3. `VR Slicing` - 8 edges
4. `Accessible VR Locomotion` - 7 edges
5. `Virtual Painter` - 7 edges
6. `Bimanual VR Manipulation` - 7 edges
7. `Virtual Eating Game` - 5 edges
8. `VR Climbing in Unreal Engine` - 5 edges
9. `sectionCodes()` - 4 edges
10. `statCountUp()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `sectionCodes()` --annotates--> `Section ID set (about/research/publications/projects/teaching/education/lab/contact/videos/hero)`  [EXTRACTED]
  js/cyberpunk.js → index.html
- `annotateSections()` --annotates--> `Section ID set (about/research/publications/projects/teaching/education/lab/contact/videos/hero)`  [EXTRACTED]
  js/modern.js → index.html
- `UWM Logo Bundle File Instructions PDF` --brand_asset_for--> `HEXLAB @ UW-Milwaukee`  [INFERRED]
  image/UWM_Logo/UWM Logo Bundle File Instructions.pdf → js/cyberpunk.js
- `entryAnimations` --queries--> `.hud-card component (shared visual primitive)`  [EXTRACTED]
  js/script.js → index.html
- `statCountUp()` --queries--> `.hud-card component (shared visual primitive)`  [EXTRACTED]
  js/cyberpunk.js → index.html

## Hyperedges (group relationships)
- **Three theme runtime variants share section/HUD-card DOM contract** — cyberpunk_runtime, cockpit_runtime, modern_runtime, concept_section_ids, concept_hud_card [INFERRED 0.85]
- **Lenis + GSAP + ScrollTrigger smooth scroll pipeline integrated across script + entry animations + cockpit jump** — script_lenis_setup, script_scrolltosection, script_entryanimations, cockpit_buildrightrail, lib_lenis, lib_gsap, lib_scrolltrigger [EXTRACTED 1.00]
- **Section navigation flow: progress dots, cockpit sector list, and nav links all funnel through window.scrollToSection** — script_progress_dots_io, cockpit_buildrightrail, script_scrolltosection, concept_section_ids, concept_progress_dots_dom [EXTRACTED 1.00]
- **VR / Hand-Based Interaction Theme** — accessible_vr_locomotion_project, vr_slicing_project, bimanual_vr_manipulation_project, virtual_painting_project [INFERRED 0.80]
- **Immersive 3D Environments** — accessible_vr_locomotion_project, vr_slicing_project, bimanual_vr_manipulation_project [INFERRED 0.90]
- **VR Object Manipulation Research** — vr_slicing_project, bimanual_vr_manipulation_project [INFERRED 0.88]
- **VR Health Interventions** —  [INFERRED 0.85]
- **VR Skill Training Simulators** —  [INFERRED 0.80]
- **Immersive Motion-Based Interaction** —  [INFERRED 0.75]
- **HEX Lab grouping** —  [INFERRED 0.90]
- **Education logos grouping** —  [INFERRED 0.95]
- **UWM Secondary Logomark variant set** —  [INFERRED 1.00]
- **uwm_secondary_logo_variant_set** —  [INFERRED 1.00]
- **UWM Primary Logo variant set** —  [INFERRED 1.00]
- **UWM Primary Logomark variants** —  [INFERRED 1.00]

## Communities

### Community 0 - "Legacy Portfolio Shell"
Cohesion: 0.13
Nodes (21): Backup/old_index.html (legacy single-file portfolio), buildCorners(), buildLeftRail(), buildRightRail(), init(), MD Nahid Hasan (subject), .progress-dot navigation DOM, Section ID set (about/research/publications/projects/teaching/education/lab/contact/videos/hero) (+13 more)

### Community 1 - "Cyberpunk Theme Runtime"
Cohesion: 0.2
Nodes (16): .hud-card component (shared visual primitive), bootScreen(), dataStreams(), init(), Cyberpunk Theme Runtime IIFE, scrambleSubtitle(), scrollProgress(), sectionCodes() (+8 more)

### Community 2 - "Accessible VR Research"
Cohesion: 0.12
Nodes (17): Accessibility in VR, VR Locomotion Technique, Extended Reality (XR) Research, Accessible VR Locomotion, Stylized Low-Poly Forest Scene, Unity Engine, Industrial / Mechanical Training Scenario, Two-Handed Object Manipulation (+9 more)

### Community 3 - "UWM Primary Logo Assets"
Cohesion: 0.16
Nodes (15): UWM Gold, UWM Primary Logo, UWM Primary Logo - Black (PNG), UWM Primary Logo - Full Color on Dark (PNG), UWM Primary Logo - Full Color on Dark (SVG), UWM Primary Logo - Full Color on Light (PNG), UWM Primary Logo - Full Color on Light (SVG), UWM Primary Logo - White (PNG) (+7 more)

### Community 4 - "VR Game Mechanics"
Cohesion: 0.16
Nodes (14): Color-Matched Block Slicing Mechanic, Dual Lightsabers (Blue + Yellow), Rhythm Game / Fitness Gaming, VR Rhythm Saber Combat, Sci-Fi Corridor Environment, Firearm / Pistol Simulation, VR Shooting Range, Target Practice Mechanic (+6 more)

### Community 5 - "UWM Secondary Logo Assets"
Cohesion: 0.17
Nodes (12): UWM Secondary Logo, UWM Secondary Logo - Black, UWM Secondary Logo - Full Color on Dark, UWM Secondary Logo - Full Color on Light, UWM Secondary Logo - White, UWM Secondary Logomark, UWM Secondary Logomark - Black (PNG), UWM Secondary Logomark - Full Color on Dark (PNG) (+4 more)

### Community 6 - "Modern Theme Script"
Cohesion: 0.22
Nodes (4): #starfield DOM element, createShootingStar, createStarfield(), triggerSupernova

### Community 7 - "VR Health Interventions"
Cohesion: 0.25
Nodes (9): Computer Vision Facial Landmarks, Health Behavior / Eating Habit, Mouth Close Detection, Virtual Eating Game, Python 3.9 (PyCharm IDE), Mindfulness / Respiratory Health, Low-Poly Stylized Island Environment, Lung Visualization / Breath In Cue (+1 more)

### Community 8 - "Hand Tracking CV App"
Cohesion: 0.33
Nodes (6): Mid-Air Drawing / Gesture Painting, Hand Landmark Tracking, Computer Vision Application, Virtual Painter, OpenCV / MediaPipe, Python (PyCharm)

### Community 9 - "Nahid Education Affiliations"
Cohesion: 0.4
Nodes (5): Bangladesh University of Business & Technology, BUBT Logo, Nahid, University of Wisconsin-Milwaukee, UWM Primary Logo (Full Color on Dark)

### Community 10 - "HEX Lab"
Cohesion: 0.67
Nodes (3): HEX Lab Icon, HEX Lab, Jerald Thomas

### Community 11 - "404 Redirects"
Cohesion: 1.0
Nodes (2): 404.html (redirect handler + 404 page), REDIRECTS map

### Community 12 - "redirects.js Module"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Cockpit Theme Runtime"
Cohesion: 1.0
Nodes (1): Cockpit / Ship-Dock HUD Runtime IIFE

### Community 14 - "Modern Minimal Runtime"
Cohesion: 1.0
Nodes (1): Modern Minimal Runtime IIFE

### Community 15 - "Hero Text Splitter"
Cohesion: 1.0
Nodes (1): splitHeroText

### Community 16 - "Magnetic Buttons"
Cohesion: 1.0
Nodes (1): magneticButtons

### Community 17 - "YouTube Lazy Loader"
Cohesion: 1.0
Nodes (1): loadVideo (window.loadVideo, YouTube lazy)

### Community 18 - "Image Error Fallback"
Cohesion: 1.0
Nodes (1): Image error emoji fallback

### Community 19 - "Guided Walking Speed Study"
Cohesion: 1.0
Nodes (1): Evaluation of Guided Walking Speed Techniques in VR (research figure)

### Community 20 - "VR Walker Avatar"
Cohesion: 1.0
Nodes (1): Yellow stylized humanoid avatar (VR walker)

### Community 21 - "Walking Path Cue"
Cohesion: 1.0
Nodes (1): Blue arrow path indicator with target sphere (guided walking visual cue)

### Community 22 - "VR Locomotion Concept"
Cohesion: 1.0
Nodes (1): VR locomotion / guided walking speed technique

### Community 23 - "Shore Defender Game"
Cohesion: 1.0
Nodes (1): Shore Defender (4-panel VR game research figure)

### Community 24 - "Polluted Beach Panel"
Cohesion: 1.0
Nodes (1): Panel a: Initial view of the polluted beach environment

### Community 25 - "Disposal Machinery Panel"
Cohesion: 1.0
Nodes (1): Panel b: Waste-disposal machinery inside the disposal facility

### Community 26 - "Disposal Control Panel"
Cohesion: 1.0
Nodes (1): Panel c: Control panel interface within the disposal facility

### Community 27 - "Restored Beach Panel"
Cohesion: 1.0
Nodes (1): Panel d: Restored beach after successful game completion

### Community 28 - "Ocean Cleanup Theme"
Cohesion: 1.0
Nodes (1): Environmental cleanup / ocean pollution awareness gameplay

### Community 29 - "Driver Blind Spot Study"
Cohesion: 1.0
Nodes (1): Simulating Driver Blind Spots with VR: Implications for Pedestrian Safety (research figure)

### Community 30 - "Driver Cockpit View"
Cohesion: 1.0
Nodes (1): First-person driver cockpit view with steering wheel and dashboard

### Community 31 - "A-Pillar Obstruction"
Cohesion: 1.0
Nodes (1): A-pillar visual obstruction (blind spot simulation)

### Community 32 - "Urban Street Scene"
Cohesion: 1.0
Nodes (1): Stylized urban street scene with graffiti wall and buildings

### Community 33 - "Pedestrian Safety Theme"
Cohesion: 1.0
Nodes (1): Pedestrian safety / driver blind spot research

## Knowledge Gaps
- **65 isolated node(s):** `Cyberpunk Theme Runtime IIFE`, `Cockpit / Ship-Dock HUD Runtime IIFE`, `Modern Minimal Runtime IIFE`, `splitHeroText`, `magneticButtons` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `404 Redirects`** (2 nodes): `404.html (redirect handler + 404 page)`, `REDIRECTS map`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `redirects.js Module`** (1 nodes): `redirects.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Cockpit Theme Runtime`** (1 nodes): `Cockpit / Ship-Dock HUD Runtime IIFE`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Modern Minimal Runtime`** (1 nodes): `Modern Minimal Runtime IIFE`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Text Splitter`** (1 nodes): `splitHeroText`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Magnetic Buttons`** (1 nodes): `magneticButtons`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `YouTube Lazy Loader`** (1 nodes): `loadVideo (window.loadVideo, YouTube lazy)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Image Error Fallback`** (1 nodes): `Image error emoji fallback`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Guided Walking Speed Study`** (1 nodes): `Evaluation of Guided Walking Speed Techniques in VR (research figure)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `VR Walker Avatar`** (1 nodes): `Yellow stylized humanoid avatar (VR walker)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Walking Path Cue`** (1 nodes): `Blue arrow path indicator with target sphere (guided walking visual cue)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `VR Locomotion Concept`** (1 nodes): `VR locomotion / guided walking speed technique`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Shore Defender Game`** (1 nodes): `Shore Defender (4-panel VR game research figure)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Polluted Beach Panel`** (1 nodes): `Panel a: Initial view of the polluted beach environment`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Disposal Machinery Panel`** (1 nodes): `Panel b: Waste-disposal machinery inside the disposal facility`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Disposal Control Panel`** (1 nodes): `Panel c: Control panel interface within the disposal facility`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Restored Beach Panel`** (1 nodes): `Panel d: Restored beach after successful game completion`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ocean Cleanup Theme`** (1 nodes): `Environmental cleanup / ocean pollution awareness gameplay`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Driver Blind Spot Study`** (1 nodes): `Simulating Driver Blind Spots with VR: Implications for Pedestrian Safety (research figure)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Driver Cockpit View`** (1 nodes): `First-person driver cockpit view with steering wheel and dashboard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `A-Pillar Obstruction`** (1 nodes): `A-pillar visual obstruction (blind spot simulation)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Urban Street Scene`** (1 nodes): `Stylized urban street scene with graffiti wall and buildings`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pedestrian Safety Theme`** (1 nodes): `Pedestrian safety / driver blind spot research`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `index.html (portfolio root)` connect `Legacy Portfolio Shell` to `Modern Theme Script`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `Section ID set (about/research/publications/projects/teaching/education/lab/contact/videos/hero)` connect `Legacy Portfolio Shell` to `Cyberpunk Theme Runtime`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `sectionCodes()` connect `Cyberpunk Theme Runtime` to `Legacy Portfolio Shell`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `index.html (portfolio root)` (e.g. with `Section ID set (about/research/publications/projects/teaching/education/lab/contact/videos/hero)` and `README.md (deployed URL pointer)`) actually correct?**
  _`index.html (portfolio root)` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `VR Slicing` (e.g. with `Unreal Engine` and `VR Gaming / Interaction`) actually correct?**
  _`VR Slicing` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `Accessible VR Locomotion` (e.g. with `Accessibility in VR` and `Unity Engine`) actually correct?**
  _`Accessible VR Locomotion` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Virtual Painter` (e.g. with `OpenCV / MediaPipe` and `Computer Vision Application`) actually correct?**
  _`Virtual Painter` has 4 INFERRED edges - model-reasoned connections that need verification._