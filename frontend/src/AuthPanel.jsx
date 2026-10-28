import { useState } from 'react'
import { supabase } from './supabase'
import { useSession } from './useSession'
import { authMessage, fieldErrorClass, inputClass, labelClass, linkButtonClass, MIN_PASSWORD } from './auth'
import Alert from './components/Alert'
import Button from './components/Button'

export function UserMenu() {
  const { session } = useSession()
  if (!session) return null
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted sm:inline">{session.user.email}</span>
      <Button variant="ghost" onClick={() => supabase.auth.signOut()}>Salir</Button>
    </div>
  )
}

export function AuthForm() {
  const [mode, setMode] = useState('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(null)
  const [pendingEmail, setPendingEmail] = useState(null)
  const [busy, setBusy] = useState(false)

  const isSignup = mode === 'signup'
  const isReset = mode === 'reset'

  function changeMode(next) {
    if (busy) return
    setMode(next)
    setErrors({})
    setMessage(null)
    setPendingEmail(null)
    setShowPassword(false)
  }

  function validate() {
    const next = {}
    if (!email.trim()) next.email = 'Escribe tu correo.'
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Revisa tu correo: parece incompleto.'
    if (isReset) {
      // En este modo solo pedimos el correo.
    } else if (!password) next.password = 'Escribe tu contraseña.'
    else if (isSignup && password.length < MIN_PASSWORD) next.password = `Usa al menos ${MIN_PASSWORD} caracteres.`
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function submit(e) {
    e.preventDefault()
    if (busy || !validate()) return
    const address = email.trim()
    setBusy(true)
    setMessage(null)
    setPendingEmail(null)

    if (isReset) {
      const { error } = await supabase.auth.resetPasswordForEmail(address, {
        redirectTo: `${window.location.origin}/nueva-contrasena`,
      })
      // No revelamos si la cuenta existe: el mensaje es el mismo en los dos casos.
      setMessage(
        error && error.code === 'over_email_send_rate_limit'
          ? { tone: 'error', text: authMessage(error) }
          : {
              tone: 'success',
              text: `Si existe una cuenta con ${address}, te enviamos un enlace para crear una contraseña nueva. Revisa también la carpeta de spam.`,
            },
      )
    } else if (isSignup) {
      const { data, error } = await supabase.auth.signUp({ email: address, password })
      if (error) setMessage({ tone: 'error', text: authMessage(error) })
      else if (!data.session) {
        setPendingEmail(address)
        setMessage({ tone: 'success', text: `Te enviamos un correo a ${address}. Ábrelo para confirmar tu cuenta y luego inicia sesión.` })
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: address, password })
      if (error) {
        setMessage({ tone: 'error', text: authMessage(error) })
        if (error.code === 'email_not_confirmed') setPendingEmail(address)
      }
    }
    setBusy(false)
  }

  async function resend() {
    if (busy) return
    setBusy(true)
    const { error } = await supabase.auth.resend({ type: 'signup', email: pendingEmail })
    setMessage(
      error
        ? { tone: 'error', text: authMessage(error) }
        : { tone: 'success', text: 'Listo, te enviamos otro correo. Revisa también la carpeta de spam.' },
    )
    setBusy(false)
  }

  return (
    <form onSubmit={submit} noValidate className="lab-card w-full max-w-xs p-4">
      <div className="flex gap-2">
        <Button variant={isSignup ? 'primary' : 'secondary'} aria-pressed={isSignup} onClick={() => changeMode('signup')} className="min-h-11 flex-1 px-2">
          Crear cuenta
        </Button>
        <Button variant={isSignup ? 'secondary' : 'primary'} aria-pressed={!isSignup} onClick={() => changeMode('signin')} className="min-h-11 flex-1 px-2">
          Ya tengo cuenta
        </Button>
      </div>

      <h2 className="mt-4 font-display text-lg">
        {isReset ? 'Recupera tu acceso' : isSignup ? 'Crea tu cuenta' : 'Entra a tu cuenta'}
      </h2>
      {isReset && (
        <p className="mt-1 text-sm text-muted">Te enviaremos un enlace para crear una contraseña nueva.</p>
      )}

      <div className="mt-3 space-y-3">
        <div>
          <label htmlFor="auth-email" className={labelClass}>Correo</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            className={`${inputClass} mt-1`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'auth-email-error' : undefined}
          />
          {errors.email && <p id="auth-email-error" className={fieldErrorClass}>{errors.email}</p>}
        </div>

        {!isReset && (
        <div>
          <label htmlFor="auth-password" className={labelClass}>Contraseña</label>
          <div className="relative mt-1">
            <input
              id="auth-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              className={`${inputClass} pr-24`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'auth-password-error' : isSignup ? 'auth-password-hint' : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute inset-y-0 right-1 my-auto h-9 cursor-pointer rounded-md px-2 text-sm font-semibold text-muted underline underline-offset-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password ? (
            <p id="auth-password-error" className={fieldErrorClass}>{errors.password}</p>
          ) : (
            isSignup && <p id="auth-password-hint" className="mt-1 text-sm text-muted">Mínimo {MIN_PASSWORD} caracteres.</p>
          )}
        </div>
        )}
      </div>

      <Button type="submit" variant="primary" disabled={busy} className="mt-4 min-h-11 w-full">
        {busy
          ? isReset
            ? 'Enviando…'
            : isSignup
              ? 'Creando tu cuenta…'
              : 'Entrando…'
          : isReset
            ? 'Enviar enlace'
            : isSignup
              ? 'Crear mi cuenta'
              : 'Entrar'}
      </Button>

      {message && <Alert tone={message.tone}>{message.text}</Alert>}
      {pendingEmail && (
        <button type="button" onClick={resend} disabled={busy} className={linkButtonClass}>
          ¿No te llegó el correo? Reenviar
        </button>
      )}
      {mode === 'signin' && (
        <button type="button" onClick={() => changeMode('reset')} className={linkButtonClass}>
          ¿Olvidaste tu contraseña?
        </button>
      )}
      {isReset && (
        <button type="button" onClick={() => changeMode('signin')} className={linkButtonClass}>
          Volver a iniciar sesión
        </button>
      )}
    </form>
  )
}
