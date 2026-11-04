import Escena, { Capa, Chip, Flujo, Metrica, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: cómo funciona una app · el viaje de un clic.
// Las tres piezas están una debajo de otra y el paquete las recorre: el mismo objeto
// baja, consulta y vuelve, para no perder de vista de dónde viene cada cosa.

function Pantalla({ despues }) {
  return (
    <div className="mx-auto w-[320px] overflow-hidden rounded-xl border border-line bg-panel text-left">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <i className="size-1.5 rounded-full bg-line" />
        <i className="size-1.5 rounded-full bg-line" />
        <i className="size-1.5 rounded-full bg-line" />
        <span className="ml-1.5 font-mono text-[10px] text-muted">mis tareas</span>
      </div>
      <div className="grid gap-2.5 p-3">
        {despues ? (
          <>
            <div className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 font-mono text-[11px]">
              <span className="text-ok">✓</span>
              <span>Comprar pan</span>
              <span className="ml-auto text-[10px] text-muted">id 7</span>
            </div>
            <div className="rounded-md border border-line bg-surface px-3 py-2 font-mono text-[11px] text-muted">
              Escribe otra tarea
            </div>
          </>
        ) : (
          <>
            <div className="rounded-md border border-line bg-surface px-3 py-2 font-mono text-[11px]">Comprar pan</div>
            <span
              className="esc-pulso justify-self-start rounded-md bg-accent px-3 py-1.5 text-[11px] font-semibold text-accent-ink"
              style={{ '--in': 'calc(4.3s * 1.35)' }}
            >
              Guardar
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default function ViajeDeUnClic() {
  return (
    <Escena duracion={20} etiqueta="El viaje de un clic">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.6}
        y={200}
        ojo="Cómo funciona una app"
        titulo={<>El viaje de <span className="verde">un clic</span></>}
        bajada={<>Pulsas <b>Guardar</b> y la tarea aparece.<br />Entre esas dos cosas pasan <b>tres piezas</b>.</>}
      />

      <Capa desde={2.8} fin={5.6} y={210} centrado><Pantalla /></Capa>
      <Nota desde={3.3} fin={5.6} y={380}>lo que ves</Nota>
      <Son en={4.3} tipo="toque" />

      {/* Las tres piezas, una debajo de otra, en el orden en que se recorren. */}
      <Nodo desde={5.6} fin={15.4} y={110} rotulo="Frontend" sub="tu navegador" tono="var(--accent)" late={6.4}>
        <div className="esc-rejilla"><i /><i /><i /><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={5.9} fin={15.4} y={285} rotulo="Backend" sub="decide y manda" tono="var(--c2-ink)" late={8.2}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={6.2} fin={15.4} y={455} rotulo="Base de datos" sub="recuerda" tono="var(--ok)" late={11.2}>
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <ellipse cx="20" cy="11" rx="12" ry="4.5" />
          <path d="M8 11v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V11" />
          <path d="M8 20c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5" opacity=".55" />
        </svg>
      </Nodo>
      <Riel desde={6.2} fin={15.4} x={199} y={218} largo={60} vertical />

      {/* La petición baja hasta el backend. */}
      <Chip desde={6.6} y={214} dy={60} dur={1.4}>
        <span className="verbo">POST</span>/tareas
      </Chip>
      <Son en={6.7} tipo="viaje" />
      <Son en={8.0} tipo="llega" />

      <Nota desde={8.5} fin={9.4} y={398}>¿el texto está vacío? <b>no</b></Nota>
      <Son en={8.6} tipo="bien" />

      {/* Y de ahí a la base de datos. */}
      <Riel desde={9.4} fin={15.4} x={199} y={393} largo={55} vertical />
      <Chip desde={9.7} y={389} dy={56} dur={1.4}>
        <span className="verbo">INSERT</span>INTO tareas
      </Chip>
      <Son en={9.8} tipo="viaje" />
      <Son en={11.1} tipo="llega" />
      <Nota desde={11.5} fin={12.8} y={562}>fila <b>7</b> guardada</Nota>

      {/* La respuesta vuelve por el mismo camino, hasta la pantalla. */}
      <Flujo desde={12.4} x={200} y={450} dy={-338} dur={2.1} tono="var(--c2-ink)" n={6} />
      <Son en={12.5} tipo="viaje" />
      <Chip desde={14.2} fin={15.4} y={230}>
        <span className="verbo">201</span>Created<span className="dato">{'{ "id": 7 }'}</span>
      </Chip>
      <Son en={14.3} tipo="llega" />

      <Metrica desde={15.7} fin={17.4} y={250} cuenta={312} unidad="ms" pie="de ida y vuelta" />
      <Son en={15.8} tipo="toque" />

      <Capa desde={17.6} y={210} centrado><Pantalla despues /></Capa>
      <Son en={17.7} tipo="bien" />
      <Nota desde={18.1} y={380}>y por eso aparece en la lista</Nota>
    </Escena>
  )
}
