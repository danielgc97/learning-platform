import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { apiFetch } from '../api'
import { useApi } from '../useApi'
import SqlExercise from '../SqlExercise'
import PythonExercise from '../PythonExercise'

export default function Lesson() {
  const { id } = useParams()
  const { data, error, loading } = useApi(`/lessons/${id}`)
  const [completed, setCompleted] = useState(new Set())

  useEffect(() => {
    apiFetch('/progress')
      .then((items) => setCompleted(new Set(items.map((i) => i.exercise_slug))))
      .catch(() => {})
  }, [])

  const markCompleted = (slug) => setCompleted((prev) => new Set(prev).add(slug))

  if (loading) return <p>Cargando lección...</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <>
      <p><Link to="/">← Cursos</Link></p>
      <ReactMarkdown>{data.content_md}</ReactMarkdown>
      {data.exercises.map((exercise) => {
        const props = {
          exercise,
          completed: completed.has(exercise.slug),
          onPassed: markCompleted,
        }
        if (exercise.type === 'sql') return <SqlExercise key={exercise.slug} {...props} />
        if (exercise.type === 'python') return <PythonExercise key={exercise.slug} {...props} />
        return <p key={exercise.slug}>Tipo de ejercicio no soportado todavía: {exercise.type}</p>
      })}
    </>
  )
}
