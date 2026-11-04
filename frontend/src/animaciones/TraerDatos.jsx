import Escena, { Capa, Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: frontend con React · traer datos de tu API.
// Lo que hay que ver es que una pantalla que pide datos son tres pantallas: la de
// mientras espera, la del resultado y la del fallo. Las tres las escribe el alumno.

function Pantalla({ estado }) {
  return (
    <div className="w-[260px] overflow-hidden rounded-xl border border-line bg-panel text-left">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <i className="size-1.5 rounded-full bg-line" />
        <i className="size-1.5 rounded-full bg-line" />
        <span className="ml-1.5 font-mono text-[10px] text-muted">mis tareas</span>
      </div>
      <div className="grid gap-2 p-3">
        {estado === 'cargando' && <p className="m-0 font-mono text-[11px] text-muted">Cargando...</p>}
        {estado === 'lista' && (
          <>
            <div className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-[11px]">Comprar pan</div>
            <div className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-[11px]">Pagar el internet</div>
          </>
        )}
        {estado === 'error' && (
          <p className="m-0 font-mono text-[11px] text-bad">Error: No se pudieron cargar las tareas</p>
        )}
      </div>
    </div>
  )
}

export default function TraerDatos() {
  return (
    <Escena duracion={18} alto={362} etiqueta="Traer datos de tu API">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={105}
        ojo="Frontend con React"
        titulo={<>Pedir datos son <span className="verde">tres pantallas</span></>}
        bajada={<>La de mientras espera, la del resultado y la del fallo.</>}
      />

      <Capa desde={2.6} fin={8.6} x={16} y={86}><Pantalla estado="cargando" /></Capa>
      <Son en={2.7} tipo="toque" />
      <Nodo desde={2.9} x={360} y={86} rotulo="tu API" sub="/tareas" tono="var(--c2-ink)" late={6.4}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Riel desde={3.1} fin={14.6} x={282} y={152} largo={74} />

      <Chip desde={3.6} fin={7.0} y={278}>
        <span className="verbo">useEffect</span>con <span className="dato">[ ]</span> al final: una sola vez, al abrir
      </Chip>
      <Son en={3.7} tipo="toque" />

      <Chip desde={4.4} centrado={false} x={150} y={40} dx={200} dur={1.6}>
        <span className="verbo">fetch</span>/tareas
      </Chip>
      <Son en={4.5} tipo="viaje" />
      <Nota desde={5.0} fin={7.0} y={320}>mientras va y vuelve, la persona lee <b>Cargando...</b></Nota>
      <Son en={5.1} tipo="espera" />
      <Son en={6.1} tipo="llega" />

      {/* La respuesta vuelve por abajo, y es lo que cambia el estado. */}
      <Riel desde={6.4} fin={14.6} x={40} y={214} largo={430} />
      <Flujo desde={6.6} x={465} y={212} dx={-420} dur={2.0} tono="var(--c2-ink)" n={6} />
      <Son en={6.7} tipo="viaje" />
      <Chip desde={8.2} fin={13.0} y={234}>
        <span className="verbo">200</span><span className="dato">{'[{ "id": 1, "titulo": "Comprar pan" }, …]'}</span>
      </Chip>
      <Son en={8.3} tipo="llega" />

      <Capa desde={8.8} fin={13.0} x={16} y={86}><Pantalla estado="lista" /></Capa>
      <Son en={8.9} tipo="bien" />
      <Chip desde={9.3} fin={13.0} y={278}>
        <span className="verbo">setTareas(datos)</span>setCargando(false)
      </Chip>
      <Son en={9.4} tipo="toque" />
      <Nota desde={10.0} fin={13.0} y={320}>la pantalla cambia porque cambió el estado</Nota>

      {/* Y el camino que casi nadie escribe: el del fallo. */}
      <Chip desde={12.8} fin={15.6} y={278} mal>
        <span className="verbo">if (!respuesta.ok)</span>throw new Error(…)
      </Chip>
      <Son en={12.9} tipo="mal" />
      <Capa desde={13.2} x={16} y={86}><Pantalla estado="error" /></Capa>
      <Son en={13.3} tipo="corta" />
      <Nota desde={13.8} fin={15.6} y={320}>si falla, lo cuentas: nunca una pantalla en blanco</Nota>

      <Nota desde={16.0} y={320}>las tres las decide tu código, no la red</Nota>
      <Son en={16.1} tipo="cierra" />
    </Escena>
  )
}
