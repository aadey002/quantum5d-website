import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '627px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #14112E 0%, #2D1B69 50%, #403592 100%)',
          fontFamily: 'Georgia, serif',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#938ABD',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
            }}
          >
            Quantum5D.ai
          </div>
        </div>
        <div
          style={{
            fontSize: '52px',
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          What Is Medicaid Coverage Loss Costing Your FQHC?
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#CFCAE6',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '700px',
          }}
        >
          Interactive ROI Calculator — model revenue at risk, 340B margin exposure, and navigator savings
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '40px',
            background: 'rgba(83, 71, 164, 0.5)',
            padding: '14px 32px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
            Calculate your number in 60 seconds →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 627 }
  )
}
