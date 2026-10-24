import { useState } from 'react'
import { supabase } from './supabase'

export default function FeedbackButton({ exerciseType, statement, studentCode, testResult }) {
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function ask() {
    setLoading(true)
    setError(null)
    setFeedback(null)
    try {
      const { data } = await supabase.auth.getSession()
      if (!data.session) throw new Error('Inicia sesión para pedir ayuda.')
      const res = await fetch('http://127.0.0.1:8000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({
          exercise_type: exerciseType,
          statement,
          student_code: studentCode,
          test_result: testResult,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.detail ?? 'No se pudo obtener ayuda en este momento.')
      }
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
