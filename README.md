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
