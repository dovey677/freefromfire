'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '0.75rem 1rem 0.75rem clamp(0.5rem, 2vw, 1.5rem)', position: 'relative', zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo-horizontal.png"
            alt="Free From Fire"
            style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        <div className="desktop-nav" style={{ display: 'flex', gap: 'clamp(0.75rem, 2vw, 3rem)', alignItems: 'center' }}>
          <Link href="/recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Recipes
          </Link>
          <Link href="/guides" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Guides
          </Link>
          <Link href="/base-recipes" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Base Recipes
          </Link>
          <Link href="/tools" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Tools
          </Link>
          <Link
            href="/bbq-school"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F7F5F2',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              backgroundColor: '#E85C2B',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
            }}
          >
            BBQ School
          </Link>
        </div>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem', display: 'none', color: '#EAD7C5', fontSize: '1.5rem', lineHeight: 1 }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu" style={{ display: 'none', flexDirection: 'column', gap: '0', paddingTop: '1rem', borderTop: '1px solid #2a2a2a', marginTop: '0.75rem' }}>
          <Link href="/recipes" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', padding: '0.875rem 0 0.875rem 1.25rem', borderBottom: '1px solid #2a2a2a' }}>
            Recipes
          </Link>
          <Link href="/guides" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', padding: '0.875rem 0 0.875rem 1.25rem', borderBottom: '1px solid #2a2a2a' }}>
            Guides
          </Link>
          <Link href="/base-recipes" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', padding: '0.875rem 0 0.875rem 1.25rem', borderBottom: '1px solid #2a2a2a' }}>
            Base Recipes
          </Link>
          <Link href="/tools" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#EAD7C5', textDecoration: 'none', padding: '0.875rem 0 0.875rem 1.25rem', borderBottom: '1px solid #2a2a2a' }}>
            Tools
          </Link>
          <Link
            href="/bbq-school"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F7F5F2',
              textDecoration: 'none',
              padding: '0.875rem 0 0.875rem 1.25rem',
              backgroundColor: '#E85C2B',
            }}
          >
            BBQ School
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
