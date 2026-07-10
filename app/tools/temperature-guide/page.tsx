'use client'

import { useState, useMemo } from 'react'
import type { MeatCut, Doneness } from '../../lib/meatCuts'

const CATEGORIES = ['All', 'Beef', 'Pork', 'Lamb', 'Poultry', 'Fish & Seafood', 'Game']
const DEFAULT_REST_RISE_C = 3

function toF(c: number) {
  return Math.round((c * 9) / 5 + 32)
}

function displayTemp(tempC: number, unit: 'C' | 'F') {
  return unit === 'C' ? Math.round(tempC) : toF(tempC)
}

// Interpolates between two hex colours (0 = colorA, 1 = colorB)
function lerpColor(colorA: string, colorB: string, t: number) {
  const a = colorA.match(/\w\w/g)!.map((x) => parseInt(x, 16))
  const b = colorB.match(/\w\w/g)!.map((x) => parseInt(x, 16))
  const rgb = a.map((c, i) => Math.round(c + (b[i] - c) * t))
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

// Maps a temperature to a brand-coloured bar: Warm Sand (cool) -> Ember Orange -> Clay Red (well done)
function doneColor(tempC: number) {
  const SAND = 'EAD7C5'
  const EMBER = 'E85C2B'
  const CLAY = 'B23A1B'
  const clamped = Math.max(45, Math.min(100, tempC))
  if (clamped <= 70) {
    const t = (clamped - 45) / (70 - 45)
    return lerpColor(SAND, EMBER, t)
  }
  const t = (clamped - 70) / (100 - 70)
  return lerpColor(EMBER, CLAY, t)
}

export default function TemperatureGuide({ cuts }: { cuts: MeatCut[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [unit, setUnit] = useState<'C' | 'F'>('C')
  const [openCutId, setOpenCutId] = useState<string | null>(null)
  const [selectedDoneness, setSelectedDoneness] = useState<Record<string, number>>({})
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())

  const toggleGroup = (cat: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const filtered = useMemo(() => {
    return cuts.filter((cut) => {
      const matchesCategory = category === 'All' || cut.category === category
      const matchesQuery = cut.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [cuts, query, category])

  // Group cuts by category. When a specific category is selected there's only
  // one group; when "All" is selected, group in the fixed CATEGORIES order.
  const groups = useMemo(() => {
    const groupOrder = category === 'All' ? CATEGORIES.slice(1) : [category]
    return groupOrder
      .map((cat) => ({
        category: cat,
        items: filtered.filter((cut) => cut.category === cat),
      }))
      .filter((g) => g.items.length > 0)
  }, [filtered, category])

  // A group shows its cuts if manually opened, or automatically while the
  // person is searching or has narrowed to a single category (nothing to
  // hide in that case).
  const isGroupExpanded = (cat: string) =>
    openGroups.has(cat) || query.trim() !== '' || category !== 'All'

  const renderCut = (cut: MeatCut) => {
    const isOpen = openCutId === cut._id
    const hasChoice = cut.doneness && cut.doneness.length > 1
    const activeIndex = selectedDoneness[cut._id] ?? 0
    const activeDoneness: Doneness | undefined = cut.doneness?.[activeIndex]

    const temps = cut.doneness?.map((d) => d.tempC) ?? []
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)
    const rulerMin = minTemp - 5
    const rulerMax = maxTemp + 5
    const rulerPct = activeDoneness
      ? Math.max(0, Math.min(100, ((activeDoneness.tempC - rulerMin) / (rulerMax - rulerMin)) * 100))
      : 0

    // Carryover cooking: only relevant for cuts with a real doneness choice
    // (steaks, roasts). Never suggested for single-target safety cuts
    // (poultry, ground meat) — those must be cooked to temp, not rested to it.
    const restRise = cut.restRiseC ?? DEFAULT_REST_RISE_C
    const pullTempC = activeDoneness ? activeDoneness.tempC - restRise : undefined

    const goToIndex = (i: number) => {
      const clamped = Math.max(0, Math.min((cut.doneness?.length ?? 1) - 1, i))
      setSelectedDoneness((prev) => ({ ...prev, [cut._id]: clamped }))
    }

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

        {isOpen && activeDoneness && (
          <div style={{ padding: '0 1.5rem 1.5rem' }}>
            {/* Eyebrow — currently selected doneness label */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#E85C2B',
                textAlign: 'center',
                margin: '0.5rem 0 0.25rem',
              }}
            >
              {activeDoneness.label}
            </p>

            {/* Big numeral readout with chevrons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                padding: '0.5rem 0 1rem',
              }}
            >
              <button
                onClick={() => goToIndex(activeIndex - 1)}
                disabled={!hasChoice || activeIndex === 0}
                aria-label="Lower doneness"
                style={{
                  background: 'none',
                  border: 'none',
                  color: !hasChoice || activeIndex === 0 ? '#3a2a2a' : '#7A8F6A',
                  fontSize: '1.75rem',
                  cursor: !hasChoice || activeIndex === 0 ? 'default' : 'pointer',
                  padding: '0.5rem',
                  lineHeight: 1,
                }}
              >
                ‹
              </button>

              <span
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: '#F7F5F2',
                  minWidth: '160px',
                  textAlign: 'center',
                  lineHeight: 1,
                }}
              >
                {displayTemp(activeDoneness.tempC, unit)}
                <span style={{ fontSize: '1.75rem', color: '#E85C2B', verticalAlign: 'top' }}>°{unit}</span>
              </span>

              <button
                onClick={() => goToIndex(activeIndex + 1)}
                disabled={!hasChoice || activeIndex === (cut.doneness?.length ?? 1) - 1}
                aria-label="Higher doneness"
                style={{
                  background: 'none',
                  border: 'none',
                  color:
                    !hasChoice || activeIndex === (cut.doneness?.length ?? 1) - 1 ? '#3a2a2a' : '#7A8F6A',
                  fontSize: '1.75rem',
                  cursor:
                    !hasChoice || activeIndex === (cut.doneness?.length ?? 1) - 1 ? 'default' : 'pointer',
                  padding: '0.5rem',
                  lineHeight: 1,
                }}
              >
                ›
              </button>
            </div>

            {/* Carryover cooking guidance — only for genuine doneness choices */}
            {hasChoice && pullTempC !== undefined && (
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: '#7A8F6A',
                  textAlign: 'center',
                  margin: '0 0 1rem',
                }}
              >
                Remove from heat at{' '}
                <span style={{ color: '#EAD7C5', fontWeight: 600 }}>
                  {displayTemp(pullTempC, unit)}°{unit}
                </span>{' '}
                — it will rise to {displayTemp(activeDoneness.tempC, unit)}°{unit} while resting
              </p>
            )}

            {/* Ruler with pointer — only when there's a real range */}
            {hasChoice && (
              <div style={{ margin: '0 0.5rem 1.5rem' }}>
                <div style={{ position: 'relative', height: '14px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: `${rulerPct}%`,
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: '8px solid #E85C2B',
                    }}
                  />
                </div>
                <div
                  style={{
                    height: '4px',
                    borderRadius: '999px',
                    background: `linear-gradient(to right, ${doneColor(rulerMin)}, ${doneColor(rulerMax)})`,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.4rem',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.7rem',
                    color: '#7A8F6A',
                  }}
                >
                  <span>{displayTemp(rulerMin, unit)}°</span>
                  <span>{displayTemp(rulerMax, unit)}°</span>
                </div>
              </div>
            )}

            {/* Doneness rows — only when there's a real choice */}
            {hasChoice ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cut.doneness.map((d, i) => {
                  const selected = i === activeIndex
                  return (
                    <button
                      key={d.label + i}
                      onClick={() => goToIndex(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        width: '100%',
                        backgroundColor: selected ? 'rgba(232, 92, 43, 0.14)' : '#1F1F1F',
                        border: selected ? '1px solid #E85C2B' : '1px solid #3a2a2a',
                        borderRadius: '8px',
                        padding: '0.65rem 0.9rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          width: '5px',
                          alignSelf: 'stretch',
                          borderRadius: '999px',
                          backgroundColor: doneColor(d.tempC),
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'Oswald, sans-serif',
                          fontSize: '0.95rem',
                          color: '#F7F5F2',
                          flex: 1,
                        }}
                      >
                        {d.label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.9rem',
                          color: '#7A8F6A',
                        }}
                      >
                        {displayTemp(d.tempC, unit)}°{unit}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#7A8F6A',
                  textAlign: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                Target temperature
              </p>
            )}

            {activeDoneness.note && (
              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#7A8F6A',
                  marginTop: '1rem',
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}
              >
                {activeDoneness.note}
              </p>
            )}

            {cut.notes && (
              <p style={{ fontSize: '0.85rem', color: '#7A8F6A', marginTop: '0.75rem', lineHeight: 1.5 }}>
                {cut.notes}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#F7F5F2' }}>
      {/* Search + unit toggle */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Search a cut (e.g. brisket, chicken thigh)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#2a2020',
              border: '1px solid #3a2a2a',
              borderRadius: '8px',
              padding: '0.65rem 2.5rem 0.65rem 1rem',
              color: '#F7F5F2',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              boxSizing: 'border-box',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              style={{
                position: 'absolute',
                right: '0.6rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#7A8F6A',
                fontSize: '1.1rem',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>
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

      {/* Cut list — grouped by category, collapsible */}
      {filtered.length === 0 && (
        <p style={{ color: '#7A8F6A', fontSize: '0.9rem' }}>No cuts match your search yet.</p>
      )}

      {groups.map((group) => {
        const expanded = isGroupExpanded(group.category)
        const canToggle = query.trim() === '' && category === 'All'

        return (
          <div key={group.category} style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => canToggle && toggleGroup(group.category)}
              disabled={!canToggle}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: canToggle ? 'pointer' : 'default',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <h3
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    fontSize: '1rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#EAD7C5',
                    margin: 0,
                  }}
                >
                  {group.category}
                </h3>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#7A8F6A' }}>
                  {group.items.length}
                </span>
              </div>
              {canToggle && (
                <span style={{ color: '#E85C2B', fontSize: '1.1rem' }}>{expanded ? '−' : '+'}</span>
              )}
            </button>
            <div style={{ width: '2.5rem', height: '2px', backgroundColor: '#E85C2B', marginBottom: expanded ? '0.9rem' : 0 }} />

            {expanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {group.items.map((cut) => renderCut(cut))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}