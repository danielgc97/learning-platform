import { useState } from 'react'
import { saveSubmission } from './api'
import Alert from './components/Alert'
import Button from './components/Button'
import { CheckIcon } from './components/Icons'

export default function QuizExercise({ exercise, completed, onPassed }) {
  const { options, correct, explanation } = exercise.spec
  const [selected, setSelected] = useState(null)
  const [verdict, setVerdict] = useState(null)
  const [busy, setBusy] = useState(false)

  async function verify() {
    if (selected === null) return
    setBusy(true)
    const ok = selected === correct
    setVerdict({ ok })
    await saveSubmission(exercise.slug, String(selected), ok)
    if (ok) onPassed(exercise.slug)
    setBusy(false)
  }

  return (
    <section className="my-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3 dark:border-slate-800">
        <span className="text-xs font-semibold tracking-wide text-teal-700 uppercase dark:text-teal-400">Comprueba lo aprendido</span>
        {completed && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <CheckIcon width={16} height={16} /> Completado
          </span>
        )}
      </header>
      <fieldset className="p-5">
        <legend className="mb-4 font-semibold leading-7">{exercise.statement}</legend>
        <div className="space-y-2">
          {options.map((option, i) => (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${
                selected === i
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
              }`}
            >
              <input
                type="radio"
                name={exercise.slug}
                checked={selected === i}
                onChange={() => {
                  setSelected(i)
                  setVerdict(null)
                }}
                className="mt-1.5 accent-teal-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <Button variant="primary" className="mt-4" onClick={verify} disabled={selected === null || busy}>
          Verificar
        </Button>
        {verdict && (
          <Alert tone={verdict.ok ? 'success' : 'error'}>
            {verdict.ok ? '✓ ¡Correcto! ' : '✗ No es esa. Intenta con otra opción. '}
            {verdict.ok && explanation}
          </Alert>
        )}
      </fieldset>
    </section>
  )
}
