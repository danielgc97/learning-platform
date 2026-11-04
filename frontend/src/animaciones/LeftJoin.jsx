import Escena, { Capa, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · LEFT JOIN.
// La pregunta de la lección es "¿quiénes nunca compraron?". Lo que hay que ver es que
// Sofía sigue estando en el resultado, con el hueco vacío: ese vacío es la respuesta.

const fila = (tablaY, i) => tablaY + 46 + i * 25

const CLIENTES_Y = 40
const PEDIDOS_Y = 170
const RESULTADO_Y = 196

export default function LeftJoin() {
  return (
    <Escena duracion={17} alto={380} etiqueta="LEFT JOIN: incluir lo que no tiene pareja">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={105}
        ojo="SQL para tu base"
        titulo={<>¿Quiénes <span className="verde">nunca compraron</span>?</>}
        bajada={<>Con un JOIN normal no puedes saberlo: los descarta.</>}
      />

      <Tabla
        desde={2.6}
        x={20}
        y={CLIENTES_Y}
        ancho={230}
        nombre="clientes"
        columnas={['id', 'nombre']}
        filas={[['1', 'Ana'], ['2', 'Sofía']]}
        plantilla="56px 1fr"
      />
      <Tabla
        desde={2.9}
        x={270}
        y={CLIENTES_Y}
        ancho={230}
        nombre="pedidos"
        columnas={['id', 'cliente_id', 'total']}
        filas={[['1', '1', '120']]}
        plantilla="38px 84px 1fr"
      />
      <Son en={2.7} tipo="toque" />
      <Nota desde={4.2} fin={6.6} y={PEDIDOS_Y}>Sofía no tiene ningún pedido</Nota>
      <Marca desde={4.4} fin={6.6} x={20} y={fila(CLIENTES_Y, 1)} />
      <Son en={4.5} tipo="toque" />

      {/* El resultado conserva a todos los de la izquierda. */}
      <Tabla
        desde={7.0}
        x={135}
        y={RESULTADO_Y}
        ancho={250}
        nombre="el resultado"
        columnas={['c.nombre', 'p.total']}
        filas={[
          { celdas: ['Ana', '120'], desde: 8.4 },
          { celdas: ['Sofía', '—'], desde: 10.4 },
        ]}
        plantilla="1fr 80px"
      />
      <Son en={8.5} tipo="fila" />
      <Son en={10.5} tipo="fila" />
      <Marca desde={10.8} fin={13.0} x={135} ancho={250} y={fila(RESULTADO_Y, 1)} />
      <Nota desde={11.2} fin={13.0} y={310}>Sofía sigue ahí, con el total <b>vacío</b></Nota>
      <Son en={11.3} tipo="bien" />

      <Capa desde={13.6} x={95} y={302} ancho={330}>
        <pre className="esc-chip" style={{ display: 'block', whiteSpace: 'pre', textAlign: 'left', fontSize: 10, lineHeight: 1.7, margin: 0 }}>
          <span className="verbo">FROM</span> clientes c{'\n'}
          <span className="verbo">LEFT JOIN</span> pedidos p <span className="verbo">ON</span> p.cliente_id = c.id{'\n'}
          <span className="verbo">WHERE</span> p.id <span className="verbo">IS NULL</span>;
        </pre>
      </Capa>
      <Son en={13.7} tipo="toque" />
      <Nota desde={15.0} y={170}>filtrando por ese vacío te quedan <b>solo los que nunca compraron</b></Nota>
      <Son en={15.1} tipo="cierra" />
    </Escena>
  )
}
