import { AuthForm } from '../AuthPanel'
import { buttonClass } from '../components/Button'
import SqlDemo from '../components/SqlDemo'

// Los cuatro pasos son las cuatro fases del catálogo, en el mismo orden.
const JOURNEY = [
  {
    tile: 'bg-c1',
    title: 'Entender',
    text: 'Cómo funciona una app por dentro y cómo dirigir a la IA sin perder el control.',
  },
  {
    tile: 'bg-c2',
    title: 'Construir',
    text: 'Tus datos con SQL, la lógica con Python, tu servidor y tus pantallas.',
  },
  {
    tile: 'bg-c3',
    title: 'Publicar',
    text: 'Llévalo a internet, con tu propio dominio, para que cualquiera lo use.',
  },
  {
    tile: 'bg-c4',
    title: 'Tu proyecto',
    text: 'Termina con una tienda con inventario o una agenda de citas, de punta a punta.',
  },
]

export default function Landing() {
  return (
    <>
      <section className="grid gap-12 pb-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">
            Construye{' '}
            <span className="box-decoration-clone rounded-md bg-c1 px-2 text-[#111]">tu propio SaaS</span>{' '}
            entendiendo solo lo indispensable.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Una aplicación web que otros usan y pagan, hecha por ti con la IA como copiloto. Aprendes lo
            mínimo de cada pieza, practicas aquí mismo sin instalar nada y recibes pistas cuando te atasques.
          </p>
        </div>
        <div id="crear-cuenta" className="flex scroll-mt-24 lg:col-span-5 lg:justify-end">
          <AuthForm />
        </div>
      </section>

      <section className="pb-16">
        <h2 className="font-display text-3xl">Así se practica aquí</h2>
        <p className="mt-2 max-w-xl text-muted">
          Escribes código de verdad y ves el resultado al instante. Pruébalo sin crear cuenta.
        </p>
        <div className="mt-6">
          <SqlDemo />
        </div>
      </section>

      <section className="pb-16">
        <h2 className="font-display text-3xl">De la idea al producto publicado</h2>
        <p className="mt-2 text-muted">Así se construyó esta misma plataforma.</p>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((step, i) => (
            <li key={step.title} className="lab-card lab-reveal flex flex-col p-5">
              <span
                className={`flex size-9 items-center justify-center rounded-full border border-ink font-display text-lg text-[#111] ${step.tile}`}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg leading-tight">{step.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-4">
        <div className="lab-card flex flex-col items-start gap-5 bg-c2 p-6 text-[#111] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl leading-tight">Empieza por la primera lección</p>
            <p className="mt-2 leading-7">
              Crea tu cuenta y haz tu primer ejercicio hoy. No necesitas instalar nada.
            </p>
          </div>
          <a href="#crear-cuenta" className={buttonClass('primary', 'shrink-0')}>Crear mi cuenta</a>
        </div>
      </section>
    </>
  )
}
