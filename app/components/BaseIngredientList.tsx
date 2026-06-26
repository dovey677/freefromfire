'use client'

import { useState } from 'react'

type Ingredient = {
  quantity: number
  unit: string
  name: string
}

type IngredientGroup = {
  groupTitle: string
  ingredients: Ingredient[]
}

export default function BaseIngredientList({
  groups,
  servesCount,
  servesLabel,
}: {
  groups: IngredientGroup[]
  servesCount?: number
  servesLabel?: string
}) {
  const [multiplier, setMultiplier] = useState(1)

  function formatQuantity(quantity: number) {
    const result = quantity * multiplier
    return Number.isInteger(result) ? result : parseFloat(result.toFixed(2))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', backgroundColor: '#2a2020', border: '1px solid #3a2a2a', borderRadius: '8px', padding: '0.75rem 1.25rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A8F6A' }}>
          Servings
        </span>
        <button
          onClick={() => setMultiplier(m => Math.max(0.5, m - 0.5))}
          style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '1px solid #E85C2B', backgroundColor: 'transparent', color: '#E85C2B', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
        >
          −
        </button>
        <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: '#F7F5F2', minWidth: '3rem', textAlign: 'center' }}>
          {multiplier}x
        </span>
        <button
          onClick={() => setMultiplier(m => m + 0.5)}
          style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: '1px solid #E85C2B', backgroundColor: 'transparent', color: '#E85C2B', fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
        >
          +
        </button>
        {servesCount && servesLabel && (
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#EAD7C5', marginLeft: '0.5rem' }}>
            → Makes <strong>{formatQuantity(servesCount)}</strong> {servesLabel}
          </span>
        )}
      </div>

      {groups.map((group, gi) => (
        <div key={gi} style={{ marginBottom: '1.5rem' }}>
          {group.groupTitle && (
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#E85C2B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {group.groupTitle}
            </h3>
          )}
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {group.ingredients?.map((ingredient, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'Inter, sans-serif', color: '#EAD7C5', fontSize: '0.95rem', lineHeight: 1.5 }}>
                <span style={{ color: '#E85C2B', marginTop: '2px', flexShrink: 0 }}>—</span>
                <span>
                  {ingredient.quantity && (
                    <span style={{ fontWeight: 600 }}>{formatQuantity(ingredient.quantity)} </span>
                  )}
                  {ingredient.unit && (
                    <span style={{ color: '#7A8F6A' }}>{ingredient.unit} </span>
                  )}
                  {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}