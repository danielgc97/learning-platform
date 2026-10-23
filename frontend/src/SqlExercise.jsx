import { useState } from 'react'
import { runSql } from './sql/runSql'
import { compareResults } from './sql/compareResults'
import { sqlExample } from './exercises/sqlExample'
import FeedbackButton from './FeedbackButton'

export default function SqlExercise() {
  const [query, setQuery] = useState(sqlExample.starterQuery)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [verdict, setVerdict] = useState(null)
  const [running, setRunning] = useState(false)

  async function run(verify) {
    setRunning(true)
    setError(null)
    setVerdict(null)
    try {
      const res = await runSql(query)
      setResult(res)
      if (verify) setVerdict(compareResults(res, sqlExample.expected))
    } catch (e) {
      setResult(null)
      setError(e.message)
      if (verify) setVerdict({ ok: false, message: `Error al ejecutar la consulta: ${e.message}` })
    } finally {
      setRunning(false)
    }
  }

  return (
    <section style={{ padding: '1rem', textAlign: 'left' }}>
      <h2>Ejercicio SQL (prueba)</h2>
      <p>{sqlExample.statement}</p>
      <p>Tabla disponible: <code>ventas(id, producto, cantidad, precio)</code></p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={5}
        style={{ width: '100%', fontFamily: 'monospace' }}
      />
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
          statement={sqlExample.statement}
          studentCode={query}
          testResult={verdict.message}
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
