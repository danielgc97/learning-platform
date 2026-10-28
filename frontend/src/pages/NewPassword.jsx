import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import { useSession } from '../useSession'
import { authMessage, fieldErrorClass, inputClass, labelClass, MIN_PASSWORD } from '../auth'
import Alert from '../components/Alert'
import Button, { buttonClass } from '../components/Button'

export default function NewPassword() {
  const { session, loading } = useSession()
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(null)
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  if (loading) return <p className="text-muted">Cargando...</p>

  // El enlace del correo crea una sesión temporal. Sin ella, no hay nada que cambiar.
  if (!session) {
    return (
      <div className="lab-card max-w-md p-6">
        <h1 className="font-display text-2xl leading-tight">Este enlace ya no sirve</h1>
        <p className="mt-3 leading-7 text-muted">
          Los enlaces de recuperación vencen por seguridad. Vuelve a la portada y pide uno nuevo desde
          «¿Olvidaste tu contraseña?».
        </p>
        <Link to="/" className={buttonClass('primary', 'mt-5')}>Ir a la portada</Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="lab-card max-w-md p-6">
        <h1 className="font-display text-2xl leading-tight">Contraseña actualizada</h1>
        <p className="mt-3 leading-7 text-muted">
          Guarda la nueva en un lugar seguro. Ya puedes seguir con tus cursos.
        </p>
        {/* Recarga completa: así la app olvida que veníamos de un enlace de recuperación. */}
        <button onClick={() => window.location.assign('/')} className={buttonClass('primary', 'mt-5')}>
          Ir a mis cursos
        </button>
      </div>
    )
  }

  function validate() {
    const next = {}
    if (!password) next.password = 'Escribe tu contraseña nueva.'
    else if (password.length < MIN_PASSWORD) next.password = `Usa al menos ${MIN_PASSWORD} caracteres.`
    if (repeat !== password) next.repeat = 'Las dos contraseñas no coinciden.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function submit(e) {
    e.preventDefault()
    if (busy || !validate()) return
    setBusy(true)
    setMessage(null)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setMessage({ tone: 'error', text: authMessage(error) })
    else setDone(true)
    setBusy(false)
  }

  return (
    <form onSubmit={submit} noValidate className="lab-card max-w-md p-6">
      <h1 className="font-display text-2xl leading-tight">Crea tu contraseña nueva</h1>
      <p className="mt-2 text-sm text-muted">Escríbela dos veces para evitar errores de tipeo.</p>

      <div className="mt-5 space-y-3">
        <div>
          <label htmlFor="new-password" className={labelClass}>Contraseña nueva</label>
          <div className="relative mt-1">
            <input
              id="new-password"
              name="new-password"
              type={show ? 'text' : 'password'}
              autoComplete="new-password"
              className={`${inputClass} pr-24`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'new-password-error' : 'new-password-hint'}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-pressed={show}
              aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute inset-y-0 right-1 my-auto h-9 cursor-pointer rounded-md px-2 text-sm font-semibold text-muted underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            >
              {show ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password ? (
            <p id="new-password-error" className={fieldErrorClass}>{errors.password}</p>
          ) : (
            <p id="new-password-hint" className="mt-1 text-sm text-muted">Mínimo {MIN_PASSWORD} caracteres.</p>
          )}
        </div>

        <div>
          <label htmlFor="repeat-password" className={labelClass}>Repite la contraseña</label>
          <input
            id="repeat-password"
            name="repeat-password"
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            className={`${inputClass} mt-1`}
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            aria-invalid={Boolean(errors.repeat)}
            aria-describedby={errors.repeat ? 'repeat-password-error' : undefined}
          />
          {errors.repeat && <p id="repeat-password-error" className={fieldErrorClass}>{errors.repeat}</p>}
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={busy} className="mt-5 min-h-11 w-full">
        {busy ? 'Guardando…' : 'Guardar contraseña'}
      </Button>

      {message && <Alert tone={message.tone}>{message.text}</Alert>}
    </form>
  )
}
