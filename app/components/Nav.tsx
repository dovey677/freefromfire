import Link from 'next/link'

export default function Nav() {
  return (
    <nav style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '0.75rem clamp(0.5rem, 2vw, 1.5rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <img
          src="/logo-horizontal.png"
          alt="Free From Fire"
          style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
        />
      </Link>
      <div style={{ display: 'flex', gap: 'clamp(0.75rem, 2vw, 3rem)', alignItems: 'center' }}>
        <Link href="/recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Recipes
        </Link>
        <Link href="/guides" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Guides
        </Link>
        <Link href="/base-recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Base Recipes
        </Link>
      </div>
    </nav>
  )
}