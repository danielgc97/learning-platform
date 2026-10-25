import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import ProgressBar from '../components/ProgressBar'
import { tileFor } from '../components/tiles'
import { useApi } from '../useApi'

export default function Catalog() {
  const { data, error, loading } = useApi('/courses')

  if (loading) return <p className="text-muted">Cargando cursos...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  return (
    <>
      <h1 className="font-display text-5xl">Tus cursos</h1>
      <p className="mt-2 text-lg text-muted">Elige por dónde seguir. Todo se practica en el navegador.</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {data.map((course) => {
          const empty = course.exercise_count === 0
          const started = course.completed_count > 0
          return (
            <Link
              key={course.slug}
              to={`/cursos/${course.slug}`}
              className="lab-card lab-lift flex flex-col overflow-hidden text-ink no-underline"
            >
              <div className={`${tileFor(course.slug)} border-b-2 border-ink p-6 text-[#111]`}>
                <p className="text-xs font-bold tracking-wider uppercase">
                  {course.lesson_count} {course.lesson_count === 1 ? 'lección' : 'lecciones'}
                </p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{course.title}</h2>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 leading-6 text-muted">{course.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 text-sm font-semibold">
                  <span>{empty ? 'En preparación' : `${course.completed_count}/${course.exercise_count} completados`}</span>
                  <span className="text-accent">{started ? 'Continuar →' : 'Empezar →'}</span>
                </div>
                <ProgressBar value={course.completed_count} max={course.exercise_count} className="mt-3" />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
