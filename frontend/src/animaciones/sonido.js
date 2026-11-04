// Los sonidos no son archivos: se sintetizan aquí mismo. Pesan cero, suenan igual en
// cualquier navegador y se pueden afinar cambiando un número.
// Son marcas cortas que acompañan lo que pasa en pantalla, nunca música. El volumen
// va en `vol`, entre 0 y 1: subirlo aquí lo sube en todas las animaciones.

let contexto

function abre() {
  if (!contexto) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    contexto = new AC()
  }
  if (contexto.state === 'suspended') contexto.resume()
  return contexto
}

// Un tono con su envolvente: sin la subida y la bajada suaves se oiría un chasquido.
function tono(c, { de, a = de, dur = 0.12, forma = 'sine', vol = 0.06, retardo = 0 }) {
  const t = c.currentTime + retardo
  const osc = c.createOscillator()
  const gan = c.createGain()
  osc.type = forma
  osc.frequency.setValueAtTime(de, t)
  if (a !== de) osc.frequency.exponentialRampToValueAtTime(a, t + dur)
  gan.gain.setValueAtTime(0.0001, t)
  gan.gain.exponentialRampToValueAtTime(vol, t + 0.012)
  gan.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gan).connect(c.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

export function sonar(tipo) {
  const c = abre()
  if (!c) return
  switch (tipo) {
    case 'toque':                                            // algo aparece o se pulsa
      return tono(c, { de: 880, dur: 0.07, vol: 0.14 })
    case 'viaje':                                            // un paquete sale de viaje
      return tono(c, { de: 300, a: 720, dur: 0.28, forma: 'triangle', vol: 0.13 })
    case 'llega':                                            // y aterriza en la otra pieza
      return tono(c, { de: 320, a: 170, dur: 0.16, vol: 0.18 })
    case 'fila':                                             // una fila se coloca en su sitio
      return tono(c, { de: 560, dur: 0.08, forma: 'triangle', vol: 0.15 })
    case 'bien':                                             // la comprobación sale bien
      tono(c, { de: 660, dur: 0.09, vol: 0.16 })
      return tono(c, { de: 990, dur: 0.14, vol: 0.16, retardo: 0.09 })
    case 'mal':                                              // o sale mal
      return tono(c, { de: 240, a: 150, dur: 0.24, forma: 'sawtooth', vol: 0.12 })
    default:
      return undefined
  }
}
