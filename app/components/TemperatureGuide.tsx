'use client'

import { useState, useMemo } from 'react'
import type { MeatCut } from '../../lib/meatCuts'

const CATEGORIES = ['All', 'Beef', 'Pork', 'Lamb', 'Poultry', 'Fish & Seafood', 'Game']

function toF(c: number) {
  return Math.round((c * 9) / 5 + 32)
}

export default function TemperatureGuide({ cuts }: { cuts: MeatCut[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [unit, setUnit] = useState<'C' | 'F'>('C')
  const [openCutId, setOpenCutId] = useState<string | null>(null)
  const [selectedDoneness, setSelectedDoneness] = useState<Record<string, number>>({})

  const filtered = useMemo(() => {
    return cuts.filter((cut) => {
      const matchesCategory = category === 'All' || cut.category === category
      const matchesQuery = cut.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [cuts, query, category])

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#F7F5F2' }}>
      {/* Search + unit toggle */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search a cut (e.g. brisket, chicken thigh)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            backgroundColor: '#2a2020',
            border: '1px solid #3a2a2a',
            borderRadius: '8px',
            padding: '0.65rem 1rem',
            color: '#F7F5F2',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
          }}
        />
        <button
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
          style={{
            backgroundColor: '#E85C2B',
            border: 'none',
            borderRadius: '8px',
            padding: '0.65rem 1.25rem',
            color: '#F7F5F2',
            fontFamily: 'Oswald, sans-serif',
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          °{unit} → °{unit === 'C' ? 'F' : 'C'}
        </button>
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              backgroundColor: category === c ? '#E85C2B' : '#2a2020',
              border: '1px solid #3a2a2a',
              borderRadius: '999px',
              padding: '0.4rem 0.9rem',
              color: category === c ? '#F7F5F2' : '#7A8F6A',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cut list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length === 0 && (
          <p style={{ color: '#7A8F6A', fontSize: '0.9rem' }}>No cuts match your search yet.</p>
        )}

        {filtered.map((cut) => {
          const isOpen = openCutId === cut._id
          const activeDonenessIndex = selectedDoneness[cut._id] ?? 0
          const activeDoneness = cut.doneness?.[activeDonenessIndex]

          return (
            <div
              key={cut._id}
              style={{
                backgroundColor: '#2a2020',
                border: '1px solid #3a2a2a',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenCutId(isOpen ? null : cut._id)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'Oswald, sans-serif',
                      fontSize: '1.15rem',
                      color: '#F7F5F2',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {cut.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7A8F6A', marginTop: '0.15rem' }}>
                    {cut.category}
                  </div>
                </div>
                <span style={{ color: '#E85C2B', fontSize: '1.25rem' }}>{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div style={{ padding: '0 1.5rem 1.5rem' }}>
                                    {/* Doneness selector — only shown when there's a real choice */}
                  {cut.doneness && cut.doneness.length > 1 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                      {cut.doneness.map((d, i) => (
                        <button
                          key={d.label + i}
                          onClick={() => setSelectedDoneness((prev) => ({ ...prev, [cut._id]: i }))}
                          style={{
                            backgroundColor: activeDonenessIndex === i ? '#B23A1B' : '#1F1F1F',
                            border: '1px solid #3a2a2a',
                            borderRadius: '8px',
                            padding: '0.5rem 0.9rem',
                            color: '#F7F5F2',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Single stated temp — no choice implied */}
                  {cut.doneness && cut.doneness.length === 1 && (
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#7A8F6A',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Target temperature
                    </p>
                  )}


                  {/* Coal-glow readout */}
                  {activeDoneness && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        backgroundColor: '#1F1F1F',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        style={{
                          width: '96px',
                          height: '96px',
                          borderRadius: '50%',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'radial-gradient(circle, #E85C2B 0%, #B23A1B 60%, #3a1a0f 100%)',
                          boxShadow: '0 0 30px 6px rgba(232, 92, 43, 0.45)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Oswald, sans-serif',
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            color: '#F7F5F2',
                          }}
                        >
                          {unit === 'C' ? activeDoneness.tempC : toF(activeDoneness.tempC)}°{unit}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <div
                          style={{
                            fontFamily: 'Oswald, sans-serif',
                            fontSize: '1rem',
                            color: '#EAD7C5',
                            marginBottom: '0.35rem',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {activeDoneness.label}
                        </div>
                        {activeDoneness.note && (
                          <p style={{ fontSize: '0.85rem', color: '#7A8F6A', margin: 0, lineHeight: 1.5 }}>
                            {activeDoneness.note}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {cut.notes && (
                    <p style={{ fontSize: '0.85rem', color: '#7A8F6A', marginTop: '1rem', lineHeight: 1.5 }}>
                      {cut.notes}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
