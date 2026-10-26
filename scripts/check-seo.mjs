import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { loadEnv } from "vite";
import {
  resolveSiteUrl,
  buildStructuredData,
  title,
  description,
} from "./seo-config.mjs";
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const siteUrl = resolveSiteUrl(env);
const html = await readFile("dist/index.html", "utf8");
assert.equal(
  (html.match(/<h1[ >]/g) || []).length,
  1,
  "Exactly one primary heading",
);
assert(
  html.includes("I’m Anurag Patial, a web developer based in Mohali, India."),
  "Visible, prerendered service introduction",
);
for (const text of [
  "Burgertech",
  "Cognitive Focus",
  "Shopify",
  "n8n",
  "patyalanurag222@gmail.com",
  "Salesforce Developer",
])
  assert(html.includes(text), `Prerendered content: ${text}`);
assert(
  !html.includes("opacity:0"),
  "Main content must remain visible without JavaScript",
);
assert(
  !html.includes('<div id="root"></div>'),
  "Root cannot be an empty app shell",
);
assert(
  !html.includes("Switched to client rendering"),
  "Prerendering must not bail out to client rendering",
);
assert(html.includes(title.replaceAll("&", "&amp;")), "Descriptive page title");
assert(html.includes(description), "Meta description");
assert.equal((html.match(/application\/ld\+json/g) || []).length, 1);
assert(
  !/<link rel="modulepreload"[^>]*three-/.test(html),
  "Three.js must not be preloaded with primary page content",
);
const structured = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.equal(structured["@graph"][0].name, "Anurag Patial");
assert.equal(
  structured["@graph"].filter((n) => n["@type"] === "Service").length,
  3,
);
assert.equal(buildStructuredData(null)["@graph"][1]["@type"], "ProfilePage");
const preview =
  (env.VERCEL_ENV || env.VITE_VERCEL_ENV) &&
  (env.VERCEL_ENV || env.VITE_VERCEL_ENV) !== "production";
assert(
  html.includes(
    preview ? "noindex,follow" : "index,follow,max-image-preview:large",
  ),
  "Correct indexing policy",
);
if (siteUrl) {
  assert.equal(
    (html.match(/rel="canonical"/g) || []).length,
    1,
    "One canonical",
  );
  assert(
    html.includes(`href="${siteUrl}"`),
    "Canonical matches configured public URL",
  );
  assert(html.includes(`${siteUrl}social-card.png`), "Absolute social image");
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  assert(sitemap.includes(`<loc>${siteUrl}</loc>`));
  assert(!sitemap.includes("#"), "No fragment-only sections in sitemap");
  assert.equal(
    (sitemap.match(/<url>/g) || []).length,
    1,
    "Only the one real page is listed",
  );
} else
  assert(!html.includes('rel="canonical"'), "Never invent a production URL");
const robots = await readFile("dist/robots.txt", "utf8");
assert(robots.includes("Allow: /"), "Allow crawlers to fetch resources");
if (siteUrl && !preview)
  assert(robots.includes(`Sitemap: ${siteUrl}sitemap.xml`));
if (preview) assert(!robots.includes("Sitemap:"));
assert.equal(
  resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "portfolio.example.org" }),
  "https://portfolio.example.org/",
);
assert.equal(
  resolveSiteUrl({
    SITE_URL: "https://custom.example.org/",
    VERCEL_PROJECT_PRODUCTION_URL: "preview.example.org",
  }),
  "https://custom.example.org/",
);
assert.equal(resolveSiteUrl({}), null);
for (const bad of [
  "http://example.org",
  "https://example.org/path",
  "https://user:secret@example.org",
  "https://example.org/?x=1",
  "https://localhost",
  "https://example.org/#x",
])
  assert.throws(() => resolveSiteUrl({ SITE_URL: bad }));
const card = await readFile("dist/social-card.png");
assert.equal(card.readUInt32BE(16), 1200);
assert.equal(card.readUInt32BE(20), 630);
console.log(
  "SEO checks passed: prerendered content, metadata, schema, indexing, URL validation, sitemap, robots, social image.",
);
