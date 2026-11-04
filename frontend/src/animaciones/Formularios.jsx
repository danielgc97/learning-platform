import Escena, { Capa, Chip, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: frontend con React · formularios.
// Dos cosas que solo se entienden viéndolas: lo que hace el navegador si no lo paras,
// y que la lista no se toca, se crea otra.

function Formulario() {
  return (
    <div className="w-[250px] rounded-xl border border-line bg-panel p-3">
      <div className="flex items-center gap-2">
        <span className="flex-1 rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px]">
          Comprar pan
        </span>
        <span className="rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-accent-ink">
          Agregar
        </span>
      </div>
    </div>
  )
}

export default function Formularios() {
  return (
    <Escena duracion={15} alto={300} etiqueta="Formularios: enviar datos">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Frontend con React"
        titulo={<>Lo que el navegador <span className="verde">haría solo</span></>}
        bajada={<>Enviar un formulario recarga la página. Eso hay que pararlo.</>}
      />

      <Capa desde={2.6} x={16} y={60}><Formulario /></Capa>
      <Son en={2.7} tipo="toque" />
      <Nodo desde={2.9} x={350} y={60} rotulo="tu API" sub="/tareas" tono="var(--c2-ink)" late={7.2}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Riel desde={3.1} x={272} y={98} largo={120} />

      <Chip desde={3.8} fin={6.0} y={180} mal>
        <span className="verbo">al enviar</span>el navegador recarga la página
      </Chip>
      <Son en={3.9} tipo="mal" />
      <Nota desde={4.4} fin={6.0} y={226}>y pierdes lo que había en pantalla</Nota>

      <Chip desde={6.4} fin={8.6} y={180}>
        <span className="verbo">evento.preventDefault()</span>ahora lo envías tú
      </Chip>
      <Son en={6.5} tipo="bien" />

      <Chip desde={7.0} centrado={false} x={120} y={22} dx={200} dur={1.6}>
        <span className="verbo">POST</span>{'{"titulo": "Comprar pan"}'}
      </Chip>
      <Son en={7.1} tipo="viaje" />
      <Son en={8.6} tipo="llega" />

      <Chip desde={9.0} fin={11.4} y={180}>
        <span className="verbo">201</span><span className="dato">{'{ "id": 7, "titulo": "Comprar pan" }'}</span>
      </Chip>
      <Son en={9.1} tipo="bien" />
      <Nota desde={9.6} fin={11.4} y={226}>JSON.stringify convierte el objeto en texto: el idioma de las APIs</Nota>

      <Chip desde={11.8} y={180}>
        <span className="verbo">setTareas(</span>{'[...tareas, nueva])'}
      </Chip>
      <Son en={11.9} tipo="toque" />
      <Nota desde={12.4} y={226}>una lista nueva con todas las de antes, más la recién creada</Nota>
      <Nota desde={13.4} y={262}>en React no se modifica la que había: se crea otra y se guarda</Nota>
      <Son en={13.5} tipo="cierra" />
    </Escena>
  )
}
