import Escena, { Capa, Chip, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: herramientas del día a día · Git guarda versiones.
// La lección lo compara con el "guardar partida" de un videojuego, y eso es justo lo
// que se ve: puntos en una línea, y la vuelta a uno anterior cuando algo se rompe.

function Punto({ desde, fin, x, texto, mal }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={150} ancho={130}>
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: mal ? 'var(--bad)' : 'var(--ok)',
          }}
        />
        <p className="esc-nota" style={{ marginTop: 10, whiteSpace: 'normal', lineHeight: 1.4 }}>{texto}</p>
      </div>
    </Capa>
  )
}

export default function Git() {
  return (
    <Escena duracion={16} etiqueta="Git: guardar versiones">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={95}
        ojo="Herramientas del día a día"
        titulo={<>El <span className="verde">guardar partida</span> de tu proyecto</>}
        bajada={<>Cada vez que algo funciona, guardas una versión.</>}
      />

      <Riel desde={2.6} fin={13.6} x={60} y={155} largo={400} />

      <Punto desde={2.9} fin={13.6} x={25} texto="Primer commit" />
      <Son en={3.0} tipo="fila" />

      <Chip desde={4.2} centrado={false} x={120} y={95} dx={110} dur={1.5}>
        <span className="verbo">git commit</span>-m &quot;Agrego la lista&quot;
      </Chip>
      <Son en={4.3} tipo="viaje" />
      <Punto desde={5.6} fin={13.6} x={165} texto="Agrego la lista" />
      <Son en={5.7} tipo="fila" />

      {/* Y entonces algo se rompe. */}
      <Punto desde={7.4} fin={13.6} x={305} texto="la IA cambia 20 archivos" mal />
      <Son en={7.5} tipo="mal" />
      <Nota desde={8.4} fin={11.6} y={248}><span className="mal">y nada funciona</span></Nota>

      {/* La vuelta: lo guardado sigue ahí. */}
      <Chip desde={9.6} centrado={false} x={240} y={95} dx={-110} dur={1.6}>
        vuelves al commit anterior
      </Chip>
      <Son en={9.7} tipo="viaje" />
      <Son en={11.3} tipo="bien" />
      <Nota desde={11.9} fin={13.6} y={248}>nada de lo que guardaste se ha perdido</Nota>

      <Rotulo
        desde={13.9}
        y={110}
        titulo={<>Guarda <span className="verde">a menudo</span>.</>}
        bajada={<>Con la IA tocando veinte archivos a la vez, es tu red de seguridad.</>}
      />
      <Son en={14.0} tipo="cierra" />
    </Escena>
  )
}
