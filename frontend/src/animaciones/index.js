import { lazy } from 'react'

// Cada animación se carga solo en la lección que la usa, así no pesa en el resto.
const ANIMACIONES = {
  'como-funciona-una-app/el-viaje-de-un-clic': lazy(() => import('./ViajeDeUnClic')),
  'sql-para-tu-base/join': lazy(() => import('./Join')),
  'usuarios-y-seguridad/autenticacion-y-autorizacion': lazy(() => import('./Sesion')),
}

export function animacionDe(curso, leccion) {
  return ANIMACIONES[`${curso}/${leccion}`] ?? null
}
