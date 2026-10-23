import { useState } from 'react'
import { runSql } from './sql/runSql'

export default function SqlExercise() {
  const [query, setQuery] = useState('SELECT * FROM ventas;')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [running, setRunning] = useState(false)

  async function run() {
    setRunning(true)
    setError(null)
    try {
      setResult(await runSql(query))
    } catch (e) {
      setResult(null)
      setError(e.message)
    } finally {
      setRunning(false)
    }
  }

  return (
    <section style={{ padding: '1rem', textAlign: 'left' }}>
      <h2>Ejercicio SQL (prueba)</h2>
      <p>Tabla disponible: <code>ventas(id, producto, cantidad, precio)</code></p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={5}
        style={{ width: '100%', fontFamily: 'monospace' }}
      />
      <button type="button" onClick={run} disabled={running}>
        {running ? 'Ejecutando...' : 'Ejecutar'}
      </button>
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
