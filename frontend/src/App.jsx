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
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="no-underline hover:no-underline" aria-label="Inicio">
            <Logo />
          </Link>
          <div className="flex items-center gap-1 sm:gap-3">
            {session && (
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-100 hover:no-underline dark:text-slate-200 dark:hover:bg-slate-800">
                Mis cursos
              </Link>
            )}
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        {loading ? (
          <p className="text-slate-500">Cargando...</p>
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
