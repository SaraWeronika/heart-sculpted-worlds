# Cuoriforma — Concept & Implementazione

## Direzione Visiva

**Palette (tokens oklch in `src/styles.css`)**
- Carbon Black `#0B0B0D` — background principale
- Velvet Bordeaux `#3A0A14` — superfici profonde
- Deep Artery Red `#8B0A1A` — accento primario (CTA, highlights)
- Titanium Grey `#9CA0A6` — cromature, dettagli
- Soft Ivory `#F2EBDD` — testo, micro-luce

**Tipografia**
- Display: *Cormorant Garamond* (italic per accenti emotivi) — serif scolpito, lusso editoriale
- Body: *Inter* — leggibilità minimale
- Mono accent: *JetBrains Mono* per numeri/cataloghi

**Tono**: cinematografico, scultoreo, intimo. Spazio negativo abbondante. Illuminazione volumetrica, riflessi bordeaux su nero.

## Idea di Interazione

- **Hero 3D**: cuore organico (R3F) in metallo liquido bordeaux/cromo, respiro lento (scale sin), micro-parallasse al mouse, particelle ambient (fog + sparks)
- **Cursore custom**: cerchio ivory che si espande sui CTA, magnetismo sottile
- **Scroll cinematografico**: GSAP ScrollTrigger + Lenis smooth scroll; camera dolly tra sezioni, sezioni che emergono in `clip-path` e `mask` invece di blocchi
- **Tipografia animata**: split-text per titoli (lettera per lettera), italic reveal
- **Battito cardiaco**: audio loop sottile sincronizzato con pulse del cuore 3D (toggle mute persistente)
- **Musica ambient warm**: pad bordeaux loop, fade-in solo dopo interazione utente (no autoplay intrusivo)
- **Chatbot floating**: bolla minimale bottom-right, risposte preimpostate con tono brand
- **Menu immersivo**: full-screen overlay con dissolvenza, link grandi serif italic con hover red-glow

## Struttura Sito (route TanStack Start)

```
/                    → Hero 3D + manifest + teaser categorie + packaging + CTA
/manifesto           → Chi sono io (foto), nascita del brand, filosofia
/collezioni          → Index categorie con scene 3D dedicate
/collezioni/home-decor
/collezioni/home-utility
/collezioni/bomboniere       → sottocat: nascita, battesimo, comunione, cresima, 18esimo, laurea, matrimonio
/collezioni/vestiti
/collezioni/accessori        → gioielli, borse
/packaging           → Rituale di unboxing, cura artigianale
/contatti            → Form custom-order + info
/faq                 → Accordion animato
```

Footer minimale, navbar che svanisce in scroll-down e riappare in scroll-up. Sitemap.xml + robots.txt + per-route head SEO.

## Dettagli Tecnici

- **TanStack Start** (esistente) — route files separati per ogni pagina (no hash anchors)
- **R3F**: `@react-three/fiber`, `@react-three/drei` per Hero scene (MeshTransmissionMaterial / MeshPhysicalMaterial per metallo liquido), istanza geometria cuore (icosphere distorta con noise vertex shader)
- **GSAP** + **ScrollTrigger** + **SplitText custom** (no plugin premium)
- **Lenis** per smooth scroll
- **Howler.js** per audio (heartbeat + ambient music) con toggle UI persistente in localStorage
- **Chatbot**: componente locale con keyword matching → risposte preimpostate (no backend)
- **Form contatti**: stato locale + mailto fallback (no Cloud per ora — l'utente non ha chiesto persistenza)
- **Assets**: copio i 3 upload in `src/assets/` (logo, ritratto fondatrice, packaging)
- **Audio**: genero brevi file ambient sintetizzati / cerco asset CC0 — placeholder leggeri con fade

**Performance**: lazy-load Canvas R3F, `Suspense` fallback, `dpr={[1,2]}`, frameloop="demand" dove possibile, mobile = scena 3D semplificata (cuore statico con CSS gradient + subtle blur).

**SEO**: ogni route `head()` con title/desc/og specifici in italiano.

## File principali da creare

- `src/styles.css` — design system completo (oklch + fonts + custom cursor + animazioni keyframes)
- `src/routes/__root.tsx` — shell con CursorOverlay, AudioController, Chatbot, Navigation
- `src/routes/index.tsx` — Hero 3D + sezioni narrative
- `src/routes/{manifesto,packaging,contatti,faq,collezioni}.tsx` + sotto-route bomboniere
- `src/components/three/HeartScene.tsx` — Canvas R3F + cuore animato + particelle
- `src/components/CustomCursor.tsx`, `Navigation.tsx`, `AudioController.tsx`, `Chatbot.tsx`, `SplitTextReveal.tsx`, `ScrollScene.tsx`
- `src/lib/products.ts` — catalogo categorie/sottocategorie + prodotti placeholder
- `src/lib/faq.ts`, `src/lib/chatbot-responses.ts`

## Quality Bar

Awwwards-level: composizione cinematografica, micro-interazioni ovunque, transizioni mai brusche, copy italiano evocativo, zero placeholder generici, immagini generate per prodotti dove necessario.
