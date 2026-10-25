import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiFetch } from '../api'
import { useApi } from '../useApi'
import Alert from '../components/Alert'
import { buttonClass } from '../components/Button'
import { ArrowRightIcon, CheckIcon } from '../components/Icons'
import Markdown from '../components/Markdown'
import SqlExercise from '../SqlExercise'
import PythonExercise from '../PythonExercise'
import QuizExercise from '../QuizExercise'

function NavCard({ lesson, direction }) {
  const isNext = direction === 'next'
  return (
    <Link
      to={`/lecciones/${lesson.id}`}
      className={`group block border border-ink p-5 no-underline transition-colors hover:bg-panel ${isNext ? 'text-right sm:col-start-2' : ''}`}
    >
      <span className="font-mono text-xs tracking-widest text-muted uppercase">
        {isNext ? 'Siguiente →' : '← Anterior'}
      </span>
      <span className="mt-2 block font-display text-2xl leading-tight group-hover:text-accent">{lesson.title}</span>
    </Link>
  )
}

export default function Lesson() {
  const { id } = useParams()
  const { data, error, loading } = useApi(`/lessons/${id}`)
  const [completed, setCompleted] = useState(new Set())

  useEffect(() => {
    apiFetch('/progress')
      .then((items) => setCompleted(new Set(items.map((i) => i.exercise_slug))))
      .catch(() => {})
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const markCompleted = (slug) => setCompleted((prev) => new Set(prev).add(slug))

  if (loading) return <p className="font-mono text-sm text-muted">Cargando lección...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  const lessonDone = data.exercises.length > 0 && data.exercises.every((e) => completed.has(e.slug))

  return (
    <>
      <nav className="font-mono text-xs tracking-wider text-muted uppercase">
        <Link to="/" className="no-underline hover:text-ink">Cursos</Link>
        <span className="mx-1">/</span>
        <Link to={`/cursos/${data.course_slug}`} className="no-underline hover:text-ink">{data.course_title}</Link>
        <span className="mx-1">/</span>
        {data.module_title}
      </nav>

      <article className="mt-8 max-w-2xl">
        <Markdown>{data.content_md}</Markdown>
      </article>

      {data.exercises.map((exercise) => {
        const props = {
          exercise,
          completed: completed.has(exercise.slug),
          onPassed: markCompleted,
        }
        if (exercise.type === 'sql') return <SqlExercise key={exercise.slug} {...props} />
        if (exercise.type === 'python') return <PythonExercise key={exercise.slug} {...props} />
        if (exercise.type === 'quiz') return <QuizExercise key={exercise.slug} {...props} />
        return <Alert key={exercise.slug} tone="info">Tipo de ejercicio no soportado todavía: {exercise.type}</Alert>
      })}

      {lessonDone && (
        <div className="mt-10 flex flex-col items-start gap-4 border-l-4 border-ok bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-3xl leading-none">
              <CheckIcon width={22} height={22} strokeWidth={3} className="text-ok" /> Lección completada
            </p>
            <p className="mt-2 text-sm text-muted">
              {data.next ? `Sigue con: ${data.next.title}` : 'Terminaste todas las lecciones de este curso.'}
            </p>
          </div>
          {data.next ? (
            <Link to={`/lecciones/${data.next.id}`} className={buttonClass('primary')}>
              Siguiente lección <ArrowRightIcon width={14} height={14} />
            </Link>
          ) : (
            <Link to={`/cursos/${data.course_slug}`} className={buttonClass('primary')}>
              Volver al curso
            </Link>
          )}
        </div>
      )}

      {(data.prev || data.next) && (
        <nav className="mt-14 grid gap-4 border-t border-ink pt-8 sm:grid-cols-2">
          {data.prev && <NavCard lesson={data.prev} direction="prev" />}
          {data.next && <NavCard lesson={data.next} direction="next" />}
        </nav>
      )}
    </>
  )
}
