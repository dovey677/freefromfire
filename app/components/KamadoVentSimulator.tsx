'use client'

import { useState, useMemo } from 'react'

type Deflector = 'none' | 'single' | 'double'

const GLOW_POSITIONS = [
  { id: 'coal-glow-1', cx: 122, cy: 288, rx: 10, ry: 6 },
  { id: 'coal-glow-2', cx: 160, cy: 283, rx: 11, ry: 6 },
  { id: 'coal-glow-3', cx: 198, cy: 289, rx: 10, ry: 6 },
  { id: 'coal-glow-4', cx: 140, cy: 298, rx: 8, ry: 5 },
  { id: 'coal-glow-5', cx: 180, cy: 299, rx: 8, ry: 5 },
]

function computeState(intake: number, exhaust: number, deflector: Deflector) {
  const i = intake
  const e = exhaust

  let flowLabel: string
  let burnLabel: string
  let explain: string
  let smokeColor: string
  let smokeOpacity: number
  let smokeWidth: number
  let glowColor: string
  let temp: number
  let fireStrength: number

  if (i < 5 && e < 5) {
    flowLabel = 'Sealed'
    burnLabel = 'Suffocating'
    explain =
      'Both vents are closed. No oxygen is reaching the coals, so the fire will smoulder and go out. This is how you shut a kamado down after a cook.'
    smokeColor = '#3A3A38'
    smokeOpacity = 0.3
    smokeWidth = 4
    glowColor = '#5A5A56'
    temp = 60
    fireStrength = 0.05
  } else if (i < 5) {
    flowLabel = 'Starved'
    burnLabel = 'Bitter, thick'
    explain =
      'Intake is closed, so the fire has almost no oxygen no matter how open the exhaust is. The coals burn incompletely, producing bitter, heavy smoke, and the fire will gradually die down and go out.'
    smokeColor = '#3A3A38'
    smokeOpacity = Math.min(0.9, 0.5 + (e / 100) * 0.3)
    smokeWidth = 10
    glowColor = '#B23A1B'
    temp = 90 + i * 2
    fireStrength = 0.1
  } else if (e < 5) {
    flowLabel = 'Choked'
    burnLabel = 'Smouldering'
    explain =
      'Exhaust is sealed shut, so even with oxygen coming in through the intake, combustion gases cannot escape. Pressure builds, the fire smoulders rather than burns cleanly, and heat will climb only slowly before stalling.'
    smokeColor = '#5C2C16'
    smokeOpacity = 0.5
    smokeWidth = 8
    glowColor = '#E85C2B'
    temp = 100 + i * 1.2
    fireStrength = Math.max(0.2, (i / 100) * 0.5)
  } else {
    const ratio = e / i
    const exhaustBonus = Math.max(0, e - i) * 0.15
    temp = 100 + i * 3.5 + exhaustBonus
    fireStrength = Math.min(i, e) / 100

    if (ratio < 0.6) {
      flowLabel = 'Bottlenecked'
      burnLabel = 'Thick, sooty'
      explain =
        'Exhaust is more closed than intake. Air gets in but struggles to leave, so heat builds slower than the intake setting suggests and smoke lingers, giving more smoke flavour but risking a sooty, incomplete burn if pushed too far.'
      smokeColor = '#5C2C16'
      smokeOpacity = Math.min(0.85, (0.6 - ratio) * 1.6 + 0.35)
      smokeWidth = 9
      glowColor = '#E85C2B'
    } else if (ratio > 1.8) {
      flowLabel = 'Fast draw'
      burnLabel = 'Clean, thin'
      explain =
        'Exhaust is wide open relative to intake. Air is pulled through quickly. Intake still sets most of the heat ceiling, but extra exhaust opening does add a little more pull on top of that, often another 10 to 20 degrees.'
      smokeColor = '#EAD7C5'
      smokeOpacity = 0.45
      smokeWidth = 4
      glowColor = '#F0A04B'
    } else {
      flowLabel = 'Balanced'
      burnLabel = 'Clean'
      explain =
        'Intake and exhaust are reasonably matched, so heat builds smoothly and the burn stays clean. Intake sets the ceiling, exhaust fine-tunes the draw.'
      smokeColor = '#D9C9B8'
      smokeOpacity = 0.55
      smokeWidth = 5
      glowColor = '#F0A04B'
    }
  }

  let deflectorCeiling: number | null = null
  if (deflector === 'single') deflectorCeiling = 220
  if (deflector === 'double') deflectorCeiling = 150

  const cappedByDeflector = deflectorCeiling !== null && temp > deflectorCeiling
  if (deflectorCeiling !== null) {
    temp = Math.min(temp, deflectorCeiling)
  }

  const glowStrength = Math.max(0.15, fireStrength)
  const flameHeight = 14 + fireStrength * 80
  const topY = Math.max(216, 280 - flameHeight)
  const flameD = `M160,280 C138,270 142,242 160,${topY} C178,242 182,270 160,280 Z`
  const hue = 22 - Math.min(fireStrength * 100, 100) * 0.08
  const flameFill = `hsl(${Math.round(hue)}, 80%, ${Math.round(45 + fireStrength * 100 * 0.15)}%)`
  const flameOpacity = 0.2 + glowStrength * 0.75

  return {
    flowLabel,
    burnLabel,
    explain,
    smokeColor,
    smokeOpacity,
    smokeWidth,
    glowColor,
    glowStrength,
    temp: Math.round(temp),
    flameD,
    flameFill,
    flameOpacity,
    cappedByDeflector,
  }
}

const buttonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid #E85C2B',
  borderRadius: 8,
  padding: '8px 14px',
  fontSize: 13,
  fontFamily: 'Inter, sans-serif',
  cursor: 'pointer',
  color: '#EAD7C5',
}

export default function KamadoVentSimulator() {
  const [intake, setIntake] = useState(50)
  const [exhaust, setExhaust] = useState(50)
  const [deflector, setDeflector] = useState<Deflector>('none')
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C')

  const state = useMemo(() => computeState(intake, exhaust, deflector), [intake, exhaust, deflector])
  const displayTemp = tempUnit === 'C' ? state.temp : Math.round((state.temp * 9) / 5 + 32)

  const chimneyFillWidth = (54 * exhaust) / 100 // fits inside the 60-wide chimney cap
  const baseFillWidth = (60 * intake) / 100 // fits inside the 68-wide base vent slot

  const presets = {
    low: () => {
      setIntake(10)
      setExhaust(30)
    },
    sear: () => {
      setIntake(100)
      setExhaust(100)
      setDeflector('none')
    },
    choke: () => {
      setIntake(80)
      setExhaust(15)
    },
    starved: () => {
      setIntake(0)
      setExhaust(80)
    },
  }

  const deflectorOptions: { id: Deflector; label: string }[] = [
    { id: 'none', label: 'Direct' },
    { id: 'single', label: 'Indirect' },
    { id: 'double', label: 'Double indirect' },
  ]

  return (
    <section style={{ backgroundColor: '#1F1F1F', padding: '1.5rem 1.25rem', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: 420,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Inter, sans-serif',
          color: '#F7F5F2',
        }}
      >
        <h2 className="sr-only">
          Interactive Kamado Joe style BBQ diagram showing how the top exhaust vent and bottom
          intake vent control fire temperature, airflow and smoke colour
        </h2>

        <div style={{ width: '100%', maxWidth: 320, marginBottom: '1.25rem' }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#7A8F6A',
              textAlign: 'center',
              margin: '0 0 6px',
            }}
          >
            Grill setup
          </p>
          <div style={{ display: 'flex', backgroundColor: '#141414', borderRadius: 10, padding: 4, gap: 4 }}>
            {deflectorOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDeflector(opt.id)}
                style={{
                  flex: 1,
                  padding: '8px 6px',
                  borderRadius: 7,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: deflector === opt.id ? 600 : 400,
                  backgroundColor: deflector === opt.id ? '#E85C2B' : 'transparent',
                  color: deflector === opt.id ? '#1F1F1F' : '#C9C6BF',
                  transition: 'background-color 0.15s, color 0.15s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 320, marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A8F6A' }}>
              Top vent
            </span>
            <span style={{ fontSize: 13, color: '#C9C6BF' }}>
              <span style={{ fontWeight: 600, color: '#F7F5F2' }}>{exhaust}%</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={exhaust}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setExhaust(parseInt(ev.target.value, 10))}
            style={{ width: '100%', accentColor: '#E85C2B' }}
          />
        </div>

        <svg viewBox="0 -20 320 390" style={{ width: 280, height: 'auto', margin: '0.5rem 0' }} role="img" aria-hidden="true">
          <path
            d="M148,80 C140,55 162,46 154,18 M160,82 C160,52 178,48 168,12 M172,80 C184,58 166,44 178,16"
            fill="none"
            stroke={state.smokeColor}
            strokeWidth={state.smokeWidth}
            strokeLinecap="round"
            opacity={state.smokeOpacity}
          />

          <rect x="130" y="66" width="60" height="22" rx="4" fill="#2A2A28" stroke="#5A5A56" strokeWidth={2.5} />
          <rect x="133" y="70" width={chimneyFillWidth} height="14" rx="2" fill="#EAD7C5" opacity={0.85} />

          <path
            d="M50,188 C50,124 95,88 160,88 C225,88 270,124 270,188 L270,194 C270,198 264,200 258,200 L62,200 C56,200 50,198 50,194 Z"
            fill="#2A2A28"
            stroke="#5A5A56"
            strokeWidth={3}
          />

          <path
            d="M44,200 C44,294 56,330 160,330 C264,330 276,294 276,200 Z"
            fill="#2A2A28"
            stroke="#5A5A56"
            strokeWidth={3}
          />
          <line x1="46" y1="226" x2="274" y2="226" stroke="#5A5A56" strokeWidth={2} />

          <rect x="-2" y="226" width="46" height="14" rx="3" fill="#2A2A28" stroke="#5A5A56" strokeWidth={2.5} />
          <rect x="276" y="226" width="46" height="14" rx="3" fill="#2A2A28" stroke="#5A5A56" strokeWidth={2.5} />

          <rect x="126" y="308" width="68" height="18" rx="4" fill="#2A2A28" stroke="#5A5A56" strokeWidth={3} />
          <rect x="130" y="311" width={baseFillWidth} height="12" rx="2" fill="#EAD7C5" opacity={0.85} />
          <rect x="80" y="330" width="160" height="14" fill="#2A2A28" stroke="#5A5A56" strokeWidth={2.5} />
          <circle cx="100" cy="358" r="16" fill="#3A3A38" stroke="#5A5A56" strokeWidth={2.5} />
          <circle cx="220" cy="358" r="16" fill="#3A3A38" stroke="#5A5A56" strokeWidth={2.5} />
          <circle cx="100" cy="358" r="5" fill="#2A2A28" />
          <circle cx="220" cy="358" r="5" fill="#2A2A28" />

          <defs>
            <clipPath id="firebox-clip">
              <rect x="50" y="230" width="220" height="78" />
            </clipPath>
          </defs>
          <g clipPath="url(#firebox-clip)">
            <path
              d="M90,302 l16,-10 14,5 12,-12 14,7 12,-7 16,9 12,-5 14,9 16,-7 12,9 v22 h-138 z"
              fill="#15140F"
            />
            {GLOW_POSITIONS.map((g) => (
              <ellipse
                key={g.id}
                cx={g.cx}
                cy={g.cy}
                rx={g.rx}
                ry={g.ry}
                fill={state.glowColor}
                opacity={state.glowStrength}
              />
            ))}
            <path d={state.flameD} fill={state.flameFill} opacity={state.flameOpacity} />
          </g>
          <line x1="88" y1="308" x2="232" y2="308" stroke="#5A5A56" strokeWidth={2} opacity={0.7} />

          {deflector !== 'none' && (
            <rect x="54" y="232" width="212" height="9" rx="3" fill="#3A3A38" stroke="#7A8F6A" strokeWidth={1.5} />
          )}
          {deflector === 'double' && (
            <rect x="54" y="216" width="212" height="9" rx="3" fill="#3A3A38" stroke="#7A8F6A" strokeWidth={1.5} />
          )}
        </svg>

        <div style={{ width: '100%', maxWidth: 320, marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A8F6A' }}>
              Bottom vent
            </span>
            <span style={{ fontSize: 13, color: '#C9C6BF' }}>
              <span style={{ fontWeight: 600, color: '#F7F5F2' }}>{intake}%</span>
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={intake}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setIntake(parseInt(ev.target.value, 10))}
            style={{ width: '100%', accentColor: '#E85C2B' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: 340,
              backgroundColor: '#241811',
              borderRadius: 12,
              border: '1px solid #3A2A1E',
              borderTop: '3px solid #E85C2B',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, textAlign: 'center', padding: '14px 6px' }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C48A5A',
                  margin: '0 0 6px',
                }}
              >
                Temperature
              </p>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: 'Oswald, sans-serif', color: '#F7F5F2' }}>
                {displayTemp}°{tempUnit}
              </p>
            </div>

            <div style={{ flex: 1, textAlign: 'center', padding: '14px 6px', borderLeft: '1px solid #3A2A1E' }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C48A5A',
                  margin: '0 0 6px',
                }}
              >
                Airflow
              </p>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: 'Oswald, sans-serif', color: '#F7F5F2' }}>
                {state.flowLabel}
              </p>
            </div>

            <div style={{ flex: 1, textAlign: 'center', padding: '14px 6px', borderLeft: '1px solid #3A2A1E' }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C48A5A',
                  margin: '0 0 6px',
                }}
              >
                Smoke
              </p>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, fontFamily: 'Oswald, sans-serif', color: '#F7F5F2' }}>
                {state.burnLabel}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 8 }}>
            {(['C', 'F'] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setTempUnit(unit)}
                style={{
                  border: 'none',
                  borderRadius: 5,
                  padding: '3px 10px',
                  fontSize: 11,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: tempUnit === unit ? 600 : 400,
                  cursor: 'pointer',
                  backgroundColor: tempUnit === unit ? '#E85C2B' : '#141414',
                  color: tempUnit === unit ? '#1F1F1F' : '#C9C6BF',
                }}
              >
                °{unit}
              </button>
            ))}
          </div>
        </div>

        <p
          style={{
            margin: '0.6rem 0 0',
            fontSize: 13,
            lineHeight: 1.5,
            textAlign: 'center',
            color: '#C9C6BF',
            maxWidth: 400,
          }}
        >
          {state.explain}
        </p>

        {state.cappedByDeflector && (
          <p
            style={{
              margin: '0.4rem 0 0',
              fontSize: 12,
              lineHeight: 1.5,
              textAlign: 'center',
              color: '#7A8F6A',
              maxWidth: 400,
            }}
          >
            Vent settings alone would run hotter here, but the deflector plate{deflector === 'double' ? 's' : ''} limit
            the air gap to the grate, capping the ceiling. This assumes plates sized correctly for your grill —
            undersized or ill-fitting plates leave gaps at the edges and won't cap heat as tightly.
          </p>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.8rem' }}>
          <button type="button" onClick={presets.low} style={buttonStyle}>
            Low and slow
          </button>
          <button type="button" onClick={presets.sear} style={buttonStyle}>
            High-heat sear
          </button>
          <button type="button" onClick={presets.choke} style={buttonStyle}>
            Exhaust choked
          </button>
          <button type="button" onClick={presets.starved} style={buttonStyle}>
            Intake closed
          </button>
        </div>
      </div>
    </section>
  )
}
