---
name: Putta Bucca Landscapes
description: A clean, sturdy local-supplier site for a family landscape yard in Mudgee, built to read in bright sun on a phone.
colors:
  bush-green-night: "#10281b"
  bush-green: "#183a27"
  bush-green-deep: "#1f4a32"
  bush-green-action: "#25603f"
  leaf: "#8cc756"
  sandstone-deep: "#8f6230"
  sandstone: "#c99a5b"
  sandstone-wash: "#f5ecdf"
  stone-50: "#f3f4f1"
  stone-100: "#e9ebe6"
  stone-200: "#d9dcd5"
  stone-400: "#9aa096"
  field-border: "#868e83"
  ink: "#1a1e1b"
  ink-2: "#3f4641"
  ink-3: "#5a625b"
  white: "#ffffff"
  status-ok-bg: "#e3f0e6"
  status-ok-ink: "#1c5433"
  status-alert-bg: "#f9e6e3"
  status-alert-ink: "#8f2a1d"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 112"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.4
  numeral:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1
    fontVariation: "\"wdth\" 112"
rounded:
  sm: "4px"
  md: "6px"
  action: "8px"
  lg: "10px"
  xl: "12px"
  sheet: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  gutter: "24px"
  gutter-phone: "16px"
  block: "32px"
  section: "clamp(56px, 8vw, 96px)"
  container: "1240px"
  nav: "72px"
  nav-phone: "64px"
components:
  button-primary:
    backgroundColor: "{colors.bush-green-action}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.bush-green-deep}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.bush-green}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "54px"
  button-light-hover:
    backgroundColor: "{colors.stone-100}"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "54px"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.bush-green-deep}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.bush-green-action}"
    textColor: "{colors.white}"
  button-quiet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  filter-chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "42px"
  filter-chip-active:
    backgroundColor: "{colors.bush-green}"
    textColor: "{colors.white}"
  spec-tag:
    backgroundColor: "{colors.stone-50}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "3px 9px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "48px"
  product-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "18px 20px 20px"
  icon-tile:
    backgroundColor: "{colors.bush-green}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    size: "48px"
  calc-readout:
    backgroundColor: "{colors.stone-50}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px"
  calc-readout-emphasis:
    backgroundColor: "{colors.bush-green}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "14px"
---

# Design System: Putta Bucca Landscapes

## Overview

**Creative North Star: "The Yard Counter"**

The site behaves like the counter at a well-run supply yard: everything you need is laid out plainly, the phone is right there, and nothing is dressed up to sell you on itself. This is the category standard played straight and executed at full craft: a light, high-contrast ground built for a phone held outdoors in bright sun, with deep bush green carrying the brand bands (header strip, hero, page headers, call-to-action band, footer) and white and cool stone-grey sections carrying the catalogue.

One self-hosted grotesk, Archivo, does all the talking in two widths: stretched wide and heavy for headings, normal width for reading. Real yard and product photographs carry the atmosphere; the system itself stays out of the way with hairline rules, small 6px corners, one drawn line-icon set and a single warm accent (sandstone) used sparingly. Density is moderate and practical: generous tap targets (48px minimum), clear grids, and lists divided by rules rather than boxed into cards.

Depth is low and purposeful. Surfaces sit flat; soft green-tinted shadows appear only where something genuinely floats (the facts panel overlapping the hero, open drawers and dialogs, a hovered tile). The one gradient is a legibility scrim over the services photo. Elsewhere real yard stone is shown untinted, with copy carried on solid bush-green plates.

**Key Characteristics:**
- Light ground, bush-green bands, charcoal ink; high contrast everywhere.
- Archivo wide-and-heavy for headings, normal width for body.
- One 24px-grid, 2px-stroke line icon set, always in currentColor.
- Gently squared 6px corners; hairline stone rules separate content.
- Phone, hours and address always within one tap (utility strip, header call button, phone action bar, footer).
- The calculator is a first-class right-hand drawer that becomes a bottom sheet on phones.
- Real materials from the yard show up as texture: a six-swatch material strip above every footer, and stone under the green bands.
- The home hero photo's left edge is one outward arc (its bottom edge on phones), echoing the round saw-blade sign.

## Colors

A cool, outdoorsy palette: three steps of bush green, a stone-grey neutral ladder, charcoal ink, and sandstone as the only warm note.

### Primary
- **Bush Green** (`bush-green`): the brand colour and browser theme colour. Page headers, the call-to-action band, active filter chips, icon tiles, the tonnes readout in the calculator, and the 3px rule over each process step.
- **Bush Green Night** (`bush-green-night`): the darkest band. Utility strip, hero ground behind the copy, photo-header base and footer.
- **Bush Green Action** (`bush-green-action`): every primary action and interactive emphasis on light ground. Primary and outline buttons, the phone action, focus rings, selection highlight, icon strokes in lists, active nav underline, input focus border.
- **Bush Green Deep** (`bush-green-deep`): the hover state of primary actions and the colour of text links and active labels on light ground.

### Secondary
- **Sandstone** (`sandstone`): the single warm accent, drawn from the yard's sandstone sign block. Text-link underlines, the hero calculator link's icon and underline, the prefill hint border. Decoration only, never body text on white.
- **Sandstone Deep** (`sandstone-deep`): the large process-step numerals on light ground.
- **Sandstone Wash** (`sandstone-wash`): background of the prefill hint when the calculator hands details to the contact form.

### Tertiary
- **Leaf** (`leaf`): the bright green from the logo, used only on dark green ground: focus outlines inside dark bands, footer icon strokes and footer link underlines.

### Neutral
- **White** (`white`): the default page ground, cards, inputs, the header bar and the calculator drawer.
- **Stone 50** (`stone-50`): alternate section ground, image wells, read-only fields, calculator readouts, the contact form panel.
- **Stone 100** (`stone-100`): count pills, category badges, hover fill on light buttons.
- **Stone 200** (`stone-200`): every hairline rule and card border.
- **Stone 400** (`stone-400`): hovered product-card border, breadcrumb separators, scrollbar thumb.
- **Field Border** (`field-border`): input and empty-readout strokes, darker than the hairline so fields read as fields in sunlight.
- **Ink** (`ink`), **Ink 2** (`ink-2`), **Ink 3** (`ink-3`): headings and primary text; supporting body copy; meta text, placeholders and captions.
- **Status OK** (`status-ok-bg` / `status-ok-ink`) and **Status Alert** (`status-alert-bg` / `status-alert-ink`): stock badges and the form error message.

### Named Rules
**The Green Bands Rule.** Bush green owns the frame of every page (utility strip, page or hero header, call-to-action band, footer); the content between them sits on white or stone-50. Page headers and call-to-action bands may show a real material photo (28mm white aggregate, black crusher dust) untinted, with their copy on a solid Bush Green plate. Do not introduce a third ground colour.

**The One Warm Note Rule.** Sandstone is the only warm colour and it is an accent: underlines, a numeral, a hint panel. It never fills a button or a band.

**The Leaf On Dark Rule.** Leaf appears only on bush-green ground. On white, interactive green is always Bush Green Action.

## Typography

**Display Font:** Archivo (variable, `wdth` axis), falling back to Helvetica Neue, Arial, sans-serif
**Body Font:** Archivo at normal width, same fallbacks

**Character:** One sturdy grotesk used two ways. Headings are stretched to 108–112 width at weight 800 with slightly tightened tracking, which reads like signage on a yard gate; body stays at normal width and regular weight for easy reading.

### Hierarchy
- **Display** (800, `clamp(2.3rem, 5vw, 3.75rem)`, 1.04, wdth 112): page-header and photo-header H1s. The home hero H1 is a slightly narrower variant (wdth 108, up to 3.5rem, line-height 1.02) so it holds beside the photo; product detail H1 runs up to 3rem.
- **Headline** (800, `clamp(1.8rem, 3.2vw, 2.6rem)`, wdth 112): section titles and the call-to-action band heading. Category group titles on the catalogue step down to `clamp(1.5rem, 2.6vw, 2rem)`.
- **Title** (800, 1.05–1.5rem, 1.2, normal width): card names, list item headings, fact headings, footer headings, panel titles. Dialog and panel titles may take wdth 108.
- **Body** (400, 1.0625rem, 1.6): running text. Measures are capped between 34em and 62ch; supporting copy uses Ink 2.
- **Label** (600, 0.95rem): form labels, filter chips, breadcrumbs, spec tags (0.85rem), action-bar labels (700, 0.85rem). Sentence case; no uppercase tracking.
- **Numeral** (800, 2.75rem, wdth 112, Sandstone Deep): process-step numbers. Calculator readouts use 1.55rem, 800, wdth 106 with tabular figures.

### Named Rules
**The Two Widths Rule.** Width is the hierarchy signal: headings wide (wdth 106–112), everything else normal. Never set body or labels wide, and never bring in a second family.

**The Sentence Case Rule.** Headings and labels stay in sentence or title case at normal tracking. No all-caps tracked labels.

## Layout

A centred container (max 1240px) with a 24px gutter, dropping to 16px on phones. Sections breathe on a `clamp(56px, 8vw, 96px)` vertical rhythm; dark bands use slightly tighter padding. Internal spacing steps through 4, 8, 12, 16, 24 and 32px.

The header is sticky: a 36px utility strip (hours and address) that scrolls away, then a 72px white nav bar (64px on phones). Grids are explicit: four category tiles (two below 960px), an auto-filling product grid with 280px minimum columns (one column below 600px), two-column split layouts for "why us", product detail and contact (single column below 960px), and three process steps. Lists of reasons, services, contact lines and specs are rule-divided rows with a fixed icon column, not boxed cards.

Breakpoints: 1180px (nav calculator collapses to icon), 1100px, 960px (nav collapses to menu toggle; splits stack), 768px (utility strip hides, phone action bar appears, hero photo stacks above copy), 600px (buttons go full width, calculator becomes a bottom sheet).

On phones a fixed three-button action bar (Call, Directions, Calculator) sits at the bottom; the body reserves space for it.

### Named Rules
**The One Tap Rule.** Phone, hours and address must be reachable without scrolling at every width: utility strip and header call button on desktop, header call button and action bar on phones.

## Elevation & Depth

Flat by default with soft, green-tinted ambient shadows (all based on `rgba(16, 40, 27, …)`) reserved for elements that genuinely float or respond. Separation inside content is done with hairline Stone 200 rules and the white/stone-50 section alternation, not shadow. There are no hard offset shadows, no glass and no decorative gradients. The only gradient is the dark scrim that keeps white type legible over the services photo header. Stone textures are never tinted; text over them always sits on a solid plate.

### Shadow Vocabulary
- **Overlap panel** (`0 18px 40px rgba(16,40,27,.14), 0 2px 6px rgba(16,40,27,.06)`): the white facts panel overlapping the hero's bottom edge.
- **Hover lift** (`0 10px 24px rgba(16,40,27,.10)` tiles; `0 12px 28px rgba(16,40,27,.09)` product cards): response to hover only.
- **Drawer** (`-16px 0 40px rgba(16,40,27,.18)`; bottom sheet `0 -16px 40px rgba(16,40,27,.20)`): the open calculator.
- **Dialog** (`0 24px 60px rgba(16,40,27,.30)`): the quote request dialog.
- **Menu drop** (`0 16px 24px rgba(16,40,27,.12)`) and **action bar** (`0 -6px 18px rgba(16,40,27,.08)`): mobile menu and phone action bar.
- **Segment selected** (`0 1px 4px rgba(16,40,27,.16)`): the active shape tab in the calculator.

### Named Rules
**The Float Or Flat Rule.** A shadow means the element floats above the page (overlap, drawer, dialog, fixed bar) or is answering a hover. Resting cards and panels are flat with a hairline border.

## Shapes

Gently squared. The working corner is 6px for buttons, inputs, icon tiles, social buttons and hints; 10px for cards, tiles, image frames and the map; 12px for the dialog and contact form panel; 16px for the top corners of the phone bottom sheet. Small inner pieces (spec tags, calculator tab segments) use 4px. Pills (999px) are reserved for filters, counts, category badges and stock status. Borders are 1px hairlines for structure, 1.5px for fields and quiet controls, 2px on buttons. Photography is cropped with `object-fit: cover` to fixed ratios (4:3 tiles, 1:1 detail, 16:11 feature); bagged products sit contained on white with padding.

## Components

### Buttons
Solid, legible, and big enough for a gloved thumb.
- **Shape:** gently squared (6px), 2px border, minimum 48px tall (54px for large), 700 weight, icon and label 8px apart.
- **Primary:** Bush Green Action fill, white text; the call button everywhere.
- **Hover / Focus:** background and border shift to Bush Green Deep over 150ms ease-out; focus is a 3px Bush Green Action outline at 2px offset (Leaf inside dark bands).
- **Light / Ghost Light:** on dark bands, a white button with Bush Green text and a transparent button with a 75% white border.
- **Outline:** white with a Bush Green Action border; fills green on hover.
- **Quiet:** white with a 1.5px Stone 200 border and ink text; the header Calculator button.

### Chips
- **Filter chips:** pill, 42px tall, 1.5px Stone 200 border, label type. Hover borders in Bush Green Action; active fills Bush Green with white text. Sticky under the nav and horizontally scrollable.
- **Spec tags:** 4px corners, Stone 50 fill, Stone 200 hairline, 0.85rem 600 Ink 2. Count pills and category badges use Stone 100 pills.
- **Stock status:** pill with an 8px currentColor dot; Status OK or Status Alert pairs.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** white, with a Stone 50 image well.
- **Shadow Strategy:** flat at rest; hover lift per Elevation.
- **Border:** 1px Stone 200; hover moves to Stone 400 (product) or Bush Green Action (category tile, whose image also scales to 1.04 over 400ms).
- **Internal Padding:** 18px 20px 20px (product), 14px 16px 16px (tile label).

### Inputs / Fields
- **Style:** white, 1.5px Field Border, 6px corners, 48px minimum height, 10px 14px padding, labels above in label type.
- **Focus:** border turns Bush Green Action with a 3px `rgba(37,96,63,.25)` ring.
- **Error / Disabled:** read-only and disabled fields go Stone 50; errors use a Status Alert panel at 600 weight.

### Navigation
White 72px bar with a Stone 200 hairline under it. Links are 600 ink with a Stone 50 hover fill; the current page is Bush Green Deep with a 3px Bush Green Action underline offset 10px. Below 960px a 48px menu toggle opens a full-width drop-down list (1.15rem, 700) followed by hours and address. Below 768px the fixed action bar takes over: three 56px stacked icon-and-label buttons, Call filled Bush Green Action.

### Icon Tiles and Line Icons
All icons come from one drawn set: 24px grid, 2px round-capped stroke, `currentColor`, decorative and hidden from assistive tech. In rule-divided lists, the icon sits in a solid Bush Green square (44–56px, 6px corners) with a white stroke; inline with text it takes Bush Green Action (Leaf on dark ground).

### Calculator Drawer (signature)
A 440px white drawer sliding in from the right over a 50% dark overlay (320ms, expo-out), becoming a full-width bottom sheet with 16px top corners on phones. A segmented shape control (Stone 50 track, white raised segment) picks rectangle, triangle or circle. Results read out side by side: volume on Stone 50, tonnes on solid Bush Green, both in wide tabular numerals; empty readouts show a dashed Field Border. "Email these details" hands off to the contact form, where a Sandstone Wash hint confirms the prefill.

### Material Strip
Six real materials from the yard laid edge to edge where every page meets the footer, like a sample board: yellow brickie sand, 14/20 river gravel, cypress pine chip, black crusher dust, red granite and organic garden mix. Each swatch is a 2:1 crop of that product's own photo (`public/images/textures/strip-*.jpg`), 72–104px tall (64px on phones, as two rows of three), and links to the product page. A small Bush Green Night label (85% opacity, 4px corners, 0.8rem 700 white) sits bottom-left. On hover the photo scales to 1.06 over 500ms. No border, no gap between swatches.

### Textured Bands
Page headers show 28mm white aggregate (three strips of the photo blended side by side into one 2502×424 band, so the stones stay at a natural scale across the full width) and call-to-action bands show black crusher dust (`public/images/textures/band-*.jpg`), both untinted. Copy sits on a solid Bush Green plate with 10px corners, like a sign fixed to a stone wall: `.header-plate` fits its content in page headers, and the call-to-action plate spans the container. White text never sits directly on the stone, because the bright chips break its contrast.

### Hero Photo Arc
On desktop the yard-sign photo fills the right 50% of the hero, clipped by `ellipse(100% 85% at 100% 50%)` so its left edge bulges toward the copy at mid-height and pulls back toward the corners. The copy column is capped at `min(560px, 46%)` to keep at least 40px clear of the arc. Below 768px the photo stacks on top, and the arc moves to its bottom edge (`ellipse(85% 100% at 50% 0%)`).

### Text Links
Bush Green Deep, 700, with a 2px Sandstone underline that turns Bush Green Action on hover; a trailing 16px arrow icon when the link leads onward.

## Do's and Don'ts

### Do:
- **Do** frame every page with bush-green bands and keep content on white or stone-50.
- **Do** set headings in Archivo 800 at wdth 106–112 and body at normal width, 1.0625rem / 1.6.
- **Do** keep every tap target at least 44px, and buttons at 48px or more.
- **Do** separate list rows with 1px Stone 200 hairlines and give each row a fixed icon column.
- **Do** use the shared line icon set (24px grid, 2px stroke, currentColor) for every icon.
- **Do** keep the phone number visible as a real `tel:` link in the header, the phone action bar and the footer.
- **Do** show a 3px green focus outline on everything interactive, switching to Leaf on dark bands.
- **Do** honour reduced motion: transitions collapse to near-zero.

### Don't:
- **Don't** use emoji or text glyphs as icons, or mix in a second icon style.
- **Don't** use sandstone as a fill for buttons or bands, or as body text on white.
- **Don't** add glass, blur, decorative gradients or colour filters over the material photos; text on stone goes on a solid plate.
- **Don't** use hard offset shadows or shadows on resting cards.
- **Don't** hide content behind fade-in-on-scroll; everything renders visible.
- **Don't** add uppercase tracked kicker labels above headings.
- **Don't** bring in a second typeface or a system display face.
