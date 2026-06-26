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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide: any) => (
            <Link key={guide._id} href={`/guides/${guide.slug}`}>
              <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' }}
                className="hover:border-orange-600 hover:-translate-y-1 cursor-pointer">
                {guide.thumbnail ? (
                  <img
                    src={guide.thumbnail}
                    alt={guide.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '200px', backgroundColor: '#1a1212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>🪵</span>
                  </div>
                )}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    {guide.category && (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '2px 10px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {guide.category}
                      </span>
                    )}
                    {guide.difficulty && (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#2a2020', border: '1px solid #3a2a2a', color: '#7A8F6A', padding: '2px 10px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {guide.difficulty}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', fontWeight: 600, color: '#F7F5F2', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                    {guide.title}
                  </h3>
                  {guide.summary && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#7A8F6A', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {guide.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}