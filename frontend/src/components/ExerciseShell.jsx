import { CheckIcon } from './Icons'

export default function ExerciseShell({ label, completed, statement, editor, actions, result }) {
  return (
    <section className="my-12 border border-ink">
      <header className="flex items-center justify-between gap-3 border-b border-ink px-4 py-2 font-mono text-xs tracking-widest uppercase">
        <span>Ejercicio / {label}</span>
        {completed && (
          <span className="inline-flex items-center gap-1 text-ok">
            <CheckIcon width={14} height={14} strokeWidth={3} /> Completado
          </span>
        )}
      </header>
      <p className="px-5 pt-5 leading-7">{statement}</p>
      <div className="grid lg:grid-cols-2">
        <div className="p-5">
          {editor}
          <div className="mt-3 flex flex-wrap items-center gap-2">{actions}</div>
        </div>
        <div className="min-h-40 border-t border-line p-5 lg:border-t-0 lg:border-l">
          <p className="mb-3 font-mono text-xs tracking-widest text-muted uppercase">Salida</p>
          {result ?? <p className="text-sm text-muted">Ejecuta tu código para ver el resultado aquí.</p>}
        </div>
      </div>
    </section>
  )
}
