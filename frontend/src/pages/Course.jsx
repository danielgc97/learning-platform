import { Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import { CheckIcon } from '../components/Icons'
import ProgressBar from '../components/ProgressBar'
import { useApi } from '../useApi'

export default function Course() {
  const { slug } = useParams()
  const { data, error, loading } = useApi(`/courses/${slug}`)

  if (loading) return <p className="font-mono text-sm text-muted">Cargando curso...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  let lessonNumber = 0

  return (
    <>
      <nav className="font-mono text-xs tracking-wider text-muted uppercase">
        <Link to="/" className="no-underline hover:text-ink">Cursos</Link> <span className="mx-1">/</span> {data.title}
      </nav>

      <header className="mt-6 border-b border-ink pb-8">
        <h1 className="font-display text-6xl leading-none tracking-tight">{data.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{data.description}</p>
        <div className="mt-8 flex items-center gap-4">
          <ProgressBar value={data.completed_count} max={data.exercise_count} />
          <span className="shrink-0 font-mono text-xs text-muted">
            {data.completed_count}/{data.exercise_count} ejercicios
          </span>
        </div>
      </header>

      {data.modules.map((module, i) => (
        <section key={module.slug} className="mt-12">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">Módulo {String(i + 1).padStart(2, '0')}</p>
          <h2 className="mt-1 font-display text-4xl">{module.title}</h2>
          <ul className="mt-5 border-b border-line">
            {module.lessons.map((lesson) => {
              lessonNumber += 1
              const done = lesson.exercise_count > 0 && lesson.completed_count === lesson.exercise_count
              return (
                <li key={lesson.id}>
                  <Link
                    to={`/lecciones/${lesson.id}`}
                    className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-line py-4 no-underline transition-colors hover:bg-panel sm:px-3"
                  >
                    <span className="font-mono text-sm text-muted">{String(lessonNumber).padStart(2, '0')}</span>
                    <span className="font-medium">{lesson.title}</span>
                    <span className={`inline-flex items-center gap-1 font-mono text-xs ${done ? 'text-ok' : 'text-muted'}`}>
                      {done && <CheckIcon width={14} height={14} strokeWidth={3} />}
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
