


# 🏝️ LuxStay - Hotel Booking Platform

<div align="center">

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />

<br/><br/>

### A full-stack luxury hotel booking platform — browse rooms, check real-time availability, pay securely with Stripe, and manage guest reviews, all with a boutique-hotel design.

🌐 **Live  Website**: [luxstay-hotel-website.vercel.app/](https://luxstay-hotel-website.vercel.app/)
<br/><br/>
 https://github.com/user-attachments/assets/1a7160e5-4e72-476b-b454-a89b7da71d31





<br/>

</div>

---

## 📖 Introduction

**LuxStay** is a complete full-stack hotel booking site built with Next.js. It delivers a real booking experience — live room catalogues, guest-count-aware pricing, Stripe checkout, double-booking protection, and a guest review system — all backed by a real Postgres database (Neon) and Cloudinary image hosting.

| Typical Hotel Template | LuxStay |
|--------------------------|-------|
| Static "Book Now" buttons that go nowhere | ✅ Real Stripe Checkout, actual payment collection |
| No real backend | ✅ Postgres database (Neon) with live bookings |
| Any dates always bookable | ✅ Double-booking prevention with date-overlap checks |
| Hardcoded room prices | ✅ Guest-count-aware pricing (extra guests add a surcharge) |
| Fake testimonials only | ✅ Real guest review system — add a review with a photo |
| Generic stock images | ✅ Cloudinary-hosted, auto-optimized (WebP/AVIF, right-sized) |
| Desktop only | ✅ Fully responsive — mobile, tablet, and desktop |
| No deployment story | ✅ Dockerized, plus one-command Vercel deploy |

---

## ✨ Features

### 🏨 Rooms & Booking
- 40 rooms across 4 categories (Luxury, Single, Small Suite, Family), each with real detail — size, view, amenities, rating
- Category filter tabs, synced with the URL (`/rooms?type=Family`)
- Dedicated booking page with realistic hotel fields — phone, country, arrival time, special requests
- Guest-count-aware pricing: base occupancy included, extra guests add a per-night surcharge
- **Double-booking prevention** — the same room can't be reserved for overlapping dates
- Stale/abandoned checkout attempts are automatically reconciled against Stripe, never silently lost

### 💳 Payments
- Real Stripe Checkout integration — hosted payment page, test and live mode supported
- Booking is created as `pending`/`unpaid`, then confirmed as `paid` only after Stripe verifies payment
- Failed payments automatically roll back — a room is never soft-locked by a failed charge

### ⭐ Reviews & Comments
- Guest testimonial carousel plus a live, database-backed comment feed
- "Add a Review" form — star rating, text, and an optional photo upload straight to Cloudinary

### 🖼️ Media
- All images served through Cloudinary with automatic format (WebP/AVIF) and quality optimization
- Hero section uses a crossfading, Ken-Burns-style image sequence instead of a heavy video file
- Lightbox gallery with 10 property photos

### 📍 Location & Contact
- Real, interactive Google Maps embed (click/hover to activate — no accidental scroll-jacking)
- Separate contact inquiry form and booking form — they don't share state

### 📱 Fully Responsive

| Screen | Layout |
|--------|--------|
| Desktop | Full multi-column layout, dropdown navigation |
| Tablet | 2-column grids, collapsible filters |
| Mobile | Hamburger nav, single-column stacked cards |

---

## 🚀 Tech Stack

### Frontend
- **Next.js** — App Router, server components, file-based routing
- **React.js** — Client components for interactive sections
- **Tailwind CSS v4** — Custom gold/ink theme tokens, hover/transition utilities
- **Redux Toolkit** — Room filters, mobile nav state, booking form state
- **axios** — All client-side API calls
- **react-icons** — Icon set throughout

### Backend
- **Next.js API Routes** — REST endpoints, deployed as serverless functions
- **PostgreSQL (Neon)** — Serverless Postgres, auto-migrates on first request
- **node-postgres (pg)** — Raw SQL queries, no ORM overhead
- **Stripe** — Checkout Sessions for payment collection
- **Cloudinary** — Image hosting, upload API, on-the-fly transformations

### Infrastructure
- **Docker** — Multi-stage build, non-root runtime user
- **Docker Compose** — One-command local orchestration
- **Vercel** — Zero-config production deployment (frontend + API routes together)

---

## 🔄 Redux State

| Slice | Stores | Actions |
|-------|--------|---------|
| `rooms` | active category filter | `setFilter` |
| `ui` | mobile menu open/closed, active nav dropdown | `toggleMobileMenu`, `closeMobileMenu`, `setActiveDropdown` |
| `booking` | full booking form state + submit status | `updateField`, `submitBookingStart`, `submitBookingSuccess`, `submitBookingError`, `resetBooking` |

---

## 🛣️ API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout` | Validate booking, check for double-booking, create Stripe session |
| GET  | `/api/checkout/confirm` | Verify Stripe payment, mark booking as paid/confirmed |
| GET  | `/api/bookings` | List recent bookings |
| POST | `/api/bookings` | Create a booking directly (no payment step) |
| GET  | `/api/comments` | List guest reviews |
| POST | `/api/comments` | Submit a new guest review, with optional image |
| POST | `/api/contact` | Submit a general contact inquiry |
| POST | `/api/upload` | Upload an image to Cloudinary |

## 📄 License

This project is licensed under the MIT License .

<div align="center">

**Built with ❤️ using Next.js + PostgreSQL + Stripe**

</div>
