# iverista

A warm, cinematic marketing site for **iverista**, a small specialty coffee shop. Built with Vite, React, TypeScript and Tailwind CSS, with Framer Motion for the subtle motion work.

- Full-screen hero slideshow with Ken Burns motion, swipe, keyboard controls and autoplay progress
- Auto-discovered flavor menu — every photo in `public/flavors/` becomes a framed card
- Reusable framed photos with caption plates, blur-up loading and an accessible lightbox
- About, framed gallery, testimonial carousel, visit/map section, footer and a mobile order bar
- SEO and Open Graph metadata, lazy-loaded imagery, reduced-motion support

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then builds to dist/
npm run preview  # serve the production build locally
```

Requires Node 18+.

## Where things live

```
public/
  flavors/            ← YOUR FLAVOR PHOTOS GO HERE (jpg, jpeg, png, webp, avif)
  images/             ← shop / gallery / about photos
  og-image.jpg        ← social sharing image (1200×630 recommended)
  favicon.svg
src/
  components/         Navbar, HeroSlideshow, PhotoFrame, FlavorGrid, About,
                      Gallery, Testimonials, Visit, Footer, SocialLinks,
                      FloatingOrderButton
  data/
    flavors.ts        ← flavor names, prices, descriptions and tags
    slides.ts         ← hero slide copy and background images
    site.ts           ← address, hours, phone, nav links and social URLs
  App.tsx, main.tsx, index.css
vercel.json           ← SPA rewrites + Vite build settings
```

## Adding or replacing flavor photos

1. Export your edited photos and drop them into **`public/flavors/`**.
2. Use a descriptive filename: `sweet-black.webp` becomes **“Sweet Black”** automatically.
3. To set the price, description or filter tag, open `src/data/flavors.ts` and add an entry whose `id`
   matches the filename without the extension:

```ts
{
  id: 'sweet-black',                // matches sweet-black.webp
  name: 'Sweet Black',
  image: '/flavors/sweet-black.webp',
  description: 'House black coffee, lightly sweetened and poured over ice.',
  price: 0,                         // 0 hides the price; set e.g. 130 to show ₱130
  tag: 'Iced',                      // 'Hot' | 'Iced' | 'Specials'
}
```

- A photo with **no** matching entry still appears, with a title generated from the filename and no price.
- Changing a photo’s filename changes its card, so either rename the data entry’s `id` too or keep names stable.
- Want a drink listed before its photo is ready? Add an entry with `image: ''` and it shows a
  “Photo coming soon” plate until you drop a matching photo into `public/flavors/`.
- WebP images are supported and recommended: `sea-salt-latte.webp` maps to `id: 'sea-salt-latte'`.
- The six current posters (sweet black, long black, americano, sea salt latte, white mocha,
  french vanilla) live in `public/flavors/`; the hero and gallery photos now sit in `public/images/`.
- The dev server watches the folder, so newly added files appear without a restart.

## Editing the site

| What | File |
| --- | --- |
| Hero headlines, subtext, CTA label/link, background image | `src/data/slides.ts` |
| Flavor names, prices, descriptions, tags | `src/data/flavors.ts` |
| Address, phone, email, opening hours, order link | `src/data/site.ts` |
| Social links (Facebook, Instagram, TikTok, Messenger) | `src/data/site.ts` → `socials` |
| Nav links | `src/data/site.ts` → `navLinks` |
| Gallery photos and captions | `src/components/Gallery.tsx` |
| Testimonials | `src/components/Testimonials.tsx` |
| Colours, fonts, shadows | `tailwind.config.ts` |
| Page title, description, OG tags | `index.html` |

**Social links:** in `src/data/site.ts`, replace each `href` in `socials` with your real profile URL
(e.g. `https://instagram.com/iverista`). `ORDER_URL` controls the navbar, hero, menu and floating
mobile buttons — point it at your Messenger, order form or delivery page.

**Map:** `src/components/Visit.tsx` renders a styled map placeholder. To use the real embed, replace
the inner panel with your Google Maps iframe:

```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  title="iverista location"
  className="absolute inset-0 h-full w-full"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
/>
```

Also update `site.mapUrl` in `src/data/site.ts` for the “Get directions” links.

**SEO:** `index.html` sets the title, description and Open Graph/Twitter tags. Replace the
`https://iverista.com/` URLs and `public/og-image.jpg` with your real domain and a 1200×630 image.

## Deploying to Vercel

### Option A — GitHub + Vercel dashboard

1. Push the project to a GitHub repository:

   ```bash
   git init
   git add .
   git commit -m "iverista marketing site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/iverista.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel detects the preset from `vercel.json`. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Every push to `main` redeploys; pull requests get preview URLs.
5. Add your custom domain under **Project → Settings → Domains**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # first run: log in and link the project (preview deployment)
vercel --prod   # production deployment
```

The CLI reads `vercel.json`, so no build questions are needed.

## Notes

- `vercel.json` rewrites unknown paths to `index.html` for client-side routing while leaving
  `/assets/*` static files untouched.
- The site is a single page with in-page anchors; the SPA rewrite is there for safe fallback.
- The hero autoplay and all motion pause or switch off when the visitor has
  “reduce motion” enabled in their OS.
- All photos are lazy-loaded except the first hero image, and framed photos fade in from a warm
  shimmer placeholder.
