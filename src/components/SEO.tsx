import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://alexeykukhtin.netlify.app';
const OG_IMAGE = `${SITE_URL}/BATHER_HERO.jpeg`;

interface SEOProps {
    title?: string;
    description?: string;
    name?: string;
    type?: string;
    path?: string;
}

export function SEO({
    title,
    description = "A minimalist gallery of handcrafted sculptures by Alexey Kukhtin, based in Toronto.",
    name = "Alexey Kukhtin Sculpture",
    type = "website",
    path = "",
}: SEOProps) {
    const fullTitle = title ? `${title} | ${name}` : name;
    const canonicalUrl = `${SITE_URL}${path}`;

    return (
        <Helmet>
            {/* Standard */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={OG_IMAGE} />
            <meta property="og:image:alt" content="Alexey Kukhtin — Bather sculpture" />
            <meta property="og:site_name" content={name} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={OG_IMAGE} />
        </Helmet>
    );
}
