import { useState } from 'react'
import { runSql } from '../sql/runSql'
import Button from './Button'
import { PlayIcon } from './Icons'
import ResultTable from './ResultTable'

// Datos de juguete para la demostración de la portada; nada de esto toca la base real.
const SETUP = `CREATE TABLE ventas (producto VARCHAR, categoria VARCHAR, precio DOUBLE);
INSERT INTO ventas VALUES
  ('Laptop', 'Cómputo', 3200.0),
  ('Mouse', 'Accesorios', 45.5),
  ('Teclado', 'Accesorios', 120.0),
  ('Monitor', 'Cómputo', 850.0),
  ('Silla', 'Muebles', 400.0);`

const PRIMERA_CONSULTA = `SELECT producto, precio
FROM ventas
WHERE precio > 100;`

export default function SqlDemo() {
  const [query, setQuery] = useState(PRIMERA_CONSULTA)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [running, setRunning] = useState(false)
  const [ranOnce, setRanOnce] = useState(false)

  async function run() {
    setRunning(true)
    setError(null)
    try {
      setResult(await runSql(query, SETUP))
      setRanOnce(true)
    } catch (e) {
      setResult(null)
      setError(e.message)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="lab-card overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-ink bg-c1 px-5 py-2.5 text-sm font-semibold text-[#111]">
        <span>Pruébalo aquí · SQL</span>
        <span className="text-xs font-normal">Sin cuenta y sin instalar nada</span>
      </header>

      <div className="grid lg:grid-cols-2">
        <div className="p-5">
          <p className="text-sm leading-6 text-muted">
            Una tabla <code className="font-mono">ventas</code> con cinco productos. Pulsa Ejecutar y mira el
            resultado; luego cambia el <code className="font-mono">100</code> por otro número.
          </p>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            rows={4}
            aria-label="Consulta SQL de prueba"
            className="mt-3 w-full resize-y rounded-lg border border-ink bg-code p-3 font-mono text-sm leading-6 text-code-ink focus:outline-2 focus:outline-offset-2 focus:outline-accent"
          />
          <Button variant="primary" onClick={run} disabled={running} className="mt-3 min-h-11">
            <PlayIcon width={14} height={14} className="mr-1.5" />
            {running ? 'Ejecutando…' : 'Ejecutar'}
          </Button>
          {!ranOnce && (
            <p className="mt-2 text-xs leading-5 text-muted">
              La primera vez tarda unos segundos: se está cargando una base de datos entera dentro de tu navegador.
            </p>
          )}
        </div>

        <div className="min-h-40 border-t border-ink bg-panel p-5 lg:border-t-0 lg:border-l">
          <p className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">Resultado</p>
          {error && (
            <>
              <p className="text-sm leading-6">
                La consulta tiene un error. Esto es lo que responde la base de datos, tal cual:
              </p>
              <pre className="mt-2 overflow-x-auto font-mono text-xs leading-5 text-bad">{error}</pre>
              <p className="mt-3 text-xs leading-5 text-muted">
                Dentro de las lecciones, la IA te explica qué significa y te da una pista, sin resolverte el
                ejercicio.
              </p>
            </>
          )}
          {result && <ResultTable columns={result.columns} rows={result.rows} />}
          {!result && !error && <p className="text-sm text-muted">Pulsa Ejecutar para ver el resultado aquí.</p>}
        </div>
      </div>
    </div>
  )
}
