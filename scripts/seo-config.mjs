export const title = "Anurag Patial | Web Developer & Automation Specialist";
export const description =
  "Hire Anurag Patial for custom React websites, Shopify development, and n8n automations. Based in Mohali, India. Explore projects and discuss your requirements.";

export function resolveSiteUrl(env) {
  const raw =
    env.SITE_URL ||
    env.VERCEL_PROJECT_PRODUCTION_URL ||
    env.VITE_VERCEL_PROJECT_PRODUCTION_URL;
  if (!raw) return null;
  const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/" ||
    url.port ||
    !url.hostname.includes(".") ||
    /^(localhost|127\.|0\.|\[::1\])/.test(url.hostname)
  ) {
    throw new Error(
      "SITE_URL must be a public HTTPS origin without a path, credentials, port, query, or fragment.",
    );
  }
  return url.origin + "/";
}

export function buildStructuredData(siteUrl) {
  const person = {
    "@type": "Person",
    "@id": siteUrl ? `${siteUrl}#anurag` : "#anurag",
    name: "Anurag Patial",
    jobTitle: "Web Developer and Automation Specialist",
    description,
    ...(siteUrl ? { url: siteUrl } : {}),
    homeLocation: { "@type": "Place", name: "Mohali, Punjab, India" },
    sameAs: [
      "https://github.com/AnuragPatial",
      "https://linkedin.com/in/anuragpatial",
    ],
    knowsAbout: [
      "React",
      "Node.js",
      "Shopify development",
      "n8n workflow automation",
      "Salesforce",
      "API integrations",
    ],
  };
  const page = {
    "@type": "ProfilePage",
    "@id": siteUrl ? `${siteUrl}#profile` : "#profile",
    ...(siteUrl ? { url: siteUrl } : {}),
    name: title,
    description,
    inLanguage: "en",
    mainEntity: { "@id": person["@id"] },
  };
  const services = [
    [
      "Custom website development",
      "React websites, landing pages, and responsive web applications.",
    ],
    [
      "Shopify development",
      "Custom Liquid sections, theme development, and storefront integrations.",
    ],
    [
      "Business workflow automation",
      "n8n workflows, API integrations, and Salesforce solutions.",
    ],
  ].map(([name, description], index) => ({
    "@type": "Service",
    "@id": siteUrl
      ? `${siteUrl}#service-${index + 1}`
      : `#service-${index + 1}`,
    name,
    description,
    provider: { "@id": person["@id"] },
    ...(siteUrl ? { url: `${siteUrl}#services` } : {}),
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [person, page, ...services],
  };
}
