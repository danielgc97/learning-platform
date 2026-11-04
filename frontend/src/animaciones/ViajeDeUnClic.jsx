import Escena, { Chip, Flujo, Metrica, Nodo, Nota, Riel, Rotulo, Capa } from './Escena'

// Pulsas Guardar y la tarea aparece. Entre esas dos cosas pasan tres piezas.
// Lección: cómo funciona una app · el viaje de un clic.

function Pantalla({ despues }) {
  return (
    <div className="mx-auto w-[340px] overflow-hidden rounded-xl border border-line bg-panel text-left">
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
              style={{ '--in': '4.3s' }}
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
      <Rotulo
        desde={0.2}
        fin={2.6}
        y={120}
        ojo="Cómo funciona una app"
        titulo={<>El viaje de <span className="verde">un clic</span></>}
        bajada={<>Pulsas <b>Guardar</b> y la tarea aparece.<br />Entre esas dos cosas pasan <b>tres piezas</b>.</>}
      />

      <Capa desde={2.8} fin={5.6} y={95} centrado><Pantalla /></Capa>
      <Nota desde={3.3} fin={5.6} y={300} centrado>lo que ves</Nota>

      {/* Las tres piezas, de izquierda a derecha, como se lee. */}
      <Nodo desde={5.6} fin={15.0} x={45} y={150} rotulo="Frontend" sub="tu navegador" tono="var(--accent)" late={6.5}>
        <div className="esc-rejilla"><i /><i /><i /><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={5.8} fin={15.0} x={285} y={150} rotulo="Backend" sub="decide y manda" tono="var(--c2-ink)" late={8.2}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={6.0} fin={15.0} x={525} y={150} rotulo="Base de datos" sub="recuerda" tono="var(--ok)" late={11.0}>
        <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <ellipse cx="20" cy="11" rx="12" ry="4.5" />
          <path d="M8 11v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V11" />
          <path d="M8 20c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5" opacity=".55" />
        </svg>
      </Nodo>
      <Riel desde={6.0} fin={15.0} x={166} y={202} largo={148} />
      <Riel desde={8.8} fin={15.0} x={406} y={202} largo={148} />

      {/* La petición baja hasta el backend. */}
      <Chip desde={6.4} x={152} y={122} dx={118} dur={1.5}>
        <span className="verbo">POST</span>/tareas
      </Chip>
      <Flujo desde={6.8} x={170} y={200} dx={140} />

      <Nota desde={8.4} fin={9.2} y={292} centrado>¿el texto está vacío? <b>no</b></Nota>

      {/* Y de ahí a la base de datos. */}
      <Chip desde={9.2} x={396} y={122} dx={118} dur={1.5}>
        <span className="verbo">INSERT</span>INTO tareas
      </Chip>
      <Flujo desde={9.6} x={410} y={200} dx={140} tono="var(--ok)" />
      <Nota desde={11.2} fin={12.6} x={500} y={272}>fila <b>7</b> guardada</Nota>

      {/* La respuesta vuelve por abajo, hasta la pantalla. */}
      <Riel desde={11.8} fin={15.0} x={120} y={320} largo={480} />
      <Flujo desde={12.0} x={598} y={318} dx={-478} dur={1.9} tono="var(--c2-ink)" n={6} />
      <Chip desde={13.8} fin={15.0} y={340} centrado>
        <span className="verbo">201</span>Created<span className="dato">{'{ "id": 7 }'}</span>
      </Chip>

      <Metrica desde={15.3} fin={17.0} y={150} cuenta={312} unidad="ms" pie="de ida y vuelta" />

      <Capa desde={17.2} y={95} centrado><Pantalla despues /></Capa>
      <Nota desde={17.7} y={300} centrado>y por eso aparece en la lista</Nota>
    </Escena>
  )
}
