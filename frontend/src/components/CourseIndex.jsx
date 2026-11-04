import { Link } from 'react-router-dom'
import { CheckIcon } from './Icons'

// Agrupa las lecciones por módulo conservando el orden en que vienen del curso.
function byModule(items) {
  const groups = []
  for (const item of items) {
    const last = groups.at(-1)
    if (last && last.title === item.module_title) last.lessons.push(item)
    else groups.push({ title: item.module_title, lessons: [item] })
  }
  return groups
}

// El índice del curso: dónde estás, por dónde vas y qué te queda. Es "el movimiento"
// del sistema aplicado a una lista: un riel de 1px a la izquierda, y la lección actual
// se marca pintando de acento su trozo del riel (misma idea que .lab-mark-left, pero
// con borde para que la marca tape la línea gris en lugar de sumarse a ella).
export default function CourseIndex({ items, currentId, courseSlug, courseTitle, onNavigate }) {
  const doneExercises = items.reduce((n, l) => n + l.completed_count, 0)
  const totalExercises = items.reduce((n, l) => n + l.exercise_count, 0)
  let number = 0

  return (
    <nav aria-label="Índice del curso">
      <p className="text-[13px] leading-5 font-semibold">
        <Link to={`/cursos/${courseSlug}`} onClick={onNavigate} className="text-ink no-underline hover:underline">
          {courseTitle}
        </Link>
      </p>
      <p className="text-[13px] text-muted tabular-nums">
        {doneExercises} de {totalExercises} ejercicios hechos
      </p>

      <ol className="mt-4 border-l border-line">
        {byModule(items).map((group) => (
          <li key={group.title}>
            <p className="py-2 pl-4 text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
              {group.title}
            </p>
            <ol>
              {group.lessons.map((lesson) => {
                number += 1
                const current = lesson.id === currentId
                const done = lesson.exercise_count > 0 && lesson.completed_count === lesson.exercise_count
                return (
                  <li key={lesson.id}>
                    <Link
                      to={`/lecciones/${lesson.id}`}
                      onClick={onNavigate}
                      aria-current={current ? 'page' : undefined}
                      // -ml-px pone el borde del enlace justo encima del riel de la lista.
                      className={`-ml-px flex items-baseline gap-2 border-l py-1.5 pl-4 text-sm leading-6 no-underline transition-colors ${
                        current ? 'border-accent font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'
                      }`}
                    >
                      <span className="w-5 shrink-0 text-right text-[12px] text-muted tabular-nums">{number}</span>
                      <span className="flex-1">{lesson.title}</span>
                      {done && (
                        <>
                          <CheckIcon width={13} height={13} strokeWidth={3} className="shrink-0 translate-y-0.5 text-ok" />
                          <span className="sr-only">completada</span>
                        </>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  )
}
