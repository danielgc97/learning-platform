import { Link } from 'react-router-dom'
import { buttonClass } from '../components/Button'
import { AUTHOR } from '../contact'

const PRINCIPLES = [
  { title: 'De la idea al producto', text: 'Una ruta en cuatro fases: entender, construir, publicar y un proyecto de cierre.' },
  { title: 'Lo mínimo indispensable', text: 'Lecciones cortas, con una sola idea cada una y sin jerga innecesaria.' },
  { title: 'Práctica con pistas', text: 'Practica SQL y Python sin instalar nada y recibe pistas de la IA cuando te atasques, sin que te resuelva el ejercicio.' },
]

export default function About() {
  const initials = AUTHOR.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <>
      <span className="inline-flex rounded-full border-2 border-ink bg-c2 px-3.5 py-1 text-sm font-bold text-[#111]">Nosotros</span>
      <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
        Que cualquiera pueda construir{' '}
        <span className="box-decoration-clone rounded-md bg-c1 px-2 text-[#111]">su propio SaaS</span>.
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl">Por qué existe CortexLab</h2>
          <p className="mt-3 text-[1.05rem] leading-8">
            Hoy una idea de producto ya no depende de un equipo grande de ingenieros: con la IA como copiloto, una sola persona
            puede construir y publicar su propio SaaS. Lo que hace falta no es programarlo todo a mano, sino entender las piezas:
            cómo se conectan el frontend, el backend, la base de datos y el despliegue, para dirigir bien a la IA y revisar lo
            que genera.
          </p>
          <p className="mt-4 text-[1.05rem] leading-8">
            CortexLab reúne ese mínimo indispensable en una ruta que va de la idea al producto publicado, en español y con
            práctica real. La propia plataforma se construyó de esta manera.
          </p>

          <h2 className="mt-10 font-display text-2xl">Cómo enseñamos</h2>
          <ul className="mt-4 space-y-4">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-c1 font-display text-[#111]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold">{p.title}</p>
                  <p className="leading-6 text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="lab-card p-6">
            <div className="flex items-center gap-4">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-c3 font-display text-2xl text-[#111]">
                {initials}
              </span>
              <div>
                <p className="font-display text-xl leading-tight">{AUTHOR.name}</p>
                <p className="text-sm text-muted">{AUTHOR.role}</p>
              </div>
            </div>
            <p className="mt-5 leading-7">{AUTHOR.bio}</p>
            <ul className="mt-5 space-y-2 border-t-2 border-line pt-5 text-sm">
              {AUTHOR.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-accent">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="lab-card mt-14 flex flex-col items-start gap-4 bg-c1 p-6 text-[#111] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xl">¿Tienes preguntas o sugerencias?</p>
        <Link to="/soporte" className={buttonClass('primary')}>Escríbenos</Link>
      </div>
    </>
  )
}
