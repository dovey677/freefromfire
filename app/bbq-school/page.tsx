import Link from 'next/link'
import { getSchoolAccess, isSchoolLive } from '../../lib/getSchoolAccess'

export const dynamic = 'force-dynamic'

export default async function BBQSchoolPage() {
  const schoolLive = await isSchoolLive()
  const { isLoggedIn, hasAccess } = await getSchoolAccess()

  return (
    <main style={{ backgroundColor: '#1F1F1F', minHeight: '100vh' }}>

      <section style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A8F6A', marginBottom: '0.75rem' }}>
            Free From Fire
          </p>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: '#F7F5F2', lineHeight: 1, marginBottom: '1rem', letterSpacing: '0.02em' }}>
            BBQ SCHOOL
          </h1>
          <div style={{ width: '4rem', height: '3px', backgroundColor: '#E85C2B', margin: '0 auto 1.5rem' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 auto', maxWidth: '560px' }}>
            Structured, in-depth lessons on live-fire cooking — gluten free, no compromise.
            Video walkthroughs, printable guides, and techniques that go deeper than a
            single recipe ever could.
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>

        {!schoolLive && (
          <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', padding: '2rem' }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#F7F5F2', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
              Coming Soon
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              BBQ School is being built right now. Check back soon, or follow along on
              Instagram for updates on when it launches.
            </p>
          </div>
        )}

        {schoolLive && !isLoggedIn && (
          <>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Sign in or create an account to get started.
            </p>
            <Link
              href="/login"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                backgroundColor: '#E85C2B',
                borderRadius: '8px',
                color: '#F7F5F2',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Sign In / Sign Up
            </Link>
          </>
        )}

        {schoolLive && isLoggedIn && !hasAccess && (
          <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', padding: '2rem' }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#F7F5F2', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
              You&apos;re signed in
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Checkout isn&apos;t open yet — we&apos;re still finishing the payment setup.
              Check back soon.
            </p>
          </div>
        )}

        {schoolLive && isLoggedIn && hasAccess && (
          <div style={{ backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '12px', padding: '2rem' }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#F7F5F2', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
              You have access
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#7A8F6A', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Lessons are coming soon — nothing published yet.
            </p>
          </div>
        )}

      </section>

    </main>
  )
}