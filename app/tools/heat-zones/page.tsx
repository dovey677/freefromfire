import Link from 'next/link'
import HeatZones from '../../components/HeatZones'

export default function HeatZonesPage() {
  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 2rem 4rem' }}>

        <Link href="/tools" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E85C2B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          ← Back to tools
        </Link>

        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>
          Heat Zones
        </h1>

        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1.5rem' }} />

        <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          The two-zone setup behind almost every great cook: coals on one side for
          direct heat, food on the other for gentle indirect heat, then a final sear
          to finish. Here's how the airflow and heat actually move.
        </p>

        <HeatZones />

      </div>
    </main>
  )
}
