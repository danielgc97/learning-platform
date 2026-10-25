// Datos públicos de contacto y de la oferta de asesorías. Todo lo marcado como "referencial"
// es texto de ejemplo para confirmar o cambiar antes de compartir la plataforma.
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
export const PRICE_HINT = 'Desde S/ 80 por hora (referencial)'
export const SESSION_FORMAT = 'Videollamada de 60 minutos, en horario a coordinar'

export const SERVICES = [
  { title: 'Clases de SQL y Python', text: 'A tu ritmo, con ejercicios sobre tus propios datos o casos reales.' },
  { title: 'Asesoría para tu proyecto con IA', text: 'Revisamos tu idea, qué construir primero y cómo pedirle ayuda a la IA sin perderte.' },
  { title: 'Talleres para equipos', text: 'Fundamentos de datos e IA para tu equipo, a medida de lo que necesiten.' },
]

export function mailtoLink(subject) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

export function whatsappLink(message) {
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : null
}
