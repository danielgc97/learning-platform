// Textos y estilos que comparten el panel de acceso y la pantalla de contraseña nueva.

export const MIN_PASSWORD = 6

// Supabase devuelve los errores en inglés; los traducimos por su código.
const AUTH_ERRORS = {
  invalid_credentials: 'El correo o la contraseña no son correctos.',
  email_not_confirmed: 'Tu correo aún no está confirmado. Revisa tu bandeja de entrada.',
  user_already_exists: 'Ya existe una cuenta con ese correo. Prueba entrando.',
  email_exists: 'Ya existe una cuenta con ese correo. Prueba entrando.',
  weak_password: `La contraseña es muy débil. Usa al menos ${MIN_PASSWORD} caracteres.`,
  same_password: 'La contraseña nueva debe ser distinta de la anterior.',
  email_address_invalid: 'Ese correo no parece válido. Revísalo.',
  over_email_send_rate_limit: 'Enviamos demasiados correos en poco tiempo. Espera unos minutos e inténtalo de nuevo.',
  over_request_rate_limit: 'Demasiados intentos seguidos. Espera un momento e inténtalo de nuevo.',
  signup_disabled: 'El registro está desactivado por ahora.',
}

export function authMessage(error) {
  return AUTH_ERRORS[error.code] ?? 'No pudimos completar la acción. Inténtalo de nuevo en unos minutos.'
}

export const inputClass =
  'w-full rounded-lg border border-ink bg-surface px-3 py-2.5 text-base placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-accent'
export const labelClass = 'block text-sm font-semibold'
export const fieldErrorClass = 'mt-1 text-sm font-semibold text-bad'
export const linkButtonClass =
  'mt-3 block cursor-pointer text-sm font-semibold underline underline-offset-2 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50'
