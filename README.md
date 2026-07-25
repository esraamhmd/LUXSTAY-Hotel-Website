# LuxStay

A fully responsive luxury hotel booking website built with **Next.js (App Router)**, **Redux Toolkit**, **Tailwind CSS v4**, and **React Icons** — styled with a dark navbar + gold accent theme, gold-sweep button hovers, image zoom-on-hover cards, and smooth section transitions.

> This project is an original build inspired by the visual style of the video you shared (dark navbar, gold accents, hero layout, room cards, testimonial carousel). It is **not** a copy of that commercial template's code or assets — all copy, images, and components here are original/free-to-use — but it closely matches the same look, feel, colors, and hover/transition behavior.

## Stack

- **Next.js 16** (App Router, JavaScript)
- **Redux Toolkit + react-redux** — manages the room filter tabs, mobile menu / video modal state, and the booking form
- **Tailwind CSS v4** — custom theme tokens for the gold/ink color palette (`src/app/globals.css`)
- **React Icons** (`react-icons/fa`, `react-icons/hi`, `react-icons/gi`)
- Google Fonts: **Jost** (headings) + **Inter** (body)
- Images served from Unsplash via `next/image` (free to use, remote-pattern whitelisted in `next.config.mjs`)

## Getting started

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

To build for production:

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/
    layout.js        # root layout, fonts, Redux provider
    page.js           # assembles all homepage sections
    globals.css       # theme tokens + hover/transition utility classes
  components/
    Navbar.js         # sticky dark navbar, dropdowns, mobile menu (Redux)
    Hero.js           # full-bleed hero + video modal (Redux)
    Amenities.js      # icon badge grid
    RoomsSection.js   # room cards + Redux-driven category filter
    Experience.js     # alternating image/text feature sections
    Gallery.js        # photo grid
    Testimonials.js   # dark testimonial carousel
    Contact.js        # booking form (Redux) with confirmation state
    Footer.js         # link columns + newsletter form
    BackToTop.js       # scroll-to-top floating button
  store/
    store.js           # configureStore
    roomsSlice.js       # active room filter
    uiSlice.js           # mobile menu / dropdown / video modal state
    bookingSlice.js       # booking form fields + submit status
    StoreProvider.js       # client wrapper providing the store
  data/
    content.js              # nav links, rooms, amenities, testimonials, gallery data
```

## Customizing

- **Colors**: edit the CSS variables at the top of `src/app/globals.css` (`--color-ink`, `--color-gold`, `--color-cream`, etc.) — every Tailwind utility (`bg-gold`, `text-ink`, `bg-cream`...) is generated from those tokens.
- **Content**: edit `src/data/content.js` to change room names/prices/images, amenities, testimonials, and nav links.
- **Images**: swap any Unsplash URL for your own hotel photography — just keep them on an allowed domain in `next.config.mjs`, or drop files into `/public` and reference them locally.

## Responsive breakpoints

Built mobile-first with Tailwind's default breakpoints — verified layouts at:
- **Mobile** (< 640px): stacked hero, hamburger nav, single-column cards
- **Small / tablets** (640–1024px): 2-column grids
- **Laptop / desktop** (≥ 1024px): full multi-column layout, dropdown nav, side-by-side hero
