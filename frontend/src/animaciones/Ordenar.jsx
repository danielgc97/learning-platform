import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · ORDER BY y LIMIT.
// La misma tabla ventas de la lección. El resultado se forma en el orden que pide el
// ORDER BY, no en el de la tabla, y encima se ve el LIMIT cortando lo que sobra.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const VENTAS_Y = 50
const RESULTADO_X = 300
const RESULTADO_ANCHO = 204

export default function Ordenar() {
  return (
    <Escena duracion={17} alto={370} etiqueta="ORDER BY y LIMIT">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="SQL para tu base"
        titulo={<>Si no lo pides, <span className="verde">no hay orden</span></>}
        bajada={<>Una base de datos no garantiza ninguno por su cuenta.</>}
      />

      <Tabla
        desde={2.6}
        x={16}
        y={VENTAS_Y}
        ancho={270}
        nombre="ventas"
        columnas={['producto', 'precio']}
        filas={[
          ['Laptop', '3200.0'],
          ['Mouse', '45.5'],
          ['Teclado', '120.0'],
          ['Monitor', '850.0'],
          ['Cable HDMI', '15.0'],
          ['Silla', '400.0'],
        ]}
        plantilla="1fr 80px"
      />
      <Son en={2.7} tipo="toque" />

      <Chip desde={4.0} fin={13.0} centrado={false} x={16} y={270}>
        <span className="verbo">ORDER BY</span>precio <span className="dato">DESC</span>
      </Chip>
      <Son en={4.1} tipo="toque" />

      {/* El resultado se llena de mayor a menor, saltando por la tabla. */}
      <Tabla
        desde={5.0}
        x={RESULTADO_X}
        y={VENTAS_Y}
        ancho={RESULTADO_ANCHO}
        nombre="lo que te devuelve"
        columnas={['producto', 'precio']}
        filas={[
          { celdas: ['Laptop', '3200.0'], desde: 5.8 },
          { celdas: ['Monitor', '850.0'], desde: 7.0 },
          { celdas: ['Silla', '400.0'], desde: 8.2 },
          { celdas: ['Teclado', '120.0'], desde: 9.4 },
          { celdas: ['Mouse', '45.5'], desde: 10.6 },
          { celdas: ['Cable HDMI', '15.0'], desde: 11.8 },
        ]}
        plantilla="1fr 70px"
      />

      <Marca desde={5.4} fin={6.6} x={16} ancho={270} y={fila(VENTAS_Y, 0)} />
      <Son en={5.8} tipo="fila" />
      <Marca desde={6.6} fin={7.8} x={16} ancho={270} y={fila(VENTAS_Y, 3)} />
      <Son en={7.0} tipo="fila" />
      <Marca desde={7.8} fin={9.0} x={16} ancho={270} y={fila(VENTAS_Y, 5)} />
      <Son en={8.2} tipo="fila" />
      <Marca desde={9.0} fin={10.2} x={16} ancho={270} y={fila(VENTAS_Y, 2)} />
      <Son en={9.4} tipo="fila" />
      <Marca desde={10.2} fin={11.4} x={16} ancho={270} y={fila(VENTAS_Y, 1)} />
      <Son en={10.6} tipo="fila" />
      <Marca desde={11.4} fin={12.6} x={16} ancho={270} y={fila(VENTAS_Y, 4)} />
      <Son en={11.8} tipo="fila" />

      {/* Y el LIMIT, que corta lo ya ordenado. */}
      <Chip desde={13.4} centrado={false} x={16} y={270}>
        <span className="verbo">LIMIT</span>3<span className="dato">corta después de tres filas</span>
      </Chip>
      <Son en={13.5} tipo="toque" />
      <Marca desde={13.8} x={RESULTADO_X} ancho={RESULTADO_ANCHO} y={fila(VENTAS_Y, 3)} alto={75} mal />
      <Son en={13.9} tipo="corta" />
      <Nota desde={14.2} fin={15.4} y={316}>te quedas con los tres productos más caros</Nota>
      <Nota desde={15.6} y={316}>«los más vendidos» o «los últimos» son esto mismo</Nota>
      <Son en={15.7} tipo="cierra" />
    </Escena>
  )
}
