import { AuthForm } from '../AuthPanel'
import { BRAND_TAGLINE } from '../brand'

const PRINCIPLES = [
  { title: 'Practica en el navegador', text: 'SQL y Python se ejecutan al instante, sin instalar nada.' },
  { title: 'Pistas, no soluciones', text: 'Si fallas, la IA te explica el error sin entregarte la respuesta.' },
  { title: 'Solo lo indispensable', text: 'Contenido en español, directo a lo que necesitas para construir.' },
]

const STEPS = [
  { title: 'Lee una lección corta', text: 'Un concepto por lección, con ejemplos que puedes copiar.' },
  { title: 'Escribe y ejecuta', text: 'El código corre en tu navegador y ves el resultado al momento.' },
  { title: 'Verifica y pide una pista', text: 'Las pruebas dicen si está bien; la IA ayuda cuando te atascas.' },
]

function Terminal() {
  return (
    <div className="border border-ink">
      <div className="border-b border-ink px-4 py-2 font-mono text-xs tracking-widest uppercase">ejercicio.sql</div>
      <pre className="bg-code px-4 py-4 font-mono text-sm leading-6 text-code-ink">
        <span className="text-accent">SELECT</span> producto, cantidad * precio <span className="text-accent">AS</span> total{'\n'}
        <span className="text-accent">FROM</span> ventas{'\n'}
        <span className="text-accent">ORDER BY</span> total;
      </pre>
      <div className="space-y-3 p-4 text-sm">
        <p className="border-l-4 border-bad bg-panel px-3 py-2">
          <span className="font-mono text-xs tracking-wider text-bad uppercase">Error</span>
          <br />
          La fila 1 no coincide con lo esperado.
        </p>
        <p className="border-l-4 border-accent bg-panel px-3 py-2">
          <span className="font-mono text-xs tracking-wider text-accent uppercase">Pista</span>
          <br />
          Tu cálculo está bien, pero el orden no: el enunciado pide de mayor a menor. ¿Qué palabra invierte el orden de{' '}
          <code className="font-mono">ORDER BY</code>?
        </p>
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <>
      <section className="grid gap-12 border-b border-ink pb-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">SQL · Python · Agentes de IA</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl">
            Aprende lo indispensable para <em className="text-accent">construir con IA</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{BRAND_TAGLINE}</p>
        </div>
        <div className="flex lg:col-span-5 lg:justify-end">
          <AuthForm />
        </div>
      </section>

      <section className="grid gap-px border-b border-ink bg-line sm:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className="bg-paper py-8 sm:px-6 sm:first:pl-0">
            <p className="font-mono text-xs text-accent">0{i + 1}</p>
            <h2 className="mt-3 font-display text-2xl">{p.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{p.text}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-12 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-4xl">Así se practica</h2>
          <ol className="mt-8 border-t border-line">
            {STEPS.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-line py-5">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm leading-6 text-muted">{s.text}</p>
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
