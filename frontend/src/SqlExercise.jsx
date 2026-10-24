import { useState } from 'react'
import { runSql } from './sql/runSql'
import { compareResults } from './sql/compareResults'
import FeedbackButton from './FeedbackButton'
import { saveSubmission } from './api'

export default function SqlExercise({ exercise, completed, onPassed }) {
  const { setup_sql: setupSql, expected } = exercise.spec
  const [query, setQuery] = useState(exercise.starter_code)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [verdict, setVerdict] = useState(null)
  const [submissionId, setSubmissionId] = useState(null)
  const [running, setRunning] = useState(false)

  async function run(verify) {
    setRunning(true)
    setError(null)
    setVerdict(null)
    setSubmissionId(null)
    try {
      const res = await runSql(query, setupSql)
      setResult(res)
      if (verify) {
        const v = compareResults(res, expected)
        setVerdict(v)
        setSubmissionId(await saveSubmission(exercise.slug, query, v.ok))
        if (v.ok) onPassed(exercise.slug)
      }
    } catch (e) {
      setResult(null)
      setError(e.message)
      if (verify) {
        setVerdict({ ok: false, message: `Error al ejecutar la consulta: ${e.message}` })
        setSubmissionId(await saveSubmission(exercise.slug, query, false))
      }
    } finally {
      setRunning(false)
    }
  }

  return (
    <section className="exercise">
      <h3>Ejercicio SQL {completed && <span style={{ color: 'green' }}>✓ completado</span>}</h3>
      <p>{exercise.statement}</p>
      <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows={5} />
      <button type="button" onClick={() => run(false)} disabled={running}>
        {running ? 'Ejecutando...' : 'Ejecutar'}
      </button>
      <button type="button" onClick={() => run(true)} disabled={running}>
        Verificar
      </button>
      {verdict && (
        <p style={{ color: verdict.ok ? 'green' : 'crimson' }}>
          {verdict.ok ? '✓ ' : '✗ '}
          {verdict.message}
        </p>
      )}
      {verdict && !verdict.ok && (
        <FeedbackButton
          exerciseType="sql"
          statement={exercise.statement}
          studentCode={query}
          testResult={verdict.message}
          submissionId={submissionId}
        />
      )}
      {error && <pre style={{ color: 'crimson' }}>{error}</pre>}
      {result && (
        <table>
          <thead>
            <tr>{result.columns.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i}>{row.map((v, j) => <td key={j}>{String(v)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
