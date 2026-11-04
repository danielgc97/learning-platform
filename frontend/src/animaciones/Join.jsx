import Escena, { Capa, Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · JOIN: unir tablas.
// Los datos son los mismos que el ejemplo de la lección (Ana 120, Luis 200): si la
// animación enseñara otros, el alumno tendría que traducir entre las dos.
//
// Las dos tablas de partida y la del resultado están a la vez en pantalla, y cada fila
// del resultado baja desde el par que la origina. Nada se va para que aparezca otra cosa.

// Medido en el navegador: el título y la cabecera ocupan 46px, y cada fila 25.
const fila = (tablaY, i) => tablaY + 46 + i * 25

const TABLAS_Y = 40
const RESULTADO_Y = 158
const IZQ = 20
const DER = 270

export default function Join() {
  return (
    <Escena duracion={15} etiqueta="JOIN: unir tablas">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.3}
        y={95}
        ojo="SQL para tu base"
        titulo={<>Unir <span className="verde">dos tablas</span></>}
        bajada={<>El nombre del cliente al lado de cada pedido. Eso hace <b>JOIN</b>.</>}
      />

      {/* Las dos tablas de partida se quedan hasta el final. */}
      <Tabla
        desde={2.5}
        x={IZQ}
        y={TABLAS_Y}
        nombre="clientes"
        columnas={['id', 'nombre']}
        filas={[['1', 'Ana'], ['2', 'Luis']]}
        plantilla="56px 1fr"
      />
      <Tabla
        desde={2.8}
        x={DER}
        y={TABLAS_Y}
        nombre="pedidos"
        columnas={['id', 'cliente_id', 'total']}
        filas={[['1', '1', '120'], ['2', '2', '200']]}
        plantilla="38px 84px 1fr"
      />
      <Son en={2.6} tipo="toque" />

      {/* Y debajo nace la tercera, de momento solo la cabecera. */}
      <Tabla
        desde={3.6}
        x={135}
        y={RESULTADO_Y}
        ancho={250}
        nombre="el resultado"
        columnas={['c.nombre', 'p.total']}
        filas={[
          { celdas: ['Ana', '120'], desde: 6.6 },
          { celdas: ['Luis', '200'], desde: 9.4 },
        ]}
        plantilla="1fr 80px"
      />

      {/* Primer par: el pedido 1 es de Ana, porque su cliente_id vale 1. */}
      <Marca desde={4.4} fin={7.0} x={DER} y={fila(TABLAS_Y, 0)} />
      <Marca desde={4.7} fin={7.0} x={IZQ} y={fila(TABLAS_Y, 0)} />
      <Son en={4.4} tipo="toque" />
      <Nota desde={4.9} fin={6.4} y={148}>cliente_id <b>1</b> → el cliente <b>1</b></Nota>
      <Chip
        desde={5.4}
        centrado={false}
        x={DER + 10}
        y={fila(TABLAS_Y, 0) - 1}
        dx={-130}
        dy={fila(RESULTADO_Y, 0) - fila(TABLAS_Y, 0)}
        dur={1.3}
      >
        Ana<span className="dato">120</span>
      </Chip>
      <Son en={5.5} tipo="viaje" />
      <Son en={6.7} tipo="fila" />

      {/* Segundo par: el pedido 2 es de Luis. */}
      <Marca desde={7.4} fin={10.0} x={DER} y={fila(TABLAS_Y, 1)} />
      <Marca desde={7.7} fin={10.0} x={IZQ} y={fila(TABLAS_Y, 1)} />
      <Son en={7.4} tipo="toque" />
      <Nota desde={7.9} fin={9.2} y={148}>cliente_id <b>2</b> → el cliente <b>2</b></Nota>
      <Chip
        desde={8.2}
        centrado={false}
        x={DER + 10}
        y={fila(TABLAS_Y, 1) - 1}
        dx={-130}
        dy={fila(RESULTADO_Y, 1) - fila(TABLAS_Y, 1)}
        dur={1.3}
      >
        Luis<span className="dato">200</span>
      </Chip>
      <Son en={8.3} tipo="viaje" />
      <Son en={9.5} tipo="fila" />

      {/* La consulta que acaba de ocurrir, tal cual está escrita en la lección. */}
      <Capa desde={10.4} fin={12.8} x={95} y={256} ancho={330}>
        <pre className="esc-chip" style={{ display: 'block', whiteSpace: 'pre', textAlign: 'left', fontSize: 10, lineHeight: 1.7, margin: 0 }}>
          <span className="verbo">SELECT</span> c.nombre, p.total{'\n'}
          <span className="verbo">FROM</span> pedidos p{'\n'}
          <span className="verbo">JOIN</span> clientes c <span className="verbo">ON</span> c.id = p.cliente_id;
        </pre>
      </Capa>
      <Son en={10.5} tipo="toque" />

      <Nota desde={13.2} y={282}>un cliente sin pedidos <b>no aparecería</b></Nota>
      <Son en={13.3} tipo="bien" />
    </Escena>
  )
}
