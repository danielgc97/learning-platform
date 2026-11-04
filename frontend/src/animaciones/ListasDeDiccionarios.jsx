import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: Python para tu backend · listas de diccionarios.
// Los mismos productos de la lección. Se ven los dos patrones uno detrás del otro, y
// sobre todo se ve que el for pasa por todas las filas aunque alguna no aporte nada.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const PROD_X = 130
const PROD_ANCHO = 260
const PROD_Y = 50

export default function ListasDeDiccionarios() {
  return (
    <Escena duracion={16} alto={330} etiqueta="Listas de diccionarios">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Python para tu backend"
        titulo={<>Un <span className="verde">for</span>, un <span className="verde">if</span>, y el resultado al final</>}
        bajada={<>Es lo que recibe tu backend cuando pide datos a la base.</>}
      />

      <Tabla
        desde={2.6}
        x={PROD_X}
        y={PROD_Y}
        ancho={PROD_ANCHO}
        nombre="productos"
        columnas={['nombre', 'precio', 'stock']}
        filas={[
          ['Mouse', '45.5', '10'],
          ['Silla', '400', '0'],
          ['Cable', '15', '0'],
        ]}
        plantilla="1fr 70px 60px"
      />
      <Son en={2.7} tipo="toque" />

      {/* Filtrar: quedarte con algunos. */}
      <Chip desde={4.0} fin={8.6} y={196}>
        <span className="verbo">for p in productos:</span>{'if p["stock"] == 0'}
      </Chip>
      <Son en={4.1} tipo="toque" />
      <Marca desde={4.8} fin={8.6} x={PROD_X} ancho={PROD_ANCHO} y={fila(PROD_Y, 1)} />
      <Son en={4.9} tipo="fila" />
      <Marca desde={5.6} fin={8.6} x={PROD_X} ancho={PROD_ANCHO} y={fila(PROD_Y, 2)} />
      <Son en={5.7} tipo="fila" />
      <Chip desde={6.4} fin={8.6} y={240}>
        <span className="verbo">agotados</span>{"['Silla', 'Cable']"}
      </Chip>
      <Son en={6.5} tipo="bien" />
      <Nota desde={6.9} fin={8.6} y={288}>una lista vacía antes del for, y dentro vas agregando</Nota>

      {/* Calcular: resumir todos. */}
      <Chip desde={9.0} y={196}>
        <span className="verbo">valor = valor +</span>{'p["precio"] * p["stock"]'}
      </Chip>
      <Son en={9.1} tipo="toque" />
      <Marca desde={9.6} fin={10.6} x={PROD_X} ancho={PROD_ANCHO} y={fila(PROD_Y, 0)} />
      <Son en={9.7} tipo="cuenta" />
      <Chip desde={10.0} y={240}>
        <span className="verbo">valor</span>455.0
      </Chip>
      <Marca desde={10.8} fin={11.8} x={PROD_X} ancho={PROD_ANCHO} y={fila(PROD_Y, 1)} />
      <Son en={10.9} tipo="cuenta" />
      <Marca desde={12.0} fin={13.0} x={PROD_X} ancho={PROD_ANCHO} y={fila(PROD_Y, 2)} />
      <Son en={12.1} tipo="cuenta" />
      <Nota desde={11.2} fin={13.4} y={288}>los de stock 0 no suman nada, pero el for pasa por ellos</Nota>

      <Nota desde={13.8} y={288}>es lo que WHERE y SUM hacen en SQL, escrito en Python</Nota>
      <Son en={13.9} tipo="cierra" />
    </Escena>
  )
}
