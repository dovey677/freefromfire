import { client } from '../../lib/sanity'
import Link from 'next/link'

async function getGuides() {
  return client.fetch(`*[_type == "guide"]{
    _id,
    title,
    category,
    difficulty,
    summary,
    freeGuide,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`)
}

export default async function GuidesPage() {
  const guides = await getGuides()

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      <section style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>
            Free From Fire
          </p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: '#F7F5F2', lineHeight: 1, marginBottom: '1rem', letterSpacing: '0.02em' }}>
            GUIDES & TIPS
          </h1>
          <div style={{ width: '4rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            Fire starting, kamado tips, maintenance and more.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {guides.length === 0 && (
          <p style={{ color: '#7A8F6A', fontFamily: 'Inter, sans-serif' }}>No guides yet — check back soon!</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {guides.map((guide: any) => (
            <Link key={guide._id} href={`/guides/${guide.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', display: 'flex', flexDirection: 'row', alignItems: 'stretch', minHeight: '260px' }}
                className="hover:border-orange-600 hover:-translate-y-1 cursor-pointer guide-card">
                {guide.thumbnail ? (
                  <img
                    src={guide.thumbnail}
                    alt={guide.title}
                    className="guide-card-image"
                    style={{ width: '260px', minWidth: '260px', height: '100%', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div className="guide-card-image" style={{ width: '260px', minWidth: '260px', height: '100%', backgroundColor: '#1a1212', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '3rem' }}>🪵</span>
                  </div>
                )}
                <div style={{ padding: '0 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, height: '260px' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 600, color: '#F7F5F2', margin: '0 0 0.75rem 0', letterSpacing: '0.02em' }}>
                    {guide.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    {guide.category && (
                      <span style={{ fontSize: '0.8rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {guide.category}
                      </span>
                    )}
                    {guide.difficulty && (
                      <span style={{ fontSize: '0.8rem', backgroundColor: '#2a2020', border: '1px solid #3a2a2a', color: '#7A8F6A', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {guide.difficulty}
                      </span>
                    )}
                  </div>
                    {guide.summary && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#7A8F6A', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                      {guide.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .guide-card {
            flex-direction: column !important;
          }
          .guide-card-image {
            width: 100% !important;
            min-width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>

    </main>
  )
}