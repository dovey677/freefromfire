import { client } from '../../../lib/sanity'
import Link from 'next/link'
import IngredientList from '../../components/IngredientList'
import CollapsibleSection from '../../components/CollapsibleSection'
import CookMode from '../../components/CookMode'

export const revalidate = 60

async function getRecipe(slug: string) {
  return client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{
      _id,
      title,
      category,
      cookTime,
      prepTime,
      serves,
      allergens,
      glutenFree,
      fireMethod,
      equipment,
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

export default async function RecipePage({ params }: any) {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      {recipe.thumbnail && (
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={recipe.thumbnail}
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, #1F1F1F)' }} />
        </div>
      )}

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 2rem 4rem' }}>

        <Link href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E85C2B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          ← Back to recipes
        </Link>


        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {recipe.category && (
            <span style={{ fontSize: '0.7rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {recipe.category}
            </span>
          )}
          {recipe.glutenFree && (
            <span style={{ fontSize: '0.7rem', backgroundColor: '#7A8F6A', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Gluten Free
            </span>
          )}
        </div>

        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>
          {recipe.title}
        </h1>

        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1.5rem' }} />

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {recipe.prepTime && (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.25rem' }}>Prep</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: '#EAD7C5' }}>{recipe.prepTime} mins</p>
            </div>
          )}
          {recipe.cookTime && (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.25rem' }}>Cook</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: '#EAD7C5' }}>{recipe.cookTime} mins</p>
            </div>
          )}
          {recipe.serves && (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.25rem' }}>Serves</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: '#EAD7C5' }}>{recipe.serves}</p>
            </div>
          )}
          {recipe.fireMethod && (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.25rem' }}>Method</p>
              <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: '#EAD7C5' }}>{recipe.fireMethod}</p>
            </div>
          )}
        </div>

        {recipe.equipment?.length > 0 && (
          <CollapsibleSection title="Equipment" accentColor="#7A8F6A" defaultOpen={false}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recipe.equipment.map((item: string, i: number) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '0.95rem', lineHeight: 1.5, backgroundColor: '#252525', borderRadius: '6px', padding: '0.6rem 1rem' }}>
                  <span style={{ color: '#7A8F6A', marginTop: '2px', flexShrink: 0 }}>⬡</span>
                  {item}
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        )}

        {recipe.allergens?.length > 0 && (
          <CollapsibleSection title="Allergens" accentColor="#B23A1B" defaultOpen={false}>
            <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '8px', padding: '1rem 1.25rem' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>Contains</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {recipe.allergens.map((allergen: string) => (
                  <span key={allergen} style={{ fontSize: '0.75rem', backgroundColor: '#B23A1B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif' }}>
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        )}

        {recipe.ingredientGroups?.length > 0 && (
          <CollapsibleSection title="Ingredients" accentColor="#E85C2B" defaultOpen={true}>
            <IngredientList groups={recipe.ingredientGroups} />
          </CollapsibleSection>
        )}

        <div style={{ marginBottom: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #2a2a2a', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <CookMode />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#EAD7C5', margin: 0 }}>
            Prevent your screen from going dark as you follow along.
          </p>
        </div>

        {recipe.steps?.length > 0 && (
          <CollapsibleSection title="Method" accentColor="#E85C2B" defaultOpen={true}>
            <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
              {recipe.steps.map((step: string, i: number) => (
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

        {recipe.videoUrl && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Video
            </h2>
            <div style={{ width: '2rem', height: '2px', backgroundColor: '#E85C2B', marginBottom: '1.25rem' }} />
            <iframe
              src={recipe.videoUrl}
              style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', border: 'none' }}
              allowFullScreen
            />
          </div>
        )}

      </div>
    </main>
  )
}