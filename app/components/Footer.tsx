import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111', borderTop: '1px solid #2a2a2a', padding: 'clamp(1.5rem, 4vw, 3rem) 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>

        <div>
          <img src="/logo-horizontal.png" alt="Free From Fire" style={{ height: '50px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '0.85rem', color: '#F7F5F2', margin: 0, letterSpacing: '0.05em' }}>
            FIRE-COOKED. <span style={{ color: '#E85C2B' }}>ALWAYS FREE</span> FROM GLUTEN.
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Explore</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#7A8F6A', textDecoration: 'none' }}>Recipes</Link>
            <Link href="/guides" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#7A8F6A', textDecoration: 'none' }}>Guides and Tips</Link>
            <Link href="/base-recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#7A8F6A', textDecoration: 'none' }}>Base Recipes</Link>
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Follow Along</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="https://www.instagram.com/free_from_fire" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#7A8F6A', textDecoration: 'none' }}>📸 Instagram - @free_from_fire</a>
            <a href="https://www.facebook.com/freefromfire" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#7A8F6A', textDecoration: 'none' }}>👍 Facebook - Free From Fire</a>
          </div>
        </div>

      </div>

      <div style={{ maxWidth: '1200px', margin: '1rem auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', columnGap: '1rem', rowGap: '0.5rem' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#7A8F6A', margin: '0 0 0.75rem 0', lineHeight: 1.6 }}>
          Always check individual product ingredients for allergens as recipes may vary. Free From Fire accepts no liability for adverse reactions. If you have a severe allergy, please consult a medical professional.
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#7A8F6A', margin: 0 }}>Copyright {new Date().getFullYear()} Free From Fire. All rights reserved.</p>
      </div>
    </footer>
  )
}