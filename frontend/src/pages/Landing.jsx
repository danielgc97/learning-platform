import { AuthForm } from '../AuthPanel'
import { buttonClass } from '../components/Button'
import SqlDemo from '../components/SqlDemo'

// Los cuatro pasos son las cuatro fases del catálogo, en el mismo orden.
const JOURNEY = [
  {
    tile: 'tint-1',
    title: 'Entender',
    text: 'Cómo funciona una app por dentro y cómo dirigir a la IA sin perder el control.',
  },
  {
    tile: 'tint-2',
    title: 'Construir',
    text: 'Tus datos con SQL, la lógica con Python, tu servidor y tus pantallas.',
  },
  {
    tile: 'tint-3',
    title: 'Publicar',
    text: 'Llévalo a internet, con tu propio dominio, para que cualquiera lo use.',
  },
  {
    tile: 'tint-4',
    title: 'Tu proyecto',
    text: 'Termina con una tienda con inventario o una agenda de citas, de punta a punta.',
  },
]

export default function Landing() {
  return (
    <>
      {/* El primer golpe de vista es una hoja de cuaderno sobre el fondo del producto. */}
      <section className="pb-16">
        <div className="lab-sheet grid gap-10 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            {/* Un titular es un título, no una frase: cabe en dos líneas y el resto va debajo. */}
            <h1 className="font-display text-[clamp(2.75rem,1.5rem+5.5vw,7rem)] leading-[0.95]">Construye tu propio SaaS</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Una aplicación web que otros usan y pagan, hecha por ti con la IA como copiloto. Aprendes lo
              mínimo indispensable de cada pieza, practicas aquí mismo sin instalar nada y recibes pistas
              cuando te atasques.
            </p>
          </div>
          <div id="crear-cuenta" className="flex scroll-mt-24 lg:col-span-5 lg:justify-end">
            <AuthForm />
          </div>
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
                className={`flex size-9 items-center justify-center rounded-full font-display text-lg ${step.tile}`}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg leading-tight">{step.title}</h3>
              <p className="mt-2 flex-1 leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-4">
        <div className="lab-card flex flex-col items-start gap-5 bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
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
