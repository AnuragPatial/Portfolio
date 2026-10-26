import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createServer, loadEnv } from "vite";
import { resolveSiteUrl, buildStructuredData, buildServiceStructuredData } from "./seo-config.mjs";

const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const siteUrl = resolveSiteUrl(env);
const deploymentEnv = env.VERCEL_ENV || env.VITE_VERCEL_ENV;
const preview = deploymentEnv && deploymentEnv !== "production";
if (!siteUrl && env.VERCEL)
  throw new Error(
    "Production origin missing. Enable Vercel system environment variables or set SITE_URL to your public HTTPS origin.",
  );
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const server = await createServer({
  mode: "production",
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { render, renderServicePages } = await server.ssrLoadModule("/entry-server.tsx");
  const content = render();
  const pages = renderServicePages();
  let html = await readFile("dist/index.html", "utf8");
  const template = html;
  if (!html.includes('<div id="root"></div>'))
    throw new Error("Prerender root marker missing.");
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${content}</div>`,
  );
  const metadata = [
    `<meta name="robots" content="${preview ? "noindex,follow" : "index,follow,max-image-preview:large"}" />`,
    `<script type="application/ld+json">${JSON.stringify(buildStructuredData(siteUrl)).replaceAll("<", "\\u003c")}</script>`,
  ];
  if (siteUrl) {
    const imageUrl = new URL("social-card.png", siteUrl).href;
    metadata.push(
      `<link rel="canonical" href="${escape(siteUrl)}" />`,
      `<meta property="og:url" content="${escape(siteUrl)}" />`,
      `<meta property="og:image" content="${escape(imageUrl)}" />`,
      `<meta name="twitter:image" content="${escape(imageUrl)}" />`,
    );
    await writeFile(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl)}</loc></url>${pages.map(page => `<url><loc>${escape(new URL(`services/${page.slug}/`, siteUrl).href)}</loc></url>`).join("")}</urlset>\n`,
    );
  }
  html = html.replace("</head>", metadata.join("\n") + "\n</head>");
  await writeFile("dist/index.html", html);
  // These pages are static documents: no hydration, animation runtime or WebGL downloads.
  for (const page of pages) {
    const url = siteUrl ? new URL(`services/${page.slug}/`, siteUrl).href : null;
    let document = template
      .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(/(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*("\s*\/>)/g, `$1${escape(page.description)}$2`)
      .replace(/(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*("\s*\/>)/g, `$1${escape(page.title)}$2`)
      .replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, '');
    const tags = [
      `<meta name="robots" content="${preview ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`,
      `<script type="application/ld+json">${JSON.stringify(buildServiceStructuredData(page, siteUrl)).replaceAll('<', '\\u003c')}</script>`,
    ];
    if (url) tags.push(`<link rel="canonical" href="${escape(url)}" />`, `<meta property="og:url" content="${escape(url)}" />`, `<meta property="og:image" content="${escape(siteUrl)}social-card.png" />`, `<meta name="twitter:image" content="${escape(siteUrl)}social-card.png" />`);
    document = document.replace('</head>', tags.join('\n') + '</head>');
    await mkdir(`dist/services/${page.slug}`, { recursive: true });
    await writeFile(`dist/services/${page.slug}/index.html`, document);
  }
  const notFound = template.replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | Anurag Patial</title>')
    .replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, '')
    .replace('<div id="root"></div>', '<main class="service-document"><h1>That page could not be found.</h1><p>The address may have changed. Explore the services and selected projects from the homepage.</p><a class="service-cta" href="/">Back to the portfolio</a></main>')
    .replace('</head>', '<meta name="robots" content="noindex,follow" /></head>');
  await writeFile('dist/404.html', notFound);

  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\n${siteUrl && !preview ? `Sitemap: ${siteUrl}sitemap.xml\n` : ""}`,
  );
  console.log(
    `Prerendered portfolio HTML. Canonical: ${siteUrl || "omitted (set SITE_URL for deployment)"}. Robots: ${preview ? "noindex preview" : "index"}.`,
  );
} finally {
  await server.close();
}
