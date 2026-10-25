import { AuthForm } from '../AuthPanel'

const JOURNEY = [
  { tile: 'bg-c1', title: 'Entiende cómo funciona una app', text: 'Frontend, backend, API y bases de datos, sin jerga.' },
  { tile: 'bg-c2', title: 'Domina tus datos', text: 'SQL para consultar y organizar la información.' },
  { tile: 'bg-c3', title: 'Programa la lógica', text: 'Python para darle vida a tu idea.' },
  { tile: 'bg-c4', title: 'Suma agentes de IA', text: 'Los conceptos para automatizar con IA.' },
  { tile: null, title: 'Publícalo', text: 'Llévalo a internet para que otros lo usen.' },
]

export default function Landing() {
  return (
    <>
      <section className="grid gap-12 pb-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">
            Construye{' '}
            <span className="box-decoration-clone rounded-md bg-c1 px-2 text-[#111]">tu propio SaaS</span>{' '}
            entendiendo solo lo indispensable.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Frontend, backend, base de datos y despliegue, explicados para quien construye con IA. Practica sin instalar
            nada y recibe pistas cuando te atasques.
          </p>
        </div>
        <div className="flex lg:col-span-5 lg:justify-end">
          <AuthForm />
        </div>
      </section>

      <section className="pb-12">
        <h2 className="font-display text-3xl">De la idea al producto publicado</h2>
        <p className="mt-2 text-muted">Así se construyó esta misma plataforma.</p>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {JOURNEY.map((step, i) => {
            const upcoming = step.tile === null
            return (
              <li
                key={step.title}
                className={`lab-card flex flex-col p-5 ${upcoming ? 'border-dashed bg-transparent shadow-none' : ''}`}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-full border-2 font-display text-lg ${
                    upcoming ? 'border-dashed border-muted text-muted' : `border-ink ${step.tile} text-[#111]`
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg leading-tight">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{step.text}</p>
                {upcoming && (
                  <span className="mt-3 inline-flex self-start rounded-full border-2 border-dashed border-muted px-2.5 py-0.5 text-xs font-bold text-muted">
                    Próximamente
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </section>
    </>
  )
}
