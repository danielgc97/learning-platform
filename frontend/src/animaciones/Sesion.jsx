import Escena, { Capa, Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: usuarios y seguridad · autenticación y autorización.
// El token es invisible en la vida real, así que aquí se ve: se entrega, se queda a la
// vista en tu lado, y luego acompaña a cada petición. Sin él, la puerta no se abre.

export default function Sesion() {
  return (
    <Escena duracion={18} etiqueta="Autenticación y autorización">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={85}
        ojo="Usuarios y seguridad"
        titulo={<>Quién eres y <span className="verde">qué puedes</span></>}
        bajada={<>Son <b>dos preguntas distintas</b>, y el servidor las hace en ese orden.</>}
      />

      <Nodo desde={2.6} fin={16.0} x={25} y={90} rotulo="Tú" sub="tu navegador" tono="var(--accent)" late={3.4}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c0-4 3.4-6 7.5-6s7.5 2 7.5 6" />
        </svg>
      </Nodo>
      <Nodo desde={2.9} fin={16.0} x={345} y={90} rotulo="Servidor" sub="guarda y decide" tono="var(--c2-ink)" late={5.4}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Riel desde={3.1} fin={16.0} x={133} y={139} largo={254} />

      {/* Primero: quién eres. */}
      <Chip desde={3.4} centrado={false} x={130} y={56} dx={150} dur={1.8}>email + contraseña</Chip>
      <Son en={3.5} tipo="viaje" />
      <Son en={5.2} tipo="llega" />
      <Nota desde={5.6} fin={6.6} y={240}>¿esta contraseña cuadra? <b>sí</b></Nota>
      <Son en={5.7} tipo="bien" />

      {/* El servidor devuelve un pase firmado, y ese pase se queda contigo. */}
      <Chip desde={6.6} centrado={false} x={270} y={56} dx={-150} dur={1.7}>
        <span className="verbo">token</span><span className="dato">eyJhbGciOi…</span>
      </Chip>
      <Son en={6.7} tipo="viaje" />
      <Capa desde={8.4} fin={16.0} x={20} y={205} ancho={230}>
        <span className="esc-chip"><span className="verbo">token</span><span className="dato">eyJhbGciOi…</span></span>
        <p className="esc-nota" style={{ marginTop: 7, whiteSpace: 'normal' }}>se queda en tu navegador</p>
      </Capa>
      <Son en={8.5} tipo="toque" />

      {/* Después: qué puedes hacer. Cada petición lleva el pase encima. */}
      <Chip desde={9.6} centrado={false} x={128} y={56} dx={150} dur={1.7}>
        <span className="verbo">GET</span>/tareas<span className="dato">+ token</span>
      </Chip>
      <Son en={9.7} tipo="viaje" />
      <Son en={11.3} tipo="llega" />
      <Nota desde={11.6} fin={12.6} centrado={false} x={270} y={240}>¿la firma cuadra? <b>sí</b></Nota>
      <Son en={11.7} tipo="bien" />
      <Flujo desde={12.4} x={385} y={137} dx={-250} dur={1.5} tono="var(--ok)" />
      <Chip desde={13.0} fin={14.2} centrado={false} x={255} y={286}>
        <span className="verbo">200</span>OK<span className="dato">{'{ tus tareas }'}</span>
      </Chip>

      {/* Y si la petición no lo lleva, no hay conversación. */}
      <Chip desde={14.4} centrado={false} x={120} y={56} dx={150} dur={1.6} mal>
        <span className="verbo">GET</span>/tareas<span className="dato">sin token</span>
      </Chip>
      <Son en={14.5} tipo="viaje" />
      <Nota desde={15.6} fin={16.0} centrado={false} x={280} y={240}>
        <span className="mal">401</span> · no sé quién eres
      </Nota>
      <Son en={15.7} tipo="mal" />

      <Rotulo
        desde={16.4}
        y={110}
        titulo={<>Dos preguntas <span className="verde">distintas</span>.</>}
        bajada={<>Autenticación: <b>quién eres</b>. Autorización: <b>qué puedes hacer</b>.</>}
      />
      <Son en={16.5} tipo="toque" />
    </Escena>
  )
}
