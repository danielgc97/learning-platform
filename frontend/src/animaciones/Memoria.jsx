import Escena, { Capa, Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son, Tabla } from './Escena'

// Lección: agentes con IA · memoria y humano en el bucle.
// El hilo se ve llenarse: una foto del estado después de cada paso. Y en medio, la
// pausa, que es lo que convierte un agente en algo a lo que puedes decirle que no.

export default function Memoria() {
  return (
    <Escena duracion={17} alto={380} etiqueta="Memoria y humano en el bucle">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Agentes con IA"
        titulo={<>Una foto <span className="verde">después de cada paso</span></>}
        bajada={<>Sin eso, el grafo olvida todo al terminar y no puede pausarse.</>}
      />

      <Nodo desde={2.6} x={40} y={50} rotulo="revisar" sub="mira el caso" tono="var(--accent)" late={4.5}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={2.8} x={200} y={50} rotulo="aprobar" sub="pedir_aprobacion" tono="var(--c2-ink)" late={7.4}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--c2-ink)" strokeWidth="1.5">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c0-4 3.4-6 7.5-6s7.5 2 7.5 6" />
        </svg>
      </Nodo>
      <Capa desde={3.0} x={430} y={84} ancho={60}>
        <span className="esc-chip"><span className="verbo">END</span></span>
      </Capa>
      <Son en={2.7} tipo="toque" />
      <Riel desde={3.2} x={148} y={89} largo={94} />
      <Riel desde={3.4} x={308} y={89} largo={118} />

      <Tabla
        desde={4.0}
        x={130}
        y={216}
        ancho={260}
        nombre="hilo · caso-1"
        columnas={['paso', 'lo que quedó guardado']}
        filas={[
          { celdas: ['revisar', 'monto: 120'], desde: 5.2 },
          { celdas: ['aprobar', 'en pausa'], desde: 8.0 },
          { celdas: ['aprobar', 'reembolsado'], desde: 12.8 },
        ]}
        plantilla="70px 1fr"
      />
      <Son en={4.1} tipo="toque" />

      <Flujo desde={4.4} x={150} y={87} dx={90} dur={1.3} tono="var(--accent)" />
      <Son en={4.5} tipo="viaje" />
      <Son en={5.3} tipo="fila" />
      <Nota desde={5.8} fin={7.8} y={346}>el checkpointer guarda el estado después de cada paso</Nota>

      {/* La pausa. */}
      <Chip desde={7.2} fin={10.4} y={170}>
        <span className="verbo">interrupt(</span>{'"¿Apruebas reembolsar 120?")'}
      </Chip>
      <Son en={7.3} tipo="toque" />
      <Son en={8.1} tipo="espera" />
      <Nota desde={8.6} fin={10.4} y={346}>el grafo se detiene ahí y te devuelve la pregunta</Nota>

      {/* Y la decisión, que llega cuando llega. */}
      <Chip desde={10.8} fin={15.0} y={170}>
        <span className="verbo">Command(resume=True)</span><span className="dato">con el mismo thread_id</span>
      </Chip>
      <Son en={10.9} tipo="bien" />
      <Flujo desde={11.6} x={310} y={87} dx={112} dur={1.3} tono="var(--ok)" />
      <Son en={11.7} tipo="viaje" />
      <Son en={12.9} tipo="fila" />
      <Nota desde={13.4} fin={15.0} y={346}>ese valor se convierte en la respuesta de interrupt</Nota>

      <Nota desde={15.4} y={346}>con otro thread_id, el grafo empieza de cero</Nota>
      <Son en={15.5} tipo="cierra" />
    </Escena>
  )
}
