import { client } from '../../lib/sanity'
import Link from 'next/link'

export const revalidate = 60

async function getBaseRecipes() {
  return client.fetch(`*[_type == "baseRecipe"]{
    _id,
    title,
    category,
    summary,
    glutenFree,
    allergens,
    freeBaseRecipe,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`)
}

export default async function BaseRecipesPage() {
  const baseRecipes = await getBaseRecipes()

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      <section style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>
            Free From Fire
          </p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: '#F7F5F2', lineHeight: 1, marginBottom: '1rem', letterSpacing: '0.02em' }}>
            BASE RECIPES
          </h1>
          <div style={{ width: '4rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            Doughs, rubs, sauces and marinades to build your cooks around.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {baseRecipes.length === 0 && (
          <p style={{ color: '#7A8F6A', fontFamily: 'Inter, sans-serif' }}>No base recipes yet — check back soon!</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {baseRecipes.map((baseRecipe: any) => (
            <Link key={baseRecipe._id} href={`/base-recipes/${baseRecipe.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', display: 'flex', flexDirection: 'row', alignItems: 'stretch', minHeight: '260px' }}
                className="hover:border-orange-600 hover:-translate-y-1 cursor-pointer base-recipe-card">
                {baseRecipe.thumbnail ? (
                  <img
                    src={baseRecipe.thumbnail}
                    alt={baseRecipe.title}
                    className="base-recipe-card-image"
                    style={{ width: '260px', minWidth: '260px', height: '100%', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div className="base-recipe-card-image" style={{ width: '260px', minWidth: '260px', height: '100%', backgroundColor: '#1a1212', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '3rem' }}>📖</span>
                  </div>
                )}
                <div style={{ padding: '0 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, height: '260px' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 600, color: '#F7F5F2', margin: '0 0 0.75rem 0', letterSpacing: '0.02em' }}>
                    {baseRecipe.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    {baseRecipe.category && (
                      <span style={{ fontSize: '0.8rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {baseRecipe.category}
                      </span>
                    )}
                    {baseRecipe.glutenFree && (
                      <span style={{ fontSize: '0.8rem', backgroundColor: '#7A8F6A', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        GF
                      </span>
                    )}
                  </div>
                  {baseRecipe.summary && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#7A8F6A', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '0 0 0.75rem 0' }}>
                      {baseRecipe.summary}
                    </p>
                  )}
                  {baseRecipe.allergens?.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B23A1B' }}>Contains:</span>
                      {baseRecipe.allergens.map((allergen: string) => (
                        <span key={allergen} style={{ fontSize: '0.75rem', backgroundColor: '#2a1515', border: '1px solid #B23A1B', color: '#EAD7C5', padding: '2px 10px', borderRadius: '999px', fontFamily: 'Inter, sans-serif' }}>
                          {allergen}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .base-recipe-card {
            flex-direction: column !important;
          }
          .base-recipe-card-image {
            width: 100% !important;
            min-width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>

    </main>
  )
}