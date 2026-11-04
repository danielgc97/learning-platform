// Comprobador de las animaciones de las lecciones.
//
// Abre cada animación en un navegador de verdad, la recorre segundo a segundo con su
// propia aguja y mide dónde cae cada texto. Avisa de dos cosas:
//   · textos que se pisan entre sí
//   · paneles con fondo (tablas, chips, cajas) que se solapan o que quedan pegados
//   · lo que se sale del lienzo
// Las dos son fallos que no se ven leyendo el código, porque las posiciones se calculan
// a mano y basta con que una cuenta se desvíe nueve píxeles.
//
//   npm run revisa:animaciones            las tres, en oscuro
//   npm run revisa:animaciones -- --tema claro
//   npm run revisa:animaciones -- --n 1   solo la segunda
//
// No necesita instalar nada: usa el Chrome o el Edge que ya tengas y el WebSocket que
// trae Node. Sale con código 1 si encuentra algo, para poder usarlo en CI.

import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)))
const pagina = (n, tema) => `http://localhost:${PUERTO}/scripts/revisor.html?n=${n}&tema=${tema}`
const PUERTO = 5199
const ANCHO = 1400
const ALTO = 1000
const PASO = 0.4 // cada cuántos segundos se mira

const args = process.argv.slice(2)
const opcion = (nombre, pordefecto) => {
  const i = args.indexOf(`--${nombre}`)
  return i === -1 ? pordefecto : args[i + 1]
}

const espera = (ms) => new Promise((r) => setTimeout(r, ms))

/* ---------- navegador ---------- */

function buscaNavegador() {
  const pf = process.env.PROGRAMFILES || 'C:\\Program Files'
  const pf86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)'
  const local = process.env.LOCALAPPDATA || ''
  const candidatos = [
    process.env.CHROME_PATH,
    join(pf, 'Google/Chrome/Application/chrome.exe'),
    join(pf86, 'Google/Chrome/Application/chrome.exe'),
    join(local, 'Google/Chrome/Application/chrome.exe'),
    join(pf86, 'Microsoft/Edge/Application/msedge.exe'),
    join(pf, 'Microsoft/Edge/Application/msedge.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ]
  const hallado = candidatos.find((c) => c && existsSync(c))
  if (!hallado) throw new Error('No encuentro Chrome ni Edge. Define CHROME_PATH con la ruta al ejecutable.')
  return hallado
}

function primeraLinea(flujo, patron) {
  return new Promise((ok, mal) => {
    let buzon = ''
    const reloj = setTimeout(() => mal(new Error(`el proceso no respondió en 30s. Dijo: ${buzon.slice(-400)}`)), 30000)
    flujo.on('data', (d) => {
      buzon += d.toString()
      const m = buzon.match(patron)
      if (m) { clearTimeout(reloj); ok(m[1] ?? m[0]) }
    })
  })
}

// Cliente mínimo del protocolo de DevTools: abrir una pestaña y evaluar código en ella.
function conecta(url) {
  const ws = new WebSocket(url)
  const abierto = new Promise((ok, mal) => { ws.onopen = ok; ws.onerror = mal })
  const pendientes = new Map()
  let numero = 0
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    const p = pendientes.get(m.id)
    if (!p) return
    pendientes.delete(m.id)
    m.error ? p.mal(new Error(m.error.message)) : p.ok(m.result)
  }
  const envia = async (metodo, params = {}, sesion) => {
    await abierto
    const id = ++numero
    return new Promise((ok, mal) => {
      pendientes.set(id, { ok, mal })
      ws.send(JSON.stringify({ id, method: metodo, params, ...(sesion ? { sessionId: sesion } : {}) }))
    })
  }
  return { envia, cierra: () => ws.close() }
}

/* ---------- lo que se mide dentro de la página ---------- */

// Se serializa y se ejecuta en el navegador. Mide los textos uno a uno con un Range,
// no por su caja: una capa centrada ocupa todo el ancho aunque su texto sea corto.
function MIDE() {
  const lienzo = document.querySelector('.esc-lienzo')
  if (!lienzo) return { error: 'sin lienzo' }
  const marco = lienzo.getBoundingClientRect()
  const escala = marco.width / lienzo.offsetWidth

  const opacidad = (el) => {
    let o = 1
    for (let n = el; n && n !== lienzo.parentElement; n = n.parentElement) o *= Number(getComputedStyle(n).opacity)
    return o
  }
  // Un paquete en pleno viaje pasa por encima de las piezas a propósito.
  const viajando = (el) => !!el.closest('.viajero')

  const textos = []
  const paseo = document.createTreeWalker(lienzo, NodeFilter.SHOW_TEXT)
  for (let nodo = paseo.nextNode(); nodo; nodo = paseo.nextNode()) {
    const texto = nodo.textContent.trim()
    const padre = nodo.parentElement
    if (!texto || !padre || viajando(padre) || opacidad(padre) < 0.9) continue
    const rango = document.createRange()
    rango.selectNodeContents(nodo)
    const caja = rango.getBoundingClientRect()
    if (caja.width < 1 || caja.height < 1) continue
    textos.push({ texto: texto.slice(0, 32), caja, padre })
  }

  // Los paneles con fondo: una tabla o un recuadro de código tapan lo que tengan debajo
  // aunque sus letras no lleguen a tocarse. El recuadro que señala una fila va encima a
  // propósito, así que no cuenta.
  const paneles = []
  for (const el of lienzo.querySelectorAll('.esc-tabla, .esc-chip, .esc-caja')) {
    if (viajando(el) || opacidad(el) < 0.9) continue
    const caja = el.getBoundingClientRect()
    if (caja.width < 1) continue
    paneles.push({ texto: (el.textContent || '').trim().slice(0, 32) || '(sin texto)', caja, el })
  }

  const hallazgos = []
  const margen = 1.5 * escala
  const dentro = (caja) => !(caja.left < marco.left - margen || caja.right > marco.right + margen ||
    caja.top < marco.top - margen || caja.bottom > marco.bottom + margen)

  for (const t of textos) if (!dentro(t.caja)) hallazgos.push({ tipo: 'fuera', a: t.texto })
  for (const p of paneles) if (!dentro(p.caja)) hallazgos.push({ tipo: 'fuera', a: p.texto })

  const seCruzan = (a, b) => {
    const ancho = Math.min(a.right, b.right) - Math.max(a.left, b.left)
    const alto = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
    return ancho > 2 * escala && alto > 2 * escala
  }
  const emparentados = (a, b) => a === b || a.contains(b) || b.contains(a)

  for (let i = 0; i < textos.length; i++) {
    for (let j = i + 1; j < textos.length; j++) {
      const a = textos[i], b = textos[j]
      if (emparentados(a.padre, b.padre)) continue
      if (seCruzan(a.caja, b.caja)) hallazgos.push({ tipo: 'pisa', a: a.texto, b: b.texto })
    }
  }
  for (let i = 0; i < paneles.length; i++) {
    for (let j = i + 1; j < paneles.length; j++) {
      const a = paneles[i], b = paneles[j]
      if (emparentados(a.el, b.el)) continue
      if (seCruzan(a.caja, b.caja)) { hallazgos.push({ tipo: 'cajas', a: a.texto, b: b.texto }); continue }
      // Sin llegar a solaparse, dos paneles pegados se leen como un error. Se mide la
      // separación en el eje en el que están enfrentados.
      const compartenX = Math.min(a.caja.right, b.caja.right) - Math.max(a.caja.left, b.caja.left) > 4 * escala
      const compartenY = Math.min(a.caja.bottom, b.caja.bottom) - Math.max(a.caja.top, b.caja.top) > 4 * escala
      const hueco = compartenX
        ? Math.max(a.caja.top, b.caja.top) - Math.min(a.caja.bottom, b.caja.bottom)
        : compartenY
          ? Math.max(a.caja.left, b.caja.left) - Math.min(a.caja.right, b.caja.right)
          : Infinity
      if (hueco >= 0 && hueco < 6 * escala) {
        hallazgos.push({ tipo: 'pegados', a: a.texto, b: b.texto, px: Math.round(hueco / escala) })
      }
    }
  }
  // Un texto suelto encima del panel de otra cosa.
  for (const x of textos) {
    for (const p of paneles) {
      if (p.el.contains(x.padre) || x.padre.contains(p.el)) continue
      if (seCruzan(x.caja, p.caja)) hallazgos.push({ tipo: 'pisa', a: x.texto, b: p.texto })
    }
  }
  return { hallazgos }
}

/* ---------- recorrido ---------- */

async function revisa(ev, nombre, tema, indice) {
  await ev(`location.href = ${JSON.stringify(pagina(indice, tema))}`)
  for (let i = 0; i < 60; i++) {
    const listo = await ev("!!document.querySelector('.esc-lienzo') && document.fonts.status === 'loaded'").catch(() => false)
    if (listo) break
    await espera(250)
  }
  await espera(400)

  // Se pausa una vez: a partir de ahí cada salto deja la escena quieta en ese segundo.
  await ev("document.querySelector('.esc-mandos button').click()")
  const total = await ev("Number(document.querySelector('.esc-aguja').max)")

  const encontrados = []
  for (let t = 0; t <= total; t = +(t + PASO).toFixed(2)) {
    await ev(`(() => {
      const a = document.querySelector('.esc-aguja')
      const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
      set.call(a, '${t}')
      a.dispatchEvent(new Event('input', { bubbles: true }))
    })()`)
    await espera(90)
    const { hallazgos, error } = await ev(`(${MIDE.toString()})()`)
    if (error) throw new Error(`${nombre}: ${error}`)
    for (const h of hallazgos) encontrados.push({ ...h, t })
  }

  // Un mismo solape sale en varios segundos seguidos: se junta en un intervalo.
  const juntos = new Map()
  for (const h of encontrados) {
    const clave = `${h.tipo}|${h.a}|${h.b ?? ''}`
    const previo = juntos.get(clave)
    if (previo) previo.hasta = h.t
    else juntos.set(clave, { ...h, desde: h.t, hasta: h.t })
  }
  return [...juntos.values()]
}

/* ---------- puesta en marcha ---------- */

const perfil = mkdtempSync(join(tmpdir(), 'revisor-'))
const vite = spawn(process.execPath, [join(RAIZ, 'node_modules/vite/bin/vite.js'), '--port', String(PUERTO), '--strictPort'], {
  cwd: RAIZ,
  stdio: ['ignore', 'pipe', 'pipe'],
})
let navegador
const limpia = () => {
  try { vite.kill() } catch { /* ya estaba muerto */ }
  try { navegador?.kill() } catch { /* idem */ }
  try { rmSync(perfil, { recursive: true, force: true, maxRetries: 3 }) } catch { /* lo borrará el sistema */ }
}
process.on('exit', limpia)
process.on('SIGINT', () => { limpia(); process.exit(130) })

try {
  await primeraLinea(vite.stdout, /ready in/)
  navegador = spawn(buscaNavegador(), [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${perfil}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
    '--force-color-profile=srgb', `--window-size=${ANCHO},${ALTO}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] })

  const wsUrl = await primeraLinea(navegador.stderr, /DevTools listening on (ws:\/\/\S+)/)
  const { envia } = conecta(wsUrl)
  const { targetId } = await envia('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await envia('Target.attachToTarget', { targetId, flatten: true })
  await envia('Page.enable', {}, sessionId)
  await envia('Emulation.setDeviceMetricsOverride', { width: ANCHO, height: ALTO, deviceScaleFactor: 1, mobile: false }, sessionId)

  const ev = async (expresion) => {
    const r = await envia('Runtime.evaluate', { expression: expresion, returnByValue: true, awaitPromise: true }, sessionId)
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
    return r.result.value
  }

  const tema = opcion('tema', 'oscuro')
  const nombres = ['el-viaje-de-un-clic', 'join', 'autenticacion-y-autorizacion']

  const soloUna = opcion('n', null)
  const cuales = soloUna === null ? nombres.map((_, i) => i) : [Number(soloUna)]

  console.log(`\nREVISOR DE ANIMACIONES · tema ${tema} · una medición cada ${PASO}s\n`)
  let total = 0
  for (const i of cuales) {
    const hallazgos = await revisa(ev, nombres[i], tema, i)
    total += hallazgos.length
    if (!hallazgos.length) {
      console.log(`  ✓ ${nombres[i]}`)
      continue
    }
    console.log(`  ✗ ${nombres[i]}`)
    for (const h of hallazgos) {
      const cuando = h.desde === h.hasta ? `${h.desde}s` : `${h.desde}–${h.hasta}s`
      if (h.tipo === 'fuera') console.log(`      [${cuando}] se sale del lienzo: "${h.a}"`)
      else if (h.tipo === 'cajas') console.log(`      [${cuando}] se solapan las cajas de "${h.a}" y "${h.b}"`)
      else if (h.tipo === 'pegados') console.log(`      [${cuando}] a ${h.px}px, casi pegados: "${h.a}" y "${h.b}"`)
      else console.log(`      [${cuando}] se pisan los textos "${h.a}" y "${h.b}"`)
    }
  }

  console.log(total
    ? `\n${total} cosa(s) que mirar. Abre la animación, lleva la aguja a ese segundo y compruébalo.\n`
    : '\nTodo limpio.\n')
  process.exitCode = total ? 1 : 0
} finally {
  limpia()
}
