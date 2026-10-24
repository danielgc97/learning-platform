import { Link } from 'react-router-dom'
import { useApi } from '../useApi'

export default function Catalog() {
  const { data, error, loading } = useApi('/courses')

  if (loading) return <p>Cargando cursos...</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <>
      <h1>Cursos</h1>
      {data.map((course) => (
        <Link key={course.slug} to={`/cursos/${course.slug}`} className="card">
          <h2 style={{ margin: 0 }}>{course.title}</h2>
          <p style={{ margin: 0 }}>{course.description}</p>
        </Link>
      ))}
    </>
  )
}
