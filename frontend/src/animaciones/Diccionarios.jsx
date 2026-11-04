import Escena, { Chip, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: Python para tu backend · diccionarios.
// El producto de la lección, tres veces: como diccionario, como fila de una tabla y
// como JSON. Son la misma forma, y esa es la idea que hace falta llevarse para que
// después el backend no parezca magia.

export default function Diccionarios() {
  return (
    <Escena duracion={16} alto={330} etiqueta="Diccionarios: clave y valor">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Python para tu backend"
        titulo={<>Un registro <span className="verde">con nombre</span></>}
        bajada={<>Una lista guarda por posición; un diccionario, por significado.</>}
      />

      <Chip desde={2.6} y={56}>
        <span className="verbo">producto =</span>{'{"nombre": "Mouse", "precio": 45.5, "stock": 10}'}
      </Chip>
      <Son en={2.7} tipo="toque" />

      <Chip desde={3.6} fin={5.2} y={108}>
        <span className="verbo">{'producto["precio"]'}</span><span className="dato">45.5</span>
      </Chip>
      <Son en={3.7} tipo="toque" />
      <Chip desde={5.4} fin={7.0} y={108}>
        <span className="verbo">{'producto["stock"] = 8'}</span><span className="dato">cambia el valor</span>
      </Chip>
      <Son en={5.5} tipo="toque" />
      <Chip desde={7.2} fin={8.8} y={108} mal>
        <span className="verbo">{'producto["descuento"]'}</span><span className="dato">KeyError</span>
      </Chip>
      <Son en={7.3} tipo="mal" />
      <Chip desde={9.0} fin={10.6} y={108}>
        <span className="verbo">{'producto.get("descuento", 0)'}</span><span className="dato">0</span>
      </Chip>
      <Son en={9.1} tipo="bien" />
      <Nota desde={9.6} fin={10.6} y={296}>get devuelve un valor por defecto en vez de romper</Nota>

      {/* La misma forma, en los otros dos sitios donde te la vas a encontrar. */}
      <Tabla
        desde={11.0}
        x={80}
        y={164}
        ancho={360}
        nombre="productos"
        columnas={['nombre', 'precio', 'stock']}
        filas={[['Mouse', '45.5', '10']]}
        plantilla="1fr 90px 70px"
      />
      <Son en={11.1} tipo="toque" />
      <Nota desde={11.6} fin={13.4} y={296}>esa misma forma es una fila de tu tabla</Nota>

      <Chip desde={13.0} y={252}>
        <span className="verbo">JSON</span>{'{"nombre": "Mouse", "precio": 45.5, "stock": 10}'}
      </Chip>
      <Son en={13.1} tipo="toque" />
      <Nota desde={13.8} y={296}>y lo que viaja por tu API: por eso recibes diccionarios</Nota>
      <Son en={13.9} tipo="cierra" />
    </Escena>
  )
}
