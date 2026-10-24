import { AuthForm } from '../AuthPanel'
import { BRAND_TAGLINE } from '../brand'
import { CheckIcon, SparkIcon } from '../components/Icons'

const BENEFITS = [
  'Practica en el navegador, sin instalar nada.',
  'Pistas de IA que te orientan sin regalarte la solución.',
  'Contenido en español, directo a lo que necesitas.',
]

const STEPS = [
  { title: 'Lee una lección corta', text: 'Un concepto por lección, con ejemplos que puedes copiar.' },
  { title: 'Escribe y ejecuta', text: 'SQL y Python corren al instante en tu navegador.' },
  { title: 'Verifica y pide una pista', text: 'Si fallas, la IA te explica el error sin darte la respuesta.' },
]

function DemoCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-2.5 dark:border-slate-800">
        <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="ml-2 text-xs text-slate-500">ejercicio.sql</span>
      </div>
      <pre className="bg-slate-900 px-4 py-4 font-mono text-sm leading-6 text-slate-100">
        <span className="text-teal-300">SELECT</span> producto, cantidad * precio <span className="text-teal-300">AS</span> total{'\n'}
        <span className="text-teal-300">FROM</span> ventas{'\n'}
        <span className="text-teal-300">ORDER BY</span> total;
      </pre>
      <div className="space-y-3 p-4 text-sm">
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          ✗ La fila 1 no coincide con lo esperado.
        </p>
        <p className="flex gap-2 rounded-md border border-teal-300 bg-teal-50 px-3 py-2 text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-100">
          <SparkIcon width={16} height={16} className="mt-0.5 shrink-0" />
          Tu cálculo está bien, pero el orden no: el enunciado pide de mayor a menor. ¿Qué palabra invierte el orden de ORDER BY?
        </p>
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <>
      <section className="grid gap-12 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-14">
        <div>
          <span className="inline-flex rounded-full border border-teal-300 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-200">
            SQL · Python · Agentes de IA
          </span>
          <h1 className="mt-5 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            Aprende lo indispensable para <span className="text-teal-600 dark:text-teal-400">construir con IA</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">{BRAND_TAGLINE}</p>
          <ul className="mt-6 space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                  <CheckIcon width={12} height={12} strokeWidth={3} />
                </span>
                <span className="text-slate-700 dark:text-slate-300">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex lg:justify-end">
          <AuthForm />
        </div>
      </section>

      <section className="grid gap-10 border-t border-slate-200 py-14 lg:grid-cols-2 lg:items-center dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Así se practica</h2>
          <ol className="mt-6 space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-slate-600 dark:text-slate-400">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <DemoCard />
      </section>
    </>
  )
}
