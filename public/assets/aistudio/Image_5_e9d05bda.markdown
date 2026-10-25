---
name: Emerald Directory
colors:
  surface: '#f6fbf6'
  surface-dim: '#d6dbd7'
  surface-bright: '#f6fbf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5f0'
  surface-container: '#eaefeb'
  surface-container-high: '#e4e9e5'
  surface-container-highest: '#dfe4df'
  on-surface: '#171d1a'
  on-surface-variant: '#3e4944'
  inverse-surface: '#2c322f'
  inverse-on-surface: '#edf2ee'
  outline: '#6e7a74'
  outline-variant: '#bdc9c2'
  surface-tint: '#006c53'
  primary: '#006c53'
  on-primary: '#ffffff'
  primary-container: '#00ecba'
  on-primary-container: '#00664f'
  inverse-primary: '#00e0b1'
  secondary: '#4b635b'
  on-secondary: '#ffffff'
  secondary-container: '#cbe6db'
  on-secondary-container: '#4f685f'
  tertiary: '#805622'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffc688'
  on-tertiary-container: '#79501d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#2cffcb'
  primary-fixed-dim: '#00e0b1'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513e'
  secondary-fixed: '#cee8de'
  secondary-fixed-dim: '#b2ccc2'
  on-secondary-fixed: '#072019'
  on-secondary-fixed-variant: '#344b44'
  tertiary-fixed: '#ffddbb'
  tertiary-fixed-dim: '#f4bc7f'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#643e0c'
  background: '#f6fbf6'
  on-background: '#171d1a'
  surface-variant: '#dfe4df'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.375rem
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-lg: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for local trades and service directories, establishing instant trust, approachability, and rapid utility. It balances the clarity of an on-demand marketplace with the friendliness required for human-to-human trade interactions.

The visual style blends modern corporate utility with warm, tactile minimalism:
- **Clean and Airy:** Crisp white surfaces framed by airy mint tints remove visual friction, prioritizing immediate contact actions (Chat, Hire, Call).
- **Human & Trustworthy:** Friendly worker avatars with verified badges, real service imagery, and clear ratings build immediate credibility.
- **Action-Oriented:** Punchy vibrant mint greens act as clear functional beacons across directories, cards, and modal bottom sheets.

## Colors

The palette relies on vibrant mint green as the foundational action driver, supported by soft muted mints for surfaces and states.

- **Primary (`#1CF9C5`):** Applied to primary CTAs (e.g., "Hire", "Chat", "View Profile"), active navigation indicators, and verified badges.
- **Secondary (`#A5BFB5`):** Used for subtle chip fills, active tab highlights, chat bubble backgrounds, and selected card states.
- **Neutral (`#1F2937`):** Primary headings and body copy, transitioning to `#6B7280` for secondary metadata and `#F3F4F6` for card strokes and container dividers.

## Typography

The typography pairs **Plus Jakarta Sans** for headlines and titles with **Inter** for dense transactional UI data, descriptions, and messaging.

- **Headlines:** Plus Jakarta Sans provides geometric warmth, making artisan names, category titles, and pricing structures feel modern and welcoming.
- **Body & Metadata:** Inter guarantees high-density legibility for hourly rates, trade descriptions, and quick chat communications.

## Layout & Spacing

A mobile-first fluid layout standardizing rapid one-hand thumb interaction:

- **Mobile (Default):** 16px (`1rem`) outer screen margins with 12px–16px gutters between worker cards and category pills.
- **Horizontal Carousels:** Category cards and featured artisans use horizontal snap-scrolling with `margin` safe bleed on the edges.
- **Vertical Flow:** Standard 16px gaps separate modular sections (e.g., "Services near you", "Painters", "Popular in your city").
- **Bottom Clearance:** Screens maintain an 80px bottom padding clearance to prevent UI overlap with floating navigation bars and modal sheets.

## Elevation & Depth

This design system avoids dark or heavy drop shadows, relying on low-contrast structural outlines paired with light, diffuse surface shadows:

- **Level 0 (Base Canvas):** Pure white `#FFFFFF` or pale ambient background `#F9FAFB`.
- **Level 1 (Cards & Feed Tiles):** 1px solid border (`#E5E7EB` or `#F3F4F6`) with an ultra-soft shadow: `0 2px 8px rgba(28, 249, 197, 0.04)`.
- **Level 2 (Modals, Bottom Sheets & Popovers):** Soft elevation: `0 8px 24px rgba(0, 0, 0, 0.08)` paired with rounded top corners for interactive drag-down interaction.
- **Level 3 (Floating Action Bars & Nav):** Elevated floating dock: `0 4px 20px rgba(0, 0, 0, 0.06)` with a crisp interior hairline border (`rgba(229, 231, 235, 0.8)`).

## Shapes

The system uses a balanced Level 2 roundedness profile (`0.5rem` / `8px` base):

- **Cards & Service Tiles:** `rounded-lg` (16px / `1rem`) for smooth corner curvature that encloses images and meta-text cleanly.
- **Buttons & Direct Action Badges:** Pill-shaped (`rounded-full`) for quick action triggers like "Chat", "Hire", or category filters.
- **Modal Sheets:** `rounded-xl` (24px / `1.5rem`) on top edges to indicate swipe-down dismissibility.
- **Worker Avatars:** Fully circular (`rounded-full`) with a 2px interior border separating status indicators.

## Components

### Buttons
- **Primary Action (Call / Hire / Chat):** Vibrant mint green `#1CF9C5` background, dark text label, full pill radius (`9999px`), `0.75rem 1.25rem` padding.
- **Secondary Action (Outlined):** White background, 1px solid `#1CF9C5` border, `#1F2937` label.
- **Subtle Action:** Muted mint green `#A5BFB5` background with `#1F2937` label for low-friction secondary actions like "View profile".

### Worker & Service Cards
- **Directory Tile:** 16px rounded white card, subtle `#E5E7EB` border. Square 1:1 service or artisan photo at the top with a subtle 8px border radius.
- **Card Header:** Worker avatar, bold name in Plus Jakarta Sans, inline star rating pill with amber icon and bold score.
- **Card Footer:** Prominent hourly rate (`$X/hr`) on the left, pill CTA button on the right.

### Chips & Badges
- **Status / Verified Badges:** 16px mint circular pill with a white checkmark or green active dot positioned at the bottom-right corner of avatars.
- **Category Chips:** Horizontal pill scroll with `#F3F4F6` background, turning into `#A5BFB5` with dark text when selected.

### Input Fields & Search Bars
- **Search Header:** 12px rounded container with `#F9FAFB` fill, 1px stroke `#E5E7EB`, leading search icon, and clear action button.
- **Chat Input Bar:** Pill container, trailing send action button in primary mint with microphone and attachment icons in neutral slate.

### Bottom Navigation
- **Floating Bar:** Fixed bottom container, white surface with `rounded-full` or elevated card form factor, icon and micro-label pairings. The active tab features a mint indicator dot or pill highlight.