import Head from "next/head";

const DOMAIN = "https://markdown-previewer-e227.vercel.app";

export default function Seo({
  title = "Best Markdown Editor with Live HTML Preview",
  description = " Elevate Markdown editing with our Next.js-fueled editor. Simplify workflow, boost productivity. Unleash its potential now!",
  siteName = "Markdown Master",
  canonical = DOMAIN,
  ogType = "website",
}) {
  return (
    <>
      <title key="title">{`${title}`}</title>
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <link rel="icon" href="/favicon.ico"/>
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical ?? DOMAIN} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${title} | ${siteName}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />
      <link rel="canonical" href={canonical ?? DOMAIN} />
    </>
  );
}