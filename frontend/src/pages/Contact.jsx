import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buttonClass } from '../components/Button'
import {
  CONTACT_EMAIL,
  PRICE_HINT,
  RESPONSE_TIME,
  SERVICES,
  SESSION_FORMAT,
  mailtoLink,
  whatsappLink,
} from '../contact'

export default function Contact() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [hash])

  const whatsapp = whatsappLink('Hola, vengo de CortexLab y quisiera hacer una consulta.')
  const whatsappAdvisory = whatsappLink('Hola, vengo de CortexLab y me interesa una asesoría o clase 1 a 1.')

  return (
    <>
      <span className="inline-flex rounded-full border-2 border-ink bg-c3 px-3.5 py-1 text-sm font-bold text-[#111]">Contacto</span>
      <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">Hablemos.</h1>
      <p className="mt-3 max-w-xl text-lg leading-8 text-muted">
        Escríbeme si tienes una duda, una sugerencia o algo que no funciona. Respondo en {RESPONSE_TIME}.
      </p>

      <div className="lab-card mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-wider text-muted uppercase">Correo</p>
          <p className="mt-1 font-mono text-sm break-all">{CONTACT_EMAIL}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={mailtoLink('Consulta desde CortexLab')} className={buttonClass('primary')}>Enviar correo</a>
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noreferrer" className={buttonClass('secondary')}>WhatsApp</a>
          )}
        </div>
      </div>

      <section id="asesorias" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl">Clases y asesorías</h2>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          Además de la plataforma, ofrezco acompañamiento 1 a 1 para quien quiere avanzar más rápido o aplicar esto a un
          proyecto concreto.
        </p>
        <ul className="mt-5 max-w-2xl divide-y-2 divide-line border-y-2 border-line">
          {SERVICES.map((s) => (
            <li key={s.title} className="py-4">
              <p className="font-bold">{s.title}</p>
              <p className="text-sm leading-6 text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          {SESSION_FORMAT}. {PRICE_HINT}.{' '}
          <a href={whatsappAdvisory ?? mailtoLink('Asesoría o clase 1 a 1')} target={whatsappAdvisory ? '_blank' : undefined} rel="noreferrer">
            Cuéntame qué necesitas
          </a>
          .
        </p>
      </section>
    </>
  )
}
