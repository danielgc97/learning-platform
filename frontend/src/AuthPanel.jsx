import { useState } from 'react'
import { supabase } from './supabase'
import { useSession } from './useSession'
import Alert from './components/Alert'
import Button from './components/Button'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-teal-600 dark:border-slate-700 dark:bg-slate-950'

export function UserMenu() {
  const { session } = useSession()
  if (!session) return null
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden text-slate-600 sm:inline dark:text-slate-400">{session.user.email}</span>
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
    <form
      onSubmit={signIn}
      className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
    >
      <h2 className="text-lg font-bold">Empieza a practicar</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Crea tu cuenta o entra con tu correo.</p>
      <div className="mt-5 space-y-3">
        <input type="email" placeholder="Correo" autoComplete="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña (mínimo 6)" autoComplete="current-password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" variant="primary" disabled={busy} className="mt-5 w-full">Entrar</Button>
      <Button onClick={signUp} disabled={busy} className="mt-2 w-full">Crear cuenta</Button>
      {message && <Alert tone="info">{message}</Alert>}
    </form>
  )
}
