import Link from 'next/link'

export default function Nav() {
  return (
    <nav style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#E85C2B', letterSpacing: '0.05em' }}>
          FREE FROM FIRE
        </span>
      </Link>
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none' }}>
          Recipes
        </Link>
        <Link href="/guides" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none' }}>
          Guides
        </Link>
        <Link href="/base-recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none' }}>
          Base Recipes
        </Link>
      </div>
    </nav>
  )
}