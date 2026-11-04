import { lazy } from 'react'

// El catálogo de animaciones, por curso y lección. Cada una se carga solo en la lección
// que la usa, así no pesa en el resto de la app.
// El comprobador (npm run revisa:animaciones) lee esta misma lista, así que basta con
// añadir aquí una línea para que entre también en la revisión.
export const ANIMACIONES = {
  'como-funciona-una-app/las-tres-capas': lazy(() => import('./TresCapas')),
  'como-funciona-una-app/el-viaje-de-un-clic': lazy(() => import('./ViajeDeUnClic')),
  'como-funciona-una-app/api-y-endpoints': lazy(() => import('./ApiEndpoints')),
  'herramientas-del-dia-a-dia/git-guarda-versiones': lazy(() => import('./Git')),
  'herramientas-del-dia-a-dia/entornos-y-dependencias': lazy(() => import('./Entornos')),
  'sql-para-tu-base/join': lazy(() => import('./Join')),
  'usuarios-y-seguridad/autenticacion-y-autorizacion': lazy(() => import('./Sesion')),
}

export const CLAVES = Object.keys(ANIMACIONES)

export function animacionDe(curso, leccion) {
  return ANIMACIONES[`${curso}/${leccion}`] ?? null
}
