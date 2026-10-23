import { useState } from 'react'
import { runPython } from './python/runPython'
import { pythonExample } from './exercises/pythonExample'

export default function PythonExercise() {
  const [code, setCode] = useState(pythonExample.starterCode)
  const [output, setOutput] = useState(null)
  const [error, setError] = useState(null)
  const [running, setRunning] = useState(false)

  async function run(verify) {
    setRunning(true)
    setError(null)
    setOutput(null)
    try {
      setOutput(await runPython(code, verify ? pythonExample.tests : null))
    } catch (e) {
      setError(e.message)
    } finally {
      setRunning(false)
    }
  }

  return (
    <section style={{ padding: '1rem', textAlign: 'left' }}>
      <h2>Ejercicio Python (prueba)</h2>
      <p>{pythonExample.statement}</p>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        style={{ width: '100%', fontFamily: 'monospace' }}
      />
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
