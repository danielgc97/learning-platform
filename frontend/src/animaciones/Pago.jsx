import Escena, { Chip, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: cobrar a tus usuarios · cómo funciona un pago online.
// Cuatro participantes y una regla que lo explica todo: los datos de la tarjeta nunca
// pasan por tu app. Por eso el cliente sale a la página de la pasarela y vuelve.

export default function Pago() {
  return (
    <Escena duracion={18} alto={360} etiqueta="Cómo funciona un pago online">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Cobrar a tus usuarios"
        titulo={<>La tarjeta <span className="verde">nunca pasa</span> por tu app</>}
        bajada={<>Guardar esos datos exige normas que no quieres cumplir.</>}
      />

      <Nodo desde={2.6} fin={15.4} x={0} y={120} rotulo="Tu cliente" sub="quiere pagar" tono="var(--accent)" late={4.0}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c0-4 3.4-6 7.5-6s7.5 2 7.5 6" />
        </svg>
      </Nodo>
      <Nodo desde={2.8} fin={15.4} x={123} y={120} rotulo="Tu app" sub="qué y cuánto" tono="var(--c2-ink)" late={5.6}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={3.0} fin={15.4} x={247} y={120} rotulo="La pasarela" sub="procesa el cobro" tono="var(--ok)" late={9.0}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19" />
        </svg>
      </Nodo>
      <Nodo desde={3.2} fin={15.4} x={370} y={120} rotulo="El banco" sub="aprueba o no" late={11.0}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5">
          <path d="M3 9.5 12 4l9 5.5M5 10v8M19 10v8M3 20h18M9.5 10v8M14.5 10v8" />
        </svg>
      </Nodo>
      <Riel desde={3.4} fin={15.4} x={108} y={169} largo={78} />
      <Riel desde={3.6} fin={15.4} x={232} y={169} largo={78} />
      <Riel desde={3.8} fin={15.4} x={355} y={169} largo={78} />
      <Son en={2.7} tipo="toque" />

      <Chip desde={4.4} centrado={false} x={40} y={76} dx={70} dur={1.3}>pulsa Pagar</Chip>
      <Son en={4.5} tipo="viaje" />
      <Chip desde={5.9} centrado={false} x={140} y={76} dx={90} dur={1.4}>
        <span className="verbo">crea un cobro</span>
      </Chip>
      <Son en={6.0} tipo="viaje" />
      <Chip desde={7.6} fin={10.6} centrado={false} x={60} y={240}>
        la pasarela te da una <span className="verbo">dirección de pago</span>
      </Chip>
      <Son en={7.7} tipo="toque" />

      {/* Lo que no pasa: la tarjeta entrando en tu app. */}
      <Chip desde={8.8} centrado={false} x={200} y={290} dx={120} dur={1.5}>
        <span className="verbo">la tarjeta</span>la escribe allí
      </Chip>
      <Son en={8.9} tipo="viaje" />
      <Chip desde={11.0} centrado={false} x={300} y={76} dx={70} dur={1.3}>
        <span className="verbo">¿aprobado?</span>
      </Chip>
      <Son en={11.1} tipo="viaje" />
      <Son en={12.4} tipo="bien" />

      <Nota desde={12.8} fin={15.4} y={240}>tu app solo recibe el <b>resultado</b></Nota>
      <Nota desde={13.9} fin={15.4} y={290}>
        <span className="mal">que el cliente vuelva no prueba que pagó</span>
      </Nota>
      <Son en={14.0} tipo="mal" />

      <Rotulo
        desde={15.8}
        y={130}
        titulo={<>¿Y cómo lo <span className="verde">sabes</span>?</>}
        bajada={<>Te lo cuenta la pasarela, no el navegador. Eso es la siguiente lección.</>}
      />
      <Son en={15.9} tipo="toque" />
    </Escena>
  )
}
