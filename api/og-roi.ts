// Dynamic OG image for /roi — 1200x627 branded card
// Uses @vercel/og (Satori) at the edge runtime

import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function handler() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '627px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #14112E 0%, #2D1B69 50%, #403592 100%)',
          fontFamily: 'Georgia, serif',
          padding: '60px 80px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: '22px', fontWeight: 600, color: '#938ABD', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '40px' },
              children: 'Quantum5D.ai',
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '52px', fontWeight: 700, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.2, marginBottom: '24px', maxWidth: '900px' },
              children: 'What Is Medicaid Coverage Loss Costing Your FQHC?',
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '24px', color: '#CFCAE6', textAlign: 'center', lineHeight: 1.5, maxWidth: '700px' },
              children: 'Interactive ROI Calculator — model revenue at risk, 340B margin exposure, and navigator savings',
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', alignItems: 'center', marginTop: '40px', background: 'rgba(83, 71, 164, 0.5)', padding: '14px 32px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' },
              children: {
                type: 'div',
                props: {
                  style: { fontSize: '18px', fontWeight: 700, color: '#FFFFFF' },
                  children: 'Calculate your number in 60 seconds',
                },
              },
            },
          },
        ],
      },
    },
    { width: 1200, height: 627 }
  )
}
