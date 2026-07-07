import { useRef, useCallback } from 'react'

export function useCardTilt() {
  const cardRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateY = (x / rect.width - 0.5) * 12
    const rotateX = (0.5 - y / rect.height) * 12
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)`
  }, [])

  return { cardRef, onMouseMove, onMouseLeave }
}
