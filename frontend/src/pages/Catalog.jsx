import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import { PHASES } from '../components/phases'
import ProgressBar from '../components/ProgressBar'
import { useApi } from '../useApi'

function CourseCard({ course }) {
  const empty = course.exercise_count === 0
  return (
    <Link
      to={`/cursos/${course.slug}`}
      className="lab-card lab-lift flex flex-col p-5 text-ink no-underline"
    >
      <h3 className="font-display text-xl leading-tight">{course.title}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-6 text-muted">{course.description}</p>
      <p className="mt-4 text-xs font-semibold text-muted">
        {course.lesson_count} {course.lesson_count === 1 ? 'lección' : 'lecciones'} ·{' '}
        {empty ? 'En preparación' : `${course.completed_count}/${course.exercise_count} completados`}
      </p>
      <ProgressBar value={course.completed_count} max={course.exercise_count} className="mt-2" />
    </Link>
  )
}

export default function Catalog() {
  const { data, error, loading } = useApi('/courses')

  if (loading) return <p className="text-muted">Cargando cursos...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  const bySlug = Object.fromEntries(data.map((course) => [course.slug, course]))
  const known = new Set(PHASES.flatMap((phase) => phase.courses))
  const others = data.filter((course) => !known.has(course.slug))

  const sections = PHASES.map((phase) => ({ ...phase, items: phase.courses.map((slug) => bySlug[slug]).filter(Boolean) }))
  if (others.length) sections.push({ key: 'otros', title: 'Otros', text: '', tile: 'bg-panel', items: others })

  return (
    <>
      <h1 className="font-display text-5xl">Tu ruta</h1>
      <p className="mt-2 text-lg text-muted">De la idea a tu propio SaaS publicado, en cuatro fases.</p>

      <div className="mt-10 space-y-14">
        {sections.map((phase, index) => {
          const done = phase.items.reduce((sum, c) => sum + c.completed_count, 0)
          const total = phase.items.reduce((sum, c) => sum + c.exercise_count, 0)
          return (
            <section key={phase.key}>
              <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-lg text-[#111] shadow-[2px_2px_0_0_var(--shadow)] ${phase.tile}`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-3xl leading-none">{phase.title}</h2>
                  {phase.text && <p className="mt-1 text-sm text-muted">{phase.text}</p>}
                </div>
                <span className="text-sm font-semibold text-muted">{total === 0 ? 'En preparación' : `${done}/${total}`}</span>
              </header>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {phase.items.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
