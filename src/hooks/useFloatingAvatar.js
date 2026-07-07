import { useEffect, useRef } from 'react'

export function useFloatingAvatar() {
  const avatarRef = useRef(null)

  useEffect(() => {
    let t = 0
    let rafId

    const float = () => {
      t += 0.02
      if (avatarRef.current) {
        avatarRef.current.style.transform = `translateY(${Math.sin(t) * 6}px)`
      }
      rafId = requestAnimationFrame(float)
    }

    float()
    return () => cancelAnimationFrame(rafId)
  }, [])

  return avatarRef
}
