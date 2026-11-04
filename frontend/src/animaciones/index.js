import { lazy } from 'react'

// El catálogo de animaciones, por curso y lección. Cada una se carga solo en la lección
// que la usa, así no pesa en el resto de la app.
// El comprobador (npm run revisa:animaciones) lee esta misma lista, así que basta con
// añadir aquí una línea para que entre también en la revisión.
export const ANIMACIONES = {
  'como-funciona-una-app/las-tres-capas': lazy(() => import('./TresCapas')),
  'como-funciona-una-app/el-viaje-de-un-clic': lazy(() => import('./ViajeDeUnClic')),
  'como-funciona-una-app/api-y-endpoints': lazy(() => import('./ApiEndpoints')),
  'como-funciona-una-app/tablas': lazy(() => import('./Tablas')),
  'herramientas-del-dia-a-dia/git-guarda-versiones': lazy(() => import('./Git')),
  'herramientas-del-dia-a-dia/entornos-y-dependencias': lazy(() => import('./Entornos')),
  'herramientas-del-dia-a-dia/variables-de-entorno': lazy(() => import('./Secretos')),
  'sql-para-tu-base/group-by': lazy(() => import('./GroupBy')),
  'sql-para-tu-base/claves-foraneas': lazy(() => import('./ClavesForaneas')),
  'sql-para-tu-base/join': lazy(() => import('./Join')),
  'sql-para-tu-base/left-join': lazy(() => import('./LeftJoin')),
  'sql-para-tu-base/where': lazy(() => import('./Where')),
  'sql-para-tu-base/insert-update-delete': lazy(() => import('./Cambiar')),
  'backend-fastapi/recibir-y-validar-datos': lazy(() => import('./Validar')),
  'backend-fastapi/errores-y-codigos-de-estado': lazy(() => import('./Codigos')),
  'backend-fastapi/cors': lazy(() => import('./Cors')),
  'frontend-react/props': lazy(() => import('./Props')),
  'frontend-react/estado': lazy(() => import('./Estado')),
  'frontend-react/traer-datos-de-tu-api': lazy(() => import('./TraerDatos')),
  'usuarios-y-seguridad/autenticacion-y-autorizacion': lazy(() => import('./Sesion')),
  'usuarios-y-seguridad/cada-usuario-ve-lo-suyo': lazy(() => import('./Rls')),
  'cobrar-a-tus-usuarios/como-funciona-un-pago-online': lazy(() => import('./Pago')),
  'cobrar-a-tus-usuarios/webhooks': lazy(() => import('./Webhook')),
  'publica-tu-saas/que-cambia-al-publicar': lazy(() => import('./Publicar')),
}

export const CLAVES = Object.keys(ANIMACIONES)

export function animacionDe(curso, leccion) {
  return ANIMACIONES[`${curso}/${leccion}`] ?? null
}
