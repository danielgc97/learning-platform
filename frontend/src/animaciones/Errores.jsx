import Escena, { Capa, Chip, Marca, Nota, Rotulo, Son } from './Escena'

// Lección: trabajar con IA · cuando algo falla, leer el error.
// El mismo traceback de la lección. Se señala primero la última línea y después las de
// arriba, porque el orden en que se lee es justo el contrario al que parece.

const LINEAS = [
  'Traceback (most recent call last):',
  '  File "main.py", line 5, in <module>',
  '    print(precio * cantidad)',
  "NameError: name 'cantidad' is not defined",
]

// Cada linea con alto fijo: asi se sabe exactamente donde cae, y el recuadro que la
// senala se puede colocar con una cuenta en vez de con una estimacion.
const ALTO_LINEA = 18
const TRAZA_Y = 50
const linea = (i) => TRAZA_Y + 13 + i * ALTO_LINEA

function Traza() {
  return (
    <div
      style={{
        border: '1px solid var(--line)',
        borderRadius: 8,
        background: 'var(--panel)',
        padding: '12px 16px',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: 12,
        whiteSpace: 'pre',
        color: 'var(--muted)',
      }}
    >
      {LINEAS.map((texto, i) => (
        <div key={texto} style={{ height: ALTO_LINEA, lineHeight: `${ALTO_LINEA}px`, color: i === 3 ? 'var(--bad)' : undefined }}>
          {texto}
        </div>
      ))}
    </div>
  )
}

export default function Errores() {
  return (
    <Escena duracion={15} alto={280} etiqueta="Leer un error">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={88}
        ojo="Trabajar con IA"
        titulo={<>Se lee <span className="verde">de abajo hacia arriba</span></>}
        bajada={<>Un error asusta, pero casi siempre dice exactamente qué pasó.</>}
      />

      <Capa desde={2.6} x={40} y={TRAZA_Y} ancho={440}><Traza /></Capa>
      <Son en={2.7} tipo="toque" />

      {/* Primero la última línea: qué y por qué. */}
      <Marca desde={4.0} fin={7.6} x={46} y={linea(3) - 3} ancho={428} alto={ALTO_LINEA + 6} mal />
      <Son en={4.1} tipo="toque" />
      <Nota desde={4.4} fin={7.6} y={180}>empieza por la última línea: qué pasó y por qué</Nota>
      <Chip desde={5.6} fin={7.6} y={216}>
        <span className="verbo">NameError</span>usaste una variable que no existe
      </Chip>
      <Son en={5.7} tipo="bien" />

      {/* Después hacia arriba: dónde. */}
      <Marca desde={8.0} fin={11.0} x={46} y={linea(1) - 3} ancho={428} alto={ALTO_LINEA * 2 + 6} />
      <Son en={8.1} tipo="toque" />
      <Nota desde={8.4} fin={11.0} y={180}>y después hacia arriba: en qué archivo y en qué línea</Nota>
      <Chip desde={9.4} fin={11.0} y={216}>
        <span className="verbo">main.py</span><span className="dato">línea 5</span>
      </Chip>
      <Son en={9.5} tipo="toque" />

      {/* Y qué hacer con él. */}
      <Chip desde={11.4} fin={13.4} y={216}>
        <span className="verbo">pégale el error entero</span><span className="dato">no un resumen</span>
      </Chip>
      <Son en={11.5} tipo="toque" />
      <Nota desde={12.0} fin={13.4} y={180}>y pide primero la causa, después el arreglo</Nota>

      <Nota desde={13.8} y={180}>si da dos vueltas en círculos, vuelve al último commit bueno</Nota>
      <Son en={13.9} tipo="cierra" />
    </Escena>
  )
}
