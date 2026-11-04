import Escena, { Chip, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: backend con FastAPI · errores y códigos de estado.
// Los cinco códigos de la lección, cada uno con la respuesta que lo provoca, para que
// el número deje de ser un misterio y pase a ser una frase.

const CASOS = [
  { desde: 3.6, codigo: '200', frase: 'aquí tienes la lista', tono: 'var(--ok)' },
  { desde: 5.4, codigo: '201', frase: 'creada, y te la devuelvo', tono: 'var(--ok)' },
  { desde: 7.2, codigo: '404', frase: 'esa tarea no existe', tono: 'var(--bad)' },
  { desde: 9.0, codigo: '422', frase: 'los datos no cuadran', tono: 'var(--bad)' },
  { desde: 10.8, codigo: '500', frase: 'me he roto yo, no tú', tono: 'var(--bad)' },
]

export default function Codigos() {
  return (
    <Escena duracion={16} alto={360} etiqueta="Errores y códigos de estado">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Backend con FastAPI"
        titulo={<>Un número que es <span className="verde">una frase</span></>}
        bajada={<>Cada respuesta cuenta cómo salió, antes de que mires nada más.</>}
      />

      <Tabla
        desde={2.6}
        x={60}
        y={60}
        ancho={400}
        nombre="lo que responde tu API"
        columnas={['código', 'quiere decir']}
        filas={CASOS.map(({ codigo, frase, desde }) => ({ celdas: [codigo, frase], desde: desde + 0.2 }))}
        plantilla="90px 1fr"
      />
      <Son en={2.7} tipo="toque" />
      {CASOS.map(({ desde, codigo }) => <Son key={codigo} en={desde + 0.3} tipo="fila" />)}

      <Chip desde={3.6} fin={5.2} y={250}><span className="verbo">GET</span>/tareas</Chip>
      <Chip desde={5.4} fin={7.0} y={250}><span className="verbo">POST</span>/tareas</Chip>
      <Chip desde={7.2} fin={8.8} y={250} mal><span className="verbo">PUT</span>/tareas/99</Chip>
      <Chip desde={9.0} fin={10.6} y={250} mal><span className="verbo">POST</span>/tareas<span className="dato">{'{ }'}</span></Chip>
      <Chip desde={10.8} fin={12.4} y={250} mal><span className="verbo">GET</span>/tareas<span className="dato">y algo falla dentro</span></Chip>

      <Nota desde={12.8} y={250}>el <b>4</b> del principio dice que el fallo viene de la petición</Nota>
      <Son en={12.9} tipo="toque" />
      <Nota desde={14.0} y={292}>el <b>5</b>, que el fallo es tuyo y hay que mirar los registros</Nota>
      <Son en={14.1} tipo="cierra" />
    </Escena>
  )
}
