import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path: string
  image?: string
  type?: string
  structuredData?: any
  googleSiteVerification?: string
  googleAnalyticsId?: string
}

export function SEO({ title, description, path, image, type = 'website', structuredData, googleSiteVerification, googleAnalyticsId }: SEOProps) {
  const baseUrl = 'https://quantum5dconsulting.com'
  const fullUrl = `${baseUrl}${path}`
  const defaultImage = `${baseUrl}/images/logo.png`
  const imageUrl = image ? `${baseUrl}${image}` : defaultImage

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Quantum 5D Consulting" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional meta tags */}
      <meta name="author" content="Quantum 5D Consulting" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Google Search Console Verification */}
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}
      
      {/* Google Analytics 4 */}
      {googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </script>
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}