// Schema — renders JSON-LD structured data as a <script type="application/ld+json"> tag.
// Portable as-is to Next.js (just move to a server component or head).
//
// Usage:
//   <Schema type="Organization" data={{ name: "...", url: "..." }} />
//   <Schema type="Person" data={{ name: "...", jobTitle: "..." }} />

import { Helmet } from 'react-helmet-async'

interface SchemaProps {
  type: string
  data: Record<string, unknown>
}

export function Schema({ type, data }: SchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  )
}
