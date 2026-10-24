import { Link, useParams } from 'react-router-dom'
import { useApi } from '../useApi'

export default function Course() {
  const { slug } = useParams()
  const { data, error, loading } = useApi(`/courses/${slug}`)

  if (loading) return <p>Cargando curso...</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <>
      <p><Link to="/">← Cursos</Link></p>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      {data.modules.map((module) => (
        <section key={module.slug}>
          <h2>{module.title}</h2>
          {module.lessons.map((lesson) => (
            <Link key={lesson.id} to={`/lecciones/${lesson.id}`} className="card">
              {lesson.title}
            </Link>
          ))}
        </section>
      ))}
    </>
  )
}
