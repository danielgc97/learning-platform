import Escena, { Capa, Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: usuarios y seguridad · cada usuario ve solo lo suyo (user_id y RLS).
// Lo que cuesta creer es que el filtro no esté en tu código: lo aplica la base de
// datos. Aquí se ve la misma consulta devolviendo cosas distintas según quién pregunta.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const TAREAS_Y = 40
const RESULTADO_Y = 210

export default function Rls() {
  return (
    <Escena duracion={17} alto={400} etiqueta="Cada usuario ve solo lo suyo">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={115}
        ojo="Usuarios y seguridad"
        titulo={<>El filtro vive <span className="verde">en la base</span></>}
        bajada={<>No en tu código. Por si tu código se equivoca algún día.</>}
      />

      <Tabla
        desde={2.6}
        fin={14.6}
        x={60}
        y={TAREAS_Y}
        ancho={400}
        nombre="tareas"
        columnas={['id', 'titulo', 'user_id']}
        filas={[
          ['1', 'Comprar pan', 'ana'],
          ['2', 'Pagar la luz', 'ana'],
          ['3', 'Llamar al taller', 'luis'],
        ]}
        plantilla="50px 1fr 90px"
      />
      <Son en={2.7} tipo="toque" />

      {/* Ana pregunta por todas, y la base le da solo las suyas. */}
      <Chip desde={4.2} fin={14.6} y={176}>
        <span className="verbo">select *</span>from tareas<span className="dato">· lo pide Ana</span>
      </Chip>
      <Son en={4.3} tipo="toque" />
      <Marca desde={5.4} fin={14.6} x={60} ancho={400} y={fila(TAREAS_Y, 0)} />
      <Marca desde={5.6} fin={14.6} x={60} ancho={400} y={fila(TAREAS_Y, 1)} />
      <Son en={5.5} tipo="toque" />

      <Tabla
        desde={6.4}
        fin={14.6}
        x={60}
        y={RESULTADO_Y}
        ancho={400}
        nombre="lo que recibe Ana"
        columnas={['id', 'titulo', 'user_id']}
        filas={[
          { celdas: ['1', 'Comprar pan', 'ana'], desde: 7.2 },
          { celdas: ['2', 'Pagar la luz', 'ana'], desde: 8.4 },
        ]}
        plantilla="50px 1fr 90px"
      />
      <Son en={7.3} tipo="fila" />
      <Son en={8.5} tipo="fila" />
      <Nota desde={9.6} fin={14.6} y={330}>pidió todas, y la tarea de Luis <b>ni aparece</b></Nota>
      <Son en={9.7} tipo="bien" />

      <Capa desde={11.4} fin={14.6} x={70} y={356} ancho={380}>
        <pre className="esc-chip" style={{ display: 'block', whiteSpace: 'pre', textAlign: 'left', fontSize: 10, lineHeight: 1.7, margin: 0 }}>
          <span className="verbo">using</span> (auth.uid() = user_id)
        </pre>
      </Capa>
      <Son en={11.5} tipo="toque" />

      <Rotulo
        desde={15.0}
        y={140}
        titulo={<>Una <span className="verde">segunda cerradura</span>.</>}
        bajada={<>Aunque tu código pida de más, la base no se lo da.</>}
      />
      <Son en={15.1} tipo="toque" />
    </Escena>
  )
}
