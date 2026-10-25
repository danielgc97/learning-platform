import { useState } from 'react'
import { supabase } from './supabase'
import { useSession } from './useSession'
import Alert from './components/Alert'
import Button from './components/Button'

const inputClass =
  'w-full border border-line bg-transparent px-3 py-2.5 font-mono text-sm placeholder:text-muted focus:border-ink focus:outline-none'

export function UserMenu() {
  const { session } = useSession()
  if (!session) return null
  return (
    <div className="flex items-center gap-3">
      <span className="hidden font-mono text-xs text-muted sm:inline">{session.user.email}</span>
      <Button variant="ghost" onClick={() => supabase.auth.signOut()}>Salir</Button>
    </div>
  )
}

export function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [busy, setBusy] = useState(false)

  function missingFields() {
    if (email.trim() && password) return false
    setMessage('Escribe tu correo y tu contraseña.')
    return true
  }

  async function signIn(e) {
    e?.preventDefault()
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

  return (
    <form onSubmit={signIn} className="w-full max-w-sm border border-ink bg-paper">
      <div className="border-b border-ink px-5 py-2.5 font-mono text-xs tracking-widest uppercase">Acceso</div>
      <div className="p-5">
        <h2 className="font-display text-3xl leading-none">Empieza a practicar</h2>
        <p className="mt-2 text-sm text-muted">Crea tu cuenta o entra con tu correo.</p>
        <div className="mt-5 space-y-3">
          <input type="email" placeholder="correo@ejemplo.com" autoComplete="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="contraseña (mínimo 6)" autoComplete="current-password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" variant="primary" disabled={busy} className="mt-5 w-full">Entrar</Button>
        <Button onClick={signUp} disabled={busy} className="mt-2 w-full">Crear cuenta</Button>
        {message && <Alert tone="info">{message}</Alert>}
      </div>
    </form>
  )
}
