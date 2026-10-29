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
    <section className="lab-card my-12 overflow-hidden">
      <header className="flex items-center justify-between gap-3 border-b border-ink bg-c2 px-5 py-2.5 text-sm font-semibold text-[#111]">
        <span>Comprueba lo aprendido</span>
        {completed && !(verdict && !verdict.ok) && (
          <span className="inline-flex items-center gap-1 rounded-full border border-ink bg-c3 px-2.5 py-0.5 text-xs transition-[opacity,scale] duration-200 ease-(--ease-lab) starting:scale-95 starting:opacity-0 motion-reduce:starting:scale-100">
            <CheckIcon width={13} height={13} strokeWidth={3} /> Completado
          </span>
        )}
      </header>
      <fieldset className="p-5">
        <legend className="mb-5 font-display text-xl leading-snug">{exercise.statement}</legend>
        <div className="space-y-3">
          {options.map((option, i) => (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 px-4 py-3 transition-colors ${
                selected === i ? 'border-ink bg-c1 text-[#111]' : 'border-line hover:border-ink'
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
                className="mt-1.5 accent-[var(--accent)]"
              />
              <span className="leading-6">{option}</span>
            </label>
          ))}
        </div>
        <Button variant="primary" className="mt-5" onClick={verify} disabled={selected === null || busy}>
          Verificar
        </Button>
        {verdict && (
          <Alert tone={verdict.ok ? 'success' : 'error'}>
            {verdict.ok ? `✓ ¡Correcto! ${explanation ?? ''}` : '✗ No es esa. Intenta con otra opción.'}
          </Alert>
        )}
      </fieldset>
    </section>
  )
}
