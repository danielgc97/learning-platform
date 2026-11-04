// Página que usa solo el comprobador de animaciones: muestra una a pantalla entera para
// medirla. No entra en la app: `npm run build` solo empaqueta index.html.
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ANIMACIONES, CLAVES } from '../src/animaciones/index.js'
import '../src/index.css'

// El comprobador lee de aquí cuántas hay y cómo se llaman.
window.__ANIMACIONES = CLAVES

const cual = Number(new URLSearchParams(location.search).get('n') || 0)
const clave = CLAVES[cual]
const Animacion = ANIMACIONES[clave]
document.title = clave

createRoot(document.getElementById('root')).render(
  <main className="mx-auto w-full max-w-6xl px-5 py-6">
    <Suspense fallback={null}><Animacion /></Suspense>
  </main>,
)
