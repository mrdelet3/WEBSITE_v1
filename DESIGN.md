# Design System: Alexey Kukhtin Sculpture
**Project ID:** AK_WEBSITE_REBUILD

## 1. Visual Theme & Atmosphere
The design is **Minimalist, Sculptural, and Gallery-like**. It relies heavily on whitespace, sophisticated typography, and subtle interactions (frosted glass, smooth transitions). The atmosphere is serene and high-end, emphasizing the texture and form of the sculptures.

## 2. Color Palette & Roles
### Primary
- **Gypsum Taupe** (#8B7D6B): Primary accent, warm earth tone.
- **Gallery Gold** (#D4C4A8): Secondary accent, used for highlights and active states.

### Neutrals (Light Mode)
- **Gallery Background** (#fcfcfc): Main background, slightly warmer than pure white.
- **Charcoal** (#2C2A28): Primary text color.
- **Bronze Black** (#1A1816): Headings and strong text.
- **Border Light** (#e5e5e5): Subtle dividers.

### Neutrals (Dark Mode)
- **Background Dark** (#0a0a0a): Main background for dark mode.
- **Warm Charcoal** (#212121): Secondary background / cards.
- **Off-White** (#F5F5F5): Primary text in dark mode.
- **Border Dark** (#262626): Dividers in dark mode.

## 3. Typography Rules
### Font Families
- **Display:** "Cormorant Garamond", serif. Used for Headings (h1, h2, h3).
- **Body:** "Inter", sans-serif. Used for navigation, body text, and UI elements.
- **Price/Numbers:** "Montserrat", sans-serif. Used specifically for pricing.

### Styling
- **Uppercase:** Heavy use of uppercase with wide tracking (`tracking-[0.3em]` or `tracking-widest`) for navigation and labels.
- **Italic:** Used for subsection headers or emphasis in the display font.

## 4. Component Stylings
*   **Buttons:**
    *   **Primary:** Solid color (Gypsum or Dark), uppercase, wide tracking, sometimes with an icon. Sharp or slightly rounded corners (`rounded-sm`).
    *   **Ghost/Outline:** Bordered, transparent background, hover effects (color fill or opacity change).
*   **Cards:**
    *   **Product:** Minimalist, image-focused. `group` hover effects scale the image or change opacity. Grayscale to Color on hover transition.
*   **Navigation:**
    *   **Sidebar (Desktop):** Fixed left, vertical list. Uppercase, wide tracking.
    *   **Mobile:** Header bar with hamburger menu.
*   **Inputs:**
    *   Minimalist borders, no background (or white/dark), focus ring with primary color.

## 5. Layout Principles
-   **Grid:** 12-column or responsive grid (1 col mobile, 2 col tablet, 3 col desktop).
-   **Sidebar:** Fixed sidebar on desktop (width ~64 or 16rem).
-   **Whitespace:** Generous padding (py-20, px-12).
