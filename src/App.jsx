import { useEffect } from 'react'
import { useCursor } from './hooks/useCursor'
import { useCardTilt } from './hooks/useCardTilt'
import { useFloatingAvatar } from './hooks/useFloatingAvatar'
import { LinkItem } from './components/LinkItem'

const SECTIONS = [
  {
    label: 'Eigene Projekte',
    links: [
      { emoji: '🎮', label: 'LAGRP [ER:LC]', href: 'https://discord.gg/lagrp' },
      { emoji: '🎨', label: 'Deutschland Design', href: 'https://discord.gg/Y7GvVRQR6M' },
      { emoji: '🇩🇪', label: 'German Roleplay', href: 'https://discord.gg/SvcYCCrCKj' },
    ],
  },
  {
    label: 'Support Server',
    links: [
      { emoji: '⚡', label: 'PowerBot', href: 'https://discord.gg/powerbot' },
      { emoji: '🤖', label: 'Roleplay Bots', href: 'https://discord.gg/YYxhbqRjUp' },
    ],
  },
]

export default function App() {
  const cursorRef = useCursor()
  const { cardRef, onMouseMove, onMouseLeave } = useCardTilt()
  const avatarRef = useFloatingAvatar()

  useEffect(() => {
    document.body.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 800,
      fill: 'forwards',
    })
  }, [])

  let globalIndex = 0

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
            src={`https://cdn.discordapp.com/users/1323492807239008328/avatars/1323492807239008328.png`}
            onError={e => { e.target.src = `https://cdn.discordapp.com/embed/avatars/0.png` }}
            alt="Profilbild"
          />
          <h1>NutellaBrot</h1>
          <p className="subtitle">Creator · Developer · Designer</p>
        </header>

        <section className="bio">
          Ich entwickle Websites, Apps und Designs.
          Willkommen auf meiner kleinen Ecke des Internets.
        </section>

        {SECTIONS.map((section) => (
          <div key={section.label} className="link-section">
            <p className="section-label">{section.label}</p>
            <nav className="links">
              {section.links.map((link) => {
                const delay = globalIndex++ * 100
                return (
                  <LinkItem
                    key={link.label}
                    href={link.href}
                    emoji={link.emoji}
                    label={link.label}
                    animationDelay={delay}
                  />
                )
              })}
            </nav>
          </div>
        ))}

        <footer>
          <small>Built with ♥ • 2026</small>
        </footer>
      </main>
    </>
  )
}
