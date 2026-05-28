// PageMeta — per-page metadata using react-helmet-async
// Props shape mirrors Next.js generateMetadata() return type for easy migration.
// When migrating to Next.js, replace this component with generateMetadata() —
// the props stay the same, it's a mechanical swap.

import { Helmet } from 'react-helmet-async'

interface OpenGraph {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

interface PageMetaProps {
  title: string
  description: string
  canonical: string
  openGraph?: OpenGraph
}

const BASE_URL = 'https://quantum5dconsulting.com'
const DEFAULT_OG_IMAGE = BASE_URL + '/logo.png'

export function PageMeta({ title, description, canonical, openGraph }: PageMetaProps) {
  const fullCanonical = canonical.startsWith('http') ? canonical : BASE_URL + canonical

  const ogTitle = openGraph?.title || title
  const ogDescription = openGraph?.description || description
  const ogImage = openGraph?.image
    ? (openGraph.image.startsWith('http') ? openGraph.image : BASE_URL + openGraph.image)
    : DEFAULT_OG_IMAGE
  const ogUrl = openGraph?.url
    ? (openGraph.url.startsWith('http') ? openGraph.url : BASE_URL + openGraph.url)
    : fullCanonical
  const ogType = openGraph?.type || 'website'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Quantum 5D Consulting" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="author" content="Quantum 5D Consulting" />
    </Helmet>
  )
}
