# Copilot Instructions for Alexey Kukhtin Sculpture E-Commerce

## Project Overview
This is a gallery-style e-commerce site for sculpture sales built with **React 19 + TypeScript + Vite + Tailwind CSS**. The aesthetic is minimalist and high-end, emphasizing whitespace and subtle animations.

## Architecture

### Routing & Layout
- **Fixed Sidebar Layout**: Desktop uses a fixed 64px (`lg:ml-64`) left sidebar in [src/components/Sidebar.tsx](src/components/Sidebar.tsx); mobile uses a header + overlay menu
- **Route Key Strategy**: [src/App.tsx](src/App.tsx) uses `getRouteKey()` to prevent remounting when navigating between store collection and product detail views
- **Nested Store Routes**: `/store/:category` and `/store/:category/product/:id` render the same `<Store />` page—product detail appears as a modal overlay via `<ProductModal />`

### State Management
- **Context Pattern**: Use `CartContext` and `ThemeContext` in [src/context/](src/context/) — always wrap hooks with providers in [src/main.tsx](src/main.tsx)
- **Cart Persistence**: Cart auto-persists to `localStorage` with key `stitch_cart`
- **Theme Toggle**: Light/dark mode via CSS class on `<html>` element; use `useTheme()` hook

### Component Conventions
- **Path Aliases**: Always use `@/` imports (e.g., `@/components/`, `@/lib/utils`, `@/data/`)
- **UI Components**: [src/components/ui/](src/components/ui/) contains shadcn/ui components using CVA (class-variance-authority)
- **Animations**: Use Framer Motion via [src/components/animations/](src/components/animations/) — `FadeIn`, `FadeInStagger`, `PageTransition`
- **Class Merging**: Always use `cn()` from `@/lib/utils` for conditional Tailwind classes

## Design System (see DESIGN.md)

### Typography
- **Display/Headings**: `font-display` (Cormorant Garamond)
- **Body/UI**: `font-sans` (Inter) — default
- **Prices**: `font-price` (Montserrat)
- **Labels**: Uppercase with wide tracking: `text-[11px] uppercase tracking-[0.4em]`

### Colors (CSS Variables)
- Use semantic tokens: `bg-background`, `text-foreground`, `text-primary`, `text-muted-foreground`, `border`
- Brand colors: `gold-beige`, `charcoal`, `bronze-black` (defined in [tailwind.config.js](tailwind.config.js))
- Dark mode variables defined in `.dark` class in [src/index.css](src/index.css)

### Component Styling
- **Buttons**: Use shadcn `<Button variant="..." />` with variants: `default`, `outline`, `ghost`, `link`
- **Cards/Products**: Image-focused with group hover effects—grayscale-to-color transitions
- **Modal Themes**: `ProductModal` defines separate light/dark theme objects for consistent styling

## Data Flow
- **Products**: Static data in [src/data/products.ts](src/data/products.ts) with typed `Product` interface
- **Price Format**: Stored as string `"$3,200"` — parse with `parseFloat(price.replace(/[$,]/g, ''))`
- **Categories**: `'gypsum' | 'bronze' | 'clear'` union type on Product

## Key Commands
```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Integration Points
- **Stripe**: `@stripe/react-stripe-js` for checkout (see [src/pages/Checkout.tsx](src/pages/Checkout.tsx))
- **Supabase**: `@supabase/supabase-js` available for backend integration
- **SEO**: Use `<SEO />` component with `react-helmet-async`
- **Toasts**: Use `sonner` — `toast()` function for notifications

## Patterns to Follow
- Wrap new pages in `<PageTransition>` for consistent animations
- Use `FadeInStagger` + `fadeInItem` for staggered list animations
- For new context: create `XxxContext.tsx` with `XxxProvider` + `useXxx()` hook pattern
- Extract theme configurations as objects when component needs light/dark variants (see `ProductModal` theme pattern)
