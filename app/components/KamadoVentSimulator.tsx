'use client'

import { useState, useMemo } from 'react'

const GLOW_POSITIONS = [
  { id: 'coal-glow-1', cx: 122, cy: 368, rx: 10, ry: 6 },
  { id: 'coal-glow-2', cx: 160, cy: 363, rx: 11, ry: 6 },
  { id: 'coal-glow-3', cx: 198, cy: 369, rx: 10, ry: 6 },
  { id: 'coal-glow-4', cx: 140, cy: 378, rx: 8, ry: 5 },
  { id: 'coal-glow-5', cx: 180, cy: 379, rx: 8, ry: 5 },
]

function computeState(intake: number, exhaust: number) {
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
    smokeColor = '#2C2C2A'
    smokeOpacity = 0.25
    smokeWidth = 4
    glowColor = '#444441'
    temp = 60
    fireStrength = 0.05
  } else if (i < 5) {
    flowLabel = 'Starved'
    burnLabel = 'Bitter, thick'
    explain =
      'Intake is closed, so the fire has almost no oxygen no matter how open the exhaust is. The coals burn incompletely, producing bitter, heavy smoke, and the fire will gradually die down and go out.'
    smokeColor = '#2C2C2A'
    smokeOpacity = Math.min(0.9, 0.5 + (e / 100) * 0.3)
    smokeWidth = 10
    glowColor = '#791F1F'
    temp = 90 + i * 2
    fireStrength = 0.1
  } else if (e < 5) {
    flowLabel = 'Choked'
    burnLabel = 'Smouldering'
    explain =
      'Exhaust is sealed shut, so even with oxygen coming in through the intake, combustion gases cannot escape. Pressure builds, the fire smoulders rather than burns cleanly, and heat will climb only slowly before stalling.'
    smokeColor = '#4A1B0C'
    smokeOpacity = 0.5
    smokeWidth = 8
    glowColor = '#D85A30'
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
      smokeColor = '#4A1B0C'
      smokeOpacity = Math.min(0.85, (0.6 - ratio) * 1.6 + 0.35)
      smokeWidth = 9
      glowColor = '#D85A30'
    } else if (ratio > 1.8) {
      flowLabel = 'Fast draw'
      burnLabel = 'Clean, thin'
      explain =
        'Exhaust is wide open relative to intake. Air is pulled through quickly. Intake still sets most of the heat ceiling, but extra exhaust opening does add a little more pull on top of that, often another 10 to 20 degrees.'
      smokeColor = '#E6F1FB'
      smokeOpacity = 0.4
      smokeWidth = 4
      glowColor = '#FAC775'
    } else {
      flowLabel = 'Balanced'
      burnLabel = 'Clean'
      explain =
        'Intake and exhaust are reasonably matched, so heat builds smoothly and the burn stays clean. Intake sets the ceiling, exhaust fine-tunes the draw.'
      smokeColor = '#B5D4F4'
      smokeOpacity = 0.55
      smokeWidth = 5
      glowColor = '#FAC775'
    }
  }

  const glowStrength = Math.max(0.1, fireStrength)
  const flameHeight = 14 + fireStrength * 80
  const topY = Math.max(296, 360 - flameHeight)
  const flameD = `M160,360 C138,350 142,322 160,${topY} C178,322 182,350 160,360 Z`
  const hue = 30 - Math.min(fireStrength * 100, 100) * 0.12
  const flameFill = `hsl(${Math.round(hue)}, 75%, ${Math.round(40 + fireStrength * 100 * 0.15)}%)`
  const flameOpacity = 0.15 + glowStrength * 0.75

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
  }
}

export default function KamadoVentSimulator() {
  const [intake, setIntake] = useState(50)
  const [exhaust, setExhaust] = useState(50)

  const state = useMemo(() => computeState(intake, exhaust), [intake, exhaust])

  const intakeFillWidth = (96 * intake) / 100
  const exhaustFillWidth = (96 * exhaust) / 100

  const presets = {
    low: () => {
      setIntake(10)
      setExhaust(30)
    },
    sear: () => {
      setIntake(100)
      setExhaust(100)
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

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-4 text-[#2c2c2a]">
      <h2 className="sr-only">
        Interactive Kamado Joe style BBQ diagram showing how the top exhaust vent and bottom
        intake vent control fire temperature, airflow and smoke colour
      </h2>

      <div className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 100 36" className="w-[120px]" role="img" aria-hidden="true">
          <rect x="2" y="2" width="96" height="32" rx="6" fill="#000000" />
          <rect x="2" y="2" width={exhaustFillWidth} height="32" rx="6" fill="#ffffff" />
          <rect x="2" y="2" width="96" height="32" rx="6" fill="none" stroke="#888780" strokeWidth={2} />
        </svg>
        <span className="text-sm text-[#5f5e5a]">
          Exhaust <span className="font-semibold text-[#2c2c2a]">{exhaust}%</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={exhaust}
          onChange={(ev) => setExhaust(parseInt(ev.target.value, 10))}
          className="w-40 accent-[#d85a30]"
        />
      </div>

      <svg viewBox="0 0 320 460" className="my-2 h-auto w-[240px]" role="img" aria-hidden="true">
        <path
          d="M148,80 C140,55 162,46 154,18 M160,82 C160,52 178,48 168,12 M172,80 C184,58 166,44 178,16"
          fill="none"
          stroke={state.smokeColor}
          strokeWidth={state.smokeWidth}
          strokeLinecap="round"
          opacity={state.smokeOpacity}
        />

        <rect x="145" y="66" width="30" height="22" rx="4" fill="#f1efe8" stroke="#888780" strokeWidth={2.5} />

        <path
          d="M50,260 C50,150 95,88 160,88 C225,88 270,150 270,260 L270,270 C270,276 264,280 258,280 L62,280 C56,280 50,276 50,270 Z"
          fill="#f1efe8"
          stroke="#888780"
          strokeWidth={3}
        />

        <path
          d="M44,282 C44,360 56,390 160,390 C264,390 276,360 276,282 Z"
          fill="#f1efe8"
          stroke="#888780"
          strokeWidth={3}
        />
        <line x1="46" y1="306" x2="274" y2="306" stroke="#d3d1c7" strokeWidth={2} />

        <rect x="-2" y="306" width="46" height="14" rx="3" fill="#f1efe8" stroke="#888780" strokeWidth={2.5} />
        <rect x="276" y="306" width="46" height="14" rx="3" fill="#f1efe8" stroke="#888780" strokeWidth={2.5} />

        <rect x="60" y="392" width="200" height="20" rx="4" fill="#f1efe8" stroke="#888780" strokeWidth={3} />
        <rect x="80" y="410" width="160" height="14" fill="#f1efe8" stroke="#888780" strokeWidth={2.5} />
        <circle cx="100" cy="438" r="16" fill="#5f5e5a" stroke="#888780" strokeWidth={2.5} />
        <circle cx="220" cy="438" r="16" fill="#5f5e5a" stroke="#888780" strokeWidth={2.5} />
        <circle cx="100" cy="438" r="5" fill="#f1efe8" />
        <circle cx="220" cy="438" r="5" fill="#f1efe8" />

        <defs>
          <clipPath id="firebox-clip">
            <rect x="50" y="310" width="220" height="78" />
          </clipPath>
        </defs>
        <g clipPath="url(#firebox-clip)">
          <path
            d="M90,382 l16,-10 14,5 12,-12 14,7 12,-7 16,9 12,-5 14,9 16,-7 12,9 v22 h-138 z"
            fill="#2C2C2A"
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
      </svg>

      <div className="flex flex-col items-center gap-1">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={intake}
          onChange={(ev) => setIntake(parseInt(ev.target.value, 10))}
          className="w-40 accent-[#d85a30]"
        />
        <span className="text-sm text-[#5f5e5a]">
          Intake <span className="font-semibold text-[#2c2c2a]">{intake}%</span>
        </span>
        <svg viewBox="0 0 100 36" className="w-[120px]" role="img" aria-hidden="true">
          <rect x="2" y="2" width="96" height="32" rx="6" fill="#000000" />
          <rect x="2" y="2" width={intakeFillWidth} height="32" rx="6" fill="#ffffff" />
          <rect x="2" y="2" width="96" height="32" rx="6" fill="none" stroke="#888780" strokeWidth={2} />
        </svg>
      </div>

      <div className="mt-6 grid w-full grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
        <div className="rounded-lg bg-[#f1efe8] p-4">
          <p className="m-0 mb-1 text-sm text-[#5f5e5a]">Dome temp</p>
          <p className="m-0 text-2xl font-medium">{state.temp}C</p>
        </div>
        <div className="rounded-lg bg-[#f1efe8] p-4">
          <p className="m-0 mb-1 text-sm text-[#5f5e5a]">Airflow</p>
          <p className="m-0 text-2xl font-medium">{state.flowLabel}</p>
        </div>
        <div className="rounded-lg bg-[#f1efe8] p-4">
          <p className="m-0 mb-1 text-sm text-[#5f5e5a]">Smoke</p>
          <p className="m-0 text-2xl font-medium">{state.burnLabel}</p>
        </div>
      </div>

      <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-[#5f5e5a]">
        {state.explain}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={presets.low}
          className="rounded-lg border border-[#b4b2a9] px-3.5 py-2 text-sm hover:bg-[#f1efe8]"
        >
          Low and slow
        </button>
        <button
          type="button"
          onClick={presets.sear}
          className="rounded-lg border border-[#b4b2a9] px-3.5 py-2 text-sm hover:bg-[#f1efe8]"
        >
          High-heat sear
        </button>
        <button
          type="button"
          onClick={presets.choke}
          className="rounded-lg border border-[#b4b2a9] px-3.5 py-2 text-sm hover:bg-[#f1efe8]"
        >
          Exhaust choked
        </button>
        <button
          type="button"
          onClick={presets.starved}
          className="rounded-lg border border-[#b4b2a9] px-3.5 py-2 text-sm hover:bg-[#f1efe8]"
        >
          Intake closed
        </button>
      </div>
    </div>
  )
}