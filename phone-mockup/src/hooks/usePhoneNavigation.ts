import { useState } from 'react'
import type { ScreenName } from '../types'

type NavState = {
  current: ScreenName
  stack: ScreenName[] // history, newest last (used by Back)
}

export function usePhoneNavigation(initial: ScreenName = 'lock') {
  const [{ current }, setState] = useState<NavState>({
    current: initial,
    stack: [initial],
  })

  // Open a screen and remember it in history
  const goTo = (name: ScreenName) =>
    setState((s) =>
      name === s.current
        ? s
        : { current: name, stack: [...s.stack, name] },
    )

  // Jump to a screen and clear history (unlock, home, power button)
  const reset = (name: ScreenName) =>
    setState({ current: name, stack: [name] })

  // Return to the previous screen, if there is one
  const back = () =>
    setState((s) =>
      s.stack.length > 1
        ? { current: s.stack[s.stack.length - 2], stack: s.stack.slice(0, -1) }
        : s,
    )

  return { current, locked: current === 'lock', goTo, reset, back }
}