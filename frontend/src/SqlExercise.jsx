import { useState } from 'react'
import { runSql } from './sql/runSql'
import { compareResults } from './sql/compareResults'
import FeedbackButton from './FeedbackButton'
import { saveSubmission } from './api'
import Alert from './components/Alert'
import Button from './components/Button'
import CodeEditor from './components/CodeEditor'
import ExerciseShell from './components/ExerciseShell'
import { PlayIcon } from './components/Icons'
import ResultTable from './components/ResultTable'

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

  const hasResult = verdict || error || result

  return (
    <ExerciseShell
      label="SQL"
      completed={completed}
      statement={exercise.statement}
      editor={<CodeEditor value={query} onChange={setQuery} language="sql" height={190} />}
      actions={
        <>
          <Button onClick={() => run(false)} disabled={running}>
            <PlayIcon width={14} height={14} className="mr-1.5" />
            {running ? 'Ejecutando...' : 'Ejecutar'}
          </Button>
          <Button variant="primary" onClick={() => run(true)} disabled={running}>Verificar</Button>
        </>
      }
      result={
        hasResult && (
          <>
            {verdict && <Alert tone={verdict.ok ? 'success' : 'error'} className="mt-0">{verdict.ok ? '✓ ' : '✗ '}{verdict.message}</Alert>}
            {verdict && !verdict.ok && (
              <FeedbackButton
                exerciseType="sql"
                statement={exercise.statement}
                studentCode={query}
                testResult={verdict.message}
                submissionId={submissionId}
              />
            )}
            {error && !verdict && <pre className="overflow-x-auto font-mono text-sm text-bad">{error}</pre>}
            {result && <ResultTable columns={result.columns} rows={result.rows} />}
          </>
        )
      }
    />
  )
}
