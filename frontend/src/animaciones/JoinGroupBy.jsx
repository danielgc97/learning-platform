import Escena, { Chip, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · JOIN + GROUP BY.
// La lección enseña un orden de pensamiento, no una consulta: primero qué va en cada
// fila, después qué datos hacen falta. Aquí se ve ese orden, y la tabla aparece al
// final, que es cuando ya está decidido todo.

export default function JoinGroupBy() {
  return (
    <Escena duracion={17} alto={300} etiqueta="JOIN + GROUP BY: tu primer reporte">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="SQL para tu base"
        titulo={<>Primero la pregunta, <span className="verde">después el SQL</span></>}
        bajada={<>«¿Cuánto ha gastado cada cliente?» se arma en cuatro decisiones.</>}
      />

      <Chip desde={2.6} fin={5.0} y={46}>
        <span className="verbo">GROUP BY c.nombre</span><span className="dato">una fila por cliente</span>
      </Chip>
      <Son en={2.7} tipo="toque" />
      <Nota desde={3.2} fin={5.0} y={94}>¿qué quiero ver en cada fila? un cliente</Nota>

      <Chip desde={5.2} fin={7.6} y={46}>
        <span className="verbo">JOIN clientes</span><span className="dato">ON c.id = p.cliente_id</span>
      </Chip>
      <Son en={5.3} tipo="toque" />
      <Nota desde={5.8} fin={7.6} y={94}>¿qué datos necesito? el nombre está en la otra tabla</Nota>

      <Chip desde={7.8} fin={10.2} y={46}>
        <span className="verbo">COUNT(*)</span>SUM(p.total)
      </Chip>
      <Son en={7.9} tipo="toque" />
      <Nota desde={8.4} fin={10.2} y={94}>¿qué resumo? cuántos pedidos y cuánto dinero</Nota>

      <Chip desde={10.4} y={46}>
        <span className="verbo">ORDER BY gastado</span><span className="dato">DESC</span>
      </Chip>
      <Son en={10.5} tipo="toque" />

      <Tabla
        desde={10.8}
        x={140}
        y={122}
        ancho={240}
        nombre="cuánto gastó cada cliente"
        columnas={['nombre', 'pedidos', 'gastado']}
        filas={[
          { celdas: ['Luis', '2', '230'], desde: 11.4 },
          { celdas: ['Ana', '2', '200'], desde: 12.2 },
          { celdas: ['Marta', '1', '50'], desde: 13.0 },
        ]}
        plantilla="1fr 70px 70px"
      />
      <Son en={10.9} tipo="toque" />
      <Son en={11.5} tipo="fila" />
      <Son en={12.3} tipo="fila" />
      <Son en={13.1} tipo="fila" />

      <Nota desde={13.8} fin={15.2} y={268}>Sofía no sale: no tiene pedidos, y esto es un JOIN</Nota>
      <Nota desde={15.6} y={268}>agrupa por c.id: dos clientes pueden llamarse igual</Nota>
      <Son en={15.7} tipo="cierra" />
    </Escena>
  )
}
