import { setDark, useDarkMode } from '../theme'
import { MoonIcon, SunIcon } from './Icons'

export default function ThemeToggle() {
  const dark = useDarkMode()
  const label = dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      aria-label={label}
      title={label}
      className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-panel hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
    >
      {dark ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
    </button>
  )
}
