import { useCallback } from 'react'

const ArrowIcon = () => (
  <svg className="link-arrow" viewBox="0 0 24 24">
    <path d="M7 17L17 7" />
    <path d="M9 7H17V15" />
  </svg>
)

export function LinkItem({ href, emoji, label, animationDelay }) {
  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }, [])

  const onMouseDown = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(0.97)'
  }, [])

  const onMouseUp = useCallback((e) => {
    e.currentTarget.style.transform = ''
  }, [])

  const onMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = ''
  }, [])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        animation: `fadeInUp 700ms ${animationDelay}ms cubic-bezier(0.22,1,0.36,1) both`,
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <span className="link-icon">{emoji}</span>
      <span>{label}</span>
      <ArrowIcon />
    </a>
  )
}
