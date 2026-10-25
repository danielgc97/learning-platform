import { Link, Route, Routes } from 'react-router-dom'
import { UserMenu } from './AuthPanel'
import { useSession } from './useSession'
import Footer from './components/Footer'
import Logo from './components/Logo'
import ThemeToggle from './components/ThemeToggle'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Contact from './pages/Contact'
import Course from './pages/Course'
import Landing from './pages/Landing'
import Lesson from './pages/Lesson'

const navLink = 'rounded-lg px-3 py-2 text-sm font-semibold text-ink no-underline hover:bg-panel'

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
            {session ? (
              <Link to="/" className={navLink}>Mis cursos</Link>
            ) : (
              <>
                <Link to="/nosotros" className={`${navLink} hidden sm:inline-block`}>Nosotros</Link>
                <Link to="/contacto" className={`${navLink} hidden sm:inline-block`}>Contacto</Link>
              </>
            )}
            <ThemeToggle />
            <UserMenu />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        <Routes>
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
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
