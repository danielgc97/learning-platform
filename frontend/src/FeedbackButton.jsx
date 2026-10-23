import { useState } from 'react'

export default function FeedbackButton({ exerciseType, statement, studentCode, testResult }) {
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function ask() {
    setLoading(true)
    setError(null)
    setFeedback(null)
    try {
      const res = await fetch('http://127.0.0.1:8000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exercise_type: exerciseType,
          statement,
          student_code: studentCode,
          test_result: testResult,
        }),
      })
      if (!res.ok) throw new Error('No se pudo obtener ayuda en este momento.')
      setFeedback((await res.json()).feedback)
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
