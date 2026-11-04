import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: frontend con React · listas.
// A la izquierda los datos, a la derecha lo que se dibuja, y el map en medio. La `key`
// se ve salir de la columna id, que es de donde tiene que salir.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const TAREAS_Y = 56

export default function Listas() {
  return (
    <Escena duracion={16} alto={340} etiqueta="Listas con map">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Frontend con React"
        titulo={<>Un arreglo de datos, <span className="verde">uno de pantallas</span></>}
        bajada={<>Es el for de Python, pero el resultado es lo que se ve.</>}
      />

      <Tabla
        desde={2.6}
        fin={12.4}
        x={16}
        y={TAREAS_Y}
        ancho={240}
        nombre="tareas"
        columnas={['id', 'titulo', 'hecha']}
        filas={[
          ['1', 'Comprar pan', 'false'],
          ['2', 'Pagar la luz', 'true'],
        ]}
        plantilla="40px 1fr 60px"
      />
      <Son en={2.7} tipo="toque" />
      <Nota desde={3.4} fin={12.4} centrado={false} x={300} y={56}>lo que se dibuja</Nota>

      <Chip desde={3.6} fin={12.4} y={172}>
        <span className="verbo">tareas.map</span>{'((t) => <Tarea key={t.id} … />)'}
      </Chip>
      <Son en={3.7} tipo="toque" />

      <Chip desde={4.6} fin={12.4} centrado={false} x={300} y={76}>Comprar pan</Chip>
      <Son en={4.7} tipo="fila" />
      <Chip desde={5.4} fin={12.4} centrado={false} x={300} y={122}>
        <span className="verbo">✓</span>Pagar la luz
      </Chip>
      <Son en={5.5} tipo="fila" />
      <Nota desde={6.2} fin={9.0} y={300}>un componente por cada elemento de la lista</Nota>

      {/* La key sale del id, y por eso tiene que ser único y estable. */}
      <Chip desde={7.4} fin={12.4} y={216}>
        <span className="verbo">{'key={t.id}'}</span><span className="dato">único y estable</span>
      </Chip>
      <Son en={7.5} tipo="toque" />
      <Marca desde={8.0} fin={12.4} x={16} ancho={46} y={fila(TAREAS_Y, 0)} alto={50} />
      <Son en={8.1} tipo="bien" />
      <Nota desde={9.4} fin={12.4} y={300}>así React sabe cuál es cuál cuando la lista cambia</Nota>

      {/* Y el caso que casi nadie escribe. */}
      <Chip desde={12.8} centrado={false} x={16} y={56} mal>
        <span className="verbo">const tareas = [ ]</span>
      </Chip>
      <Son en={12.9} tipo="mal" />
      <Chip desde={13.4} centrado={false} x={300} y={56}>No tienes tareas todavía.</Chip>
      <Son en={13.5} tipo="toque" />
      <Nota desde={14.0} y={300}>piensa siempre en el caso «no hay nada»</Nota>
      <Son en={14.1} tipo="cierra" />
    </Escena>
  )
}
