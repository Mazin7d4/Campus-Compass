# Hyperframes Composition Brief: Campus Compass

## Objective
Create a short polished brag video explaining how Campus Compass helps low-vision users navigate all 23 CSU campuses.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 22 seconds

## Source Material
- Project root: `E:\CODING\Campus-Compass`
- Primary files read: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/app/building-list.tsx`, `src/components/app/building-actions.tsx`, `src/app/campus/[campusId]/[buildingId]/page.tsx`, `src/app/data/campuses.json`, `docs/blueprint.md`
- Product name: Campus Compass
- Tagline / strongest claim: Find buildings by name — across all 23 CSU campuses. Built for low-vision navigation.
- Key UI or visual moment to recreate: building search input + large result row with abbreviation badge; large Navigate button handoff to Apple/Google Maps
- Copy that must appear verbatim / near-verbatim:
  - Campus Compass
  - Campus maps assume you can see them.
  - Find buildings by name — across all 23 CSU campuses.
  - Every CSU campus. Built to be found.
  - Search building name or abbreviation…
  - Navigate

## Creative Direction
- Tone preset: polished
- Creative direction: accessibility product film for CSU low-vision navigation
- Interpretation: Restraint, readable holds, feature clarity; earnest not cute
- Angle: Replace map-reading with searchable text + large controls + native map handoff across all 23 campuses
- Hook: Campus maps assume you can see them.
- Outro / punchline: Every CSU campus. Built to be found.
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Claiming medical/clinical cures — stay product-true (search, labels, large targets, map handoff)

## Visual Identity
- Background: #18181b
- Text: #FAFAFA
- Accent: #FFC107
- Primary: #6B7FD7
- Display font: Poppins
- Body font: PT Sans
- Visual references from the project: dark UI, mono abbreviation badges, large h-14 primary buttons, Poppins headlines

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 3.2s — problem line
2. Reveal — 3.8s — Campus Compass + 23 campuses
3. Search flow — 5.5s — type abbreviation → building card
4. Navigate handoff — 5.0s — a11y benefits + Navigate tap
5. Outro — 4.5s — logo + tagline

## Audio
- Audio role: warm professional bed
- Audio arc: soft open → UI ticks mid → logo settle with fade
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3
- Music treatment: volume ~0.28, fade under final logo
- Music cue guidance: bundled preset `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`; strong cues ~8.74 (search result), 13.11 (navigate), 17.47 (outro)
- Audio-reactive treatment: subtle; indigo ambient glow breathes with bass
- Audio-coupled moments:
  - Scene 3 — typing search + card reveal
  - Scene 4 — sequential benefit labels + Navigate click
  - Scene 5 — logo land
- SFX selection guidance: interface/drop_*, interface/click_*, ui/mouseclick1, impactSoft_medium, bong_001 / impactBell_heavy_000 for logo; keep sparse
- Exact SFX choice: Hyperframes chooses timestamps against implemented motion
- Audio files: copied into `brag-output/composition/assets/`

## Hyperframes Instructions
Load hyperframes-core, hyperframes-animation, hyperframes-creative, hyperframes-keyframes, hyperframes-cli. /brag owns angle; Hyperframes owns implementation. Prefer native Hyperframes conventions.

Requirements:
- Show real UI recreation from the app (search + Navigate)
- Keep all text readable
- 15–25s total (target 22s)
- Include music/SFX
- Run `hyperframes check` before render
