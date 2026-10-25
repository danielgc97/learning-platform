import { CheckIcon } from './Icons'

export default function ExerciseShell({ label, completed, statement, editor, actions, result }) {
  return (
    <section className="lab-card my-12 overflow-hidden">
      <header className="flex items-center justify-between gap-3 border-b-2 border-ink bg-c1 px-5 py-2.5 text-sm font-bold text-[#111]">
        <span>Ejercicio · {label}</span>
        {completed && (
          <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-c3 px-2.5 py-0.5 text-xs">
            <CheckIcon width={13} height={13} strokeWidth={3} /> Completado
          </span>
        )}
      </header>
      <p className="px-5 pt-5 text-[1.05rem] leading-8">{statement}</p>
      <div className="grid lg:grid-cols-2">
        <div className="p-5">
          {editor}
          <div className="mt-3 flex flex-wrap items-center gap-3">{actions}</div>
        </div>
        <div className="min-h-40 border-t-2 border-ink bg-panel p-5 lg:border-t-0 lg:border-l-2">
          <p className="mb-3 text-xs font-bold tracking-wider text-muted uppercase">Resultado</p>
          {result ?? <p className="text-sm text-muted">Ejecuta tu código para ver el resultado aquí.</p>}
        </div>
      </div>
    </section>
  )
}
