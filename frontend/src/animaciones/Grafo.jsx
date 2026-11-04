import Escena, { Capa, Chip, Flujo, Marca, Nodo, Nota, Riel, Rotulo, Son, Tabla } from './Escena'

// Lección: agentes con IA · LangGraph, estado, nodos y aristas.
// El grafo más simple de la lección, con su libreta al lado. Lo que cuesta entender
// leyendo es que el nodo devuelve solo {"respuesta": ...} y la pregunta sigue ahí:
// aquí se ve la fila nueva colocarse junto a la que ya estaba.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const LIBRETA_Y = 190

export default function Grafo() {
  return (
    <Escena duracion={15} alto={340} etiqueta="LangGraph: estado, nodos y aristas">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Agentes con IA"
        titulo={<>Un mapa de pasos y <span className="verde">una libreta</span></>}
        bajada={<>Los nodos hacen el trabajo; el estado es lo único que comparten.</>}
      />

      <Capa desde={2.6} fin={13.0} x={20} y={104} ancho={60}>
        <span className="esc-chip"><span className="verbo">START</span></span>
      </Capa>
      <Nodo desde={2.8} fin={13.0} x={185} y={70} rotulo="responder" sub="una función de Python" tono="var(--accent)" late={7.6}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Capa desde={3.0} fin={13.0} x={440} y={104} ancho={60}>
        <span className="esc-chip"><span className="verbo">END</span></span>
      </Capa>
      <Son en={2.7} tipo="toque" />
      <Riel desde={3.2} fin={13.0} x={86} y={116} largo={94} />
      <Riel desde={3.4} fin={13.0} x={340} y={116} largo={94} />

      {/* La libreta, con lo que entra. */}
      <Tabla
        desde={4.2}
        fin={13.0}
        x={130}
        y={LIBRETA_Y}
        ancho={260}
        nombre="el estado"
        columnas={['clave', 'valor']}
        filas={[
          ['pregunta', 'Hola'],
          { celdas: ['respuesta', 'Recibí: Hola'], desde: 9.0 },
        ]}
        plantilla="90px 1fr"
      />
      <Son en={4.3} tipo="toque" />
      <Nota desde={4.8} fin={7.0} y={306}>invoke arranca el grafo con esa libreta</Nota>

      <Flujo desde={5.6} x={88} y={114} dx={90} dur={1.3} tono="var(--accent)" />
      <Son en={5.7} tipo="viaje" />
      <Son en={7.0} tipo="llega" />

      {/* El nodo devuelve solo lo que cambia. */}
      <Chip desde={7.4} fin={11.6} centrado={false} x={175} y={32}>
        <span className="verbo">return</span>{'{"respuesta": "Recibí: Hola"}'}
      </Chip>
      <Son en={7.5} tipo="toque" />
      <Son en={8.3} tipo="viaje" />
      <Marca desde={9.0} fin={11.6} x={130} ancho={260} y={fila(LIBRETA_Y, 1)} />
      <Son en={9.1} tipo="fila" />
      <Nota desde={9.4} fin={11.6} y={306}>LangGraph la junta con el resto: <b>pregunta</b> sigue ahí</Nota>

      <Flujo desde={10.6} x={342} y={114} dx={90} dur={1.3} tono="var(--ok)" />
      <Son en={10.7} tipo="viaje" />
      <Nota desde={12.0} fin={13.0} y={306}>y al llegar a END, invoke te devuelve la libreta entera</Nota>
      <Son en={12.1} tipo="bien" />

      <Rotulo
        desde={13.4}
        y={120}
        titulo={<>Tres piezas, <span className="verde">y ninguna más</span>.</>}
        bajada={<>Estado, nodos y aristas. Compilar es lo que lo vuelve ejecutable.</>}
      />
      <Son en={13.5} tipo="cierra" />
    </Escena>
  )
}
