import Escena, { Capa, Chip, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: trabajar con IA · pasos pequeños.
// Arriba, lo que pasa al pedirlo todo de golpe. Abajo, el ciclo de la lección, con el
// commit al final de cada paso: eso es lo que convierte un fallo en un paso atrás en
// vez de en un desastre.

function Paso({ desde, x, texto }) {
  return (
    <Capa desde={desde} x={x} y={76} ancho={110}>
      <div style={{ textAlign: 'center' }}>
        <span style={{ display: 'block', margin: '0 auto', width: 11, height: 11, borderRadius: '50%', background: 'var(--ok)' }} />
        <p className="esc-nota" style={{ marginTop: 10, whiteSpace: 'normal', lineHeight: 1.4 }}>{texto}</p>
      </div>
    </Capa>
  )
}

export default function PasosPequenos() {
  return (
    <Escena duracion={14} alto={256} etiqueta="Pasos pequeños con la IA">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Trabajar con IA"
        titulo={<>Plan primero, <span className="verde">código después</span></>}
        bajada={<>El error más común es pedirlo todo de golpe.</>}
      />

      <Chip desde={2.6} fin={7.4} y={48} mal>
        <span className="verbo">«hazme la app completa»</span>
      </Chip>
      <Son en={2.7} tipo="mal" />
      <Chip desde={3.4} fin={7.4} y={92} mal>
        <span className="verbo">23 archivos nuevos</span>de una vez<span className="dato">y algo falla</span>
      </Chip>
      <Son en={3.5} tipo="toque" />
      <Nota desde={4.4} fin={7.4} y={136}>
        <span className="mal">no sabes en cuál</span> · y pedir que lo arregle suele empeorarlo
      </Nota>
      <Son en={4.5} tipo="corta" />

      {/* El ciclo que sí funciona. */}
      <Riel desde={7.8} x={75} y={81} largo={375} />
      <Paso desde={8.0} x={20} texto="pide un plan" />
      <Son en={8.1} tipo="fila" />
      <Paso desde={8.8} x={145} texto="revisa el plan" />
      <Son en={8.9} tipo="fila" />
      <Paso desde={9.6} x={270} texto="pide un paso" />
      <Son en={9.7} tipo="fila" />
      <Paso desde={10.4} x={395} texto="pruébalo" />
      <Son en={10.5} tipo="fila" />

      <Chip desde={11.4} y={166}>
        <span className="verbo">git commit</span>y vuelves aquí si el siguiente paso rompe todo
      </Chip>
      <Son en={11.5} tipo="bien" />
      <Nota desde={12.4} y={212}>buen tamaño de paso: el que puedes probar en cinco minutos</Nota>
      <Son en={12.5} tipo="cierra" />
    </Escena>
  )
}
