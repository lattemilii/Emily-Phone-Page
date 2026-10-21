import type { ReactNode } from 'react'
import type { ScreenName } from '../../types'

type Props = {
  screen: ScreenName
  onPower: () => void
  children: ReactNode
}

export default function PhoneFrame({ screen, onPower, children }: Props) {
  return (
    <div className="relative h-[700px] w-[340px] rounded-[44px] bg-[#1c1c1e] p-3 shadow-[0_0_0_2px_#C0C0C0,0_30px_60px_rgba(0,0,0,0.4)] max-[760px]:scale-[0.85]">
      <span className="side-btn vol-up" />
      <span className="side-btn vol-down" />
      <button
        type="button"
        className="side-btn power"
        onClick={onPower}
        aria-label="Power"
      />

      <div
        className="screen relative isolate flex h-full w-full flex-col overflow-hidden rounded-[44px] bg-white"
        data-screen={screen}
      >
        {children}
      </div>

      {/* Bezel in front of the screen. It ignores clicks. */}
      <div className="pointer-events-none absolute inset-0 z-50 rounded-[44px] shadow-[inset_0_0_0_12px_#1c1c1e]" />
    </div>
  )
}