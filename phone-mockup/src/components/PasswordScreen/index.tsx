import { useEffect, useRef, useState } from 'react'

const PIN = '0412'
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

type Props = {
  onSuccess: () => void
}

export default function PasswordScreen({ onSuccess }: Props) {
  const [input, setInput] = useState('')
  const [hint, setHint] = useState('Enter PIN')
  const [leaving, setLeaving] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const press = (key: string) => {
    if (leaving || input.length >= PIN.length) return

    const next = input + key
    setInput(next)

    if (next.length === PIN.length) {
      if (next === PIN) {
        setLeaving(true)
        timer.current = window.setTimeout(onSuccess, 250)
      } else {
        setHint('Wrong Password!')
        timer.current = window.setTimeout(() => setInput(''), 300)
      }
    }
  }

  return (
    <div
      className="password-screen"
      style={{
        transition: 'transform 0.25s ease, opacity 0.25s ease',
        transform: leaving ? 'scale(1.6)' : undefined,
        opacity: leaving ? 0 : 1,
      }}
    >
      <span className="password-hint" id="hint">
        {hint}
      </span>
      <div className="pin-dots" id="pin-dots">
        {'●'.repeat(input.length) || '\u00A0'}
      </div>

      <div className="number-pad" id="number-pad">
        {KEYS.map((k) => (
          <button key={k} className="keypad" onClick={() => press(k)}>
            {k}
          </button>
        ))}
        <button className="zero" onClick={() => press('0')}>
          0
        </button>
      </div>
    </div>
  )
}