// Datos públicos de contacto. Lo marcado como "referencial" es texto de ejemplo por confirmar.
export const CONTACT_EMAIL = 'dguardiacollado@gmail.com'

// Número con código de país y sin "+" ni espacios (ejemplo: 51999999999). Vacío = no se muestra el botón.
export const WHATSAPP_NUMBER = ''

export const AUTHOR = {
  name: 'Daniel Guardia',
  role: 'Finanzas · Ciencia de datos',
  bio: 'Profesional en Finanzas, con 4 años de experiencia en el análisis de datos, consultoría financiera e ingeniería de agentes conversacionales para el rubro bancario. Mención en Ciencia de Datos por la UPC y especialización en Modelos Estadísticos por la UNI.',
  highlights: [
    '4 años en análisis de datos, consultoría financiera y agentes conversacionales para banca',
    'Mención en Ciencia de Datos, UPC',
    'Especialización en Modelos Estadísticos, UNI',
  ],
}

// Referencial: confirmar o cambiar.
export const RESPONSE_TIME = '24 a 48 horas hábiles'

export function mailtoLink(subject, body = '') {
  const params = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`
  return `mailto:${CONTACT_EMAIL}?${params}`
}

export function whatsappLink(message) {
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : null
}
