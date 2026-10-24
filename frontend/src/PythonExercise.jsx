import { useState } from 'react'
import { runPython } from './python/runPython'
import FeedbackButton from './FeedbackButton'
import { saveSubmission } from './api'

export default function PythonExercise({ exercise, completed, onPassed }) {
  const [code, setCode] = useState(exercise.starter_code)
  const [output, setOutput] = useState(null)
  const [error, setError] = useState(null)
  const [submissionId, setSubmissionId] = useState(null)
  const [running, setRunning] = useState(false)

  async function run(verify) {
    setRunning(true)
    setError(null)
    setOutput(null)
    setSubmissionId(null)
    try {
      const out = await runPython(code, verify ? exercise.spec.tests : null)
      setOutput(out)
      if (verify) {
        setSubmissionId(await saveSubmission(exercise.slug, code, out.verdict.ok))
        if (out.verdict.ok) onPassed(exercise.slug)
      }
    } catch (e) {
      setError(e.message)
      if (verify) {
        const lastLine = e.message.trim().split('\n').pop()
        setOutput({
          stdout: '',
          result: null,
          verdict: { ok: false, message: `Error al ejecutar tu código: ${lastLine}` },
        })
        setSubmissionId(await saveSubmission(exercise.slug, code, false))
      }
    } finally {
      setRunning(false)
    }
  }

  return (
    <section className="exercise">
      <h3>Ejercicio Python {completed && <span style={{ color: 'green' }}>✓ completado</span>}</h3>
      <p>{exercise.statement}</p>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={8} />
      <button type="button" onClick={() => run(false)} disabled={running}>
        {running ? 'Ejecutando... (la primera vez descarga Python)' : 'Ejecutar'}
      </button>
      <button type="button" onClick={() => run(true)} disabled={running}>
        Verificar
      </button>
      {output?.verdict && (
        <p style={{ color: output.verdict.ok ? 'green' : 'crimson' }}>
          {output.verdict.ok ? '✓ ' : '✗ '}
          {output.verdict.message}
        </p>
      )}
      {output?.verdict && !output.verdict.ok && (
        <FeedbackButton
          exerciseType="python"
          statement={exercise.statement}
          studentCode={code}
          testResult={output.verdict.message}
          submissionId={submissionId}
        />
      )}
      {error && <pre style={{ color: 'crimson' }}>{error}</pre>}
      {output && !output.stdout && output.result === null && !output.verdict && (
        <p>El código se ejecutó sin errores y no produjo salida.</p>
      )}
      {output && (output.stdout || output.result !== null) && (
        <pre>
          {output.stdout}
          {output.result !== null && `=> ${output.result}`}
        </pre>
      )}
    </section>
  )
}
