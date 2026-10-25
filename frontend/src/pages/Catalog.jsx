import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import ProgressBar from '../components/ProgressBar'
import { useApi } from '../useApi'

export default function Catalog() {
  const { data, error, loading } = useApi('/courses')

  if (loading) return <p className="font-mono text-sm text-muted">Cargando cursos...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  return (
    <>
      <p className="font-mono text-xs tracking-widest text-muted uppercase">Catálogo</p>
      <h1 className="mt-3 font-display text-6xl leading-none tracking-tight">Cursos</h1>
      <p className="mt-4 max-w-xl text-muted">Elige por dónde seguir. Todo se practica en el navegador.</p>

      <div className="mt-12 border-b border-ink">
        {data.map((course, i) => {
          const empty = course.exercise_count === 0
          return (
            <Link
              key={course.slug}
              to={`/cursos/${course.slug}`}
              className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 border-t border-ink py-7 no-underline transition-colors hover:bg-panel sm:grid-cols-[3.5rem_1fr_11rem] sm:px-3"
            >
              <span className="pt-2 font-mono text-sm text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="font-display text-4xl leading-tight group-hover:text-accent">{course.title}</h2>
                <p className="mt-1 max-w-xl text-sm leading-6 text-muted">{course.description}</p>
              </div>
              <div className="col-start-2 sm:col-start-3 sm:pt-3">
                <p className="font-mono text-xs tracking-wider text-muted uppercase">
                  {course.lesson_count} {course.lesson_count === 1 ? 'lección' : 'lecciones'}
                </p>
                <p className="mt-1 font-mono text-sm">
                  {empty ? 'En preparación' : `${course.completed_count}/${course.exercise_count} completados`}
                </p>
                <ProgressBar value={course.completed_count} max={course.exercise_count} className="mt-3" />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
