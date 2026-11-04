// Los sonidos no son archivos: se sintetizan aquí mismo. Pesan cero, suenan igual en
// cualquier navegador y se pueden afinar cambiando un número.
// Son marcas cortas que acompañan lo que pasa en pantalla, nunca música.
//
// Tres cosas hacen que no cansen:
//  · todas las notas salen de una misma escala, así que dos marcas juntas nunca chocan;
//  · lo que se repite (un toque, una fila) va subiendo de nota, como quien cuenta en voz
//    alta, en vez de dar siempre el mismo golpe;
//  · todo pasa por un compresor, así que dos marcas a la vez no se disparan de volumen.

let contexto
let maestro // a donde va todo antes de salir
let eco // un envío a la reverberación, para que no suene a pitido seco

// Re menor pentatónica. Cualquier combinación de estas notas suena bien junta, que es
// justo lo que hace falta cuando no sabes qué dos marcas van a coincidir.
const ESCALA = [293.66, 349.23, 392.0, 440.0, 523.25, 587.33, 698.46, 880.0]
//               re4     fa4     sol4   la4    do5      re5     fa5     la5

// Ningún navegador deja sonar nada hasta que la persona toca la página. Si el sonido
// está encendido y la animación arranca sola al entrar en pantalla, el contexto se
// queda dormido y no suena nada: con el primer toque o tecla se despierta.
function despierta() {
  if (contexto && contexto.state === 'suspended') contexto.resume().catch(() => {})
}
if (typeof document !== 'undefined') {
  document.addEventListener('pointerdown', despierta, { passive: true })
  document.addEventListener('keydown', despierta, { passive: true })
}

// Una sala pequeña, fabricada con ruido que se apaga. Es lo que separa un «beep» de
// algo que parece haber sonado en algún sitio.
function sala(c, dur = 0.5, caida = 3.4) {
  const n = Math.floor(c.sampleRate * dur)
  const buffer = c.createBuffer(2, n, c.sampleRate)
  for (let canal = 0; canal < 2; canal += 1) {
    const datos = buffer.getChannelData(canal)
    for (let i = 0; i < n; i += 1) datos[i] = (Math.random() * 2 - 1) * (1 - i / n) ** caida
  }
  return buffer
}

function abre() {
  if (!contexto) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    contexto = new AC()

    const compresor = contexto.createDynamicsCompressor()
    compresor.threshold.value = -18
    compresor.knee.value = 12
    compresor.ratio.value = 4
    compresor.attack.value = 0.003
    compresor.release.value = 0.18

    maestro = contexto.createGain()
    maestro.gain.value = 0.9
    maestro.connect(compresor).connect(contexto.destination)

    const reverb = contexto.createConvolver()
    reverb.buffer = sala(contexto)
    eco = contexto.createGain()
    eco.gain.value = 1
    eco.connect(reverb)
    const vuelta = contexto.createGain()
    vuelta.gain.value = 0.3
    reverb.connect(vuelta).connect(maestro)
  }
  if (contexto.state === 'suspended') contexto.resume()
  return contexto
}

// El sitio por donde sale una voz: su posición entre los dos altavoces y cuánto de
// ella se va a la sala. `panA` hace que el sonido cruce mientras dura.
function salida(c, { pan = 0, panA, envio = 0.12, t, dur }) {
  let nodo
  if (c.createStereoPanner) {
    const sp = c.createStereoPanner()
    sp.pan.setValueAtTime(pan, t)
    if (panA !== undefined) sp.pan.linearRampToValueAtTime(panA, t + dur)
    nodo = sp
  } else {
    nodo = c.createGain()
  }
  nodo.connect(maestro)
  if (envio > 0) {
    const envia = c.createGain()
    envia.gain.value = envio
    nodo.connect(envia).connect(eco)
  }
  return nodo
}

// Un tono con su envolvente: sin la subida y la bajada suaves se oiría un chasquido.
// El filtro le quita el brillo de más, que es lo que vuelve chillón un oscilador.
function voz(c, { de, a = de, dur = 0.12, forma = 'sine', vol = 0.06, retardo = 0, corte = 5000, ...sitio }) {
  const t = c.currentTime + retardo
  const osc = c.createOscillator()
  const filtro = c.createBiquadFilter()
  const gan = c.createGain()
  filtro.type = 'lowpass'
  filtro.frequency.value = corte
  osc.type = forma
  osc.frequency.setValueAtTime(de, t)
  if (a !== de) osc.frequency.exponentialRampToValueAtTime(a, t + dur)
  gan.gain.setValueAtTime(0.0001, t)
  gan.gain.exponentialRampToValueAtTime(vol, t + 0.012)
  gan.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(filtro).connect(gan).connect(salida(c, { ...sitio, t, dur }))
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

// Un golpe de aire muy corto. Es el ataque que tiene cualquier cosa real al tocarse y
// que a un oscilador solo le falta: con él, el tono deja de parecer electrónico.
function soplo(c, { dur = 0.05, vol = 0.04, centro = 2000, q = 1, retardo = 0, ...sitio }) {
  const t = c.currentTime + retardo
  const n = Math.floor(c.sampleRate * dur)
  const buffer = c.createBuffer(1, n, c.sampleRate)
  const datos = buffer.getChannelData(0)
  for (let i = 0; i < n; i += 1) datos[i] = (Math.random() * 2 - 1) * (1 - i / n) ** 2
  const fuente = c.createBufferSource()
  fuente.buffer = buffer
  const filtro = c.createBiquadFilter()
  filtro.type = 'bandpass'
  filtro.frequency.value = centro
  filtro.Q.value = q
  const gan = c.createGain()
  gan.gain.value = vol
  fuente.connect(filtro).connect(gan).connect(salida(c, { ...sitio, envio: 0.06, t, dur }))
  fuente.start(t)
}

// Lo que se repite, sube. Si pasa un rato sin esa marca, la cuenta vuelve a empezar:
// cada tanda de filas arranca otra vez desde abajo.
const cuenta = {}
function paso(clave, largo, pausa) {
  const ahora = performance.now() / 1000
  const previo = cuenta[clave]
  const i = previo && ahora - previo.cuando < pausa ? previo.i + 1 : 0
  cuenta[clave] = { i, cuando: ahora }
  return i % largo
}

export function sonar(tipo) {
  const c = abre()
  if (!c) return
  switch (tipo) {
    case 'aparece': // se levanta el telón: dos notas muy suaves, al fondo
      voz(c, { de: ESCALA[0], dur: 0.5, vol: 0.05, corte: 1400, envio: 0.5 })
      voz(c, { de: ESCALA[3], dur: 0.6, vol: 0.05, corte: 1800, envio: 0.5, retardo: 0.07 })
      return

    case 'toque': { // algo aparece o se señala; subiendo de nota si se repite
      const nota = ESCALA[3 + paso('toque', 4, 3.0)]
      soplo(c, { centro: nota * 2.5, vol: 0.035, dur: 0.035 })
      voz(c, { de: nota, dur: 0.16, forma: 'triangle', vol: 0.12, corte: 3200, envio: 0.18 })
      return
    }

    case 'fila': { // una fila se coloca; la tanda entera sube como una escalera
      const nota = ESCALA[paso('fila', 5, 3.4)]
      soplo(c, { centro: 1400, vol: 0.03, dur: 0.03 })
      voz(c, { de: nota * 2, dur: 0.1, forma: 'triangle', vol: 0.1, corte: 2600, envio: 0.12 })
      return
    }

    case 'viaje': // un paquete sale de viaje: cruza de un altavoz al otro
      voz(c, {
        de: ESCALA[0], a: ESCALA[5], dur: 0.34, forma: 'triangle',
        vol: 0.1, corte: 2400, pan: -0.55, panA: 0.55, envio: 0.25,
      })
      return

    case 'llega': // y aterriza: un golpe con cuerpo, no un pitido
      soplo(c, { centro: 420, q: 0.7, vol: 0.05, dur: 0.07 })
      voz(c, { de: ESCALA[2], a: ESCALA[0] / 2, dur: 0.22, vol: 0.16, corte: 1600, envio: 0.2, pan: 0.45 })
      return

    case 'bien': // la comprobación sale bien: dos notas que suben
      voz(c, { de: ESCALA[3], dur: 0.14, forma: 'triangle', vol: 0.13, corte: 3000, envio: 0.2 })
      voz(c, { de: ESCALA[5], dur: 0.3, forma: 'triangle', vol: 0.13, corte: 3400, envio: 0.3, retardo: 0.1 })
      return

    case 'mal': // o sale mal: dos notas que bajan y rozan entre sí
      voz(c, { de: ESCALA[2], a: ESCALA[0] * 0.75, dur: 0.3, forma: 'square', vol: 0.07, corte: 800, envio: 0.2 })
      voz(c, { de: ESCALA[2] * 1.06, a: ESCALA[0] * 0.78, dur: 0.3, forma: 'square', vol: 0.05, corte: 700, envio: 0.2 })
      return

    case 'corta': // algo queda bloqueado antes de llegar: se para en seco, sin caer
      soplo(c, { centro: 320, q: 0.6, vol: 0.09, dur: 0.1 })
      voz(c, { de: ESCALA[0] / 2, dur: 0.14, forma: 'square', vol: 0.09, corte: 420, envio: 0.08 })
      return

    case 'cuenta': // un número que cambia: lo más leve de todo
      voz(c, { de: ESCALA[6], dur: 0.05, forma: 'triangle', vol: 0.06, corte: 4000, envio: 0.08 })
      return

    case 'espera': // algo está en marcha y aún no hay respuesta
      voz(c, { de: ESCALA[0], dur: 0.16, vol: 0.07, corte: 1200, envio: 0.25 })
      voz(c, { de: ESCALA[0], dur: 0.16, vol: 0.055, corte: 1200, envio: 0.25, retardo: 0.26 })
      return

    case 'cierra': // el cierre: un acorde corto, con más sala que nada
      voz(c, { de: ESCALA[0], dur: 0.7, vol: 0.09, corte: 1600, envio: 0.5 })
      voz(c, { de: ESCALA[3], dur: 0.65, forma: 'triangle', vol: 0.08, corte: 2400, envio: 0.5, retardo: 0.06 })
      voz(c, { de: ESCALA[6], dur: 0.6, forma: 'triangle', vol: 0.06, corte: 3000, envio: 0.6, retardo: 0.12 })
      return

    default:
      return
  }
}
