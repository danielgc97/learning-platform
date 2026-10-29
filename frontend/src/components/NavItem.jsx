import { Link, useLocation } from 'react-router-dom'

// La página actual se marca con una línea de acento de 1px bajo su texto, del ancho
// exacto de la etiqueta. Es el mismo gesto que marca cualquier selección en la app.
export default function NavItem({ to, matches, compact = false, className = '', children }) {
  const { pathname } = useLocation()
  const active = matches ? matches(pathname) : pathname === to
  const size = compact ? 'py-1 text-sm font-medium' : 'py-2 text-sm font-semibold'
  const colors = active ? 'text-ink' : 'text-muted hover:text-ink'
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`px-2 no-underline transition-colors ${size} ${colors} ${className}`}
    >
      <span className={`inline-block py-0.5 ${active ? 'lab-mark' : ''}`}>{children}</span>
    </Link>
  )
}
