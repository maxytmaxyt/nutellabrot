import { useState, useEffect } from 'react'

const API_BASE = 'http://de3.bot-hosting.net:20230'

export function useDiscordPresence() {
  const [status, setStatus] = useState(null)
  const [lastOnline, setLastOnline] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function fetchPresence() {
      try {
        const [statusRes, avatarRes] = await Promise.all([
          fetch(`${API_BASE}/api/status`),
          fetch(`${API_BASE}/api/avatar`),
        ])
        const statusData = await statusRes.json()
        const avatarData = await avatarRes.json()

        setStatus(statusData.status)
        setLastOnline(statusData.lastOnline)
        setAvatarUrl(avatarData.avatar)
      } catch (err) {
        console.error('Failed to fetch Discord presence:', err)
      }
    }

    fetchPresence()
    const interval = setInterval(fetchPresence, 60_000)
    return () => clearInterval(interval)
  }, [])

  return { status, lastOnline, avatarUrl }
}
