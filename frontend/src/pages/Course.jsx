import { Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import { CheckIcon } from '../components/Icons'
import ProgressBar from '../components/ProgressBar'
import { courseVisual } from '../components/courseVisual'
import { useApi } from '../useApi'

function LessonStatus({ lesson, index }) {
  const done = lesson.exercise_count > 0 && lesson.completed_count === lesson.exercise_count
  if (done) {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        <CheckIcon width={16} height={16} strokeWidth={3} />
      </span>
    )
  }
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
      {index}
    </span>
  )
}

export default function Course() {
  const { slug } = useParams()
  const { data, error, loading } = useApi(`/courses/${slug}`)

  if (loading) return <p className="text-slate-500">Cargando curso...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  const { Icon, tile } = courseVisual(data.slug)
  let lessonNumber = 0

  return (
    <>
      <nav className="text-sm text-slate-500">
        <Link to="/">Cursos</Link> <span className="mx-1">/</span> {data.title}
      </nav>

      <header className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <span className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${tile}`}>
            <Icon width={24} height={24} />
          </span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{data.title}</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{data.description}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <ProgressBar value={data.completed_count} max={data.exercise_count} />
          <span className="shrink-0 text-sm text-slate-500">
            {data.completed_count}/{data.exercise_count} ejercicios
          </span>
        </div>
      </header>

      {data.modules.map((module, i) => (
        <section key={module.slug} className="mt-10">
          <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Módulo {i + 1}</h2>
          <p className="mt-1 text-xl font-bold">{module.title}</p>
          <ul className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {module.lessons.map((lesson) => {
              lessonNumber += 1
              return (
                <li key={lesson.id}>
                  <Link
                    to={`/lecciones/${lesson.id}`}
                    className="flex items-center gap-4 px-5 py-4 text-slate-900 no-underline transition-colors hover:bg-slate-50 hover:no-underline dark:text-slate-100 dark:hover:bg-slate-800/60"
                  >
                    <LessonStatus lesson={lesson} index={lessonNumber} />
                    <span className="flex-1 font-medium">{lesson.title}</span>
                    <span className="text-sm text-slate-500">
                      {lesson.completed_count}/{lesson.exercise_count}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </>
  )
}
