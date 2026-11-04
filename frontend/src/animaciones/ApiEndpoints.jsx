import Escena, { Capa, Chip, Metrica, Nodo, Nota, Rotulo, Son } from './Escena'

// Lección: cómo funciona una app · API y endpoints.
// Los cuatro verbos de la lección, sobre el mismo recurso: cuatro formas de pedirle
// algo a la misma puerta. Al final, las cuatro acciones que resumen cualquier dato.

const VERBOS = [
  { desde: 3.4, verbo: 'GET', ruta: '/tareas', dice: 'te devuelve la lista', tono: 'var(--ok)' },
  { desde: 5.6, verbo: 'POST', ruta: '/tareas', dice: 'crea una nueva', tono: 'var(--accent)' },
  { desde: 7.8, verbo: 'PUT', ruta: '/tareas/7', dice: 'modifica la número 7', tono: 'var(--c2-ink)' },
  { desde: 10.0, verbo: 'DELETE', ruta: '/tareas/7', dice: 'borra la número 7', tono: 'var(--bad)' },
]

export default function ApiEndpoints() {
  return (
    <Escena duracion={16} etiqueta="API y endpoints">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.6}
        y={95}
        ojo="Cómo funciona una app"
        titulo={<>La <span className="verde">carta</span> de tu backend</>}
        bajada={<>No ves la cocina, pero sabes exactamente qué puedes pedir.</>}
      />

      {/* El recurso: una sola puerta, cuatro formas de llamar. */}
      <Nodo desde={2.8} fin={13.6} x={185} y={180} rotulo="Tu backend" sub="/tareas" tono="var(--c2-ink)">
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>

      {VERBOS.map(({ desde, verbo, ruta, dice, tono }) => (
        <Capa key={verbo} desde={desde} fin={desde + 2.0} y={78} x={70} ancho={380}>
          <span className="esc-chip" style={{ gap: 10 }}>
            <span className="verbo" style={{ color: tono }}>{verbo}</span>
            <span>{ruta}</span>
            <span className="dato">· {dice}</span>
          </span>
        </Capa>
      ))}
      {VERBOS.map(({ desde, verbo }) => <Son key={verbo} en={desde + 0.1} tipo="toque" />)}

      <Nota desde={3.6} fin={13.6} y={128}>una dirección y un verbo: eso es un <b>endpoint</b></Nota>

      <Metrica desde={13.9} y={120} cuenta={4} unidad="verbos" pie="leer · crear · modificar · borrar" />
      <Son en={14.0} tipo="cierra" />
      <Nota desde={14.6} y={250}>los programadores lo llaman <b>CRUD</b></Nota>
    </Escena>
  )
}
