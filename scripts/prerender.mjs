import { readFile, writeFile } from "node:fs/promises";
import { createServer, loadEnv } from "vite";
import { resolveSiteUrl, buildStructuredData } from "./seo-config.mjs";

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
  const { render } = await server.ssrLoadModule("/entry-server.tsx");
  const content = render();
  let html = await readFile("dist/index.html", "utf8");
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
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl)}</loc></url></urlset>\n`,
    );
  }
  html = html.replace("</head>", metadata.join("\n") + "\n</head>");
  await writeFile("dist/index.html", html);
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
