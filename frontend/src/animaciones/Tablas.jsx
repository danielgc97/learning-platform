import Escena, { Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: cómo funciona una app · tablas.
// La tabla de tareas de la lección, señalando una columna, una fila y la clave
// primaria, que son las tres palabras que hay que llevarse.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const TAREAS_Y = 60

export default function Tablas() {
  return (
    <Escena duracion={15} alto={340} etiqueta="Tablas: cómo se guardan los datos">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Cómo funciona una app"
        titulo={<>Una hoja de cálculo <span className="verde">con reglas</span></>}
        bajada={<>Cada tabla guarda un solo tipo de cosa.</>}
      />

      <Tabla
        desde={2.6}
        x={60}
        y={TAREAS_Y}
        ancho={400}
        nombre="tareas"
        columnas={['id', 'titulo', 'hecha']}
        filas={[
          ['1', 'Comprar pan', 'no'],
          ['2', 'Pagar el internet', 'sí'],
          ['3', 'Llamar al dentista', 'no'],
        ]}
        plantilla="60px 1fr 80px"
      />
      <Son en={2.7} tipo="toque" />

      {/* Una fila es una tarea. */}
      <Marca desde={4.2} fin={6.6} x={60} ancho={400} y={fila(TAREAS_Y, 1)} />
      <Son en={4.3} tipo="toque" />
      <Nota desde={4.6} fin={6.6} y={196}>una <b>fila</b> es una tarea concreta</Nota>

      {/* Una columna es un dato de todas. */}
      <Marca desde={7.2} fin={9.6} x={120} ancho={290} y={fila(TAREAS_Y, 0)} alto={75} />
      <Son en={7.3} tipo="toque" />
      <Nota desde={7.6} fin={9.6} y={196}>una <b>columna</b> es un dato que describe a todas</Nota>

      {/* Y el id, que es lo que las distingue. */}
      <Marca desde={10.2} x={60} ancho={60} y={fila(TAREAS_Y, 0)} alto={75} />
      <Son en={10.3} tipo="bien" />
      <Nota desde={10.6} y={196}>el <b>id</b> es único: por eso puedes pedir «la tarea 2» sin dudas</Nota>
      <Nota desde={12.4} y={240}>dos tareas pueden llamarse igual; sus id, nunca</Nota>
      <Son en={12.5} tipo="toque" />
    </Escena>
  )
}
