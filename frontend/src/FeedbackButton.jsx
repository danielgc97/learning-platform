import { useState } from 'react'
import { apiFetch } from './api'

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
    <div>
      <button type="button" onClick={ask} disabled={loading}>
        {loading ? 'Pensando...' : 'Pedir ayuda'}
      </button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {feedback && <p style={{ whiteSpace: 'pre-wrap' }}>💡 {feedback}</p>}
    </div>
  )
}
