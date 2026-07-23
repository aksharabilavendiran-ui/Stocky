# Stockly — Simple Inventory Management System

A professional, full-stack Inventory Management System built as **Assignment 12 (Backend Module)** for **Entri Elevate — Full Stack Development**.

> 🇮🇳 Crafted in India by **Ms. Akshara B**, a Sophomore.

---

## ✨ Features

- 🔐 **Secure Authentication** — Email/password signup & login with Supabase Auth
- 🛡️ **Row Level Security (RLS)** — Every user only sees their own data
- 📦 **Products** — Full CRUD with SKU, price, cost, stock, low-stock threshold, image URL, brand/category/store/supplier linking
- 🏷️ **Brands**, 📂 **Categories**, 🚚 **Suppliers**, 🏬 **Stores** — Full CRUD management
- 📊 **Dashboard** — Total products, stock units, stock value (₹), low-stock alerts
- 📉 **Stock Movements** — Track every change in inventory
- 🎨 **Light Blue & White** professional theme
- 📱 Fully responsive (mobile sidebar + desktop layout)
- 🔎 SEO-ready with sitemap.xml & robots.txt

---

## 🧱 Tech Stack

| Layer         | Technology                                  |
| ------------- | ------------------------------------------- |
| Framework     | **TanStack Start v1** (React 19 + Vite 7)   |
| Routing       | TanStack Router (file-based)                |
| Data Fetching | TanStack Query                              |
| Backend API   | TanStack `createServerFn` (typed RPC)       |
| Database      | Supabase (PostgreSQL) via Lovable Cloud     |
| Auth          | Supabase Auth                               |
| Validation    | Zod                                         |
| Styling       | Tailwind CSS v4 + shadcn/ui                 |
| Icons         | lucide-react                                |
| Language      | TypeScript (strict)                         |

---

## 🗄️ Database Schema

All tables live in the `public` schema with **RLS enabled** — policies enforce `auth.uid() = user_id`.

- **profiles** — `id`, `full_name`, `business_name` (auto-created on signup via trigger)
- **brands** — `id`, `user_id`, `name`, `description`
- **categories** — `id`, `user_id`, `name`, `description`
- **suppliers** — `id`, `user_id`, `name`, `contact_person`, `email`, `phone`, `address`
- **stores** — `id`, `user_id`, `name`, `location`, `city`, `state`
- **products** — `id`, `user_id`, `name`, `sku`, `description`, `brand_id`, `category_id`, `store_id`, `supplier_id`, `price`, `cost_price`, `stock_quantity`, `low_stock_threshold`, `image_url`
- **stock_movements** — `id`, `user_id`, `product_id`, `change`, `reason`

### Triggers
- `handle_new_user()` → auto-creates a `profiles` row when a user signs up
- `update_updated_at_column()` → maintains `updated_at` timestamps

---

## 🔌 Backend API (Server Functions)

All API logic lives in **`src/lib/inventory.functions.ts`** using `createServerFn` with the `requireSupabaseAuth` middleware.

| Function       | Method | Purpose                                    |
| -------------- | ------ | ------------------------------------------ |
| `listItems`    | GET    | List all rows of an entity for current user |
| `createItem`   | POST   | Validate (Zod) + insert                    |
| `updateItem`   | POST   | Validate + update by id                    |
| `deleteItem`   | POST   | Delete by id                               |

Supported entities: `brands`, `categories`, `suppliers`, `stores`, `products`.

Every call is:
1. Authenticated (Supabase bearer token via `attachSupabaseAuth` middleware)
2. Validated with Zod schemas per entity
3. Scoped to the calling user via RLS

---

## 📁 Project Structure

```
src/
├── routes/
│   ├── __root.tsx              # Root layout + <html> shell
│   ├── index.tsx               # Landing page
│   ├── auth.tsx                # Login / Signup
│   ├── sitemap[.]xml.ts        # SEO sitemap
│   ├── _authenticated.tsx      # Auth-gated layout (sidebar)
│   └── _authenticated/
│       ├── dashboard.tsx       # Business overview
│       ├── products.tsx        # Products CRUD
│       ├── brands.tsx          # Brands CRUD
│       ├── categories.tsx      # Categories CRUD
│       ├── suppliers.tsx       # Suppliers CRUD
│       └── stores.tsx          # Stores CRUD
├── lib/
│   ├── inventory.functions.ts  # 🔒 Secured server-side CRUD API
│   └── utils.ts
├── components/
│   ├── CrudPage.tsx            # Generic reusable CRUD UI
│   └── ui/                     # shadcn/ui components
├── integrations/supabase/
│   ├── client.ts               # Browser Supabase client
│   ├── client.server.ts        # Admin (service-role) client
│   ├── auth-middleware.ts      # Server-fn auth guard
│   └── auth-attacher.ts        # Client-side bearer token attacher
├── styles.css                  # Tailwind v4 + theme tokens
├── router.tsx
├── server.ts
└── start.ts
```

---

## 🚀 Getting Started

```bash
# Install
bun install

# Dev server
bun dev

# Production build
bun run build
```

The app auto-connects to Lovable Cloud (Supabase). No manual `.env` setup required — variables are provisioned automatically.

---

## 🎨 Theme

Custom OKLCH-based **light blue & white** palette defined in `src/styles.css`:
- Primary: soft sky blue
- Surface: pure white with subtle blue tint
- Gradients: `gradient-brand` utility for accents

---

## 📄 License

© 2026 Stockly. Crafted in India by **Ms. Akshara B**, a Sophomore.

Built with ❤️ using [Lovable](https://lovable.dev).
