import { AuthForm } from '../AuthPanel'
import { BRAND_TAGLINE } from '../brand'

const PRINCIPLES = [
  { tile: 'bg-c1', title: 'Practica en el navegador', text: 'SQL y Python se ejecutan al instante, sin instalar nada.' },
  { tile: 'bg-c2', title: 'Pistas, no soluciones', text: 'Si fallas, la IA te explica el error sin entregarte la respuesta.' },
  { tile: 'bg-c3', title: 'Solo lo indispensable', text: 'Directo a lo que necesitas para construir tus proyectos.' },
]

const STEPS = [
  { title: 'Lee una lección corta', text: 'Un concepto por lección, con ejemplos que puedes copiar.' },
  { title: 'Escribe y ejecuta', text: 'El código corre en tu navegador y ves el resultado al momento.' },
  { title: 'Verifica y pide una pista', text: 'Las pruebas dicen si está bien; la IA ayuda cuando te atascas.' },
]

function Terminal() {
  return (
    <div className="lab-card overflow-hidden">
      <div className="flex items-center gap-2 border-b-2 border-ink bg-panel px-4 py-2.5">
        <span className="size-3 rounded-full border-2 border-ink bg-c4" />
        <span className="size-3 rounded-full border-2 border-ink bg-c1" />
        <span className="size-3 rounded-full border-2 border-ink bg-c3" />
        <span className="ml-2 font-mono text-xs text-muted">ejercicio.sql</span>
      </div>
      <pre className="bg-code px-4 py-4 font-mono text-sm leading-6 text-code-ink">
        <span className="text-c1">SELECT</span> producto, cantidad * precio <span className="text-c1">AS</span> total{'\n'}
        <span className="text-c1">FROM</span> ventas{'\n'}
        <span className="text-c1">ORDER BY</span> total;
      </pre>
      <div className="space-y-3 p-4 text-sm text-[#111]">
        <p className="rounded-lg border-2 border-ink bg-c4 px-3 py-2">
          <b>✗ Casi.</b> La fila 1 no coincide con lo esperado.
        </p>
        <p className="rounded-lg border-2 border-ink bg-c2 px-3 py-2">
          <b>Pista:</b> tu cálculo está bien, pero el orden no. El enunciado pide de mayor a menor: ¿qué palabra invierte el
          orden de <code className="font-mono">ORDER BY</code>?
        </p>
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <>
      <section className="grid gap-12 pb-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex rounded-full border-2 border-ink bg-c3 px-3.5 py-1 text-sm font-bold text-[#111]">
            SQL · Python · Agentes de IA
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
            Aprende lo indispensable para{' '}
            <span className="box-decoration-clone rounded-md bg-c1 px-2 text-[#111]">construir con IA</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{BRAND_TAGLINE}</p>
        </div>
        <div className="flex lg:col-span-5 lg:justify-end">
          <AuthForm />
        </div>
      </section>

      <section className="grid gap-6 pb-16 sm:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className={`lab-card ${p.tile} p-6 text-[#111]`}>
            <span className="flex size-9 items-center justify-center rounded-full border-2 border-ink bg-white font-display text-lg">
              {i + 1}
            </span>
            <h2 className="mt-4 font-display text-2xl leading-tight">{p.title}</h2>
            <p className="mt-2 leading-6">{p.text}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-12 pb-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-4xl">Así se practica</h2>
          <ol className="mt-8 space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-c1 font-display text-lg text-[#111] shadow-[2px_2px_0_0_var(--shadow)]">
                  {i + 1}
                </span>
                <div>
                  <p className="text-lg font-bold">{s.title}</p>
                  <p className="leading-6 text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Terminal />
      </section>
    </>
  )
}
