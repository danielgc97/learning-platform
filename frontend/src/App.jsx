import { Link, Route, Routes } from 'react-router-dom'
import AuthPanel from './AuthPanel'
import { useSession } from './useSession'
import Catalog from './pages/Catalog'
import Course from './pages/Course'
import Lesson from './pages/Lesson'

export default function App() {
  const { session, loading } = useSession()

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
          Learning Platform
        </Link>
        <AuthPanel />
      </header>
      <main>
        {loading ? (
          <p>Cargando...</p>
        ) : session ? (
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cursos/:slug" element={<Course />} />
            <Route path="/lecciones/:id" element={<Lesson />} />
            <Route path="*" element={<p>Página no encontrada.</p>} />
          </Routes>
        ) : (
          <p>Inicia sesión o crea una cuenta para ver los cursos.</p>
        )}
      </main>
    </div>
  )
}
