import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: SQL para tu base · INSERT, UPDATE y DELETE.
// El inventario de los ejercicios. Las tres instrucciones señalan la fila a la que
// afectan, y al final se ve lo que pasa cuando el WHERE no está: el recuadro rojo cubre
// la tabla entera.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const INV_X = 110
const INV_ANCHO = 250
const INV_Y = 50

export default function Cambiar() {
  return (
    <Escena duracion={18} alto={350} etiqueta="INSERT, UPDATE y DELETE">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="SQL para tu base"
        titulo={<>El <span className="verde">WHERE</span> decide a cuáles</>}
        bajada={<>Tu producto no solo lee datos: también los crea, los corrige y los borra.</>}
      />

      <Tabla
        desde={2.6}
        x={INV_X}
        y={INV_Y}
        ancho={INV_ANCHO}
        nombre="inventario"
        columnas={['producto', 'stock']}
        filas={[
          ['Mouse', '8'],
          ['Silla', '3'],
          ['Teclado', '15'],
          ['Monitor', '4'],
          { celdas: ['Cable', '30'], desde: 5.2 },
        ]}
        plantilla="1fr 70px"
      />
      <Son en={2.7} tipo="toque" />

      {/* Agregar: una fila más, al final. */}
      <Chip desde={4.0} fin={6.6} y={240}>
        <span className="verbo">INSERT INTO</span>inventario<span className="dato">{"('Cable', 30)"}</span>
      </Chip>
      <Son en={4.1} tipo="toque" />
      <Son en={5.3} tipo="fila" />
      <Nota desde={5.6} fin={6.6} y={288}>una fila nueva, al final de la tabla</Nota>

      {/* Corregir: solo la fila que el WHERE señala. */}
      <Chip desde={7.0} fin={9.6} y={240}>
        <span className="verbo">UPDATE</span>SET stock = 12 <span className="dato">WHERE producto = {"'Mouse'"}</span>
      </Chip>
      <Son en={7.1} tipo="toque" />
      <Marca desde={7.8} fin={9.6} x={INV_X} ancho={INV_ANCHO} y={fila(INV_Y, 0)} />
      <Chip desde={8.2} fin={9.6} centrado={false} x={374} y={fila(INV_Y, 0) - 2}>
        8 <span className="verbo">→ 12</span>
      </Chip>
      <Son en={8.3} tipo="cuenta" />
      <Nota desde={8.6} fin={9.6} y={288}>cambia una sola fila: la que cumple la condición</Nota>

      {/* Borrar: la fila deja de existir. */}
      <Chip desde={10.0} fin={12.4} y={240} mal>
        <span className="verbo">DELETE FROM</span>inventario<span className="dato">WHERE producto = {"'Silla'"}</span>
      </Chip>
      <Son en={10.1} tipo="toque" />
      <Marca desde={10.8} fin={12.4} x={INV_X} ancho={INV_ANCHO} y={fila(INV_Y, 1)} mal />
      <Son en={10.9} tipo="corta" />
      <Nota desde={11.2} fin={12.4} y={288}>esa fila deja de existir, y no vuelve</Nota>

      {/* Y lo que pasa cuando el WHERE no está. */}
      <Chip desde={12.8} fin={15.4} y={240} mal>
        <span className="verbo">DELETE FROM</span>inventario;<span className="dato">sin WHERE</span>
      </Chip>
      <Marca desde={13.2} fin={15.4} x={INV_X} ancho={INV_ANCHO} y={fila(INV_Y, 0)} alto={125} mal />
      <Son en={13.3} tipo="mal" />
      <Nota desde={13.6} fin={15.4} y={288}>
        <span className="mal">se aplica a todas</span> · la tabla queda vacía
      </Nota>

      <Nota desde={15.8} y={288}>revisa el WHERE antes de ejecutar, sobre todo si lo escribió la IA</Nota>
      <Son en={15.9} tipo="cierra" />
    </Escena>
  )
}
