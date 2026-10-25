import { Link, Route, Routes } from 'react-router-dom'
import { UserMenu } from './AuthPanel'
import { useSession } from './useSession'
import Footer from './components/Footer'
import Logo from './components/Logo'
import NavItem from './components/NavItem'
import ThemeToggle from './components/ThemeToggle'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Support from './pages/Support'
import Course from './pages/Course'
import Landing from './pages/Landing'
import Lesson from './pages/Lesson'

export default function App() {
  const { session, loading } = useSession()

  // Las páginas de contenido exigen sesión; sin ella se muestra la portada.
  const gated = (page) => (loading ? <p className="text-muted">Cargando...</p> : session ? page : <Landing />)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b-2 border-ink bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="no-underline" aria-label="Inicio">
            <Logo />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {session && (
              <NavItem to="/" matches={(p) => p === '/' || p.startsWith('/cursos') || p.startsWith('/lecciones')}>
                Mis cursos
              </NavItem>
            )}
            <NavItem to="/nosotros" className="hidden sm:inline-block">Nosotros</NavItem>
            <NavItem to="/soporte" className="hidden sm:inline-block">Soporte</NavItem>
            <ThemeToggle />
            <UserMenu />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        <Routes>
          <Route path="/nosotros" element={<About />} />
          <Route path="/soporte" element={<Support />} />
          <Route path="/" element={gated(<Catalog />)} />
          <Route path="/cursos/:slug" element={gated(<Course />)} />
          <Route path="/lecciones/:id" element={gated(<Lesson />)} />
          <Route path="*" element={<p>Página no encontrada.</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
