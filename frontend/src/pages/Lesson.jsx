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
      className={`lab-card lab-lift block p-5 text-ink no-underline ${isNext ? 'text-right sm:col-start-2' : ''}`}
    >
      <span className="text-xs font-semibold text-muted">
        {isNext ? 'Siguiente →' : '← Anterior'}
      </span>
      <span className="mt-1 block font-display text-xl leading-tight">{lesson.title}</span>
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

  if (loading) return <p className="text-muted">Cargando lección...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  const lessonDone = data.exercises.length > 0 && data.exercises.every((e) => completed.has(e.slug))

  return (
    <>
      <nav className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm font-medium text-muted">
        <span>
          <Link to="/">Cursos</Link>
          <span className="mx-1">/</span>
          <Link to={`/cursos/${data.course_slug}`}>{data.course_title}</Link>
          <span className="mx-1">/</span>
          {data.module_title}
        </span>
        <span className="shrink-0 tabular-nums">
          Lección {data.position} de {data.lesson_count}
        </span>
      </nav>
      {/* Saber cuánto falta es lo que sostiene a alguien hasta el final del curso. */}
      <div
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-panel"
        role="progressbar"
        aria-label={`Lección ${data.position} de ${data.lesson_count}`}
        aria-valuenow={data.position}
        aria-valuemin={1}
        aria-valuemax={data.lesson_count}
      >
        <div
          className="h-full rounded-r-full bg-chart-fill transition-[width] duration-300 ease-(--ease-lab)"
          style={{ width: `${(data.position / data.lesson_count) * 100}%` }}
        />
      </div>

      <article className="mt-6 max-w-2xl">
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
        <div className="lab-card tint-3 mt-10 flex flex-col items-start gap-4 p-6 transition-[opacity,translate,scale] duration-[280ms] ease-(--ease-lab) starting:translate-y-3 starting:scale-[.97] starting:opacity-0 motion-reduce:starting:translate-y-0 motion-reduce:starting:scale-100 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl leading-none">
              <CheckIcon width={24} height={24} strokeWidth={3} /> ¡Lección completada!
            </p>
            <p className="mt-2">
              {data.next ? `Sigue con: ${data.next.title}` : 'Terminaste todas las lecciones de este curso.'}
            </p>
          </div>
          {data.next ? (
            <Link to={`/lecciones/${data.next.id}`} className={buttonClass('primary')}>
              Siguiente lección <ArrowRightIcon width={16} height={16} />
            </Link>
          ) : (
            <Link to={`/cursos/${data.course_slug}`} className={buttonClass('primary')}>
              Volver al curso
            </Link>
          )}
        </div>
      )}

      {(data.prev || data.next) && (
        <nav className="mt-14 grid gap-5 sm:grid-cols-2">
          {data.prev && <NavCard lesson={data.prev} direction="prev" />}
          {data.next && <NavCard lesson={data.next} direction="next" />}
        </nav>
      )}
    </>
  )
}
