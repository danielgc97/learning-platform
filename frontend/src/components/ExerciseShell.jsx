import { CheckIcon } from './Icons'

export default function ExerciseShell({ label, completed, statement, editor, actions, result }) {
  return (
    <section className="my-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3 dark:border-slate-800">
        <span className="text-xs font-semibold tracking-wide text-teal-700 uppercase dark:text-teal-400">
          Ejercicio · {label}
        </span>
        {completed && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <CheckIcon width={16} height={16} /> Completado
          </span>
        )}
      </header>
      <p className="px-5 pt-4 leading-7">{statement}</p>
      <div className="grid gap-5 p-5 lg:grid-cols-2">
        <div>
          {editor}
          <div className="mt-3 flex flex-wrap items-center gap-2">{actions}</div>
        </div>
        <div className="min-h-40 rounded-lg border border-dashed border-slate-300 p-4 dark:border-slate-700">
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">Resultado</p>
          {result ?? <p className="text-sm text-slate-500">Ejecuta tu código para ver el resultado aquí.</p>}
        </div>
      </div>
    </section>
  )
}
