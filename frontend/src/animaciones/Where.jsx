import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · WHERE, filtrar filas.
// La tabla ventas de la lección y su primer ejemplo, WHERE precio > 100. Lo que hay que
// ver es que el resultado se va formando fila a fila, y que las que no cumplen se
// quedan en la tabla: no desaparecen, simplemente no pasan.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const VENTAS_Y = 50

export default function Where() {
  return (
    <Escena duracion={16} alto={370} etiqueta="WHERE: filtrar filas">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="SQL para tu base"
        titulo={<>Quedarte con <span className="verde">las que cumplen</span></>}
        bajada={<>Casi nunca quieres todas las filas de una tabla.</>}
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

      <Chip desde={4.0} fin={13.4} centrado={false} x={16} y={270}>
        <span className="verbo">WHERE</span>precio {'>'} 100
      </Chip>
      <Son en={4.1} tipo="toque" />

      {/* El resultado se forma fila a fila, al ritmo de la comprobación. */}
      <Tabla
        desde={5.0}
        x={300}
        y={VENTAS_Y}
        ancho={204}
        nombre="lo que te devuelve"
        columnas={['producto', 'precio']}
        filas={[
          { celdas: ['Laptop', '3200.0'], desde: 5.8 },
          { celdas: ['Teclado', '120.0'], desde: 7.2 },
          { celdas: ['Monitor', '850.0'], desde: 8.6 },
          { celdas: ['Silla', '400.0'], desde: 10.0 },
        ]}
        plantilla="1fr 70px"
      />

      <Marca desde={5.4} fin={6.6} x={16} ancho={270} y={fila(VENTAS_Y, 0)} />
      <Son en={5.8} tipo="fila" />
      <Marca desde={6.8} fin={8.0} x={16} ancho={270} y={fila(VENTAS_Y, 2)} />
      <Son en={7.2} tipo="fila" />
      <Marca desde={8.2} fin={9.4} x={16} ancho={270} y={fila(VENTAS_Y, 3)} />
      <Son en={8.6} tipo="fila" />
      <Marca desde={9.6} fin={10.8} x={16} ancho={270} y={fila(VENTAS_Y, 5)} />
      <Son en={10.0} tipo="fila" />

      {/* Las dos que no cumplen. Siguen en ventas; lo que no hay es sitio para ellas. */}
      <Marca desde={11.2} fin={13.4} x={16} ancho={270} y={fila(VENTAS_Y, 1)} mal />
      <Marca desde={11.4} fin={13.4} x={16} ancho={270} y={fila(VENTAS_Y, 4)} mal />
      <Son en={11.3} tipo="corta" />
      <Nota desde={11.8} fin={13.4} y={316}>
        <span className="mal">45.5 y 15.0 no pasan de 100</span> · siguen ahí, pero no en el resultado
      </Nota>

      <Chip desde={13.8} centrado={false} x={16} y={270}>
        <span className="verbo">WHERE</span>categoria = <span className="dato">{"'Accesorios'"}</span>
      </Chip>
      <Son en={13.9} tipo="toque" />
      <Nota desde={14.2} y={316}>los textos van entre comillas simples; los números, sin ellas</Nota>
      <Son en={14.3} tipo="cierra" />
    </Escena>
  )
}
