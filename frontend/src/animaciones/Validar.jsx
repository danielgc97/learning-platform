import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: backend con FastAPI · recibir datos con POST y validarlos.
// Una clase de Pydantic es un portero: compara lo que llega con lo que debería llegar.
// Se ven las dos caras, la que pasa y la que no, con el ejemplo de la lección.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const MODELO_Y = 150

export default function Validar() {
  return (
    <Escena duracion={17} alto={360} etiqueta="Recibir datos y validarlos">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={105}
        ojo="Backend con FastAPI"
        titulo={<>Un <span className="verde">portero</span> para tus datos</>}
        bajada={<>Describes cómo debe venir el cuerpo, y lo que no cuadra no entra.</>}
      />

      <Tabla
        desde={2.6}
        x={135}
        y={MODELO_Y}
        ancho={250}
        nombre="class TareaNueva"
        columnas={['campo', 'tipo']}
        filas={[['titulo', 'str'], ['hecha', 'bool = False']]}
        plantilla="1fr 110px"
      />
      <Son en={2.7} tipo="toque" />

      {/* Lo que cuadra, entra. */}
      <Chip desde={4.2} y={60} dy={66} dur={1.6}>
        <span className="verbo">POST</span>/tareas<span className="dato">{'{ "titulo": "Llamar al dentista" }'}</span>
      </Chip>
      <Son en={4.3} tipo="viaje" />
      <Marca desde={6.0} fin={8.6} x={135} ancho={250} y={fila(MODELO_Y, 0)} />
      <Son en={6.1} tipo="toque" />
      <Nota desde={6.6} fin={8.6} y={268}>titulo es texto, y hecha tiene valor por defecto</Nota>
      <Son en={6.7} tipo="bien" />
      <Chip desde={7.4} fin={9.2} y={300}>
        <span className="verbo">201</span><span className="dato">{'{ "id": 1, "titulo": "Llamar al dentista", "hecha": false }'}</span>
      </Chip>

      {/* Lo que no cuadra, no. */}
      <Chip desde={10.2} y={60} dy={66} dur={1.6} mal>
        <span className="verbo">POST</span>/tareas<span className="dato">{'{ "hecha": "sí" }'}</span>
      </Chip>
      <Son en={10.3} tipo="viaje" />
      <Marca desde={12.0} fin={15.6} x={135} ancho={250} y={fila(MODELO_Y, 1)} />
      <Nota desde={12.4} fin={15.6} y={268}>
        <span className="mal">falta titulo</span> · y «sí» no es un bool
      </Nota>
      <Son en={12.5} tipo="mal" />
      <Chip desde={13.2} fin={15.6} y={300} mal>
        <span className="verbo">422</span><span className="dato">field required</span>
      </Chip>

      <Nota desde={16.0} y={268}>tu código solo recibe datos que ya cuadran</Nota>
      <Son en={16.1} tipo="bien" />
    </Escena>
  )
}
