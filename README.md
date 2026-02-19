# Alexey Kukhtin | Sculpture

A high-end digital gallery and e-commerce website showcasing sculpture collections by Alexey Kukhtin.

**Live site:** [alexeykukhtin.netlify.app](https://alexeykukhtin.netlify.app/)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **UI Components:** Radix UI + shadcn/ui patterns
- **Payments:** Stripe (planned)
- **Database:** Supabase (planned)
- **Deployment:** Netlify (auto-deploy from `main`)

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## Project Structure

```
src/
├── pages/          # Route pages (Home, Store, Checkout)
├── components/     # UI components (Sidebar, ProductCard, etc.)
│   ├── animations/ # FadeIn, PageTransition
│   └── ui/         # Base UI (Button)
├── context/        # React contexts (Cart, Theme)
├── data/           # Static product catalog
└── lib/            # Utilities
```

## Design

See [DESIGN.md](./DESIGN.md) for the full design system (colors, typography, components).
See [SITE.md](./SITE.md) for the site map and roadmap.
