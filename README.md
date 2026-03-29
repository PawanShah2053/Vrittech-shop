<<<<<<< HEAD
# Vrittech-shop
=======
# Virttech Shop Dashboard

A production-style e-commerce dashboard built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

## Features

- Server-rendered product listing page
- Server-rendered product details page
- Reusable API wrapper with consistent error handling
- Client-side category, price, and search filters
- URL-synced filters and pagination
- Zustand cart with localStorage persistence
- Fake Store login flow for bonus requirement
- SEO-friendly metadata, JSON-LD, and sitemap

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Demo Login

- Username: `mor_2314`
- Password: `83r5^_`

## Folder Structure

```bash
app/
components/
lib/
stores/
types/
```

## Notes

- The product list is fetched on the server using the API sort query.
- Filters are applied on the client after the server fetch, as required.
- Pagination is UI-side so filters and search work on the filtered result set.
- The cart is intentionally client-only and persists in localStorage.
>>>>>>> ef1e8a3 (Initial commit)
