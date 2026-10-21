import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { formatTime } from '../../hooks/useClock'
// import { usePhoneNavigation } from '../../hooks/usePhoneNavigation'


type Props = {
  now: Date
  onUnlock: () => void
}

export default function LockScreen({ now, onUnlock }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const timer = useRef<number | undefined>(undefined)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0) // 0 → 1

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const getProgress = (e: PointerEvent) => {
    const height = ref.current?.offsetHeight ?? 1
    const up = Math.max(0, startY.current - e.clientY) // only upward
    return Math.min(1, up / (height * 0.5))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setDragging(true)
    startY.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) setProgress(getProgress(e))
  }

  const end = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setDragging(false)

    const height = ref.current?.offsetHeight ?? 0
    const draggedUp = Math.max(0, startY.current - e.clientY)

    if (draggedUp > height * 0.25) {
      setProgress(1) // finish the zoom, then switch screens
      timer.current = window.setTimeout(onUnlock, 250)
    } else {
      setProgress(0) // not far enough: snap back
    }
  }

  return (
    <div
      ref={ref}
      className="lock-screen"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      style={{
        touchAction: 'none',
        cursor: 'grab',
        transformOrigin: 'center center',
        transform: `scale(${1 + progress * (1.6 - 1)})`,
        opacity: 1 - progress,
        transition: dragging ? 'none' : 'transform 0.25s ease, opacity 0.25s ease',
      }}
    >
      <div>
        <h1 id="lock-time">{formatTime(now).replace(/\s?(AM|PM)/i, '')}</h1>
        <p id="lock-date">
          {now.toLocaleDateString([], {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <p className="lock-hint">Swipe up to unlock</p>
    </div>
  )
}