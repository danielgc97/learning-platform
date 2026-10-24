import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function AuthPanel() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  function missingFields() {
    if (email.trim() && password) return false
    setMessage('Escribe tu correo y tu contraseña.')
    return true
  }

  async function signIn() {
    if (missingFields()) return
    setBusy(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    setBusy(false)
  }

  async function signUp() {
    if (missingFields()) return
    setBusy(true)
    setMessage(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else if (!data.session) setMessage('Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.')
    setBusy(false)
  }

  if (session) {
    return (
      <p>
        Sesión iniciada como <strong>{session.user.email}</strong>{' '}
        <button type="button" onClick={() => supabase.auth.signOut()}>Salir</button>
      </p>
    )
  }

  return (
    <div style={{ padding: '1rem' }}>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña (mín. 6)" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="button" onClick={signIn} disabled={busy}>Entrar</button>
      <button type="button" onClick={signUp} disabled={busy}>Crear cuenta</button>
      {message && <p>{message}</p>}
    </div>
  )
}
