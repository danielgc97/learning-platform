import { Link } from 'react-router-dom'
import { BRAND_NAME } from '../brand'

const link = 'text-sm font-medium text-muted no-underline hover:text-ink hover:underline'

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} <span className="font-semibold text-ink">{BRAND_NAME}</span>
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/nosotros" className={link}>Nosotros</Link>
          <Link to="/contacto" className={link}>Contacto</Link>
          <Link to="/contacto#asesorias" className={link}>Clases y asesorías</Link>
        </nav>
      </div>
    </footer>
  )
}
