import Escena, { Capa, Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · claves foráneas.
// El ejemplo de la lección es Ana con su correo repetido en cada pedido. La animación
// empieza por el problema (cambiar el correo obliga a corregir varias filas) y termina
// con el dato guardado una sola vez.

const fila = (tablaY, i) => tablaY + 46 + i * 25

const MAL_Y = 40
const CLIENTES_Y = 170
const PEDIDOS_Y = 258

export default function ClavesForaneas() {
  return (
    <Escena duracion={17} alto={400} etiqueta="Claves foráneas">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="SQL para tu base"
        titulo={<>Guarda el dato <span className="verde">una sola vez</span></>}
        bajada={<>Y que el resto lo señale, en vez de copiarlo.</>}
      />

      {/* El problema: el correo de Ana repetido en cada pedido. */}
      <Tabla
        desde={2.6}
        fin={8.6}
        x={60}
        y={MAL_Y}
        ancho={400}
        nombre="todo junto"
        columnas={['pedido', 'cliente', 'correo', 'total']}
        filas={[['1', 'Ana', 'ana@mail.com', '120'], ['2', 'Ana', 'ana@mail.com', '80']]}
        plantilla="70px 80px 1fr 60px"
      />
      <Son en={2.7} tipo="toque" />
      <Marca desde={4.2} fin={8.6} x={60} ancho={400} y={fila(MAL_Y, 0)} />
      <Marca desde={4.4} fin={8.6} x={60} ancho={400} y={fila(MAL_Y, 1)} />
      <Nota desde={4.8} fin={8.6} y={152}>
        si Ana cambia de correo, hay que corregirlo <span className="mal">en cada fila</span>
      </Nota>
      <Son en={4.9} tipo="mal" />

      {/* La solución: dos tablas y una columna que apunta. */}
      <Tabla
        desde={9.2}
        x={60}
        y={CLIENTES_Y}
        ancho={400}
        nombre="clientes"
        columnas={['id', 'nombre', 'correo']}
        filas={[['1', 'Ana', 'ana@mail.com']]}
        plantilla="60px 90px 1fr"
      />
      <Son en={9.3} tipo="fila" />
      <Tabla
        desde={10.2}
        x={60}
        y={PEDIDOS_Y}
        ancho={400}
        nombre="pedidos"
        columnas={['id', 'cliente_id', 'total']}
        filas={[['1', '1', '120'], ['2', '1', '80']]}
        plantilla="60px 120px 1fr"
      />
      <Son en={10.3} tipo="fila" />

      <Chip desde={11.4} centrado={false} x={150} y={fila(PEDIDOS_Y, 0) - 2} dy={-86} dur={1.6}>
        <span className="verbo">cliente_id</span>apunta al <span className="dato">id</span>
      </Chip>
      <Son en={11.5} tipo="viaje" />
      <Son en={13.1} tipo="llega" />
      <Marca desde={13.1} fin={15.4} x={60} ancho={150} y={fila(CLIENTES_Y, 0)} />

      <Nota desde={13.8} fin={15.4} y={368}>el correo vive en un solo sitio: se corrige una vez</Nota>
      <Son en={13.9} tipo="bien" />

      <Capa desde={15.8} x={85} y={128} ancho={350}>
        <pre className="esc-chip" style={{ display: 'block', whiteSpace: 'pre', textAlign: 'left', fontSize: 10, lineHeight: 1.7, margin: 0 }}>
          cliente_id INTEGER <span className="verbo">REFERENCES</span> clientes(id)
        </pre>
      </Capa>
      <Son en={15.9} tipo="cierra" />
    </Escena>
  )
}
