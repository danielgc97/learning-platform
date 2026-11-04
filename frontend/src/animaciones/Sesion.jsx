import Escena, { Capa, Chip, Flujo, Nodo, Nota, Riel, Rotulo } from './Escena'

// Un token es invisible, y por eso cuesta explicarlo con palabras: esto lo dibuja.
// Lección: usuarios y seguridad · autenticación y autorización.

export default function Sesion() {
  return (
    <Escena duracion={19} etiqueta="Autenticación y autorización">
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={120}
        ojo="Usuarios y seguridad"
        titulo={<>Quién eres y <span className="verde">qué puedes</span></>}
        bajada={<>Son <b>dos preguntas distintas</b>, y el servidor las hace en orden.</>}
      />

      <Nodo desde={2.6} fin={15.4} x={45} y={150} rotulo="Tú" sub="tu navegador" tono="var(--accent)" late={3.6}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c0-4 3.4-6 7.5-6s7.5 2 7.5 6" />
        </svg>
      </Nodo>
      <Nodo desde={2.8} fin={15.4} x={525} y={150} rotulo="Servidor" sub="guarda y decide" tono="var(--c2-ink)" late={5.2}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Riel desde={3.0} fin={15.4} x={166} y={202} largo={388} />

      {/* Primero: quién eres. */}
      <Chip desde={3.4} x={190} y={122} dx={236} dur={1.7}>
        email + contraseña
      </Chip>
      <Flujo desde={3.8} x={176} y={200} dx={372} dur={1.7} />
      <Nota desde={5.4} fin={6.4} y={270} centrado>¿esta contraseña cuadra? <b>sí</b></Nota>

      {/* El servidor devuelve un pase sellado. */}
      <Chip desde={6.4} x={330} y={122} dx={-180} dur={1.6}>
        <span className="verbo">token</span>
        <span className="dato">eyJhbGciOi…</span>
      </Chip>
      <Capa desde={8.3} fin={15.4} x={48} y={262} ancho={190}>
        <span className="esc-chip"><span className="verbo">token</span><span className="dato">eyJhbGciOi…</span></span>
        <p className="esc-nota" style={{ marginTop: 8, whiteSpace: 'normal' }}>se queda en tu navegador</p>
      </Capa>

      {/* Después: qué puedes hacer. Cada petición lleva el pase. */}
      <Chip desde={9.4} x={185} y={122} dx={230} dur={1.6}>
        <span className="verbo">GET</span>/tareas<span className="dato">+ token</span>
      </Chip>
      <Flujo desde={9.8} x={176} y={200} dx={372} dur={1.6} />
      <Nota desde={11.4} fin={12.4} y={270} centrado>¿la firma cuadra? <b>sí</b></Nota>
      <Chip desde={12.2} fin={13.6} x={330} y={96} dx={-180} dur={1.5}>
        <span className="verbo">200</span>OK<span className="dato">{'{ tus tareas }'}</span>
      </Chip>

      {/* Y si no lo lleva, no hay conversación. */}
      <Chip desde={13.4} x={185} y={330} dx={300} dur={1.4} mal>
        <span className="verbo">GET</span>/tareas<span className="dato">sin token</span>
      </Chip>
      <Nota desde={14.6} fin={15.4} y={372} centrado>
        <span className="mal">401</span> · no sé quién eres
      </Nota>

      <Rotulo
        desde={15.8}
        y={140}
        titulo={<>Dos preguntas<br /><span className="verde">distintas</span>.</>}
        bajada={<>Autenticación: <b>quién eres</b>. Autorización: <b>qué puedes hacer</b>.</>}
      />
    </Escena>
  )
}
