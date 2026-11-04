import Escena, { Capa, Chip, Marca, Nota, Rotulo, Son } from './Escena'

// Lección: herramientas del día a día · la terminal en 6 comandos.
// Lo que no se ve leyendo la tabla de comandos es que el principio de la línea cambia:
// siempre estás dentro de una carpeta, y cada cd te mueve a otra.

// Alto fijo por línea, para poder colocar el recuadro con una cuenta y no a ojo.
const ALTO_LINEA = 18
const CONSOLA_X = 60
const CONSOLA_Y = 50
const PADDING = 15 // el borde de 1px más los 14 de relleno
const linea = (i) => CONSOLA_Y + PADDING + i * ALTO_LINEA
const LINEAS = 7

function Marco() {
  return (
    <div
      style={{
        height: LINEAS * ALTO_LINEA + PADDING * 2 - 2,
        border: '1px solid var(--line)',
        borderRadius: 8,
        background: 'var(--panel)',
      }}
    />
  )
}

function Linea({ desde, i, aqui, texto, salida }) {
  return (
    <Capa desde={desde} x={CONSOLA_X + PADDING + 1} y={linea(i)} ancho={370}>
      <p
        style={{
          margin: 0,
          height: ALTO_LINEA,
          lineHeight: `${ALTO_LINEA}px`,
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 12,
          whiteSpace: 'pre',
          color: 'var(--muted)',
        }}
      >
        {salida ?? (
          <>
            <span style={{ color: 'var(--ok)' }}>{aqui} $ </span>
            <span style={{ color: 'var(--ink)' }}>{texto}</span>
          </>
        )}
      </p>
    </Capa>
  )
}

export default function Terminal() {
  return (
    <Escena duracion={15} alto={310} etiqueta="La terminal en 6 comandos">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={95}
        ojo="Herramientas del día a día"
        titulo={<>Siempre estás <span className="verde">dentro de una carpeta</span></>}
        bajada={<>Los comandos actúan sobre la carpeta en la que estás ahora.</>}
      />

      <Capa desde={2.6} x={CONSOLA_X} y={CONSOLA_Y} ancho={400}><Marco /></Capa>
      <Son en={2.7} tipo="toque" />

      <Linea desde={3.4} i={0} aqui="~" texto="pwd" />
      <Son en={3.5} tipo="toque" />
      <Linea desde={4.0} i={1} salida="/Users/ana" />
      <Son en={4.1} tipo="fila" />
      <Linea desde={4.8} i={2} aqui="~" texto="mkdir mis-proyectos" />
      <Son en={4.9} tipo="toque" />
      <Linea desde={5.6} i={3} aqui="~" texto="cd mis-proyectos" />
      <Son en={5.7} tipo="toque" />
      <Linea desde={6.4} i={4} aqui="mis-proyectos" texto="mkdir tareas" />
      <Son en={6.5} tipo="bien" />

      <Marca desde={6.8} fin={8.6} x={72} y={linea(4) - 2} ancho={130} alto={ALTO_LINEA + 4} />
      <Nota desde={7.0} fin={8.6} y={230}>el principio de la línea dice en qué carpeta estás</Nota>

      <Linea desde={8.6} i={5} aqui="mis-proyectos" texto="cd tareas" />
      <Son en={8.7} tipo="toque" />
      <Linea desde={9.6} i={6} aqui="tareas" texto="code ." />
      <Son en={9.7} tipo="bien" />
      <Marca desde={10.0} fin={11.8} x={72} y={linea(6) - 2} ancho={80} alto={ALTO_LINEA + 4} />
      <Nota desde={10.2} fin={11.8} y={230}>y cada <b>cd</b> te mueve: ahora estás dos carpetas más abajo</Nota>

      <Chip desde={12.2} y={262}>
        <span className="verbo">Tab</span>completa los nombres<span className="dato">↑ recupera el último</span>
      </Chip>
      <Son en={12.3} tipo="toque" />
      <Nota desde={13.0} y={230}>con seis comandos te mueves por todo el proyecto</Nota>
      <Son en={13.1} tipo="cierra" />
    </Escena>
  )
}
