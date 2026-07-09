import Link from 'next/link'

const TOOLS = [
  {
    slug: 'kamado-vent-simulator',
    title: 'Kamado Vent Simulator',
    description: 'Work out your vent settings before you light up — direct, indirect, or double indirect, with a live temperature ceiling for each.',
    emoji: '🔥',
  },
  {
    slug: 'heat-zones',
    title: 'Heat Zones',
    description: 'Understand how to set up your fire for even, controlled cooking every time.',
    emoji: '🌡️',
  },
]

export default function ToolsPage() {
  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      <section style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>
            Free From Fire
          </p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: '#F7F5F2', lineHeight: 1, marginBottom: '1rem', letterSpacing: '0.02em' }}>
            TOOLS
          </h1>
          <div style={{ width: '4rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            Interactive tools to use before and during a cook.
          </p>
        </div>
      </section>

      <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {TOOLS.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', transition: 'border-color 0.2s' }}
                className="hover:border-orange-600 cursor-pointer">
                <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>{tool.emoji}</span>
                <div>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#F7F5F2', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                    {tool.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#7A8F6A', lineHeight: 1.5, margin: 0 }}>
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}