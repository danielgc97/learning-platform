import { useState } from 'react'
import { runPython } from './python/runPython'
import FeedbackButton from './FeedbackButton'
import { saveSubmission } from './api'
import Alert from './components/Alert'
import Button from './components/Button'
import CodeEditor from './components/CodeEditor'
import ExerciseShell from './components/ExerciseShell'
import { PlayIcon } from './components/Icons'

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

  const hasOutput = output && (output.stdout || output.result !== null)
  const verdict = output?.verdict

  let result = null
  if (running) {
    result = <p className="font-mono text-sm text-muted">Ejecutando... (la primera vez descarga Python, unos segundos)</p>
  } else if (output || error) {
    result = (
      <>
        {verdict && <Alert tone={verdict.ok ? 'success' : 'error'} className="mt-0">{verdict.ok ? '✓ ' : '✗ '}{verdict.message}</Alert>}
        {verdict && !verdict.ok && (
          <FeedbackButton
            exerciseType="python"
            statement={exercise.statement}
            studentCode={code}
            testResult={verdict.message}
            submissionId={submissionId}
          />
        )}
        {error && !verdict && <pre className="overflow-x-auto font-mono text-sm text-bad">{error}</pre>}
        {output && !hasOutput && !verdict && (
          <p className="text-sm text-muted">El código se ejecutó sin errores y no produjo salida.</p>
        )}
        {hasOutput && (
          <pre className="mt-3 overflow-x-auto bg-panel p-3 font-mono text-sm">
            {output.stdout}
            {output.result !== null && `=> ${output.result}`}
          </pre>
        )}
      </>
    )
  }

  return (
    <ExerciseShell
      label="Python"
      completed={completed}
      statement={exercise.statement}
      editor={<CodeEditor value={code} onChange={setCode} language="python" height={220} />}
      actions={
        <>
          <Button onClick={() => run(false)} disabled={running}>
            <PlayIcon width={14} height={14} className="mr-1.5" />
            Ejecutar
          </Button>
          <Button variant="primary" onClick={() => run(true)} disabled={running}>Verificar</Button>
        </>
      }
      result={result}
    />
  )
}
