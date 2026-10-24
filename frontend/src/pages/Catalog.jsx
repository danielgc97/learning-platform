import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import { ArrowRightIcon } from '../components/Icons'
import ProgressBar from '../components/ProgressBar'
import { courseVisual } from '../components/courseVisual'
import { useApi } from '../useApi'

export default function Catalog() {
  const { data, error, loading } = useApi('/courses')

  if (loading) return <p className="text-slate-500">Cargando cursos...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Tus cursos</h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">Elige por dónde seguir. Todo se practica en el navegador.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {data.map((course) => {
          const { Icon, tile } = courseVisual(course.slug)
          const started = course.completed_count > 0
          return (
            <Link
              key={course.slug}
              to={`/cursos/${course.slug}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 text-slate-900 no-underline shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:no-underline hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-teal-500"
            >
              <span className={`flex size-11 items-center justify-center rounded-lg ${tile}`}>
                <Icon width={22} height={22} />
              </span>
              <h2 className="mt-4 text-lg font-bold">{course.title}</h2>
              <p className="mt-1 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{course.description}</p>
              <p className="mt-4 text-xs font-medium text-slate-500">
                {course.lesson_count} {course.lesson_count === 1 ? 'lección' : 'lecciones'} · {course.exercise_count}{' '}
                {course.exercise_count === 1 ? 'ejercicio' : 'ejercicios'}
              </p>
              <div className="mt-3">
                <ProgressBar value={course.completed_count} max={course.exercise_count} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  {course.exercise_count === 0
                    ? 'Contenido en preparación'
                    : `${course.completed_count} de ${course.exercise_count} completados`}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-400">
                  {started ? 'Continuar' : 'Empezar'}
                  <ArrowRightIcon width={16} height={16} className="transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
