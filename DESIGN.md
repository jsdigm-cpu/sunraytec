# DESIGN.md — Sunraytec (Notion-inspired)

> Experimental branch: `experiment/notion-design`
> Design system inspired by Notion (getdesign.md/notion)

## Overview

Sunraytec's homepage adopts Notion's editorial design language: a **deep navy hero band** with a centered headline, **purple rectangular CTA**, pastel feature cards, and Inter-based typography. The brand's authority (government procurement, certifications, 16 years) is expressed through Notion's sober-editorial geometry rather than aggressive red/orange.

**Key Characteristics:**
- Deep navy hero band with centered headline + purple primary CTA
- Inter (Notion-Sans equivalent) across every surface
- 8px-rounded buttons (rectangular, NOT pills)
- 12px-rounded cards
- Pastel feature card palette (peach, rose, mint, lavender, sky, yellow)
- Bold yellow banner for high-emphasis sections
- 1280px max-width container, 32px gutters

## Colors

### Primary
- `--notion-purple`: #7C3AED — Primary CTA
- `--notion-purple-pressed`: #6D28D9
- `--notion-navy`: #0F1117 — Hero band background
- `--notion-navy-mid`: #1A1F2E

### Brand Spectrum
- `--notion-pink`: #EC4899
- `--notion-orange`: #F97316
- `--notion-teal`: #14B8A6
- `--notion-green`: #22C55E
- `--notion-yellow`: #EAB308

### Card Tints (Pastel)
- `--tint-peach`: #FFF1EC
- `--tint-rose`: #FFF0F3
- `--tint-mint`: #EDFAF4
- `--tint-lavender`: #F3EFFE
- `--tint-sky`: #EEF6FF
- `--tint-yellow`: #FEFCE8
- `--tint-yellow-bold`: #FDE047 — High-emphasis banner
- `--tint-cream`: #FFFBF0

### Surface
- `--canvas`: #FFFFFF
- `--surface`: #F7F7F5
- `--surface-soft`: #F1F1EF
- `--hairline`: #E8E8E5
- `--hairline-strong`: #C7C7C4

### Text
- `--ink-deep`: #0F0F0F
- `--ink`: #1A1A1A
- `--charcoal`: #37352F
- `--slate`: #6B6B6B
- `--steel`: #9B9B9B
- `--on-dark`: #FFFFFF
- `--on-dark-muted`: rgba(255,255,255,0.7)

## Typography

Font: **Inter** (Google Fonts, Notion-Sans equivalent)

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Hero display | 72px | 600 | 1.05 |
| Display lg | 48px | 600 | 1.10 |
| Heading 1 | 40px | 600 | 1.15 |
| Heading 2 | 32px | 600 | 1.20 |
| Heading 3 | 24px | 600 | 1.25 |
| Subtitle | 18px | 400 | 1.55 |
| Body md | 16px | 400 | 1.55 |
| Body sm | 14px | 400 | 1.50 |
| Button | 14px | 500 | 1.30 |

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| xs | 4px | Chips |
| sm | 6px | Badges |
| md | 8px | Buttons, inputs |
| lg | 12px | Cards |
| xl | 16px | Feature panels |
| full | 9999px | Status pills only |

## Buttons

- **Primary**: bg `--notion-purple`, white text, 8px radius, `10px 20px`
- **Secondary**: transparent, `--ink` text, `1px solid --hairline-strong`, 8px radius
- **On dark**: white bg, `--ink` text, 8px radius
- **Secondary on dark**: transparent, white text, `1px solid rgba(255,255,255,0.4)`

## Do's and Don'ts

### Do
- Use `--notion-purple` for the single dominant CTA only
- Pair navy hero with purple button + outlined secondary
- Use pastel tints generously on feature cards
- Use `--tint-yellow-bold` for high-emphasis banners
- Keep buttons rectangular (8px), cards 12px rounded

### Don't
- Don't use pill-shaped buttons
- Don't use red/orange as primary CTA color on the Notion-themed branch
- Don't mix purple with other accent colors in the same button row
