import { useEffect } from 'react'
import { useCursor } from './hooks/useCursor'
import { useCardTilt } from './hooks/useCardTilt'
import { useFloatingAvatar } from './hooks/useFloatingAvatar'
import { useDiscordPresence } from './hooks/useDiscordPresence'
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

const STATUS_LABELS = {
  online: 'Online',
  idle: 'Abwesend',
  dnd: 'Bitte nicht stören',
  offline: 'Offline',
}

function formatLastOnline(iso) {
  if (!iso) return null
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now - date
  const diffMin = Math.floor(diffMs / 60_000)
  const diffH = Math.floor(diffMs / 3_600_000)
  const diffD = Math.floor(diffMs / 86_400_000)

  if (diffMin < 1) return 'Gerade eben'
  if (diffMin < 60) return `vor ${diffMin} Min.`
  if (diffH < 24) return `vor ${diffH} Std.`
  return `vor ${diffD} Tag${diffD !== 1 ? 'en' : ''}`
}

export default function App() {
  const cursorRef = useCursor()
  const { cardRef, onMouseMove, onMouseLeave } = useCardTilt()
  const avatarRef = useFloatingAvatar()
  const { status, lastOnline, avatarUrl } = useDiscordPresence()

  useEffect(() => {
    document.body.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 800,
      fill: 'forwards',
    })
  }, [])

  let globalIndex = 0

  const fallbackAvatar = 'https://cdn.discordapp.com/embed/avatars/0.png'
  const resolvedAvatar = avatarUrl || fallbackAvatar

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
          <div className="avatar-wrapper">
            <img
              ref={avatarRef}
              className="avatar"
              src={resolvedAvatar}
              onError={e => { e.target.src = fallbackAvatar }}
              alt="Profilbild"
            />
            {status && (
              <span className={`status-dot status-dot--${status}`} aria-label={STATUS_LABELS[status]} />
            )}
          </div>
          <h1>NutellaBrot</h1>
          <p className="subtitle">Designer · Gamer · Developer</p>
          {status && (
            <p className="presence-info">
              <span className={`presence-badge presence-badge--${status}`}>
                {STATUS_LABELS[status] ?? status}
              </span>
              {status === 'offline' && lastOnline && (
                <span className="presence-last-online">
                  · zuletzt online {formatLastOnline(lastOnline)}
                </span>
              )}
            </p>
          )}
        </header>

        <section className="bio">
          Hey, ich bin NutellaBrot
          Ich bin aktiver Grafikdesigner und arbeite aktuell an 
          verschiedenen Projekten. Schau doch gerne mal vorbei, sind unten Verlinkt ⬇️
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
