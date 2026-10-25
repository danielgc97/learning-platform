import { Link, useLocation } from 'react-router-dom'

// Enlace de navegación que se resalta en amarillo cuando es la página actual.
export default function NavItem({ to, matches, compact = false, className = '', children }) {
  const { pathname } = useLocation()
  const active = matches ? matches(pathname) : pathname === to
  const size = compact ? 'px-2 py-1 text-sm font-medium' : 'px-3 py-2 text-sm font-semibold'
  const colors = active ? 'bg-c1 text-[#111]' : compact ? 'text-muted hover:text-ink' : 'text-ink hover:bg-panel'
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`rounded-lg no-underline transition-colors ${size} ${colors} ${className}`}
    >
      {children}
    </Link>
  )
}
