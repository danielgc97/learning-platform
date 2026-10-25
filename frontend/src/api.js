import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

export async function apiFetch(path, { method = 'GET', body } = {}) {
  const { data } = await supabase.auth.getSession()
  if (!data.session) throw new Error('Inicia sesión para continuar.')
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.session.access_token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail ?? 'No se pudo completar la solicitud.')
  }
  return res.json()
}

// Guarda el intento. Si no hay sesión o falla, no interrumpe al alumno: devuelve null.
export async function saveSubmission(exerciseSlug, code, passed) {
  try {
    const res = await apiFetch(`/exercises/${exerciseSlug}/submissions`, {
      method: 'POST',
      body: { code, passed },
    })
    return res.submission_id
  } catch {
    return null
  }
}
