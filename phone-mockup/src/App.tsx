import type { ReactNode } from 'react'
import './App.css'
import type { ScreenName } from './types'
import { useClock } from './hooks/useClock'
import { usePhoneNavigation } from './hooks/usePhoneNavigation'
import PhoneFrame from './components/PhoneFrame'
import StatusBar from './components/StatusBar'
import NavBar from './components/NavBar'
import LockScreen from './components/LockScreen'
import PasswordScreen from './components/PasswordScreen'
import HomeScreen from './components/HomeScreen'

function App() {
  const now = useClock()
  const nav = usePhoneNavigation('lock') // start locked

  const screens: Record<ScreenName, ReactNode> = {
    lock: <LockScreen now={now} onUnlock={() => nav.goTo('password')} />,
    password: <PasswordScreen onSuccess={() => nav.reset('home')} />,
    // TODO: add a 'gallery' screen, then use nav.goTo('gallery') here
    home: <HomeScreen onOpenGallery={() => nav.goTo('home')} />,
  }

  return (
    <div className="grid min-h-screen place-items-center font-sans text-gray-900">
      <PhoneFrame screen={nav.current} onPower={() => nav.reset('lock')}>
        <StatusBar now={now} />

        <main id="app" className="content flex-1 overflow-y-auto px-5 py-4">
          {screens[nav.current]}
        </main>

        <NavBar
          disabled={nav.locked}
          onRecents={() => alert('Recent apps (put your own logic here)')}
          onHome={() => nav.reset('home')}
          onBack={nav.back}
        />
      </PhoneFrame>
    </div>
  )
}

export default App