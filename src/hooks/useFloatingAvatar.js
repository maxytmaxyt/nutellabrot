import { useEffect, useRef } from 'react'

export function useFloatingAvatar() {
  const avatarRef = useRef(null)

  useEffect(() => {
    let t = 0
    let rafId
    let last = null

    const float = (timestamp) => {
      if (last !== null) {
        const delta = Math.min((timestamp - last) / 1000, 0.05)
        t += delta * 0.8
      }
      last = timestamp
      if (avatarRef.current) {
        avatarRef.current.style.transform = `translateY(${Math.sin(t) * 5}px)`
      }
      rafId = requestAnimationFrame(float)
    }

    rafId = requestAnimationFrame(float)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return avatarRef
}
