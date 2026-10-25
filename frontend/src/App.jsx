import { Link, Route, Routes } from 'react-router-dom'
import { UserMenu } from './AuthPanel'
import { useSession } from './useSession'
import Logo from './components/Logo'
import ThemeToggle from './components/ThemeToggle'
import Landing from './pages/Landing'
import Catalog from './pages/Catalog'
import Course from './pages/Course'
import Lesson from './pages/Lesson'

export default function App() {
  const { session, loading } = useSession()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="no-underline" aria-label="Inicio">
            <Logo />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-3">
            {session && (
              <Link to="/" className="px-2 font-mono text-xs tracking-wider text-muted uppercase no-underline hover:text-ink">
                Mis cursos
              </Link>
            )}
            <ThemeToggle />
            <UserMenu />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">
        {loading ? (
          <p className="font-mono text-sm text-muted">Cargando...</p>
        ) : session ? (
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cursos/:slug" element={<Course />} />
            <Route path="/lecciones/:id" element={<Lesson />} />
            <Route path="*" element={<p>Página no encontrada.</p>} />
          </Routes>
        ) : (
          <Landing />
        )}
      </main>
    </div>
  )
}
