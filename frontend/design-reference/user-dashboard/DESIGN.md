---
name: FundArc
colors:
  surface: '#fff8f2'
  surface-dim: '#e1d9d0'
  surface-bright: '#fff8f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2e9'
  surface-container: '#f5ede4'
  surface-container-high: '#efe7de'
  surface-container-highest: '#e9e1d8'
  on-surface: '#1e1b16'
  on-surface-variant: '#3f484a'
  inverse-surface: '#34302a'
  inverse-on-surface: '#f8efe6'
  outline: '#6f797a'
  outline-variant: '#bfc8c9'
  surface-tint: '#21676f'
  primary: '#004349'
  on-primary: '#ffffff'
  primary-container: '#0f5c63'
  on-primary-container: '#91d2da'
  inverse-primary: '#90d1d9'
  secondary: '#056d3f'
  on-secondary: '#ffffff'
  secondary-container: '#9af2b9'
  on-secondary-container: '#0f7143'
  tertiary: '#7a100b'
  on-tertiary: '#ffffff'
  tertiary-container: '#9b291f'
  on-tertiary-container: '#ffb5aa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aceef6'
  primary-fixed-dim: '#90d1d9'
  on-primary-fixed: '#002023'
  on-primary-fixed-variant: '#004f55'
  secondary-fixed: '#9df5bb'
  secondary-fixed-dim: '#81d9a1'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522e'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#891c15'
  background: '#fff8f2'
  on-background: '#1e1b16'
  surface-variant: '#e9e1d8'
typography:
  display-xl:
    fontFamily: Fraunces
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Fraunces
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.1'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.02em
  kicker-label:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1280px
---

## Brand & Style
The design system is rooted in the "Editorial Finance" aesthetic—a fusion of classical financial journalism and modern decentralized protocols. The brand personality is authoritative, transparent, and intellectually rigorous. 

The visual style follows a **Modern-Minimalist** approach with **Tactile/Paper** influences. It avoids the neon-heavy tropes of "Web3" in favor of a restrained, ink-on-paper feel. The interface prioritizes high-quality typography, intentional whitespace, and thin hairline strokes to create an atmosphere of credibility and institutional stability. The emotional response should be one of "calm confidence" and "uncluttered focus," treating every crowdfunding campaign like a prestigious feature article.

## Colors
The palette is inspired by high-end financial broadsheets. The primary background uses a warm "Ivory Paper" to reduce eye strain and provide a premium feel. 

- **Primary Teal (#0F5C63):** Used specifically for high-impact actions and brand moments. 
- **The Ledger Green (#1E7A4B):** Reserved for progress bars, positive growth, and successful funding indicators.
- **The Signal Red (#B23A2E):** A muted brick red used exclusively for "Live" status indicators and urgent alerts.

For the Dark Mode variant, the "warmth" is maintained by avoiding pure blacks (#000) and using deep charcoal with a slight violet-brown undertone. Surfaces should utilize the hairline border instead of heavy drop shadows to define boundaries.

## Typography
The system uses a tri-font hierarchy to balance editorial elegance with technical precision.

1.  **Fraunces (Display):** Use for large campaign titles and section headers. High-contrast serif weights add a "publication" feel.
2.  **Work Sans (UI/Body):** A clean, neutral grotesque that provides maximum legibility for long-form project descriptions and UI labels.
3.  **JetBrains Mono (Data):** Used for all numerical values, ETH addresses, and "Kicker" labels. Tabular figures ensure that columns of data align perfectly in ledger-style layouts.

**Editorial Tip:** Use "Kicker" labels (uppercase mono) above main headlines to categorize content (e.g., `01 / INFRASTRUCTURE`).

## Layout & Spacing
The layout follows an **Editorial Grid** model. While fundamentally a 12-column system, it encourages intentional asymmetry—such as leaving the first two columns of a section empty for "Kicker" labels or using off-center alignments for hero imagery.

- **Ledger Alignment:** Align data points horizontally using 1px hairline rules.
- **Vertical Rhythm:** Use a strict 4px/8px baseline for all UI elements to maintain a disciplined, structural feel.
- **Desktop:** 12-column grid, 24px gutters, 64px side margins.
- **Tablet:** 8-column grid, 16px gutters, 32px side margins.
- **Mobile:** 4-column grid, 16px gutters, 20px side margins.

## Elevation & Depth
This system eschews traditional shadows for **Tonal Layering** and **Hairline Outlines**.

- **Surfaces:** Use `#FBFAF6` (Light) or `#1A1820` (Dark) for cards, slightly lifted from the background color. 
- **Borders:** Every container (cards, inputs, buttons) must have a 1px solid border using the defined "border" tokens. This mimics the thin ink lines of a ledger or newspaper.
- **Depth:** Only use shadows for "Floating" elements like Modals or Dropdowns. If used, the shadow should be an ambient, neutral grey with a large blur (24px+) and very low opacity (8%), creating a "soft lift" rather than a hard drop.
- **Texture:** A subtle paper grain SVG overlay (opacity 0.03) should be applied to the global background to enhance the tactile feel.

## Shapes
The shape language is "Soft-Square." A universal radius of **6px** is applied to all interactive elements. 

- **Cards/Inputs/Buttons:** 6px radius.
- **Category Pills:** 2px radius (near-sharp) to distinguish them as "tags" rather than buttons.
- **Dividers:** 1px horizontal or vertical rules.

## Components

### Buttons
- **Primary Petrol:** Solid `#0F5C63` background, white text, 6px radius. No gradient.
- **Ghost Button:** 1px hairline border in `text_secondary`, no background.
- **Wallet Button:** Mono font, uppercase, leading icon of a simple wallet stroke.

### Campaign Card
- Large Serif title, 1px top border, "Ledger Progress Bar" (a thin 4px bar with no rounded caps), and a mono stat block at the bottom showing "ETH Raised / Goal".

### Ledger Stat Block
- Two-tier layout: A small mono label (e.g., "BACKERS") above a large mono figure. A 1px underline spans the width of the figure.

### Inputs & Categories
- **Input with Inline Unit:** Transparent background, 1px border, with the unit (e.g., "ETH") fixed to the right in mono font.
- **Category Pills:** Bordered pills with brackets, e.g., `[ DEFI ]`.

### Status Indicators
- **Live Indicator:** A small solid brick red dot next to "LIVE" in mono uppercase.
- **Verified Mark:** A thin 1.5px stroke checkmark inside a 1px bordered circle. No fill.

### Navigation & Footer
- **Nav:** Slim 64px height, bottom hairline border only, centered links.
- **Footer:** Massive 5-column layout with serif headers, using the same paper-grain background.