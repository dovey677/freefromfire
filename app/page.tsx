import { client } from '../lib/sanity'
import Link from 'next/link'

async function getRecipes() {
  return client.fetch(`*[_type == "recipe"]{
    _id,
    title,
    category,
    cookTime,
    allergens,
    glutenFree,
    fireMethod,
    freeRecipe,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url
  }`)
}

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      <section style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '4rem 2rem' }} className="text-center">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <img
            src="/logo.png"
            alt="Free From Fire"
            style={{ width: '220px', height: '220px', objectFit: 'contain' }}
          />
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '1rem' }}>
          Free from limits. Forged by fire.
        </p>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, color: '#F7F5F2', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
          FIRE-COOKED.<br />
          <span style={{ color: '#E85C2B' }}>ALWAYS FREE</span><br />
          FROM GLUTEN.
        </h1>
        <div style={{ width: '4rem', height: '3px', backgroundColor: '#E85C2B', margin: '0 auto 1.5rem' }}></div>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', maxWidth: '32rem', margin: '0 auto', lineHeight: 1.7, fontSize: '1rem' }}>
          Real fire. Real family. No compromise on flavour — or safety.
        </p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Latest Recipes
        </h2>

        {recipes.length === 0 && (
          <p style={{ color: '#7A8F6A' }}>No recipes yet — check back soon!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: any) => (
            <Link key={recipe._id} href={`/recipe/${recipe.slug}`}>
              <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' }}
                className="hover:border-orange-600 hover:-translate-y-1 cursor-pointer">
                {recipe.thumbnail ? (
                  <img
                    src={recipe.thumbnail}
                    alt={recipe.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '200px', backgroundColor: '#1a1212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>🔥</span>
                  </div>
                )}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    {recipe.category && (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '2px 10px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {recipe.category}
                      </span>
                    )}
                    {recipe.glutenFree && (
                      <span style={{ fontSize: '0.7rem', backgroundColor: '#7A8F6A', color: '#F7F5F2', padding: '2px 10px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        GF
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', fontWeight: 600, color: '#F7F5F2', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                    {recipe.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#7A8F6A' }}>
                    {recipe.cookTime && `${recipe.cookTime} mins`}{recipe.cookTime && recipe.fireMethod && ' · '}{recipe.fireMethod}
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