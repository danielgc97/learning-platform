import Escena, { Capa, Chip, Metrica, Nota, Rotulo, Tabla } from './Escena'

// Dos tablas separadas y una pregunta que necesita las dos a la vez.
// Lección: SQL para tu base · JOIN.

// Las filas de pedidos 1 y 3 son de la misma clienta: por eso Ana sale dos veces
// en el resultado, que es justo lo que cuesta entender de un JOIN.
const CLIENTES = [['1', 'Ana'], ['2', 'Luis'], ['3', 'Sara']]
const PEDIDOS = [['10', '1', '58.00'], ['11', '3', '12.50'], ['12', '1', '7.00']]
const RESULTADO = [['Ana', '58.00'], ['Sara', '12.50'], ['Ana', '7.00']]

// Cada fila mide 26px y la cabecera 23: con eso se sabe dónde cae cada una.
const filaY = (i) => 130 + 23 + i * 26 + 13

function Enlaces() {
  // De qué fila de clientes viene cada fila de pedidos: 1 → Ana, 3 → Sara, 1 → Ana.
  const pares = [[0, 0], [2, 1], [0, 2]]
  return (
    <svg width="120" height="200" viewBox="0 0 120 200" style={{ position: 'absolute', left: 300, top: 110 }} fill="none">
      {pares.map(([c, p], i) => (
        <path
          key={i}
          d={`M0 ${filaY(c) - 110} C 45 ${filaY(c) - 110}, 75 ${filaY(p) - 110}, 120 ${filaY(p) - 110}`}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity=".85"
        />
      ))}
    </svg>
  )
}

export default function Join() {
  return (
    <Escena duracion={16} etiqueta="Unir dos tablas (JOIN)">
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={130}
        ojo="SQL para tu base"
        titulo={<>Unir <span className="verde">dos tablas</span></>}
        bajada={<>Una guarda los clientes. Otra, los pedidos.<br />¿Cómo sabes <b>quién pidió qué</b>?</>}
      />

      <Tabla
        desde={2.6}
        fin={9.4}
        x={60}
        y={110}
        ancho={240}
        nombre="clientes"
        columnas={['id', 'nombre']}
        filas={CLIENTES}
        plantilla="60px 1fr"
      />
      <Tabla
        desde={2.9}
        fin={9.4}
        x={420}
        y={110}
        ancho={240}
        nombre="pedidos"
        columnas={['id', 'cliente_id', 'total']}
        filas={PEDIDOS}
        plantilla="46px 86px 1fr"
      />

      <Nota desde={4.4} fin={9.4} x={60} y={240}>id · identifica a cada cliente</Nota>
      <Nota desde={4.8} fin={9.4} x={420} y={240}>cliente_id · apunta a la otra tabla</Nota>

      {/* La unión: una línea por cada pedido hasta el cliente al que pertenece. */}
      <Capa desde={5.8} fin={9.4}><Enlaces /></Capa>

      <Chip desde={7.2} fin={9.4} y={300} centrado>
        <span className="verbo">SELECT</span>
        <span className="dato">c.nombre, p.total</span>
        <span className="verbo">FROM</span>pedidos p
        <span className="verbo">JOIN</span>clientes c
        <span className="dato">ON p.cliente_id = c.id</span>
      </Chip>

      {/* El resultado: una sola tabla, con el nombre ya dentro de cada pedido. */}
      <Tabla
        desde={9.8}
        x={225}
        y={100}
        ancho={270}
        nombre="el resultado"
        columnas={['nombre', 'total']}
        filas={RESULTADO}
        plantilla="1fr 90px"
      />
      <Nota desde={11.2} y={230} centrado>
        Ana aparece <b>dos veces</b> porque hizo dos pedidos
      </Nota>

      <Metrica desde={12.6} y={275} cuenta={3} unidad="filas" pie="una por pedido" />
    </Escena>
  )
}
