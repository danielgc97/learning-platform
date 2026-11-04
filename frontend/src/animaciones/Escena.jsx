import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './escena.css'
import { sonar } from './sonido'

// Un factor sobre todos los tiempos: así se afina el ritmo de todas las animaciones
// a la vez, sin tocar los segundos de cada escena. Más alto, más despacio.
const RITMO = 1.35

// Hasta cuánto puede crecer el lienzo sobre su tamaño de diseño. Como es vectorial,
// al crecer se redibuja: no se pixela como le pasaría a un vídeo. El tope deja que
// llegue al ancho completo de la lección (1112px), igual que los ejercicios.
const MAX_ESCALA = 2.2

const reloj = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

const Reloj = createContext(null)

// El lienzo se dibuja siempre en las mismas unidades (520×330, el ancho de la columna
// que ocupa al lado del texto) y se escala si el hueco es menor.
export default function Escena({ duracion, ancho = 520, alto = 330, etiqueta, children }) {
  const figura = useRef(null)
  const marco = useRef(null)
  const aguja = useRef(null)
  const marcador = useRef(null)
  const inicio = useRef(0) // cuándo empezó el tramo actual
  const llevado = useRef(0) // segundos ya corridos, para poder reanudar
  const [escala, setEscala] = useState(1)
  const [ciclo, setCiclo] = useState(0)
  const [salto, setSalto] = useState(0) // desde qué segundo arranca el ciclo actual
  const [completa, setCompleta] = useState(false)
  const [girado, setGirado] = useState(false)
  const [estado, setEstado] = useState('espera')
  const [sonando, setSonando] = useState(() => {
    try { return localStorage.getItem('cortexlab-sonido') === '1' } catch { return false }
  })

  const total = duracion * RITMO
  const corriendo = estado === 'corre'

  // Ampliada manda el alto de la ventana; si no, el ancho del hueco. El resize hace
  // falta aparte del observador para que al girar el móvil se recalcule.
  // Y si la pantalla es alta y el dibujo apaisado, se gira: es lo que hace cualquier
  // reproductor de vídeo en un móvil vertical, y multiplica el tamaño por 1,4.
  useEffect(() => {
    const mide = () => {
      const libre = marco.current.clientWidth
      if (!completa) {
        setGirado(false)
        setEscala(Math.min(MAX_ESCALA, libre / ancho))
        return
      }
      const altoLibre = window.innerHeight - 100
      const gira = window.innerHeight > window.innerWidth && ancho > alto
      setGirado(gira)
      setEscala(gira
        ? Math.min(libre / alto, altoLibre / ancho)
        : Math.min(libre / ancho, altoLibre / alto))
    }
    const ro = new ResizeObserver(mide)
    ro.observe(marco.current)
    window.addEventListener('resize', mide)
    mide()
    return () => { ro.disconnect(); window.removeEventListener('resize', mide) }
  }, [ancho, alto, completa])

  // Si se sale de la pantalla completa del navegador (Escape, botón atrás), se cierra
  // también la vista ampliada.
  useEffect(() => {
    const cambio = () => { if (!document.fullscreenElement && completa) setCompleta(false) }
    document.addEventListener('fullscreenchange', cambio)
    return () => document.removeEventListener('fullscreenchange', cambio)
  }, [completa])

  // Mientras está ampliada, la página de debajo no se mueve y Escape la cierra.
  useEffect(() => {
    if (!completa) return
    const tapa = (e) => { if (e.key === 'Escape') cierra() }
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', tapa)
    return () => {
      document.body.style.overflow = antes
      document.removeEventListener('keydown', tapa)
    }
  })

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
    if (!corriendo) return
    const id = setTimeout(() => setEstado('fin'), Math.max(0, (total - llevado.current) * 1000))
    return () => clearTimeout(id)
  }, [corriendo, ciclo, total])

  // La aguja y el marcador se mueven sin repintar React: escriben en el DOM directamente.
  useEffect(() => {
    if (!corriendo) return
    let id
    const pinta = () => {
      const seg = Math.min(total, (performance.now() - inicio.current) / 1000)
      if (aguja.current) aguja.current.value = String(seg)
      if (marcador.current) marcador.current.textContent = `${reloj(seg)} / ${reloj(total)}`
      id = requestAnimationFrame(pinta)
    }
    id = requestAnimationFrame(pinta)
    return () => cancelAnimationFrame(id)
  }, [corriendo, total])

  // Saltar a un segundo concreto: se reinician las animaciones con el nuevo desfase,
  // que es lo que hace un reproductor al mover la aguja. Todo depende de --seek.
  function vaA(segundo, sigue = corriendo) {
    const n = Math.max(0, Math.min(total, segundo))
    llevado.current = n
    inicio.current = performance.now() - n * 1000
    setSalto(n)
    setCiclo((c) => c + 1)
    setEstado(n >= total ? 'fin' : sigue ? 'corre' : 'pausa')
    if (aguja.current) aguja.current.value = String(n)
    if (marcador.current) marcador.current.textContent = `${reloj(n)} / ${reloj(total)}`
  }

  // La animación se amplía ocupando la ventana entera por su cuenta, y además pide la
  // pantalla completa del navegador donde exista: en el iPhone no existe, porque Safari
  // solo se la da a los vídeos de verdad.
  function cierra() {
    setCompleta(false)
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
  }

  function amplia() {
    if (completa) return cierra()
    setCompleta(true)
    figura.current.requestFullscreen?.().catch(() => {})
  }

  function tecla(e) {
    const ahora = corriendo ? (performance.now() - inicio.current) / 1000 : llevado.current
    if (e.key === ' ') { e.preventDefault(); alterna() }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); vaA(ahora - 1) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); vaA(ahora + 1) }
    else if (e.key === 'f') amplia()
  }

  function alterna() {
    if (estado === 'fin') return vaA(0, true)
    if (corriendo) {
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

  const texto = corriendo ? 'Pausar' : estado === 'fin' ? 'Repetir' : 'Reproducir'

  return (
    <figure
      ref={figura}
      className={`esc-figura my-8${completa ? ' completa' : ''}`}
      style={completa ? undefined : { maxWidth: ancho * MAX_ESCALA }}
      tabIndex={0}
      onKeyDown={tecla}
    >
      <div ref={marco} className="esc-marco" style={{ height: alto * escala }}>
        <div
          key={ciclo}
          className={`esc-lienzo ${corriendo ? '' : 'quieta'}`}
          style={{ width: ancho, height: alto, transform: `${girado ? 'rotate(90deg) ' : ''}scale(${escala})`, '--seek': `${salto}s`, '--total': `${total}s` }}
        >
          <Reloj.Provider value={{ ciclo, corriendo, inicio, sonando }}>{children}</Reloj.Provider>
        </div>
      </div>
      <figcaption className="esc-mandos">
        <button type="button" onClick={alterna}>{texto}</button>
        <input
          ref={aguja}
          className="esc-aguja"
          type="range"
          min="0"
          max={total}
          step="0.1"
          defaultValue="0"
          aria-label="Ir a un momento de la animación"
          onChange={(e) => vaA(Number(e.target.value))}
        />
        <span ref={marcador} className="esc-marcador">0:00 / {reloj(total)}</span>
        <button type="button" onClick={alternaSonido} aria-pressed={sonando}>
          {sonando ? 'Sonido: sí' : 'Sonido: no'}
        </button>
        <button type="button" onClick={amplia}>{completa ? 'Salir' : 'Ampliar'}</button>
        {!completa && <span className="esc-etiqueta">{etiqueta}</span>}
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
