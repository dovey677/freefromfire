'use client'

export default function HeatZones() {
  return (
    <section style={{ backgroundColor: '#1F1F1F', padding: '0rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '0rem', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '2rem',
            color: '#F7F5F2',
            letterSpacing: '0.05em',
            margin: '0 0 0.25rem',
            textTransform: 'uppercase',
          }}>
            Zone BBQ Cooking
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            color: '#7A8F6A',
            margin: '0rem',
          }}>
            Direct &amp; indirect heat — control is everything
          </p>
        </div>

        {/* SVG diagram */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0rem' }}>
          <svg
            width="100%"
            viewBox="0 0 680 420"
            role="img"
            aria-label="BBQ zone cooking diagram showing direct heat on the left with coals and indirect heat on the right with food"
            style={{ display: 'block', maxWidth: '800px' }}
          >
            <defs>
              <marker id="fff-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <radialGradient id="fff-coal-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E85C2B" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#E85C2B" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="fff-indirect-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EAD7C5" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#EAD7C5" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="fff-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a2a27"/>
                <stop offset="100%" stopColor="#1a1a18"/>
              </linearGradient>
              <linearGradient id="fff-food" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B23A1B"/>
                <stop offset="100%" stopColor="#8a2e14"/>
              </linearGradient>
            </defs>

            <style>{`
              @keyframes fff-flicker1 { 0%,100%{opacity:1;transform:scaleY(1)} 50%{opacity:.82;transform:scaleY(.91)} }
              @keyframes fff-flicker2 { 0%,100%{opacity:.88;transform:scaleY(1)} 40%{opacity:.68;transform:scaleY(.87)} }
              @keyframes fff-rise { 0%{opacity:.65;transform:translateY(0)} 100%{opacity:0;transform:translateY(-20px)} }
              @keyframes fff-pulse { 0%,100%{opacity:.15} 50%{opacity:.28} }
              .fff-f1 { animation: fff-flicker1 .7s ease-in-out infinite; transform-origin: 50% 100%; }
              .fff-f2 { animation: fff-flicker2 .55s ease-in-out infinite .12s; transform-origin: 50% 100%; }
              .fff-s1 { animation: fff-rise 2s ease-out infinite; }
              .fff-s2 { animation: fff-rise 2.5s ease-out infinite .8s; }
              .fff-s3 { animation: fff-rise 1.9s ease-out infinite 1.5s; }
              .fff-glow { animation: fff-pulse 3s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) {
                .fff-f1,.fff-f2,.fff-s1,.fff-s2,.fff-s3,.fff-glow { animation: none; }
              }
            `}</style>

            {/* Drum body */}
            <rect x="80" y="60" width="520" height="260" rx="18" fill="url(#fff-body)" stroke="#3a3a36" strokeWidth="1.5"/>
            <rect x="94" y="74" width="492" height="232" rx="12" fill="#111111"/>

            {/* Intake vent — left wall, low */}
            <rect x="80" y="268" width="14" height="34" rx="3" fill="#1a1a18" stroke="#444" strokeWidth="1"/>
            <line x1="80" y1="276" x2="94" y2="276" stroke="#444" strokeWidth="1"/>
            <line x1="80" y1="284" x2="94" y2="284" stroke="#444" strokeWidth="1"/>
            <line x1="80" y1="292" x2="94" y2="292" stroke="#444" strokeWidth="1"/>
            <path d="M46 285 L78 285" fill="none" stroke="#E85C2B" strokeWidth="1.5" markerEnd="url(#fff-arr)" opacity="0.75"/>
            <text x="43" y="275" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="10" fill="#7A8F6A" letterSpacing="0.04em">INTAKE</text>
            <text x="43" y="302" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#555">Use for</text>
            <text x="43" y="313" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#555">temp control</text>

            {/* Exhaust vent — right wall, high */}
            <rect x="586" y="78" width="14" height="34" rx="3" fill="#1a1a18" stroke="#444" strokeWidth="1"/>
            <line x1="586" y1="86" x2="600" y2="86" stroke="#444" strokeWidth="1"/>
            <line x1="586" y1="94" x2="600" y2="94" stroke="#444" strokeWidth="1"/>
            <line x1="586" y1="102" x2="600" y2="102" stroke="#444" strokeWidth="1"/>
            <path d="M602 95 L632 95" fill="none" stroke="#E85C2B" strokeWidth="1.5" markerEnd="url(#fff-arr)" opacity="0.75"/>
            <text x="638" y="86" textAnchor="start" fontFamily="Oswald, sans-serif" fontSize="10" fill="#7A8F6A" letterSpacing="0.04em">EXHAUST</text>
            <text x="638" y="104" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="10" fill="#555">Fully open</text>

            {/* Grill grate */}
            <line x1="94" y1="175" x2="586" y2="175" stroke="#333" strokeWidth="2"/>
            {[120,160,200,240,280,320,360,400,440,480,520,560].map(x => (
              <line key={x} x1={x} y1="166" x2={x} y2="184" stroke="#2a2a2a" strokeWidth="1"/>
            ))}

            {/* Centre divider */}
            <line x1="340" y1="74" x2="340" y2="306" stroke="#333" strokeWidth="1.5" strokeDasharray="5 4"/>

            {/* DIRECT HEAT ZONE */}
            <ellipse cx="215" cy="295" rx="115" ry="35" fill="url(#fff-coal-glow)" className="fff-glow"/>
            <ellipse cx="148" cy="304" rx="36" ry="13" fill="#2a1a0a"/>
            <ellipse cx="148" cy="304" rx="26" ry="8" fill="#7a3008"/>
            <ellipse cx="148" cy="304" rx="16" ry="5" fill="#B23A1B" opacity="0.85"/>
            <ellipse cx="200" cy="300" rx="42" ry="15" fill="#2a1a0a"/>
            <ellipse cx="200" cy="300" rx="30" ry="9" fill="#7a3008"/>
            <ellipse cx="200" cy="300" rx="20" ry="6" fill="#B23A1B" opacity="0.9"/>
            <ellipse cx="258" cy="302" rx="38" ry="14" fill="#2a1a0a"/>
            <ellipse cx="258" cy="302" rx="28" ry="9" fill="#7a3008"/>
            <ellipse cx="258" cy="302" rx="18" ry="6" fill="#B23A1B" opacity="0.85"/>
            <g className="fff-f1">
              <path d="M195,282 Q201,258 210,268 Q215,246 224,282Z" fill="#E85C2B" opacity="0.9"/>
              <path d="M200,282 Q207,262 215,272 Q219,252 227,282Z" fill="#EAD7C5" opacity="0.5"/>
            </g>
            <g className="fff-f2">
              <path d="M152,290 Q157,270 165,279 Q169,262 177,290Z" fill="#E85C2B" opacity="0.85"/>
            </g>
            <g className="fff-f1" style={{animationDelay:'0.3s'}}>
              <path d="M251,288 Q256,269 264,277 Q268,262 275,288Z" fill="#E85C2B" opacity="0.8"/>
            </g>
            <ellipse className="fff-s1" cx="203" cy="262" rx="5" ry="4" fill="#3a3a36" opacity="0.6"/>
            <ellipse className="fff-s2" cx="218" cy="252" rx="4" ry="3" fill="#3a3a36" opacity="0.4"/>
            <ellipse className="fff-s3" cx="158" cy="268" rx="4" ry="3" fill="#3a3a36" opacity="0.4"/>
            <rect x="96" y="80" width="228" height="43" rx="6" fill="#E85C2B" opacity="0.1"/>
            <text x="210" y="100" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="14" fill="#E85C2B" letterSpacing="0.06em">DIRECT HEAT</text>
            <text x="210" y="116" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#B23A1B">High temp · sear · colour · crisp</text>
            <text x="210" y="148" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="20" fill="#E85C2B" opacity="0.8"> ~250°C - 500°C</text>

            {/* INDIRECT HEAT ZONE */}
            <ellipse cx="463" cy="195" rx="125" ry="100" fill="url(#fff-indirect-glow)" className="fff-glow"/>
            <rect x="398" y="272" width="148" height="25" rx="5" fill="#0d2035" stroke="#1a3a55" strokeWidth="1"/>
            <text x="472" y="288" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#3a6a8a">water tray</text>
            <path className="fff-s1" d="M432,272 Q435,260 430,250" stroke="#2a5a7a" strokeWidth="1" fill="none" opacity="0.5"/>
            <path className="fff-s2" d="M455,272 Q458,258 453,247" stroke="#2a5a7a" strokeWidth="1" fill="none" opacity="0.4"/>
            <path className="fff-s3" d="M498,272 Q501,259 496,248" stroke="#2a5a7a" strokeWidth="1" fill="none" opacity="0.4"/>
            <ellipse cx="460" cy="170" rx="62" ry="18" fill="url(#fff-food)" stroke="#6a2010" strokeWidth="1"/>
            <ellipse cx="460" cy="165" rx="56" ry="15" fill="#9a3218"/>
            <ellipse cx="460" cy="162" rx="46" ry="11" fill="#aa3e20" opacity="0.7"/>
            <line x1="439" y1="157" x2="441" y2="172" stroke="#6a2010" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <line x1="456" y1="155" x2="458" y2="171" stroke="#6a2010" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <line x1="473" y1="156" x2="475" y2="172" stroke="#6a2010" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            <rect x="352" y="80" width="228" height="43" rx="6" fill="#EAD7C5" opacity="0.07"/>
            <text x="466" y="100" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="14" fill="#EAD7C5" letterSpacing="0.06em">INDIRECT HEAT</text>
            <text x="466" y="116" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#7A8F6A">Low temp · slow · stays moist</text>
            <text x="466" y="148" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="20" fill="#EAD7C5" opacity="0.7">~130°C</text>

            {/* Airflow arrow */}
            <path d="M94 282 Q180 250 260 220 Q340 195 430 158 Q475 140 586 96"
              fill="none" stroke="#E85C2B" strokeWidth="1.5" strokeDasharray="6 4"
              markerEnd="url(#fff-arr)" opacity="0.5"/>
            <text x="320" y="238" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10"
              fill="#E85C2B" opacity="0.7" transform="rotate(-14 320 238)">heat + smoke draw</text>

            {/* Legs */}
            <rect x="148" y="320" width="11" height="30" rx="4" fill="#2a2a27"/>
            <rect x="230" y="320" width="11" height="26" rx="4" fill="#2a2a27"/>
            <rect x="358" y="320" width="11" height="26" rx="4" fill="#2a2a27"/>
            <rect x="440" y="320" width="11" height="30" rx="4" fill="#2a2a27"/>
          </svg>
        </div>

        {/* Step cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginTop: '0rem',
        }}>
          {[
            { num: '01', title: 'Build the fire', body: 'Coals on one side. Intake vent open low on that side. Wait until fully established.' },
            { num: '02', title: 'Place the food', body: 'Food on the opposite side. Exhaust vent open high above the food. Add a water tray underneath.' },
            { num: '03', title: 'Cook slow', body: 'Air rises and draws heat across the food. Hold a steady temp until nearly done.' },
            { num: '04', title: 'Finish direct', body: 'Move over the coals for a final sear. Colour, crust, and crispness.' },
          ].map(step => (
            <div key={step.num} style={{
              backgroundColor: '#2a2a27',
              border: '1px solid #3a3a36',
              borderRadius: '8px',
              padding: '1.25rem',
            }}>
              <div style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '1.5rem',
                color: '#E85C2B',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>{step.num}</div>
              <div style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.85rem',
                color: '#F7F5F2',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>{step.title}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                color: '#7A8F6A',
                lineHeight: 1.6,
              }}>{step.body}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}