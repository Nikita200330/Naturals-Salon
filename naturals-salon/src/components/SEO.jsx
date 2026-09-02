import { Helmet } from 'react-helmet-async';
import { businessInfo } from '../data/businessInfo';

export default function SEO({ 
  title, 
  description, 
  url = '', 
  type = 'website',
  schemaData = null 
}) {
  const fullTitle = title || businessInfo.seo?.defaultTitle || "Naturals Salon Kalaburagi | Hair & Beauty Services";
  const fullDescription = description || businessInfo.seo?.defaultDescription || "Explore hair, beauty, bridal, grooming, waxing and nail services at Naturals Salon in Prime Mall, Kalaburagi.";
  const fullUrl = businessInfo.websiteUrl ? `${businessInfo.websiteUrl}${url}` : '';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      {fullUrl && <meta property="og:url" content={fullUrl} />}
      {businessInfo.images?.cover && <meta property="og:image" content={businessInfo.images.cover} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {businessInfo.images?.cover && <meta name="twitter:image" content={businessInfo.images.cover} />}

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
