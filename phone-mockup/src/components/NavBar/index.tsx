type Props = {
  disabled?: boolean
  onRecents: () => void
  onHome: () => void
  onBack: () => void
}

const buttonClass =
  'cursor-pointer border-0 bg-transparent p-0 text-lg text-white disabled:cursor-default'

export default function NavBar({ disabled, onRecents, onHome, onBack }: Props) {
  return (
    <nav className="home-island flex h-[54px] items-center justify-evenly">
      <button className={buttonClass} disabled={disabled} onClick={onRecents} aria-label="Recent apps">
        <span>|||</span>
      </button>
      <button className={`home ${buttonClass}`} disabled={disabled} onClick={onHome} aria-label="Home">
        <span>o</span>
      </button>
      <button className={`back ${buttonClass}`} disabled={disabled} onClick={onBack} aria-label="Back">
        <span>&lt;</span>
      </button>
    </nav>
  )
}