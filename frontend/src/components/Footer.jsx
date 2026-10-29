import { BRAND_NAME } from '../brand'
import NavItem from './NavItem'

export default function Footer() {
  return (
    <footer className="mt-16 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} <span className="font-semibold text-ink">{BRAND_NAME}</span>
        </p>
        <nav className="flex flex-wrap gap-x-3 gap-y-2">
          <NavItem to="/nosotros" compact>Nosotros</NavItem>
          <NavItem to="/soporte" compact>Soporte</NavItem>
        </nav>
      </div>
    </footer>
  )
}
