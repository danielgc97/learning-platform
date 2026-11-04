import Escena, { Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: usuarios y seguridad · proteger tu API con el token.
// La lección anterior enseñó que el token viaja; esta enseña qué hace el backend con
// él. Lo que hay que ver es de dónde sale el user_id de la consulta: del token que
// firmó Supabase, nunca de lo que mande el frontend.

export default function ProtegerApi() {
  return (
    <Escena duracion={17} alto={340} etiqueta="Proteger tu API con el token">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Usuarios y seguridad"
        titulo={<>Una puerta <span className="verde">antes del endpoint</span></>}
        bajada={<>Enviar el token no basta: tu backend tiene que comprobarlo.</>}
      />

      <Nodo desde={2.6} fin={14.4} x={20} y={90} rotulo="tu frontend" sub="manda el token" tono="var(--accent)" late={4.0}>
        <div className="esc-rejilla"><i /><i /><i /><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={2.8} fin={14.4} x={185} y={90} rotulo="la puerta" sub="Depends(usuario_actual)" tono="var(--c2-ink)" late={5.6}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--c2-ink)" strokeWidth="1.5">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
        </svg>
      </Nodo>
      <Nodo desde={3.0} fin={14.4} x={345} y={90} rotulo="tu base" sub="tareas" tono="var(--ok)" late={7.9}>
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <ellipse cx="20" cy="11" rx="12" ry="4.5" />
          <path d="M8 11v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V11" />
        </svg>
      </Nodo>
      <Son en={2.7} tipo="toque" />
      <Riel desde={3.2} fin={14.4} x={133} y={139} largo={94} />
      <Riel desde={3.4} fin={14.4} x={293} y={139} largo={94} />

      {/* La petición con token: la puerta la deja pasar. */}
      <Chip desde={4.0} centrado={false} x={120} y={56} dx={110} dur={1.6}>
        <span className="verbo">GET</span>/tareas<span className="dato">Bearer eyJhbGciOi…</span>
      </Chip>
      <Son en={4.1} tipo="viaje" />
      <Son en={5.6} tipo="llega" />

      <Chip desde={5.9} fin={10.8} centrado={false} x={40} y={196}>
        <span className="verbo">usuario.id</span><span className="dato">a1b2-c3d4…</span>
      </Chip>
      <Son en={6.0} tipo="bien" />
      <Nota desde={6.6} fin={9.6} y={286}>quién es lo dice Supabase al validar el token</Nota>

      <Flujo desde={7.8} x={295} y={137} dx={90} dur={1.3} tono="var(--ok)" />
      <Son en={7.9} tipo="viaje" />
      <Chip desde={8.4} fin={14.4} centrado={false} x={290} y={240}>
        <span className="verbo">.eq(</span>{'"user_id", usuario.id)'}
      </Chip>
      <Son en={8.5} tipo="toque" />
      <Nota desde={10.0} fin={12.0} y={286}>el filtro sale del token, no de lo que pida el frontend</Nota>
      <Son en={10.1} tipo="bien" />

      {/* Y la petición sin token: no llega a ejecutarse nada. */}
      <Chip desde={11.0} centrado={false} x={120} y={56} dx={110} dur={1.6} mal>
        <span className="verbo">GET</span>/tareas<span className="dato">sin token</span>
      </Chip>
      <Son en={11.1} tipo="viaje" />
      <Chip desde={12.4} fin={14.4} centrado={false} x={40} y={196} mal>
        <span className="verbo">401</span>la puerta no se abre
      </Chip>
      <Son en={12.5} tipo="corta" />
      <Nota desde={12.8} fin={14.4} y={286}>el código del endpoint ni llega a ejecutarse</Nota>

      <Rotulo
        desde={14.8}
        y={120}
        titulo={<>Primero la puerta, <span className="verde">después tu código</span>.</>}
        bajada={<>Y dentro, filtra siempre por el usuario que sale del token.</>}
      />
      <Son en={14.9} tipo="cierra" />
    </Escena>
  )
}
