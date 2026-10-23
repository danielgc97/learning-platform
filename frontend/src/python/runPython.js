import { loadPyodide, version } from 'pyodide'

let pyodidePromise

function getPyodide() {
  pyodidePromise ??= loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/v${version}/full/`,
  })
  return pyodidePromise
}

const lastLine = (message) => message.trim().split('\n').pop()

// Único punto de ejecución de Python: si luego se migra al servidor, solo cambia esta función.
export async function runPython(code, tests) {
  const pyodide = await getPyodide()

  let stdout = ''
  pyodide.setStdout({ batched: (line) => (stdout += line + '\n') })
  pyodide.setStderr({ batched: (line) => (stdout += line + '\n') })

  const namespace = pyodide.globals.get('dict')()
  try {
    await pyodide.loadPackagesFromImports(code)
    const result = await pyodide.runPythonAsync(code, { globals: namespace })
    const output = { stdout, result: result === undefined ? null : String(result), verdict: null }

    if (tests) {
      try {
        await pyodide.runPythonAsync(tests, { globals: namespace })
        output.verdict = { ok: true, message: 'Correcto.' }
      } catch (e) {
        const line = lastLine(e.message)
        const message = line.startsWith('AssertionError: ')
          ? line.slice('AssertionError: '.length)
          : `Tu código falló al probarlo: ${line}`
        output.verdict = { ok: false, message }
      }
    }
    return output
  } finally {
    namespace.destroy()
  }
}
