'use client'

import { client } from '../../lib/sanity'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const CATEGORIES = ['All', 'BBQ', 'Bakes', 'Pizza', 'Sides']
const ALLERGENS = ['Dairy', 'Eggs', 'Nuts', 'Soya', 'Sesame', 'Wheat']

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    client.fetch(`*[_type == "recipe"] | order(_createdAt desc) {
      _id,
      title,
      category,
      cookTime,
      allergens,
      glutenFree,
      fireMethod,
      summary,
      freeRecipe,
      "slug": slug.current,
      "thumbnail": thumbnail.asset->url
    }`).then(setRecipes)

    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  function toggleAllergen(allergen: string) {
    setExcludedAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    )
  }

  const filtered = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === 'All' || recipe.category?.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch = recipe.title?.toLowerCase().includes(search.toLowerCase())
    const matchesAllergens = excludedAllergens.every(
      allergen => !recipe.allergens?.map((a: string) => a.toLowerCase()).includes(allergen.toLowerCase())
    )
    return matchesCategory && matchesSearch && matchesAllergens
  })

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      <section style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>
            Free From Fire
          </p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: '#F7F5F2', lineHeight: 1, marginBottom: '1rem', letterSpacing: '0.02em' }}>
            ALL RECIPES
          </h1>
          <div style={{ width: '4rem', height: '3px', backgroundColor: '#E85C2B', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            Every recipe is gluten free. Every cook is over real fire.
          </p>
        </div>
      </section>

      <section style={{ padding: '2rem 2rem 0', maxWidth: '1200px', margin: '0 auto' }}>

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.875rem 1.25rem',
            backgroundColor: '#2a2020',
            border: '1px solid #3a2a2a',
            borderRadius: '8px',
            color: '#F7F5F2',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            outline: 'none',
            marginBottom: '1.25rem',
            boxSizing: 'border-box',
          }}
        />

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>
          Category
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeCategory === cat ? '#E85C2B' : 'transparent',
                borderColor: activeCategory === cat ? '#E85C2B' : '#3a2a2a',
                color: activeCategory === cat ? '#F7F5F2' : '#7A8F6A',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>
          Exclude Allergens
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {ALLERGENS.map((allergen) => (
            <button
              key={allergen}
              onClick={() => toggleAllergen(allergen)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: excludedAllergens.includes(allergen) ? '#B23A1B' : 'transparent',
                borderColor: excludedAllergens.includes(allergen) ? '#B23A1B' : '#3a2a2a',
                color: excludedAllergens.includes(allergen) ? '#F7F5F2' : '#7A8F6A',
              }}
            >
              {excludedAllergens.includes(allergen) ? `✕ ${allergen}` : allergen}
            </button>
          ))}
        </div>

      </section>

      <section style={{ padding: '0 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        {filtered.length === 0 && (
          <p style={{ color: '#7A8F6A', fontFamily: 'Inter, sans-serif' }}>
            No recipes found — try a different search or filter.
          </p>
        )}

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((recipe: any) => (
              <Link key={recipe._id} href={`/recipe/${recipe.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s' }}
                  className="hover:border-orange-600 cursor-pointer">
                  {recipe.thumbnail ? (
                    <img src={recipe.thumbnail} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '200px', backgroundColor: '#1a1212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '3rem' }}>🔥</span>
                    </div>
                  )}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', fontWeight: 600, color: '#F7F5F2', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                      {recipe.title}
                    </h3>
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
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#7A8F6A', marginBottom: '0.75rem' }}>
                      {recipe.cookTime && `${recipe.cookTime} mins`}{recipe.cookTime && recipe.fireMethod && ' · '}{recipe.fireMethod}
                    </p>
                    {recipe.summary && (
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#7A8F6A', lineHeight: 1.5, margin: '0.5rem 0 0.5rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {recipe.summary}
                      </p>
                    )}
                    {recipe.allergens?.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B23A1B' }}>Contains:</span>
                        {recipe.allergens.map((allergen: string) => (
                          <span key={allergen} style={{ fontSize: '0.65rem', backgroundColor: '#2a1515', border: '1px solid #B23A1B', color: '#EAD7C5', padding: '1px 8px', borderRadius: '999px', fontFamily: 'Inter, sans-serif' }}>
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
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((recipe: any) => (
              <Link key={recipe._id} href={`/recipe/${recipe.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', display: 'flex', flexDirection: 'row', alignItems: 'stretch', minHeight: '260px' }}
                  className="hover:border-orange-600 hover:-translate-y-1 cursor-pointer">
                {recipe.thumbnail ? (
                    <img src={recipe.thumbnail} alt={recipe.title} style={{ width: '260px', minWidth: '260px', height: '260px', objectFit: 'cover', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '260px', minWidth: '260px', height: '260px', backgroundColor: '#1a1212', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '3rem' }}>🔥</span>
                    </div>
                  )}
                    <div style={{ padding: '0 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, height: '260px' }}>
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 600, color: '#F7F5F2', margin: '0 0 0.75rem 0', letterSpacing: '0.02em' }}>
                      {recipe.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {recipe.category && (
                        <span style={{ fontSize: '0.8rem', backgroundColor: '#E85C2B', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {recipe.category}
                        </span>
                      )}
                      {recipe.glutenFree && (
                        <span style={{ fontSize: '0.8rem', backgroundColor: '#7A8F6A', color: '#F7F5F2', padding: '3px 12px', borderRadius: '999px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          GF
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#7A8F6A', marginBottom: '0.75rem' }}>
                      {recipe.cookTime && `${recipe.cookTime} mins`}{recipe.cookTime && recipe.fireMethod && ' · '}{recipe.fireMethod}
                    </p>
                    {recipe.summary && (
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#7A8F6A', lineHeight: 1.5, margin: '0.5rem 0 0.5rem 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {recipe.summary}
                      </p>
                    )}
                    {recipe.allergens?.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B23A1B' }}>Contains:</span>
                        {recipe.allergens.map((allergen: string) => (
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
        )}
      </section>

    </main>
  )
}