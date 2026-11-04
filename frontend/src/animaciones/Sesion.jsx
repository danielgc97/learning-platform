import Escena, { Capa, Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: usuarios y seguridad · autenticación y autorización.
// El token es invisible en la vida real, así que aquí se ve: se entrega, se queda
// guardado a la vista, y luego acompaña a cada petición.

export default function Sesion() {
  return (
    <Escena duracion={18} etiqueta="Autenticación y autorización">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={200}
        ojo="Usuarios y seguridad"
        titulo={<>Quién eres y <span className="verde">qué puedes</span></>}
        bajada={<>Son <b>dos preguntas distintas</b>, y el<br />servidor las hace en ese orden.</>}
      />

      <Nodo desde={2.6} fin={16.0} y={70} rotulo="Tú" sub="tu navegador" tono="var(--accent)" late={3.4}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c0-4 3.4-6 7.5-6s7.5 2 7.5 6" />
        </svg>
      </Nodo>
      <Nodo desde={2.9} fin={16.0} y={420} rotulo="Servidor" sub="guarda y decide" tono="var(--c2-ink)" late={5.4}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Riel desde={3.1} fin={16.0} x={199} y={215} largo={195} vertical />

      {/* Primero: quién eres. */}
      <Chip desde={3.4} y={220} dy={185} dur={1.8}>email + contraseña</Chip>
      <Son en={3.5} tipo="viaje" />
      <Son en={5.2} tipo="llega" />
      <Nota desde={5.6} fin={6.6} y={540}>¿esta contraseña cuadra? <b>sí</b></Nota>
      <Son en={5.7} tipo="bien" />

      {/* El servidor devuelve un pase firmado, y ese pase se queda contigo. */}
      <Chip desde={6.6} y={390} dy={-175} dur={1.7}>
        <span className="verbo">token</span><span className="dato">eyJhbGciOi…</span>
      </Chip>
      <Son en={6.7} tipo="viaje" />
      <Capa desde={8.4} fin={16.0} y={180} centrado>
        <span className="esc-chip">
          <span className="verbo">token</span><span className="dato">guardado en tu navegador</span>
        </span>
      </Capa>
      <Son en={8.5} tipo="toque" />

      {/* Después: qué puedes hacer. Cada petición lleva el pase encima. */}
      <Chip desde={9.6} y={220} dy={185} dur={1.7}>
        <span className="verbo">GET</span>/tareas<span className="dato">+ token</span>
      </Chip>
      <Son en={9.7} tipo="viaje" />
      <Son en={11.3} tipo="llega" />
      <Nota desde={11.6} fin={12.6} y={540}>¿la firma cuadra? <b>sí</b></Nota>
      <Son en={11.7} tipo="bien" />
      <Flujo desde={12.4} x={200} y={405} dy={-180} dur={1.5} tono="var(--ok)" />
      <Chip desde={13.0} fin={14.2} y={248}>
        <span className="verbo">200</span>OK<span className="dato">{'{ tus tareas }'}</span>
      </Chip>

      {/* Y si la petición no lo lleva, no hay conversación. */}
      <Chip desde={14.2} y={220} dy={185} dur={1.6} mal>
        <span className="verbo">GET</span>/tareas<span className="dato">sin token</span>
      </Chip>
      <Son en={14.3} tipo="viaje" />
      <Nota desde={15.5} fin={16.0} y={540}><span className="mal">401</span> · no sé quién eres</Nota>
      <Son en={15.6} tipo="mal" />

      <Rotulo
        desde={16.4}
        y={210}
        titulo={<>Dos preguntas<br /><span className="verde">distintas</span>.</>}
        bajada={<>Autenticación: <b>quién eres</b>.<br />Autorización: <b>qué puedes hacer</b>.</>}
      />
      <Son en={16.5} tipo="toque" />
    </Escena>
  )
}
