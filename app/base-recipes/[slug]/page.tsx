import { client } from '../../../lib/sanity'
import Link from 'next/link'
import BaseIngredientList from '../../components/BaseIngredientList'
import CollapsibleSection from '../../components/CollapsibleSection'

async function getBaseRecipe(slug: string) {
  return client.fetch(
    `*[_type == "baseRecipe" && slug.current == $slug][0]{
      _id,
      title,
      category,
      summary,
      servesCount,
      servesLabel,
      glutenFree,
      allergens,
      ingredientGroups[] {
        groupTitle,
        ingredients[] {
          quantity,
          unit,
          name
        }
      },
      steps,
      videoUrl,
      "thumbnail": thumbnail.asset->url
    }`,
    { slug }
  )
}

export default async function BaseRecipePage({ params }: any) {
  const { slug } = await params
  const baseRecipe = await getBaseRecipe(slug)

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      {baseRecipe.thumbnail && (
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={baseRecipe.thumbnail}
            alt={baseRecipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, #1F1F1F)' }} />
        </div>
      )}

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 2rem 4rem' }}>

        <Link href="/base-recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E85C2B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          ← Back to base recipes
        </Link>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {baseRecipe.category && (
            <span style={{ fontSize: '0.7rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {baseRecipe.category}
            </span>
          )}
          {baseRecipe.glutenFree && (
            <span style={{ fontSize: '0.7rem', backgroundColor: '#7A8F6A', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Gluten Free
            </span>
          )}
        </div>

        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>
          {baseRecipe.title}
        </h1>

        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1.5rem' }} />

        {baseRecipe.summary && (
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem', whiteSpace: 'pre-line' }}>
            {baseRecipe.summary}
          </p>
        )}

        {baseRecipe.allergens?.length > 0 && (
          <CollapsibleSection title="Allergens" accentColor="#B23A1B" defaultOpen={false}>
            <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '8px', padding: '1rem 1.25rem' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>Contains</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {baseRecipe.allergens.map((allergen: string) => (
                  <span key={allergen} style={{ fontSize: '0.75rem', backgroundColor: '#B23A1B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif' }}>
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        )}

        {baseRecipe.ingredientGroups?.length > 0 && (
          <CollapsibleSection title="Ingredients" accentColor="#E85C2B" defaultOpen={true}>
            <BaseIngredientList
              groups={baseRecipe.ingredientGroups}
              servesCount={baseRecipe.servesCount}
              servesLabel={baseRecipe.servesLabel}
            />
          </CollapsibleSection>
        )}

        {baseRecipe.steps?.length > 0 && (
          <CollapsibleSection title="Method" accentColor="#E85C2B" defaultOpen={true}>
            <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
              {baseRecipe.steps.map((step: string, i: number) => (
                <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.25rem', backgroundColor: i % 2 === 0 ? '#252525' : '#2a2020', borderRadius: '6px', marginBottom: '2px' }}>
                  <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#E85C2B', flexShrink: 0, lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </CollapsibleSection>
        )}

        {baseRecipe.videoUrl && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Video
            </h2>
            <div style={{ width: '2rem', height: '2px', backgroundColor: '#E85C2B', marginBottom: '1.25rem' }} />
            <iframe
              src={baseRecipe.videoUrl}
              style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', border: 'none' }}
              allowFullScreen
            />
          </div>
        )}

      </div>
    </main>
  )
}