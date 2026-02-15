import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    name?: string;
    type?: string;
}

export function SEO({
    title,
    description = "A minimalist gallery of handcrafted sculptures by Alexey Kukhtin.",
    name = "Alexey Kukhtin Sculpture",
    type = "website"
}: SEOProps) {
    const fullTitle = title ? `${title} | ${name}` : name;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title || name} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || name} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}
