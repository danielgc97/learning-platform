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
      className="flex size-9 cursor-pointer items-center justify-center text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
    >
      {dark ? <SunIcon width={17} height={17} /> : <MoonIcon width={17} height={17} />}
    </button>
  )
}
