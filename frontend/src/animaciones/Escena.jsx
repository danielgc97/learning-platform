import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './escena.css'
import { sonar } from './sonido'

// Un factor sobre todos los tiempos: así se afina el ritmo de todas las animaciones
// a la vez, sin tocar los segundos de cada escena. Más alto, más despacio.
const RITMO = 1.35

// Hasta cuánto puede crecer el lienzo sobre su tamaño de diseño.
const MAX_ESCALA = 1.35

const Reloj = createContext(null)

// El lienzo se dibuja siempre en las mismas unidades (520×330, el ancho de la columna
// que ocupa al lado del texto) y se escala si el hueco es menor.
export default function Escena({ duracion, ancho = 520, alto = 330, etiqueta, children }) {
  const marco = useRef(null)
  const inicio = useRef(0) // cuándo empezó el ciclo actual
  const llevado = useRef(0) // segundos ya corridos, para poder reanudar
  const [escala, setEscala] = useState(1)
  const [ciclo, setCiclo] = useState(0)
  const [estado, setEstado] = useState('espera')
  const [sonando, setSonando] = useState(() => {
    try { return localStorage.getItem('cortexlab-sonido') === '1' } catch { return false }
  })

  const total = duracion * RITMO

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setEscala(Math.min(MAX_ESCALA, e.contentRect.width / ancho)))
    ro.observe(marco.current)
    return () => ro.disconnect()
  }, [ancho])

  // Arranca cuando entra en pantalla: si empezara al cargar la página, el alumno
  // llegaría cuando ya ha terminado. En una copia oculta no se dispara nunca.
  useEffect(() => {
    if (estado !== 'espera') return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        inicio.current = performance.now()
        setEstado('corre')
      },
      { threshold: 0.3 },
    )
    io.observe(marco.current)
    return () => io.disconnect()
  }, [estado])

  useEffect(() => {
    if (estado !== 'corre') return
    const id = setTimeout(() => setEstado('fin'), Math.max(0, (total - llevado.current) * 1000))
    return () => clearTimeout(id)
  }, [estado, ciclo, total])

  function repite() {
    llevado.current = 0
    inicio.current = performance.now()
    setCiclo((c) => c + 1)
    setEstado('corre')
  }

  function alterna() {
    if (estado === 'fin') return repite()
    if (estado === 'corre') {
      llevado.current = (performance.now() - inicio.current) / 1000
      return setEstado('pausa')
    }
    inicio.current = performance.now() - llevado.current * 1000
    setEstado('corre')
  }

  function alternaSonido() {
    const nuevo = !sonando
    setSonando(nuevo)
    try { localStorage.setItem('cortexlab-sonido', nuevo ? '1' : '0') } catch { /* sin memoria, da igual */ }
    if (nuevo) sonar('toque')
  }

  const corriendo = estado === 'corre'
  const texto = corriendo ? 'Pausar' : estado === 'fin' ? 'Repetir' : 'Reproducir'

  return (
    <figure className="my-8" style={{ maxWidth: ancho * MAX_ESCALA }}>
      <div ref={marco} className="esc-marco" style={{ height: alto * escala }}>
        <div
          key={ciclo}
          className={`esc-lienzo ${corriendo ? '' : 'quieta'}`}
          style={{ width: ancho, height: alto, transform: `scale(${escala})`, '--seek': '0s', '--total': `${total}s` }}
        >
          <Reloj.Provider value={{ ciclo, corriendo, inicio, sonando }}>{children}</Reloj.Provider>
          <div className="esc-tiempo"><i /></div>
        </div>
      </div>
      <figcaption className="esc-mandos">
        <button type="button" onClick={alterna}>{texto}</button>
        <button type="button" onClick={alternaSonido} aria-pressed={sonando}>
          {sonando ? 'Sonido: sí' : 'Sonido: no'}
        </button>
        <span>{etiqueta}</span>
      </figcaption>
    </figure>
  )
}

/* ---------- piezas ---------- */

const t = (s) => `${(s * RITMO).toFixed(2)}s`
const tiempos = (desde, fin) => ({ '--in': t(desde), ...(fin === undefined ? {} : { '--out': t(fin) }) })

// Una marca sonora en el segundo `en`: se programa desde el reloj de la escena, así
// que respeta la pausa y el repetir.
export function Son({ en, tipo }) {
  const { ciclo, corriendo, inicio, sonando } = useContext(Reloj)
  useEffect(() => {
    if (!corriendo || !sonando) return
    const falta = en * RITMO * 1000 - (performance.now() - inicio.current)
    if (falta < -300) return
    const id = setTimeout(() => sonar(tipo), Math.max(0, falta))
    return () => clearTimeout(id)
  }, [ciclo, corriendo, sonando, en, tipo, inicio])
  return null
}

export function Capa({ desde, fin, x = 0, y = 0, ancho, centrado, children }) {
  return (
    <div
      className="esc-capa"
      style={{
        ...tiempos(desde, fin),
        left: centrado ? 0 : x,
        top: y,
        width: centrado ? '100%' : ancho,
        textAlign: centrado ? 'center' : undefined,
      }}
    >
      {children}
    </div>
  )
}

export function Nodo({ desde, fin, x, y, rotulo, sub, tono: color, late, children }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={y} ancho={150}>
      <div className="esc-nodo">
        <p className="esc-rotulo" style={color ? { color } : undefined}>{rotulo}</p>
        <div
          className="esc-caja"
          style={{ ...(late === undefined ? {} : { '--late': t(late) }), ...(color ? { '--tono': color } : {}) }}
        >
          {children}
        </div>
        {sub && <p className="esc-sub">{sub}</p>}
      </div>
    </Capa>
  )
}

export function Chip({ desde, fin, x, y, dx, dy, dur = 1.4, centrado = true, mal, children }) {
  const clase = `esc-chip${mal ? ' mal' : ''}`
  if (dx === undefined && dy === undefined) {
    return (
      <Capa desde={desde} fin={fin} x={x} y={y} centrado={centrado}>
        <span className={clase}>{children}</span>
      </Capa>
    )
  }
  return (
    <div style={{ position: 'absolute', top: y, left: centrado ? 0 : x, width: centrado ? '100%' : undefined, textAlign: centrado ? 'center' : undefined }}>
      <span
        className={`${clase} viajero`}
        style={{ '--in': t(desde), '--dx': `${dx || 0}px`, '--dy': `${dy || 0}px`, '--dur': t(dur) }}
      >
        {children}
      </span>
    </div>
  )
}

// Los puntos que recorren el riel: lo único que se mueve mientras se lee.
export function Flujo({ desde, x, y, dx = 0, dy = 0, dur = 1.3, tono: color, n = 5 }) {
  return (
    <div
      className="esc-flujo"
      style={{ position: 'absolute', left: x, top: y, '--in': t(desde), '--dur': t(dur), ...(color ? { '--tono': color } : {}) }}
    >
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ '--d': t(i * 0.12), '--dx': `${dx}px`, '--dy': `${dy}px` }} />
      ))}
    </div>
  )
}

export function Riel({ desde, fin, x, y, largo, vertical }) {
  return (
    <div className="esc-capa" style={{ ...tiempos(desde, fin), left: x, top: y }}>
      <div className={`esc-riel${vertical ? ' vertical' : ''}`} style={vertical ? { height: largo } : { width: largo }} />
    </div>
  )
}

export function Nota({ desde, fin, x, y, centrado = true, children }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={y} centrado={centrado}>
      <p className="esc-nota">{children}</p>
    </Capa>
  )
}

export function Metrica({ desde, fin, y, cuenta, unidad, pie }) {
  return (
    <Capa desde={desde} fin={fin} y={y} centrado>
      <div className="esc-metrica">
        <p className="esc-cifra" style={{ '--hasta': cuenta, '--in': t(desde) }}>
          {unidad && <small>{unidad}</small>}
        </p>
        <p className="esc-pie-metrica">{pie}</p>
      </div>
    </Capa>
  )
}

export function Rotulo({ desde, fin, x = 28, y, ancho = 460, ojo, titulo, bajada }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={y} ancho={ancho}>
      {ojo && <p className="esc-ojo">{ojo}</p>}
      <p className="esc-titular">{titulo}</p>
      {bajada && <p className="esc-bajada">{bajada}</p>}
    </Capa>
  )
}

// Una tabla cuyas filas pueden aparecer cada una a su hora: así se ve formarse.
export function Tabla({ desde, fin, x = 28, y, ancho = 230, nombre, columnas, filas, plantilla }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={y} ancho={ancho}>
      {nombre && <p className="esc-titulo-tabla">{nombre}</p>}
      <div className="esc-tabla">
        <div className="cabecera" style={{ gridTemplateColumns: plantilla }}>
          {columnas.map((c) => <span key={c}>{c}</span>)}
        </div>
        {filas.map((fila, i) => {
          const celdas = Array.isArray(fila) ? fila : fila.celdas
          const cuando = Array.isArray(fila) ? undefined : fila.desde
          return (
            <div
              key={i}
              className={`fila${cuando === undefined ? '' : ' aparece'}`}
              style={{ gridTemplateColumns: plantilla, ...(cuando === undefined ? {} : { '--in': t(cuando) }) }}
            >
              {celdas.map((celda, j) => <span key={j}>{celda}</span>)}
            </div>
          )
        })}
      </div>
    </Capa>
  )
}

// Un recuadro que se posa sobre una fila concreta para señalar de quién se habla.
export function Marca({ desde, fin, x = 28, y, ancho = 230, alto = 25 }) {
  return (
    <div className="esc-capa esc-marca-fila" style={{ ...tiempos(desde, fin), left: x, top: y, width: ancho, height: alto }} />
  )
}
