import { useState } from 'react'
import { supabase } from './supabase'
import { useSession } from './useSession'

export default function AuthPanel() {
  const { session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [busy, setBusy] = useState(false)

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
      <span>
        {session.user.email}{' '}
        <button type="button" onClick={() => supabase.auth.signOut()}>Salir</button>
      </span>
    )
  }

  return (
    <div>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />{' '}
      <input type="password" placeholder="Contraseña (mín. 6)" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="button" onClick={signIn} disabled={busy}>Entrar</button>
      <button type="button" onClick={signUp} disabled={busy}>Crear cuenta</button>
      {message && <p>{message}</p>}
    </div>
  )
}
