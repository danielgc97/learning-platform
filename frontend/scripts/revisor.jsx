// Página que usa solo el comprobador de animaciones: muestra una animación a pantalla
// entera para medirla. No entra en la app: `npm run build` solo empaqueta index.html.
import { createRoot } from 'react-dom/client'
import ViajeDeUnClic from '../src/animaciones/ViajeDeUnClic'
import Join from '../src/animaciones/Join'
import Sesion from '../src/animaciones/Sesion'
import '../src/index.css'

export const ANIMACIONES = [
  ['el-viaje-de-un-clic', ViajeDeUnClic],
  ['join', Join],
  ['autenticacion-y-autorizacion', Sesion],
]

const cual = Number(new URLSearchParams(location.search).get('n') || 0)
const [nombre, Animacion] = ANIMACIONES[cual]
document.title = nombre

createRoot(document.getElementById('root')).render(
  <main className="mx-auto w-full max-w-6xl px-5 py-6">
    <Animacion />
  </main>,
)
