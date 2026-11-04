import Escena, { Chip, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: herramientas del día a día · entornos virtuales y dependencias.
// Un entorno virtual es una carpeta: invisible en la práctica, pero es justo lo que
// hace falta ver. Dos proyectos, cada uno con su copia, y la lista que los reconstruye.

export default function Entornos() {
  return (
    <Escena duracion={15} alto={360} etiqueta="Entornos y dependencias">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={105}
        ojo="Herramientas del día a día"
        titulo={<>Cada proyecto, <span className="verde">su propia caja</span></>}
        bajada={<>Para que los paquetes de uno no se mezclen con los de otro.</>}
      />

      <Tabla
        desde={2.6}
        x={20}
        y={40}
        ancho={230}
        nombre="proyecto tareas · venv"
        columnas={['paquete', 'versión']}
        filas={[['fastapi', '0.115'], ['requests', '2.31']]}
        plantilla="1fr 70px"
      />
      <Tabla
        desde={2.9}
        x={270}
        y={40}
        ancho={230}
        nombre="proyecto citas · venv"
        columnas={['paquete', 'versión']}
        filas={[['fastapi', '0.99'], ['requests', '2.9']]}
        plantilla="1fr 70px"
      />
      <Son en={2.7} tipo="toque" />

      <Nota desde={4.4} fin={8.4} y={150}>la misma librería, <b>dos versiones</b>, y ninguna estorba</Nota>
      <Son en={4.5} tipo="bien" />

      <Chip desde={5.6} fin={8.4} y={186}>
        <span className="verbo">python</span>-m venv venv
      </Chip>
      <Nota desde={6.6} fin={8.4} y={224}>crea la carpeta con su propia copia de Python</Nota>

      {/* Y la lista que permite reconstruirla en otra computadora. */}
      <Chip desde={8.8} y={186}>
        <span className="verbo">pip freeze</span>&gt; requirements.txt
      </Chip>
      <Son en={8.9} tipo="toque" />
      <Tabla
        desde={9.6}
        x={135}
        y={224}
        ancho={250}
        nombre="requirements.txt"
        columnas={['lo que anota']}
        filas={[['fastapi==0.115'], ['requests==2.31']]}
        plantilla="1fr"
      />
      <Son en={9.7} tipo="fila" />
      <Nota desde={11.6} y={330}>quien reciba tu proyecto lo instala todo con esa lista</Nota>
      <Son en={11.7} tipo="cierra" />
    </Escena>
  )
}
