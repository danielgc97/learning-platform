import Escena, { Capa, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · GROUP BY.
// Los datos salen del ejemplo de la lección: tres de Accesorios y dos de Cómputo.
// Lo que cuesta entender es que cada fila del resultado es un grupo, no un producto,
// así que las filas de origen se van marcando por grupo antes de que salga su total.

const fila = (tablaY, i) => tablaY + 46 + i * 25

const VENTAS_Y = 40
const RESULTADO_Y = 246

export default function GroupBy() {
  return (
    <Escena duracion={14} alto={360} etiqueta="GROUP BY: totales por categoría">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={105}
        ojo="SQL para tu base"
        titulo={<>Un total <span className="verde">por grupo</span></>}
        bajada={<>No cuánto vendiste en total, sino cuánto en cada categoría.</>}
      />

      <Tabla
        desde={2.6}
        x={75}
        y={VENTAS_Y}
        ancho={370}
        nombre="ventas"
        columnas={['producto', 'categoria']}
        filas={[
          ['Teclado', 'Accesorios'],
          ['Mochila', 'Accesorios'],
          ['Funda', 'Accesorios'],
          ['Portátil', 'Cómputo'],
          ['Monitor', 'Cómputo'],
        ]}
        plantilla="1fr 150px"
      />
      <Son en={2.7} tipo="toque" />

      <Tabla
        desde={4.0}
        x={75}
        y={RESULTADO_Y}
        ancho={370}
        nombre="una fila por grupo"
        columnas={['categoria', 'productos']}
        filas={[
          { celdas: ['Accesorios', '3'], desde: 7.0 },
          { celdas: ['Cómputo', '2'], desde: 10.2 },
        ]}
        plantilla="1fr 120px"
      />

      {/* Primer grupo: las tres filas de Accesorios se juntan en una. */}
      <Marca desde={5.0} fin={7.6} x={75} ancho={370} y={fila(VENTAS_Y, 0)} />
      <Marca desde={5.2} fin={7.6} x={75} ancho={370} y={fila(VENTAS_Y, 1)} />
      <Marca desde={5.4} fin={7.6} x={75} ancho={370} y={fila(VENTAS_Y, 2)} />
      <Son en={5.1} tipo="toque" />
      <Nota desde={5.8} fin={6.8} y={218}>tres filas con la misma categoría</Nota>
      <Son en={7.1} tipo="fila" />

      {/* Segundo grupo. */}
      <Marca desde={8.4} fin={10.8} x={75} ancho={370} y={fila(VENTAS_Y, 3)} />
      <Marca desde={8.6} fin={10.8} x={75} ancho={370} y={fila(VENTAS_Y, 4)} />
      <Son en={8.5} tipo="toque" />
      <Nota desde={9.0} fin={10.0} y={218}>y dos con la otra</Nota>
      <Son en={10.3} tipo="fila" />

      <Nota desde={12.0} y={218}>cada fila del resultado es <b>un grupo</b>, no un producto</Nota>
      <Son en={12.1} tipo="bien" />
    </Escena>
  )
}
