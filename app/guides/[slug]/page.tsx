import { client } from '../../../lib/sanity'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import CookMode from '../../components/CookMode'
import CollapsibleSection from '../../components/CollapsibleSection'

export const revalidate = 60

async function getGuide(slug: string) {
  return client.fetch(
    `*[_type == "guide" && slug.current == $slug][0]{
      _id,
      title,
      category,
      difficulty,
      equipment,
      summary,
      intro,
      steps[] {
        text,
        "image": image.asset->url
      },
      videoUrl,
      "thumbnail": thumbnail.asset->url
    }`,
    { slug }
  )
}

export default async function GuidePage({ params }: any) {
  const { slug } = await params
  const guide = await getGuide(slug)

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      {guide.thumbnail && (
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={guide.thumbnail}
            alt={guide.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, #1F1F1F)' }} />
        </div>
      )}

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 2rem 4rem' }}>

        <Link href="/guides" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E85C2B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          ← Back to guides
        </Link>


        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {guide.category && (
            <span style={{ fontSize: '0.7rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {guide.category}
            </span>
          )}
          {guide.difficulty && (
            <span style={{ fontSize: '0.7rem', backgroundColor: '#7A8F6A', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {guide.difficulty}
            </span>
          )}
        </div>

        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>
          {guide.title}
        </h1>

        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1.5rem' }} />

        {guide.summary && (
          <div style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            <ReactMarkdown>{String(guide.summary)}</ReactMarkdown>
          </div>
        )}

        {guide.intro && (
          <div style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            <ReactMarkdown>{String(guide.intro)}</ReactMarkdown>
          </div>
        )}

        <div style={{ marginBottom: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #2a2a2a', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <CookMode />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#EAD7C5', margin: 0 }}>
            Prevent your screen from going dark as you follow along.
          </p>
        </div>

        {guide.equipment?.length > 0 && (
          <CollapsibleSection title="Equipment" accentColor="#7A8F6A" defaultOpen={false}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {guide.equipment.map((item: string, i: number) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '0.95rem', lineHeight: 1.5, backgroundColor: '#252525', borderRadius: '6px', padding: '0.6rem 1rem' }}>
                  <span style={{ color: '#7A8F6A', marginTop: '2px', flexShrink: 0 }}>⬡</span>
                  {item}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {guide.steps?.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Steps
            </h2>
            <div style={{ width: '2rem', height: '2px', backgroundColor: '#E85C2B', marginBottom: '1.25rem' }} />
            <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
              {guide.steps.map((step: any, i: number) => (
                <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.25rem', backgroundColor: i % 2 === 0 ? '#252525' : '#2a2020', borderRadius: '6px', marginBottom: '2px' }}>
                  <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#E85C2B', flexShrink: 0, lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                    className="markdown-steps">
                    <ReactMarkdown>{String(step.text)}</ReactMarkdown>
                  </div>
                  {step.image?.asset?.url && (
                    <img
                      src={step.image.asset.url}
                      alt={`Step ${i + 1}`}
                      style={{ width: '100%', borderRadius: '8px', marginTop: '1rem', objectFit: 'cover' }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {guide.videoUrl && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Video
            </h2>
            <div style={{ width: '2rem', height: '2px', backgroundColor: '#E85C2B', marginBottom: '1.25rem' }} />
            <iframe
              src={guide.videoUrl}
              style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', border: 'none' }}
              allowFullScreen
            />
          </div>
        )}

      </div>
    </main>
  )
}