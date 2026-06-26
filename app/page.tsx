import { client } from '../lib/sanity'
import Link from 'next/link'

export const revalidate = 60

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
          Built Around Fire.
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

      <section style={{ maxWidth: '48rem', margin: '0 auto', padding: '4rem 2rem', borderBottom: '1px solid #2a2a2a' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '1rem' }}>
          The Story
        </p>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          FROM BACKYARD BBQ TO<br /><span style={{ color: '#E85C2B' }}>LIVE FIRE OBSESSION</span>
        </h2>
        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '2rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
            BBQ has always been part of our family. But in 2021 everything changed when I ditched gas and bought a Traeger pellet smoker — and fell completely in love with the craft of smoking. Two years later I pulled the trigger on a Kamado Joe Classic II, sold the Traeger, and haven't looked back. Most recently a Gozney Dome joined the arsenal and I've been diving deep into the world of fire-cooked pizza.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
            In 2022 our son — now 10 — was diagnosed as Coeliac. Not long after, our daughter — now 6 — was confirmed the same. Watching them miss out at birthday parties and special occasions on food everyone else was eating was tough. So we made it our mission to recreate everything they felt they were missing — properly, over fire, without compromise.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
            Free From Fire is everything we've learned along the way. Every recipe is gluten free. Every cook is done over real fire. And none of it requires you to sacrifice flavour for safety.
          </p>
        </div>

        <div style={{ marginTop: '2.5rem', padding: '1.25rem 1.5rem', borderLeft: '3px solid #E85C2B', backgroundColor: '#2a2020' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Inspired by</p>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            Smokin' Elk, Smokin' Dad BBQ and Only Slaggin' — the creators who pushed me to find my own way in the world of BBQ.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: '48rem', margin: '0 auto', padding: '3rem 2rem', borderBottom: '1px solid #2a2a2a' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '1rem' }}>
          What You'll Find Here
        </p>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#F7F5F2', letterSpacing: '0.02em', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          FIRE-COOKED. <span style={{ color: '#E85C2B' }}>FREE FROM GLUTEN.</span><br />NO COMPROMISE.
        </h2>
        <div style={{ width: '3rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '2rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { emoji: '🔥', title: 'BBQ Recipes', description: 'Low and slow smokes, reverse sears, grills — all gluten free.', href: '/recipes' },
            { emoji: '🍕', title: 'Baking & Pizza', description: 'Fire-cooked breads, pizzas and bakes from the Gozney Dome.', href: '/recipes' },
            { emoji: '📖', title: 'Base Recipes', description: 'Doughs, rubs, sauces and marinades to build your cooks around.', href: '/base-recipes' },
            { emoji: '🪵', title: 'Guides & Tips', description: 'Fire building, airflow control, kamado technique and more.', href: '/guides' },
          ].map((item) => (
            <Link key={item.title} href={item.href} style={{ textDecoration: 'none', display: 'flex' }}>
              <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '10px', padding: '1.25rem', transition: 'border-color 0.2s, transform 0.2s', display: 'flex', flexDirection: 'column', width: '100%' }} className="hover:border-orange-600 hover:-translate-y-1 cursor-pointer">
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.75rem' }}>{item.emoji}</span>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#F7F5F2', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#7A8F6A', lineHeight: 1.6, margin: 0, flex: 1 }}>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            Latest Recipes
          </h2>
          <Link href="/recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E85C2B', textDecoration: 'none' }}>
            View all →
          </Link>
        </div>

        {recipes.length === 0 && (
          <p style={{ color: '#7A8F6A' }}>No recipes yet — check back soon!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.slice(0, 6).map((recipe: any) => (
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