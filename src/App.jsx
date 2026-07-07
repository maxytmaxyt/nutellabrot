import { useEffect } from 'react'
import { useCursor } from './hooks/useCursor'
import { useCardTilt } from './hooks/useCardTilt'
import { useFloatingAvatar } from './hooks/useFloatingAvatar'
import { LinkItem } from './components/LinkItem'

const LINKS = [
  { emoji: '📸', label: 'Instagram', href: '#' },
  { emoji: '🎵', label: 'TikTok', href: '#' },
  { emoji: '▶', label: 'YouTube', href: '#' },
  { emoji: '💬', label: 'Discord', href: '#' },
  { emoji: '💻', label: 'GitHub', href: '#' },
]

export default function App() {
  const cursorRef = useCursor()
  const { cardRef, onMouseMove, onMouseLeave } = useCardTilt()
  const avatarRef = useFloatingAvatar()

  // Page reveal on load
  useEffect(() => {
    document.body.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 800,
      fill: 'forwards',
    })
  }, [])

  return (
    <>
      <div className="aurora" />
      <div ref={cursorRef} className="cursor" />

      <main
        className="glass"
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <header style={{ textAlign: 'center' }}>
          <img
            ref={avatarRef}
            className="avatar"
            src="assets/avatar.jpg"
            alt="Profilbild"
          />
          <h1>Dein Name</h1>
          <p className="subtitle">Creator · Developer · Designer</p>
        </header>

        <section className="bio">
          Ich entwickle Websites, Apps und Designs.
          Willkommen auf meiner kleinen Ecke des Internets.
        </section>

        <nav className="links">
          {LINKS.map((link, i) => (
            <LinkItem
              key={link.label}
              href={link.href}
              emoji={link.emoji}
              label={link.label}
              animationDelay={i * 100}
            />
          ))}
        </nav>

        <footer>
          <small>Built with ♥ • 2026</small>
        </footer>
      </main>
    </>
  )
}
