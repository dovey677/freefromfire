'use client'

import { useState, useEffect } from 'react'

export default function CookMode() {
  const [active, setActive] = useState(false)
  const [wakeLock, setWakeLock] = useState<any>(null)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported('wakeLock' in navigator)
  }, [])

  async function toggleCookMode() {
    if (!active) {
      try {
        const lock = await (navigator as any).wakeLock.request('screen')
        setWakeLock(lock)
        setActive(true)
      } catch (err) {
        console.error('Wake lock failed:', err)
      }
    } else {
      if (wakeLock) {
        await wakeLock.release()
        setWakeLock(null)
      }
      setActive(false)
    }
  }

  if (!supported) return null

  return (
    <button
      onClick={toggleCookMode}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1.25rem',
        borderRadius: '999px',
        border: '1px solid',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.9rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        backgroundColor: active ? '#E85C2B' : 'transparent',
        borderColor: active ? '#E85C2B' : '#3a2a2a',
        color: active ? '#F7F5F2' : '#7A8F6A',
        marginBottom: '0',
      }}
    >
      <span>{active ? '🔥' : '🕯️'}</span>
      {active ? 'Cook Mode On' : 'Cook Mode'}
    </button>
  )
}