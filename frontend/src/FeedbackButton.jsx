import { useState } from 'react'
import { apiFetch } from './api'
import Alert from './components/Alert'
import Button from './components/Button'
import Markdown from './components/Markdown'

export default function FeedbackButton({ exerciseType, statement, studentCode, testResult, submissionId }) {
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function ask() {
    setLoading(true)
    setError(null)
    setFeedback(null)
    try {
      const data = await apiFetch('/feedback', {
        method: 'POST',
        body: {
          exercise_type: exerciseType,
          statement,
          student_code: studentCode,
          test_result: testResult,
          submission_id: submissionId,
        },
      })
      setFeedback(data.feedback)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3">
      <Button onClick={ask} disabled={loading}>
        {loading ? 'Pensando...' : 'Pedir ayuda'}
      </Button>
      {error && <Alert tone="error">{error}</Alert>}
      {feedback && (
        <div className="mt-3 rounded-lg border-2 border-ink bg-c2 px-4 py-3 text-sm text-[#111]">
          <Markdown compact>{feedback}</Markdown>
        </div>
      )}
    </div>
  )
}
