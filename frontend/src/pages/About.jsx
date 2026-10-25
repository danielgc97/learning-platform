import { Link } from 'react-router-dom'
import { buttonClass } from '../components/Button'
import { AUTHOR } from '../contact'

const PRINCIPLES = [
  { title: 'Una idea por lección', text: 'Lecciones cortas que se leen en minutos y se practican al momento.' },
  { title: 'Practicar para entender', text: 'SQL y Python corren en tu navegador, sin instalar nada.' },
  { title: 'Pistas, no soluciones', text: 'Si te atascas, la IA te orienta sin quitarte el descubrimiento.' },
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
        Lo indispensable para construir con IA, explicado sin vueltas.
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl">Por qué existe CortexLab</h2>
          <p className="mt-3 text-[1.05rem] leading-8">
            Hoy es posible construir herramientas y proyectos propios con ayuda de la IA, aunque no seas programador. Pero
            para dirigirla bien, revisar lo que genera y no perderte, hace falta entender unas pocas bases: cómo se consultan
            los datos, cómo funciona el código y cómo se conectan las piezas de una aplicación.
          </p>
          <p className="mt-4 text-[1.05rem] leading-8">
            CortexLab reúne justo eso: lo mínimo indispensable, en español, con práctica real en lugar de teoría larga.
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
        <p className="font-display text-xl">¿Tienes preguntas o quieres acompañamiento?</p>
        <Link to="/contacto" className={buttonClass('primary')}>Escríbeme</Link>
      </div>
    </>
  )
}
