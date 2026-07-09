import Link from 'next/link'
import KamadoVentSimulator from '../../components/KamadoVentSimulator'

export default function KamadoVentSimulatorPage() {
  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 2rem 4rem' }}>

        <Link href="/tools" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E85C2B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          ← Back to tools
        </Link>

        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>
          Kamado Vent Simulator
        </h1>

        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1.5rem' }} />

        <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Vent position is the difference between a controlled cook and a ruined one.
          Pick your deflector setup below — direct, indirect, or double indirect — and
          adjust the top and bottom vents to see roughly where your temperature will
          land. Use it to plan your setup before you light the coals, or to sanity-check
          your vents mid-cook if the temperature's drifting.
        </p>

        <KamadoVentSimulator />

      </div>
    </main>
  )
}