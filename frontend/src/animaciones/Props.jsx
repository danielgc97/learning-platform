import Escena, { Capa, Chip, Nodo, Nota, Rotulo, Son } from './Escena'

// Lección: frontend con React · props.
// El mismo componente escrito una vez y usado dos, con datos distintos. Las dos tareas
// que salen son las de la lección: comprar pan sin hacer, pagar la luz hecha.

function Item({ hecha, titulo }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-[11px]">
      <span className={hecha ? 'text-ok' : 'text-muted'}>{hecha ? '✓' : '○'}</span>
      {titulo}
    </span>
  )
}

export default function Props() {
  return (
    <Escena duracion={16} alto={340} etiqueta="Props: pasar datos a un componente">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Frontend con React"
        titulo={<>Escríbelo una vez, <span className="verde">úsalo mil</span></>}
        bajada={<>Un componente que recibe datos desde fuera, como una función.</>}
      />

      <Nodo desde={2.6} fin={14.4} x={185} y={130} rotulo="componente" sub="function Tarea({...})" tono="var(--c2-ink)" late={5.6}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Son en={2.7} tipo="toque" />

      {/* Primer uso. */}
      <Chip desde={4.0} centrado={false} x={30} y={62} dx={120} dur={1.6}>
        titulo=<span className="dato">&quot;Comprar pan&quot;</span> hecha=<span className="verbo">false</span>
      </Chip>
      <Son en={4.1} tipo="viaje" />
      <Capa desde={6.0} fin={14.4} x={60} y={250} ancho={190}>
        <Item titulo="Comprar pan" hecha={false} />
      </Capa>
      <Son en={6.1} tipo="fila" />

      {/* Segundo uso: mismo componente, otros datos. */}
      <Chip desde={7.4} centrado={false} x={210} y={62} dx={120} dur={1.6}>
        titulo=<span className="dato">&quot;Pagar la luz&quot;</span> hecha=<span className="verbo">true</span>
      </Chip>
      <Son en={7.5} tipo="viaje" />
      <Capa desde={9.4} fin={14.4} x={275} y={250} ancho={190}>
        <Item titulo="Pagar la luz" hecha />
      </Capa>
      <Son en={9.5} tipo="fila" />

      <Nota desde={10.6} fin={14.4} y={296}>el mismo código, dos resultados distintos</Nota>
      <Son en={10.7} tipo="bien" />
      <Nota desde={12.0} fin={14.4} y={62}>los textos van entre comillas; todo lo demás, entre llaves</Nota>

      <Rotulo
        desde={14.8}
        y={120}
        titulo={<>Props son los <span className="verde">parámetros</span>.</>}
        bajada={<>Lo mismo que le pasas a una función de Python al llamarla.</>}
      />
      <Son en={14.9} tipo="cierra" />
    </Escena>
  )
}
