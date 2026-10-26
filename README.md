# Anurag Patial — Websites & Automations

Client-focused portfolio built with React 19, Vite, TypeScript, React Three Fiber, Drei, Motion, and Lucide. Includes an adapted Magic UI / 21st.dev hover button (see THIRD_PARTY_NOTICES.md).

## Run

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npx tsc --noEmit
npm run build
npm run preview
```

Deploy `dist/` on your existing static host. No server or AI API key is required. The heavy 3D scene is lazy-loaded separately from page content. Animation pauses when offscreen, supports a pause button and reduced-motion preferences, and has a CSS 3D fallback for WebGL/render errors. Device pixel ratio is capped at 1.5.

## Contact

The form prepares a prefilled email draft by default; the visitor must send it in their email app. Direct email and a copy-email button are also available. For direct delivery, copy `.env.example` to `.env.local` and configure your own EmailJS service, template, and public key. The template expects `from_name`, `from_email`, `subject`, `message`, and `to_email`. Configure the template recipient as patyalanurag222@gmail.com and Reply-To as `{{from_email}}`. Test delivery with your EmailJS account before deployment.

## Content

The existing repository résumé is available at `/Anurag_Patial_Resume.pdf`. Project links come from the existing portfolio and supplied context. Project visual studies are explicitly labeled and are not screenshots of the current products. Connected Operations is an illustrative local workflow demo with no customer data or business outcome claims. Update project data in `App.tsx` and styling in `index.css`.

The previous unused résumé chatbot was removed. The build no longer injects Gemini keys into browser JavaScript.

## SEO and deployment

`npm run build` now prerenders the full React page into `dist/index.html`; the browser hydrates it and adds the 3D experience. Services, projects, biography, and contact links remain readable without JavaScript. Motion reveals keep text visible in the initial HTML.

The build adds a search-focused title/description, Person + ProfilePage + Service JSON-LD, social sharing metadata, and a 1200×630 social card. `robots.txt` is generated on every build.

Canonical URL selection, in order:

1. `SITE_URL` — your public HTTPS origin, optionally in `.env.production.local` locally or your hosting build environment.
2. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (or `VITE_VERCEL_PROJECT_PRODUCTION_URL`), when system environment variables are exposed.

The selected URL is used consistently for the canonical link, Open Graph URL, social image URLs, and `sitemap.xml`. A local build without a URL omits canonical/sitemap instead of guessing a domain; a Vercel build without a production origin fails with setup instructions. `VERCEL_ENV=preview` adds `noindex,follow` to avoid indexing preview deployments. The production sitemap lists the one real page, not fragment-only sections. Override `SITE_URL` when you move to a custom domain.

Validate output with `npm run check:seo` after building. This verifies raw HTML content, metadata, structured-data JSON, indexing policy, URL configuration, robots, sitemap when configured, and social-card dimensions. To validate a local production-domain build, set `SITE_URL` to your actual domain for both build and check commands.

After production deployment, verify your domain in Google Search Console, submit `/sitemap.xml`, and request indexing using URL Inspection. These account actions and live performance/ranking measurements are not performed by the build. Test the deployed URL with Google's Rich Results Test and PageSpeed Insights; schema does not guarantee rich results or rankings.

## Business positioning and featured commerce projects

The primary message, services, problem selector, contact brief, metadata, and social card emphasize business needs across customer journeys, commerce, and operational automation. Technical employment titles remain factual background.

Street Bill and Hike Summit are featured first, as requested by the portfolio owner. Their descriptions cover observable business/site features without inventing contribution scope or performance results. Street Bill uses a local storefront capture; Hike Summit uses a labeled original illustrative overview because the live site challenged the QA browser. Confirm specific contributions before adding detailed case-study claims.

The custom layered project interaction and challenge selector apply GetLayers' public design guidance with the existing Motion library. No paid GetLayers template, prompt, or SDK is included. Attribution and research links are recorded in THIRD_PARTY_NOTICES.md. Hover tilt is disabled for touch pointers and reduced motion; the challenge selector supports tab/arrow-key navigation and prefills the inquiry focus.
