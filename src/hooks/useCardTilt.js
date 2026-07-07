import { useRef, useCallback, useEffect } from 'react'

export function useCardTilt() {
  const cardRef = useRef(null)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const rafId = useRef(null)
  const isHovered = useRef(false)

  useEffect(() => {
    const animate = () => {
      if (isHovered.current) {
        currentX.current += (targetX.current - currentX.current) * 0.08
        currentY.current += (targetY.current - currentY.current) * 0.08
      } else {
        currentX.current += (0 - currentX.current) * 0.06
        currentY.current += (0 - currentY.current) * 0.06
      }
      const card = cardRef.current
      if (card) {
        card.style.transform = `perspective(1200px) rotateX(${currentY.current}deg) rotateY(${currentX.current}deg) translateY(-2px)`
      }
      rafId.current = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    isHovered.current = true
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    targetX.current = (x / rect.width - 0.5) * 10
    targetY.current = (0.5 - y / rect.height) * 10
  }, [])

  const onMouseLeave = useCallback(() => {
    isHovered.current = false
    targetX.current = 0
    targetY.current = 0
  }, [])

  return { cardRef, onMouseMove, onMouseLeave }
}
