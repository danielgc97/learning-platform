import { useEffect, useRef, useState } from 'react'
import './escena.css'

// El lienzo se dibuja siempre en las mismas unidades (720×405 por defecto) y se escala
// al ancho que haya. Así las posiciones se piensan una vez y valen en cualquier pantalla.
export default function Escena({ duracion, ancho = 720, alto = 405, etiqueta, children }) {
  const marco = useRef(null)
  const reloj = useRef(0)
  const [escala, setEscala] = useState(1)
  const [ciclo, setCiclo] = useState(0)
  const [estado, setEstado] = useState('espera')

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setEscala(e.contentRect.width / ancho))
    ro.observe(marco.current)
    return () => ro.disconnect()
  }, [ancho])

  // Arranca cuando entra en pantalla: si empezara al cargar la página, el alumno
  // llegaría cuando ya ha terminado.
  useEffect(() => {
    if (estado !== 'espera') return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        reloj.current = performance.now()
        setEstado('corre')
      },
      { threshold: 0.35 },
    )
    io.observe(marco.current)
    return () => io.disconnect()
  }, [estado])

  // Al terminar se queda en el último fotograma, con el botón de repetir a mano.
  useEffect(() => {
    if (estado !== 'corre') return
    const queda = duracion * 1000 - (performance.now() - reloj.current)
    const id = setTimeout(() => setEstado('fin'), Math.max(0, queda))
    return () => clearTimeout(id)
  }, [estado, ciclo, duracion])

  function repite() {
    reloj.current = performance.now()
    setCiclo((c) => c + 1)
    setEstado('corre')
  }

  function alterna() {
    if (estado === 'fin') return repite()
    if (estado === 'corre') {
      reloj.current = performance.now() - reloj.current // guarda lo transcurrido
      return setEstado('pausa')
    }
    reloj.current = performance.now() - reloj.current
    setEstado('corre')
  }

  const quieta = estado !== 'corre'
  const texto = estado === 'corre' ? 'Pausar' : estado === 'fin' ? 'Repetir' : 'Reproducir'

  return (
    <figure className="my-8 not-prose">
      <div ref={marco} className="esc-marco" style={{ height: alto * escala }}>
        <div
          key={ciclo}
          className={`esc-lienzo ${quieta ? 'quieta' : ''}`}
          style={{
            width: ancho,
            height: alto,
            transform: `scale(${escala})`,
            '--seek': '0s',
            '--total': `${duracion}s`,
          }}
        >
          {children}
          <div className="esc-tiempo"><i /></div>
        </div>
      </div>
      <figcaption className="esc-mandos">
        <button type="button" onClick={alterna}>{texto}</button>
        {estado !== 'fin' && estado !== 'espera' && (
          <button type="button" onClick={repite}>Desde el principio</button>
        )}
        <span>{etiqueta}</span>
      </figcaption>
    </figure>
  )
}

/* ---------- piezas ---------- */

const tiempos = (desde, fin) => ({ '--in': `${desde}s`, ...(fin === undefined ? {} : { '--out': `${fin}s` }) })

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

export function Nodo({ desde, fin, x, y, rotulo, sub, tono, late, children }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={y} ancho={150}>
      <div className="esc-nodo">
        <p className="esc-rotulo" style={tono ? { color: tono } : undefined}>{rotulo}</p>
        <div className="esc-caja" style={{ ...(late === undefined ? {} : { '--late': `${late}s` }), ...(tono ? { '--tono': tono } : {}) }}>
          {children}
        </div>
        {sub && <p className="esc-sub">{sub}</p>}
      </div>
    </Capa>
  )
}

export function Chip({ desde, fin, x, y, dx, dy, dur, centrado, mal, children }) {
  const clase = `esc-chip${mal ? ' mal' : ''}`
  if (dx === undefined && dy === undefined) {
    return (
      <Capa desde={desde} fin={fin} x={x} y={y} centrado={centrado}>
        <span className={clase}>{children}</span>
      </Capa>
    )
  }
  return (
    <div
      style={{ position: 'absolute', top: y, left: centrado ? 0 : x, width: centrado ? '100%' : undefined, textAlign: centrado ? 'center' : undefined }}
    >
      <span
        className={`${clase} viajero`}
        style={{
          '--in': `${desde}s`,
          '--dx': `${dx || 0}px`,
          '--dy': `${dy || 0}px`,
          ...(dur ? { '--dur': `${dur}s` } : {}),
        }}
      >
        {children}
      </span>
    </div>
  )
}

// Los puntos que recorren el riel, uno detrás de otro.
export function Flujo({ desde, x, y, dx = 0, dy = 0, dur, tono, n = 5 }) {
  return (
    <div
      className="esc-flujo"
      style={{ position: 'absolute', left: x, top: y, '--in': `${desde}s`, ...(dur ? { '--dur': `${dur}s` } : {}), ...(tono ? { '--tono': tono } : {}) }}
    >
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ '--d': `${i * 0.12}s`, '--dx': `${dx}px`, '--dy': `${dy}px` }} />
      ))}
    </div>
  )
}

export function Riel({ desde, fin, x, y, largo, vertical }) {
  return (
    <div
      className={`esc-capa`}
      style={{ ...tiempos(desde, fin), left: x, top: y }}
    >
      <div className={`esc-riel${vertical ? ' vertical' : ''}`} style={vertical ? { height: largo } : { width: largo }} />
    </div>
  )
}

export function Nota({ desde, fin, x, y, centrado, children }) {
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
        <p className="esc-cifra" style={{ '--hasta': cuenta, '--in': `${desde}s` }}>
          {unidad && <small>{unidad}</small>}
        </p>
        <p className="esc-pie-metrica">{pie}</p>
      </div>
    </Capa>
  )
}

export function Rotulo({ desde, fin, x = 56, y, ojo, titulo, bajada }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={y} ancho={600}>
      {ojo && <p className="esc-ojo">{ojo}</p>}
      <p className="esc-titular">{titulo}</p>
      {bajada && <p className="esc-bajada">{bajada}</p>}
    </Capa>
  )
}

export function Tabla({ desde, fin, x, y, ancho, nombre, columnas, filas, marcada, plantilla }) {
  return (
    <Capa desde={desde} fin={fin} x={x} y={y} ancho={ancho}>
      {nombre && <p className="esc-titulo-tabla">{nombre}</p>}
      <div className="esc-tabla">
        <div className="cabecera" style={{ gridTemplateColumns: plantilla }}>
          {columnas.map((c) => <span key={c}>{c}</span>)}
        </div>
        {filas.map((fila, i) => (
          <div key={i} className={`fila${marcada === i ? ' marcada' : ''}`} style={{ gridTemplateColumns: plantilla }}>
            {fila.map((celda, j) => <span key={j}>{celda}</span>)}
          </div>
        ))}
      </div>
    </Capa>
  )
}
