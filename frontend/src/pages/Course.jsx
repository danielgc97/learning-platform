import { Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import { CheckIcon } from '../components/Icons'
import ProgressBar from '../components/ProgressBar'
import { tileFor } from '../components/tiles'
import { useApi } from '../useApi'

export default function Course() {
  const { slug } = useParams()
  const { data, error, loading } = useApi(`/courses/${slug}`)

  if (loading) return <p className="text-muted">Cargando curso...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  let lessonNumber = 0

  return (
    <>
      <nav className="text-sm font-medium text-muted">
        <Link to="/">Cursos</Link> <span className="mx-1">/</span> {data.title}
      </nav>

      <header className={`lab-card mt-4 bg-panel p-8`}>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">{data.title}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-7">{data.description}</p>
        <div className="mt-6 flex items-center gap-4">
          <ProgressBar value={data.completed_count} max={data.exercise_count} />
          <span className="shrink-0 text-sm font-semibold">
            {data.completed_count}/{data.exercise_count}
          </span>
        </div>
      </header>

      {data.modules.map((module, i) => (
        <section key={module.slug} className="mt-12">
          <p className="text-sm font-semibold text-accent">Módulo {i + 1}</p>
          <h2 className="mt-1 font-display text-3xl">{module.title}</h2>
          <ul className="lab-card mt-5 divide-y-2 divide-line overflow-hidden">
            {module.lessons.map((lesson) => {
              lessonNumber += 1
              const done = lesson.exercise_count > 0 && lesson.completed_count === lesson.exercise_count
              return (
                <li key={lesson.id}>
                  <Link
                    to={`/lecciones/${lesson.id}`}
                    className="flex items-center gap-4 px-5 py-4 text-ink no-underline transition-colors hover:bg-panel"
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm ${done ? 'tint-3' : 'border border-line bg-surface text-muted'}`}
                    >
                      {done ? <CheckIcon width={16} height={16} strokeWidth={3} /> : lessonNumber}
                    </span>
                    <span className="flex-1 font-semibold">{lesson.title}</span>
                    <span className="text-sm font-medium text-muted">
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
