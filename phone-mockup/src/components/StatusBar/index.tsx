import { formatTime } from '../../hooks/useClock'

type Props = {
  now: Date
}

export default function StatusBar({ now }: Props) {
  return (
    <header className="status-bar flex items-center justify-between px-7 pb-2 pt-12 text-sm font-semibold ">
      <span id="clock">{formatTime(now)}</span>
      <span className="status-right">5G 🔋</span>
    </header>
  )
}