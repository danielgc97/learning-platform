import { useEffect } from 'react'
import { buttonClass } from '../components/Button'
import { CONTACT_EMAIL, RESPONSE_TIME, mailtoLink, whatsappLink } from '../contact'

const REPORT_BODY = `¿Qué estabas haciendo?


¿Qué esperabas que pasara?


¿Qué pasó en realidad?


Dirección de la página (opcional):
`

const SUGGESTION_BODY = `Mi sugerencia:
`

export default function Support() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const whatsapp = whatsappLink('Hola, vengo de CortexLab y necesito ayuda.')

  return (
    <>
      <span className="inline-flex tint-3 rounded-full px-3.5 py-1 text-sm font-semibold">Soporte</span>
      <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">¿En qué te ayudamos?</h1>
      <p className="mt-3 max-w-xl text-lg leading-8 text-muted">
        Escríbenos y respondemos en {RESPONSE_TIME}.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <section className="lab-card flex flex-col p-6">
          <h2 className="font-display text-2xl">Reportar un problema</h2>
          <p className="mt-2 flex-1 leading-7 text-muted">
            Algo no funciona, se ve mal o un ejercicio da un resultado que no esperabas. Cuéntanos qué hacías y qué pasó; el
            correo ya trae las preguntas a responder.
          </p>
          <a href={mailtoLink('Problema en CortexLab', REPORT_BODY)} className={`${buttonClass('primary')} mt-5 self-start`}>
            Reportar un problema
          </a>
        </section>

        <section className="lab-card flex flex-col p-6">
          <h2 className="font-display text-2xl">Enviar una sugerencia</h2>
          <p className="mt-2 flex-1 leading-7 text-muted">
            Una idea para mejorar una lección, un ejercicio o la plataforma. Todo lo que nos cuentes nos ayuda a decidir qué
            construir después.
          </p>
          <a href={mailtoLink('Sugerencia para CortexLab', SUGGESTION_BODY)} className={`${buttonClass('secondary')} mt-5 self-start`}>
            Enviar una sugerencia
          </a>
        </section>
      </div>

      <p className="mt-8 text-sm text-muted">
        ¿Prefieres escribir directamente? <span className="font-mono text-ink">{CONTACT_EMAIL}</span>
        {whatsapp && (
          <>
            {' · '}
            <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </>
        )}
      </p>
    </>
  )
}
