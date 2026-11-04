import Escena, { Capa, Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: agentes con IA · decisiones y ciclos.
// El ciclo del borrador de la lección. Lo que hay que ver es la flecha que vuelve: es
// lo que convierte un grafo en un agente, y también lo que gasta dinero sin parar si
// nadie lleva la cuenta.

export default function Ciclos() {
  return (
    <Escena duracion={16} alto={320} etiqueta="Decisiones y ciclos">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Agentes con IA"
        titulo={<>La flecha <span className="verde">que vuelve</span></>}
        bajada={<>Una arista fija va siempre al mismo sitio. Una condicional, decide.</>}
      />

      <Nodo desde={2.6} fin={14.0} x={60} y={80} rotulo="escribir" sub="agrega texto" tono="var(--accent)" late={4.3}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={2.8} fin={14.0} x={220} y={80} rotulo="revisar" sub="marca aprobado" tono="var(--c2-ink)" late={5.7}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--c2-ink)" strokeWidth="1.5">
          <path d="M4 12.5l5 5 11-11" />
        </svg>
      </Nodo>
      <Capa desde={3.0} fin={14.0} x={430} y={114} ancho={60}>
        <span className="esc-chip"><span className="verbo">END</span></span>
      </Capa>
      <Son en={2.7} tipo="toque" />
      <Riel desde={3.2} fin={14.0} x={168} y={129} largo={94} />
      <Riel desde={3.4} fin={14.0} x={328} y={129} largo={98} />

      <Flujo desde={4.2} x={170} y={127} dx={90} dur={1.2} tono="var(--accent)" />
      <Son en={4.3} tipo="viaje" />
      <Chip desde={4.8} fin={8.8} centrado={false} x={20} y={186}>
        <span className="verbo">intentos</span>1
      </Chip>
      <Son en={4.9} tipo="cuenta" />

      {/* La arista condicional mira el estado y responde con un nombre de nodo. */}
      <Nota desde={5.6} fin={11.0} centrado={false} x={350} y={94}>¿aprobado?</Nota>
      <Son en={5.7} tipo="toque" />
      <Chip desde={6.2} fin={8.8} centrado={false} x={330} y={186} mal>
        <span className="verbo">aprobado</span>False
      </Chip>
      <Son en={6.3} tipo="mal" />

      {/* Y entonces vuelve, que es lo que no se ve leyendo el código. */}
      <Riel desde={6.8} fin={11.0} x={295} y={150} largo={94} vertical />
      <Riel desde={6.9} fin={11.0} x={135} y={244} largo={160} />
      <Riel desde={7.0} fin={11.0} x={135} y={150} largo={94} vertical />
      <Flujo desde={7.2} x={290} y={242} dx={-150} dur={1.5} tono="var(--bad)" n={5} />
      <Son en={7.3} tipo="viaje" />
      <Nota desde={7.8} fin={10.6} y={276}>vuelve a escribir, y ese regreso es el ciclo</Nota>
      <Son en={7.9} tipo="toque" />
      <Chip desde={9.2} fin={11.0} centrado={false} x={20} y={186}>
        <span className="verbo">intentos</span>2
      </Chip>
      <Son en={9.3} tipo="cuenta" />

      {/* El freno. */}
      <Chip desde={11.4} fin={14.0} y={186}>
        <span className="verbo">if</span>aprobado or intentos {'>='} 3:<span className="dato">return END</span>
      </Chip>
      <Son en={11.5} tipo="bien" />
      <Flujo desde={12.0} x={330} y={127} dx={94} dur={1.2} tono="var(--ok)" />
      <Son en={12.1} tipo="viaje" />
      <Nota desde={12.6} fin={14.0} y={276}>el contador vive en el estado: es lo que frena el gasto</Nota>
      <Son en={12.7} tipo="bien" />

      <Rotulo
        desde={14.4}
        y={120}
        titulo={<>Dos frenos, <span className="verde">no uno</span>.</>}
        bajada={<>Tu condición de término, y recursion_limit como red de emergencia.</>}
      />
      <Son en={14.5} tipo="cierra" />
    </Escena>
  )
}
