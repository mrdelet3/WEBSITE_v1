# 📜 Stitch Project Constitution

**Project ID:** `15265961688620344688` (Stitch Design Project)  
**Workspace:** `d:\DadsWebsite\stitch`  
**Project Type:** Art/Sculpture E-Commerce Website  
**Last Updated:** 2026-02-11  
**Status:** Phase 1 - Blueprint

---

## 🎯 Project North Star

**Convert Stitch designs to working e-commerce code** with full checkout functionality for sculpture sales.

**Key Requirements:**
- Transform Stitch UI screens into functional code.
- Enable customers to browse and select sculptures.
- Implement secure checkout flow.
- Support payment methods (Stripe, PayPal).
- Deploy via GitHub to Vercel hosting.
- Persistent storage for product catalog and orders (Supabase recommended).

---

## 📊 Data Schemas

### Input Schema: Product Catalog (User-Provided)
```json
{
  "product": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "images": ["string"],
    "dimensions": { "h": "string", "w": "string", "d": "string" },
    "materials": ["string"]
  }
}
```

### Output Schema: Delivery Payload
```json
{
  "deliverable": {
    "type": "Next.js / React Web Application",
    "hosting": "Vercel",
    "vcs": "GitHub",
    "integrations": ["Shopify/Stripe/PayPal"]
  }
}
```

---

## 🏗️ Architectural Invariants (A.N.T.)

### Layer 1: Architecture (`architecture/`)
- Technical SOPs for screen conversion, payment logic, and DB sync.

### Layer 2: Navigation
- Mapping routes and handling e-commerce state (Cart/Checkout).

### Layer 3: Tools (`tools/`)
- Python scripts for data processing or specialized automation.

---

## 🔒 Behavioral Rules
- **Data-First:** No UI-only work; logic must match the catalog schema.
- **Persistence:** All orders/sculpture data must survive serverless restarts (Vercel).

---

## 🔗 Integrations
- [ ] **Stripe** (Primary Payment Processor)
- [ ] **PayPal** (Secondary Payment Option)
- [ ] **Vercel** (Hosting)
- [ ] **GitHub** (Storage/VCS)
- [ ] **Supabase** (Database Persistence - Essential for Orders on Vercel)

---

## 🛠️ Maintenance Log
- **2026-02-11:** Re-initialized B.L.A.S.T. Protocol in `d:\DadsWebsite\stitch`.
- **2026-02-15:** Audited project context. Codebase is in Phase 3/4 (Execution). Restored local hosting by generating `.env`.

