'use client'

import { useState } from 'react'

export default function CollapsibleSection({
  title,
  accentColor,
  defaultOpen = true,
  children,
}: {
  title: string
  accentColor: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}
      >
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#EAD7C5', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
          {title}
        </h2>
        <span style={{ color: accentColor, fontSize: '1.5rem', lineHeight: 1, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}>
          ▾
        </span>
      </button>
      <div style={{ width: '2rem', height: '2px', backgroundColor: accentColor, marginBottom: '1.25rem' }} />
      {isOpen && children}
    </div>
  )
}