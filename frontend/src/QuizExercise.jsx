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
    <section className="my-12 border border-ink">
      <header className="flex items-center justify-between gap-3 border-b border-ink px-4 py-2 font-mono text-xs tracking-widest uppercase">
        <span>Comprueba lo aprendido</span>
        {completed && (
          <span className="inline-flex items-center gap-1 text-ok">
            <CheckIcon width={14} height={14} strokeWidth={3} /> Completado
          </span>
        )}
      </header>
      <fieldset className="p-5">
        <legend className="mb-5 font-display text-2xl leading-snug">{exercise.statement}</legend>
        <div className="space-y-2">
          {options.map((option, i) => (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-3 border px-4 py-3 transition-colors ${
                selected === i ? 'border-ink bg-panel' : 'border-line hover:bg-panel'
              }`}
            >
              <span className="mt-0.5 font-mono text-xs text-muted">{String.fromCharCode(65 + i)}</span>
              <input
                type="radio"
                name={exercise.slug}
                checked={selected === i}
                onChange={() => {
                  setSelected(i)
                  setVerdict(null)
                }}
                className="mt-1.5 accent-[var(--accent)]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <Button variant="primary" className="mt-5" onClick={verify} disabled={selected === null || busy}>
          Verificar
        </Button>
        {verdict && (
          <Alert tone={verdict.ok ? 'success' : 'error'}>
            {verdict.ok ? `✓ Correcto. ${explanation ?? ''}` : '✗ No es esa. Intenta con otra opción.'}
          </Alert>
        )}
      </fieldset>
    </section>
  )
}
