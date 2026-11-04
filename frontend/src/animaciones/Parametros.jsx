import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: backend con FastAPI · parámetros.
// La misma lista TAREAS de la lección. Dos formas de pedir datos desde la URL, y lo
// que pasa cuando el dato no es del tipo que dijiste: la anotación ya es una validación.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const TAREAS_X = 130
const TAREAS_ANCHO = 260
const TAREAS_Y = 50

export default function Parametros() {
  return (
    <Escena duracion={15} alto={310} etiqueta="Datos en la URL: parámetros">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Backend con FastAPI"
        titulo={<>Dos formas de <span className="verde">pedir datos</span></>}
        bajada={<>Una identifica un elemento; la otra filtra la lista.</>}
      />

      <Tabla
        desde={2.6}
        x={TAREAS_X}
        y={TAREAS_Y}
        ancho={TAREAS_ANCHO}
        nombre="TAREAS"
        columnas={['id', 'titulo', 'hecha']}
        filas={[
          ['1', 'Comprar pan', 'False'],
          ['2', 'Pagar la luz', 'True'],
        ]}
        plantilla="50px 1fr 70px"
      />
      <Son en={2.7} tipo="toque" />

      {/* De ruta: identifica. */}
      <Chip desde={4.0} fin={7.0} y={180}>
        <span className="verbo">GET</span>/tareas/2<span className="dato">parámetro de ruta</span>
      </Chip>
      <Son en={4.1} tipo="toque" />
      <Marca desde={4.6} fin={7.0} x={TAREAS_X} ancho={TAREAS_ANCHO} y={fila(TAREAS_Y, 1)} />
      <Son en={4.7} tipo="bien" />
      <Chip desde={5.2} fin={7.0} y={224}>
        <span className="verbo">200</span><span className="dato">{'{ "id": 2, "titulo": "Pagar la luz", … }'}</span>
      </Chip>
      <Nota desde={5.8} fin={7.0} y={272}>va dentro de la dirección, entre llaves en la ruta</Nota>

      {/* De consulta: filtra. */}
      <Chip desde={7.4} fin={10.4} y={180}>
        <span className="verbo">GET</span>/tareas?hecha=true<span className="dato">parámetro de consulta</span>
      </Chip>
      <Son en={7.5} tipo="toque" />
      <Marca desde={8.0} fin={10.4} x={TAREAS_X} ancho={TAREAS_ANCHO} y={fila(TAREAS_Y, 1)} />
      <Son en={8.1} tipo="fila" />
      <Chip desde={8.6} fin={10.4} y={224}>
        <span className="verbo">200</span>solo las que cumplen
      </Chip>
      <Son en={8.7} tipo="bien" />
      <Nota desde={9.2} fin={10.4} y={272}>va después del ?, y es opcional si tiene valor por defecto</Nota>

      {/* Y el tipo, que ya es una validación. */}
      <Chip desde={10.8} y={180} mal>
        <span className="verbo">GET</span>/tareas/abc
      </Chip>
      <Son en={10.9} tipo="toque" />
      <Chip desde={11.4} y={224} mal>
        <span className="verbo">422</span><span className="dato">«abc» no es un número</span>
      </Chip>
      <Son en={11.5} tipo="corta" />
      <Nota desde={12.0} fin={13.4} y={272}>tarea_id: int ya es una validación: tu función ni se ejecuta</Nota>
      <Nota desde={13.8} y={272}>ruta para identificar, consulta para filtrar</Nota>
      <Son en={13.9} tipo="cierra" />
    </Escena>
  )
}
