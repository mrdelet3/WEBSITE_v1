# 🔍 Stitch Project - Findings & Research

**Project:** Art/Sculpture E-Commerce Website  
**Last Updated:** 2026-02-11

---

## 📊 Discovery Notes

### E-Commerce Goals
- Convert Stitch UI designs to functional React/Next.js code.
- Integrations: Shopify, Stripe, and/or PayPal.
- Deployment: GitHub to Vercel.

### Database Requirement
- User requests a "local database" that can be uploaded via GitHub.
- **Problem:** Vercel filesystem is ephemeral. A pure local file (like an `.sqlite` or `.json` file that is modified at runtime) will NOT persist data across Vercel deployments or serverless function invocations.
- **Recommendation:** **Supabase** is highly recommended if you want a free, cloud-hosted PostgreSQL database that integrates perfectly with Vercel and persists your orders and catalog data. If you only have a *static* catalog (read-only), we can use a JSON file in GitHub. But if customers are purchasing (creating orders), you need Supabase or a similar tool.

### Design Analysis
- Existing project `d:\DadsWebsite\stitch` is a Vite/React/Tailwind project.
- It already has `app/`, `src/`, `components.json`, etc.
- `SITE.md` and `DESIGN.md` likely contain design instructions.
