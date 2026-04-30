# Handoff: CTRLplay Website

## Overview

CTRLplay is a one-developer indie mobile game studio (operated by John Roberts) shipping precise, free-to-play arcade games for Android. This handoff covers the **public marketing website** — a 4-page static site that introduces the studio, its catalogue (BatonDrop, ChessMusic, WordDrop), and provides legal/contact pages.

The four pages are:

1. **Home** (`index.html`) — studio intro, hero, three-game catalogue grid, studio meta block.
2. **BatonDrop product page** (`games/batondrop.html`) — hero with stylized lane visual, "How it plays" 3-step explainer, 11-baton bestiary grid, spec/legal disclosure block.
3. **Privacy policy** (`privacy.html`) — long-form prose with numbered sections, ToC, key/value tables for vendors and contact.
4. **Contact** (`contact.html`) — hero, two-column "general support / specialised inboxes" cards, game directory list.

## About the Design Files

The files in `reference/` are **design references created in HTML** — static prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in your target codebase's existing environment** (Next.js, Astro, plain HTML/CSS, etc.) using its established patterns and libraries — or, if no environment exists yet, to choose the most appropriate framework for a small marketing site (Astro and Next.js App Router are both excellent fits) and implement the designs there.

The reference HTML uses self-contained `<style>` blocks and inline SVG favicons; for the real implementation, lift design tokens into a stylesheet/theme file (CSS variables or Tailwind config) and componentise the recurring pieces (Nav, Footer, Logo, Badge, CTA, GameCard, BatonCard, KVRow, Eyebrow).

## Fidelity

**High-fidelity (hifi).** Pixel-perfect mockups with final colors, typography, spacing, copy, and interactions. Hex values, OKLCH values, font sizes, and spacing are all canonical — lift them verbatim. Recreate the UI pixel-perfectly using your codebase's existing patterns.

---

## Brand & Aesthetic

**Tone:** dark, precise, restrained. Single-developer studio voice — confident but not promotional. No marketing speak, no exclamation marks, no emoji. Copy reads like a developer wrote it for other developers.

**Visual identity:**
- Near-black background (`#0B0C0E`) — deep but not pure black.
- Single warm gold accent (`oklch(0.78 0.14 95)`) used sparingly — italic "play" in logo, links, primary CTAs.
- Each game owns a distinct accent color (amber, blue, green) used only on its own surfaces.
- Heavy use of monospace eyebrows and meta labels for that "spec sheet" feel.
- Subtle radial-gradient vignettes at top and bottom of each page (set in `body::before`).
- Borders are thin (1px) and dim (`#26292F`) — never heavy.
- Rounded corners are gentle (`4px` for small chrome, `14px` for cards) — never pill-shaped except the status badge.
- No shadows except the brand-color glow on the BatonDrop "hit pad" and floor.

---

## Design Tokens

Lift these into your design system (CSS variables, Tailwind theme, etc.). Token names below match the CSS custom properties in the reference files — keep these names if you can.

### Colors

```
/* Surfaces */
--bg:        #0B0C0E   /* page background */
--surface:   #14161A   /* cards, nav, raised panels */
--surface-2: #1C1F24   /* card hover, subtler raise */

/* Borders */
--border:    #26292F   /* default border */
--border-2:  #34383F   /* stronger border (kbd, hover) */

/* Text */
--text:       #E8E9EC  /* primary */
--text-dim:   #8A8F98  /* body / secondary */
--text-faint: #5A5F68  /* meta, eyebrows, footer */

/* Brand */
--brand:     oklch(0.78 0.14 95)         /* CTRLplay gold */
--brand-dim: oklch(0.78 0.14 95 / 0.18)

/* Per-game accents */
--batondrop:  oklch(0.72 0.19 60)   /* dungeon amber */
--chessmusic: oklch(0.78 0.10 220)  /* ambient blue */
--worddrop:   oklch(0.78 0.16 145)  /* soft green */

/* Status */
--status-live: oklch(0.78 0.16 145)  /* green — pulsing */
--status-soon: oklch(0.78 0.10 220)  /* blue */
--status-dev:  oklch(0.80 0.13 80)   /* gold-yellow */
```

### Typography

Three Google Fonts, loaded via:

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```
--f-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;  /* headings, logo, large display */
--f-body:    "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;  /* body, nav, CTAs */
--f-mono:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;  /* eyebrows, meta, kbd, baton IDs */
```

### Type scale (px)

```
--t-xs:   11
--t-sm:   13
--t-base: 15   /* body default */
--t-md:   17
--t-lg:   21
--t-xl:   28
--t-2xl:  40
--t-3xl:  56
--t-4xl:  84
```

Display sizes (titles, hero) typically use `clamp(min, vw, max)` — see per-page specs.

Letter-spacing convention:
- Display headings: `-0.02em` to `-0.04em` (tighter as size grows)
- Body: `0`
- Mono eyebrows / meta: `0.10em` to `0.15em`, often `text-transform: uppercase`

Line-heights:
- Body: `1.55`–`1.7`
- Headings: `1.0`–`1.2`
- Hero displays: as low as `0.92`

### Radius

```
--r-sm: 4px    /* CTAs, kbd, small chrome */
--r-md: 8px
--r-lg: 14px   /* cards, panels */
--r-xl: 20px
```

### Layout

```
--maxw: 1180px       /* page width container */
section padding:      88px top/bottom (desktop), 56px (mobile <700px)
section--tight:       56px top/bottom
.wrap padding:        0 28px (desktop), 0 20px (mobile <600px)
```

---

## Shared Components

These appear on every page and should be implemented once:

### Logo (`<Logo size>`)

The logo is **not an image**. It is rendered in CSS:

- `CTRL` is set in Space Grotesk 700, wrapped in a thin border (1.5px currentColor, 4px radius), with a `::before` pseudo-element drawing a small ↖ chevron (rotated 45deg L-shape) inside.
- A slim space, then `play` in Space Grotesk 400 italic, colored `--brand` gold.
- Three sizes: `sm` (16px), `md` (22px, used in nav), `lg` (`clamp(48px, 9vw, 96px)`, used only in home hero).

Reference: `.logo`, `.logo__ctrl`, `.logo__play` in `index.html`.

### Nav (`<Nav>`)

- Sticky top, `z-index: 50`.
- 12px backdrop-blur, `rgba(11, 12, 14, 0.78)` background.
- 1px bottom border (`--border`).
- Inner row: max-width 1180px, 18px/28px padding (14px/20px on mobile).
- Left: logo. Right: three links — `games`, `privacy`, `contact`.
- Active link: full-strength text + a 1.5px brand-gold underline pinned at `bottom: -22px` of the link (so it sits flush with the nav border).
- Hover: link color transitions from `--text-dim` to `--text` (150ms ease).

### Footer (`<Footer>`)

- 1px top border, 80px top margin, 36px/60px vertical padding.
- Flex row, wrap on small screens.
- Left: small logo + `© 2026`.
- Right: `Privacy`, `Contact`, `Google Play` links.
- All text is mono, 11px, `letter-spacing: 0.05em`, color `--text-faint`. Links hover to `--text-dim`.

### Eyebrow (`<Eyebrow>`)

Used to label sections. Mono, 11px, uppercase, `letter-spacing: 0.15em`, color `--text-faint`. Has a `::before` pseudo drawing a 18px × 1px line in `--text-faint` to the left of the text (10px gap).

### Badge (`<Badge variant="live|soon|dev">`)

- Pill (border-radius: 999px), 6px/10px padding.
- Mono 11px, uppercase, `letter-spacing: 0.12em`.
- 1px border (`--border-2`), `rgba(0,0,0,0.2)` background.
- Inside: a 7px round dot (`badge__dot`) glowing in the variant color via `box-shadow: 0 0 0 3px color-mix(currentColor 30%, transparent)`.
- `live` variant pulses the dot's box-shadow between 3px and 6px on a 1.6s ease-in-out infinite loop.

### CTA (`<CTA variant>`)

Three variants:
- **default** — `--brand` background, `--bg` text. 10–12px / 16–18px padding.
- **game** — accent color of the page's game (set via `--game-accent` custom property on the parent).
- **ghost** — transparent background, `--text-dim` text, 1px `--border-2` border. Hover: text becomes `--text`, border becomes `--text-faint`.
- **disabled** — `--surface-2` background, `--text-faint` text, no pointer events, 1px `--border` border. (Used for "In concept" / "Early stage" CTAs on inactive games.)

All variants: 4px radius, `font-family: --f-body`, 13px/500.
All have an optional `→` arrow that translates 2px on hover; the whole button lifts 1px on hover.

### Kbd

Inline keycap, used in the home hero shortcut row. 28px × 24px min, mono 11px, `--surface` background, 1px `--border-2` border with **2px bottom border** (the keycap depth trick), 4px radius.

---

## Page 1 — Home (`index.html`)

### Layout

```
[Nav]
[Hero ............................ 120px top / 64px bottom]
  - Large CTRL[play] logo (clamp 48–96px)
  - Tagline (display, ~38px, max-width 22ch)
  - Sub (17px dim, max-width 44ch)
  - Keyboard shortcut row (mono 11px + Kbd components)
[Section: Games — eyebrow "Catalogue / 03"]
  - Header row: title + "UPDATED 2026.04" mono label
  - Games grid (6-col CSS grid, 18px gap)
[Section: Studio — eyebrow "The studio"]
  - 2-col grid (1fr / 1.4fr), 64px gap
  - Left col: just the eyebrow
  - Right col: large pull-quote-style display copy + body para + Studio meta dl
[Footer]
```

### Hero

- Tagline: "Indie mobile games built with care."
- Sub: "A one-developer studio shipping precise, free-to-play arcade games for Android. Each release is small, sharp, and made to feel good in the hand."
- Shortcut row: `shortcut [CTRL] + [P] = play` (purely decorative, no actual binding).

### Games grid

Six-column grid, intentionally asymmetric:
- **BatonDrop** — `grid-column: span 4`, `min-height: 380px` (featured card).
- **ChessMusic** — `grid-column: span 2`.
- **WordDrop** — `grid-column: span 2`.

At ≤900px: collapses to 2-col, all cards span 2.
At ≤560px: collapses to 1-col.

### Game card (`<GameCard>`)

- `--surface` background, 1px `--border`, 14px radius, 28px padding.
- 320px min-height (380px for featured), flex-column with 18px gap.
- Hover: border becomes `--border-2`, background becomes `--surface-2`. Live cards' border tints with their accent (`color-mix --game-accent 60%, --border`).
- Top row: index label (mono, "01 / batondrop") + game name (Space Grotesk 600, 28–36px, featured 36–56px) + status Badge.
- Description (15px `--text-dim`, max-width 32–50ch).
- Bottom row (flex justify-between, mt-auto): subtitle meta tag (mono, e.g. "DARK ARCADE · REACTION") + CTA.
- Each card has a decorative `viz-*` SVG/CSS visual absolutely positioned in a corner — see "Game card visuals" below.

### Game card visuals (purely decorative, `aria-hidden`)

**`.viz-batondrop`** — right edge, full height. 4 vertical lanes with gradient fades to top + 1.5px amber top borders, each containing one absolutely-positioned amber baton (6px tall, 60% lane width, glowing) at staggered y-positions (30/65/15/50%).

**`.viz-chessmusic`** — bottom-right corner, 120×120. A 4×4 grid (50%-tinted blue cells, alternating) above an 8-bar "waveform" of varying heights (30/60/80/45/90/55/35/70%).

**`.viz-worddrop`** — bottom-right corner. Three monospace letter blocks stacked: `W`, `OR`, `DROP`, each padded with green tinted background and border.

### Studio block

Two-column. Left col contains only the eyebrow. Right col:
- Pull-quote: "One developer. Games that feel good to play." (Display 20–28px, max 30ch).
- Para: "CTRLplay is the game-making half of John Roberts' software practice. Small releases, hand-tuned mechanics, and the assumption that a player's time is worth more than a session-length metric." (Body 17px dim).
- A `dl.meta` of 4 rows (140px label col, 1fr value col, mono uppercase keys):
  - Founded → 2025 / Solo studio
  - Platforms → Android · Google Play
  - Model → Free-to-play · Optional cosmetics · Optional rewarded ads
  - Press / support → support@ctrlplay.com (link, gold underline)

---

## Page 2 — BatonDrop (`games/batondrop.html`)

### Layout

```
[Nav]
[Breadcrumb — CTRLplay / Games / BatonDrop]
[Hero — 2-col grid, 1.1fr / 1fr]
  Left:  Live badge + meta tag, Title "Baton[Drop italic amber]", tagline, two CTAs
  Right: bd-lanes visual (9:16 stylized phone-screen mockup)
[Section: How it plays — eyebrow + heading + 3-step grid]
[Section: Batons bestiary — header + 11 cards]
[Section: Spec — fine print as 2-col]
[Footer]
```

The body has a unique amber-tinted top vignette (rather than the gold one on home) — `color-mix --batondrop 8%`.

### Breadcrumb

Mono 11px uppercase, `letter-spacing: 0.1em`. Format: `CTRLplay  /  Games  /  BatonDrop` (separator color `--border-2`, current page color `--text-dim`).

### Hero

- Title: "Baton" + `<em>Drop</em>` (italic 400 weight, color `--batondrop`). Display, `clamp(48, 9vw, 112px)`, weight 700, `letter-spacing: -0.04em`, line-height `0.92`.
- Tagline: "A baton falls from the dark. You have a fraction of a second to send it home." Display 20–26px, `--text-dim`.
- Meta row above title: Live badge + "Dark arcade · Reaction · Android" (mono).
- CTAs: primary "Get on Google Play →" (game variant, amber) + ghost "How it plays" anchor.

### `bd-lanes` phone mockup

A stylized portrait field in 9:16 aspect ratio, max-width 380px, 14px radius:
- Background: vertical gradient `#08090B → #100B05`.
- Four equal-width lane columns separated by dashed amber borders (18% opacity).
- Three "batons" placed at varying lane/y positions: amber bars with strong amber glow. The third is white (`#E8E9EC`) — an unactioned "ghost" baton.
- Bottom 14% is the "floor": a green-to-transparent gradient with a 2px solid amber top border and a strong amber outer glow.
- Floor contains 4 "pads" (one per lane) — small rounded rectangles with amber tints. The 3rd pad is in the **hit** state: brighter amber background, amber border, double box-shadow glow (outer + inset).

### How it plays

- Eyebrow + heading: "Reaction game. Four lanes. Speed climbs."
- 3-column grid, 1px borders top/bottom, 1px right border between steps.
- Each step:
  - Numbered mono label (e.g. "01 / WATCH"), color `--batondrop`.
  - Title (Space Grotesk 500, 21px).
  - Description (13px `--text-dim`).
- Steps:
  1. **A baton falls.** "It begins above the play field. Each level introduces new fall patterns, new tempo, new ways to be wrong."
  2. **Pick the right lane.** "Four pads at the floor. The baton's lane is the answer. Tap before it lands. Miss it, it drops, you bleed health."
  3. **Levels increase speed and complexity.** "Specials enter the rotation. The dungeon deepens. Reflex becomes pattern recognition."
- Mobile (≤780px): collapse to 1-col, swap right borders for bottom borders.

### Baton bestiary

Header: eyebrow "Baton types · 11 in rotation" + title "A standard baton, plus ten that change the rules." (display 32–48px, weight 600, max 18ch). Right meta: "v1.0 / SPEC".

3-column grid (2-col at ≤880px, 1-col at ≤520px) inside a 14px-rounded container with `--border` border. Inner cells share borders (right + bottom 1px each, trimmed at row/column ends).

Each `BatonCard`:
- 24px padding, 170px min-height, `--surface` background (hover `--surface-2`).
- Top row: a 44px square symbol tile (1px `--border-2` border, `--bg` bg, mono 18px) + mono ID badge (`B-00` etc.) `letter-spacing: 0.15em`.
- Name (Space Grotesk 600, 17px).
- Description (13px `--text-dim`).
- Tag at bottom (mono 10px, accent-colored, uppercase, `letter-spacing: 0.12em`).

The 11 batons (full content — copy verbatim):

| ID | Symbol | Name | Description | Tag | Color (oklch) |
|----|--------|------|-------------|-----|---------------|
| B-00 | `\|` | Standard | A clean fall, one lane, one tap. The rest of the catalogue is a deviation from this. | Baseline | `var(--batondrop)` |
| B-01 | `●` | Bomb | Do not catch this one. Tapping the bomb lane costs you. Leave it to the floor. | Inverted · Trap | `0.65 0.20 30` |
| B-02 | `◌` | Ghost | Half-visible. Phases between lanes mid-fall. Your eye has to commit late. | Phase · Visibility | `0.85 0.02 240` |
| B-03 | `∿` | Bouncer | Hits a wall, jumps lanes. Track the trajectory, not the start point. | Path · Physics | `0.78 0.16 145` |
| B-04 | `»` | Fast forward | Time accelerates while it falls. The next batons inherit the new tempo until it resets. | Time · Tempo | `0.72 0.19 60` |
| B-05 | `«` | Slow motion | Time stretches. A short window to clear a backlog or set up the next move. | Time · Tempo | `0.78 0.10 220` |
| B-06 | `⇄` | Swap | Pads rearrange. Lane 1 is now where lane 4 was. Muscle memory becomes a liability. | Layout · Rules | `0.78 0.13 305` |
| B-07 | `×2` | Double | Two batons fall together. Two lanes, one tempo. The game widens. | Multi · Pressure | `0.78 0.14 95` |
| B-08 | `⌐` | Magnet | Pulls toward your last-tapped lane mid-fall. Useful, then dangerous, then useful again. | Path · Modifier | `0.72 0.15 25` |
| B-09 | `▾` | Shrink | The pads at the floor narrow. Same lane count, less margin for the heel of your thumb. | Layout · Hit-area | `0.74 0.12 180` |
| B-10 | `❄` | Freeze | A baton freezes mid-air. Tap when it thaws. The wait is the test. | Time · Hold | `0.85 0.05 240` |

Below the grid: a `disclose` callout (24px/28px padding, 14px radius, `--surface`):
- Left: 36px square with `$` mono icon, brand color.
- Right: heading "Free to play. Cosmetic items available for purchase. Rewarded ads optional." + para about no paywalls/timers, cosmetic skins only, optional rewarded ads.

### Spec section

2-col grid (1fr / 1.4fr, 64px gap). Left: eyebrow + heading "Specs, support, the legal stuff." Right: a `<dl>` of 8 rows (200px key col, 1fr value col, 18px vertical padding, 1px row borders).

Rows: Platform · Status · Internet · Age rating · Monetisation (multiline) · Get the game (link) · Support (link to contact) · Privacy (link to privacy). Full copy in `reference/games/batondrop.html`.

---

## Page 3 — Privacy (`privacy.html`)

### Layout

```
[Nav]
[prose-wrap — max 760px, centered, 64px/80px vertical padding]
  Eyebrow "Legal · Compliance"
  H1 "Privacy Policy"
  Lede paragraph (display 21px text)
  Meta bar: Effective date / Version 1.0 / Applies to (mono uppercase)
  ToC: 2-column grid of section anchors with auto-numbered prefixes
  H2 sections (auto-numbered via CSS counter), prose body
[Footer]
```

### Auto-numbering trick

H2s are numbered via `counter-reset: sec` on the article and `counter-increment: sec` on each H2's `::before`. The number renders in mono, brand color, before the heading text (gap 14px). This means **section order matters** and adding/removing an H2 reflows numbers. If you'd rather hard-code numbers, that's fine — but match the visual: small mono number to the left of the display heading.

### Prose styling

- H1: display, `clamp(36, 5vw, 56px)`, weight 600, `letter-spacing: -0.025em`.
- H2: display 28px, weight 500, with the counter prefix described above. Margin: `56px 0 14px`.
- Lede: display 21px, primary text color, max 50ch.
- Body p / li: 15px, `--text-dim`, line-height 1.7.
- Lists: no bullets — instead, 12px × 1px horizontal rule drawn 0.7em from top, 22px left padding.
- Links: brand color, semi-transparent brand bottom border that fills on hover.
- Inline `<strong>`: `--text` (full strength), weight 500.

### Sections (with anchors)

1. **Scope** — applies to all CTRLplay games (BatonDrop, ChessMusic, WordDrop) + this site.
2. **What we collect** — device ID, gameplay stats, optional leaderboard name, crash data. Explicit "do NOT collect" list.
3. **How we use it** — 4 items + non-sale statement.
4. **Third parties** — `kv` table: Google Play, Google AdMob, Supabase, Crash reporting.
5. **Data retention** — 90 days for crash data; aggregated stats indefinite (anonymised); leaderboard until deletion.
6. **Your rights (GDPR / CCPA)** — Access, Correct, Delete, Object, Port; 30-day response.
7. **Children** — not directed at <13s, no knowing collection.
8. **Contact** — `kv` table with privacy@ctrlplay.com, studio name, response time.

Footer line in mono small caps: `End of policy · v1.0`.

> **Note:** The reference uses `[YYYY-MM-DD]` as a placeholder for the effective date. Replace with a real ISO date at implementation time.

---

## Page 4 — Contact (`contact.html`)

### Layout

```
[Nav]
[c-hero — 80px top, 32px bottom]
  Eyebrow "Contact / Support"
  H1 "Got a question? Send an email." (display, clamp 40–72px, max 14ch)
  Lede para (display 18–24px dim, max 48ch)
[c-grid — 2-col, 1.1fr / 1fr, 32px gap]
  Card A: General support
  Card B: Specialised inboxes (kv list)
[Game directory — section]
  Header row: eyebrow + title + "03 LISTED" mono right
  3-row directory list
[Footer]
```

### Card A — General support

- 32px padding, 14px radius, `--surface` background, 1px border.
- Eyebrow + h2 "For bugs, billing, accounts, and anything else."
- Description "Tell us which game, the device you're on, and what happened. A screenshot helps."
- **Email row** (`.email-row`): 18px/20px padding, 1px `--border-2`, `--bg` background, mono. Left: address `support@ctrlplay.com` (`--brand`, 17px). Right: a "Compose →" pill button (mailto link).
- **Live strip**: small flex row with pulsing green dot + "Inbox · Open · Replies within 3 business days" mono uppercase.

### Card B — Specialised inboxes

- Same card chrome.
- Eyebrow + h2 "Specialised lines."
- KV list (160px label col):
  - Privacy → privacy@ctrlplay.com
  - Press → press@ctrlplay.com
  - Bug reports → bugs@ctrlplay.com
  - Studio → CTRLplay · operated by John Roberts

### Game directory

A list (not a card grid — flat rows separated by 1px borders).

Row layout: `auto 1fr auto auto` columns, 24px gap, 20px vertical padding.

| Symbol | Name + subtitle | Status | Link |
|---|---|---|---|
| `\|` (amber) | **BatonDrop** / Dark arcade reaction game | Live | View page → |
| `♞` (blue) | **ChessMusic** / Generative music from chess moves | Soon | No page yet (40% opacity) |
| `A` (green) | **WordDrop** / Word puzzle, early stage | In dev | No page yet (40% opacity) |

The symbol is a 40px square tile (1px `--border-2` border, 4px radius, mono 17px in `--game-color`).

Hover on the live row: padding-left transitions from 0 to 8px (the row "nudges right").

Mobile (≤600px): status and link wrap under the name in column 2.

---

## Interactions & Behavior

The site is **static, no JavaScript required**. All interactions are CSS-only:

- **Hover transitions:** 150–200ms ease on color, border, transform, padding-left.
- **CTA hover:** `transform: translateY(-1px)`. Arrow inside translates 2px right.
- **Card hover:** background `--surface` → `--surface-2`, border slight strengthen. On live game cards, border tints with the game's accent color.
- **Live status badge:** the dot's box-shadow pulses on a 1.6s ease-in-out infinite loop (3px → 6px → 3px). Same pulse animation reused on the contact page's live strip.
- **Nav links:** color transition on hover; the active link has a 1.5px brand underline at `bottom: -22px` (so it sits flush with the nav's bottom border).
- **Directory rows:** padding-left animates from 0 → 8px on hover (live rows only).

No scroll-triggered animations, no parallax, no toasts, no modals.

---

## State Management

None. This is a static marketing site. No forms, no auth, no data fetching. The "Compose →" button on contact is a `mailto:` link.

If you build it in a framework, the only state worth modeling is the **active nav route** (so the right link gets `aria-current="page"` + the underline). React Router's `NavLink`, Next.js `usePathname()`, or Astro's `Astro.url.pathname` all work fine.

---

## Responsive Behavior

Breakpoints used in the reference:
- **900px** — games grid: 6-col → 2-col.
- **880px** — BatonDrop hero stacks; bestiary 3-col → 2-col; contact 2-col cards stack.
- **800px** — studio block stacks; spec 2-col stacks.
- **780px** — How-it-plays steps stack.
- **700px** — section padding 88 → 56; BatonDrop viz scales down.
- **600px** — wrap padding 28 → 20; nav padding tightens; KV rows stack.
- **560px** — games grid 2-col → 1-col.
- **520px** — bestiary 2-col → 1-col.

Match these or compress to your own scale (sm/md/lg/xl in Tailwind, etc.) — the breakpoints are not sacred, the **stacking order** is.

---

## Assets

No external images. Everything visual is:
- **Inline SVG favicon** (data URI in `<link rel="icon">`) — a rounded gold-bordered square containing a gold chevron. Same SVG on every page; lift it to a constant.
- **CSS-drawn logo** — described in the Logo component section.
- **CSS-drawn game card visuals** — `viz-batondrop`, `viz-chessmusic`, `viz-worddrop`. Pure CSS gradients + grid + small absolute-positioned children.
- **CSS-drawn `bd-lanes` phone mockup** on BatonDrop page — pure CSS as well.
- **Unicode glyphs** for baton symbols and the `♞` chess knight in the directory.

If you'd rather replace the CSS visuals with real screenshots / illustrations down the line, that's fine — the layouts reserve the right space and the descriptions stay accurate.

---

## Files in `reference/`

```
reference/
  index.html              — home
  games/batondrop.html    — BatonDrop product page
  privacy.html            — privacy policy
  contact.html            — contact
```

Read these directly for the source-of-truth on every spacing value, exact copy line, and edge-case style. The README captures intent; the HTML captures the pixels.

---

## Recommended implementation steps

1. **Set up the framework** (Astro / Next.js App Router / SvelteKit — any static-friendly stack). Configure font loading via your framework's font primitive, not raw `<link>` tags.
2. **Lift design tokens** into a global stylesheet or theme config. Keep the variable names from this README so the reference HTML stays grep-able.
3. **Build the four shared components first**: Logo, Nav, Footer, Eyebrow, Badge, CTA. Then KV table, GameCard, BatonCard.
4. **Build pages in order:** Home → BatonDrop → Contact → Privacy. Home and BatonDrop have the most distinctive visual work.
5. **Don't skip the game card visuals** — they're a small but important part of the brand identity. Implement them as React/Astro components with the same CSS approach as the reference.
6. **Verify pulse animation timing** on the live badges — it's subtle but signature.
7. **Run an a11y pass:** every nav has `aria-label`, badges have semantic content, decorative visuals have `aria-hidden`. Match this.
