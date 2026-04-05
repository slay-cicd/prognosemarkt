# Atlas Markets SEO Site Template

Premium Next.js static site template for German football prediction market content sites. Built for replication across 21 domains.

## Quick Start

```bash
# 1. Clone or copy this template
cp -r _template my-new-site
cd my-new-site

# 2. Install dependencies
npm install

# 3. Configure the site
# Edit site.config.ts with your site-specific values

# 4. Add your articles
# Drop .md files into content/blog/

# 5. Dev server
npm run dev

# 6. Build for production
npm run build
# Output: ./out/ — ready for GitHub Pages
```

## Customization: site.config.ts

This is the **only file you need to change** per site:

```ts
const siteConfig = {
  name: "Meine-Site",           // Site name (shown in header + meta)
  tagline: "Mein Slogan",       // Hero headline
  description: "...",           // Meta description
  url: "https://meine-site.de", // Canonical URL
  basePath: "",                 // GitHub Pages: "/repo-name" or ""
  accentColor: "#00ff88",       // Override accent color per site
  logo: "⚽",                   // Emoji or image path
  ctaText: "Zu Atlas Markets →", // CTA button text
  ctaUrl: "https://atlasmarkets.de", // CTA destination
  // ...
};
```

## Article Format

Articles are standard Markdown files in `content/blog/`:

```markdown
---
title: "Dein Artikel Titel"
date: "2024-03-15"
excerpt: "Kurze Beschreibung für SEO und Vorschau."
tags: ["bundesliga", "strategie"]
author: "Redaktion"
featured: true  # Shows in hero section
---

Dein Artikel-Inhalt hier...
```

## File Structure

```
_template/
├── site.config.ts          ← EDIT THIS per site
├── content/blog/           ← DROP .md ARTICLES HERE
│   ├── article-1.md
│   └── article-2.md
├── app/
│   ├── layout.tsx          — Root layout (Inter font, dark theme)
│   ├── page.tsx            — Homepage (Hero + article grid)
│   ├── blog/
│   │   ├── page.tsx        — Blog index
│   │   └── [slug]/page.tsx — Article detail
│   ├── sitemap.ts          — Auto-generated sitemap
│   └── robots.ts           — robots.txt
├── components/
│   ├── Header.tsx          — Nav with scroll behavior
│   ├── Footer.tsx          — Links + CTA banner
│   ├── Hero.tsx            — Homepage hero
│   ├── ArticleCard.tsx     — Glass card with animations
│   └── ScrollReveal.tsx    — Scroll-triggered animations
├── lib/posts.ts            — Markdown parser
├── next.config.ts          — Static export config
└── package.json
```

## Deployment: GitHub Pages

1. Set `basePath` in `site.config.ts` (e.g., `"/repo-name"` for project pages, `""` for custom domain)
2. Run `npm run build`
3. Deploy the `out/` folder to GitHub Pages

### Custom Domain

1. Add a `CNAME` file to `public/` with your domain
2. Set `basePath: ""` in `site.config.ts`
3. Configure DNS to point to GitHub Pages

## Design System

- **Colors**: Dark navy (#0a0f1c) + Electric green (#00ff88)
- **Font**: Inter (Google Fonts)
- **Cards**: Glass-morphism with subtle borders
- **Animations**: CSS-only, no JS libraries
- **Philosophy**: Simplicity → Fluidity → Delight

## Replicating Across 21 Sites

Each site only needs:
1. A copy of this template
2. Edited `site.config.ts`
3. Fresh `content/blog/*.md` articles

Everything else (design, components, SEO, animations) stays the same.

---

Built for Atlas Markets · [atlasmarkets.de](https://atlasmarkets.de)
