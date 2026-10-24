import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiFetch } from '../api'
import { useApi } from '../useApi'
import Alert from '../components/Alert'
import { buttonClass } from '../components/Button'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '../components/Icons'
import Markdown from '../components/Markdown'
import SqlExercise from '../SqlExercise'
import PythonExercise from '../PythonExercise'

function NavCard({ lesson, direction }) {
  const isNext = direction === 'next'
  return (
    <Link
      to={`/lecciones/${lesson.id}`}
      className={`group flex flex-col rounded-xl border border-slate-200 bg-white p-4 text-slate-900 no-underline transition hover:border-teal-500 hover:no-underline dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 ${isNext ? 'items-end text-right sm:col-start-2' : ''}`}
    >
      <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
        {!isNext && <ArrowLeftIcon width={14} height={14} />}
        {isNext ? 'Siguiente' : 'Anterior'}
        {isNext && <ArrowRightIcon width={14} height={14} />}
      </span>
      <span className="mt-1 font-semibold">{lesson.title}</span>
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

  if (loading) return <p className="text-slate-500">Cargando lección...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  const lessonDone = data.exercises.length > 0 && data.exercises.every((e) => completed.has(e.slug))

  return (
    <>
      <nav className="text-sm text-slate-500">
        <Link to="/">Cursos</Link>
        <span className="mx-1">/</span>
        <Link to={`/cursos/${data.course_slug}`}>{data.course_title}</Link>
        <span className="mx-1">/</span>
        {data.module_title}
      </nav>

      <article className="mt-4 max-w-3xl">
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
        return <Alert key={exercise.slug} tone="info">Tipo de ejercicio no soportado todavía: {exercise.type}</Alert>
      })}

      {lessonDone && (
        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-emerald-300 bg-emerald-50 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900 dark:bg-emerald-950/60">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold text-emerald-900 dark:text-emerald-200">
              <CheckIcon width={20} height={20} strokeWidth={3} /> ¡Lección completada!
            </p>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">
              {data.next ? `Sigue con: ${data.next.title}` : 'Terminaste todas las lecciones de este curso.'}
            </p>
          </div>
          {data.next ? (
            <Link to={`/lecciones/${data.next.id}`} className={buttonClass('primary', 'gap-1.5')}>
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
        <nav className="mt-12 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-800">
          {data.prev && <NavCard lesson={data.prev} direction="prev" />}
          {data.next && <NavCard lesson={data.next} direction="next" />}
        </nav>
      )}
    </>
  )
}
