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
  'herramientas-del-dia-a-dia/la-terminal': lazy(() => import('./Terminal')),
  'herramientas-del-dia-a-dia/github-respaldo': lazy(() => import('./GitHub')),
  'herramientas-del-dia-a-dia/entornos-y-dependencias': lazy(() => import('./Entornos')),
  'herramientas-del-dia-a-dia/variables-de-entorno': lazy(() => import('./Secretos')),
  'sql-para-tu-base/group-by': lazy(() => import('./GroupBy')),
  'sql-para-tu-base/claves-foraneas': lazy(() => import('./ClavesForaneas')),
  'sql-para-tu-base/join': lazy(() => import('./Join')),
  'sql-para-tu-base/left-join': lazy(() => import('./LeftJoin')),
  'sql-para-tu-base/join-y-group-by': lazy(() => import('./JoinGroupBy')),
  'sql-para-tu-base/where': lazy(() => import('./Where')),
  'sql-para-tu-base/order-by-y-limit': lazy(() => import('./Ordenar')),
  'sql-para-tu-base/insert-update-delete': lazy(() => import('./Cambiar')),
  'backend-fastapi/recibir-y-validar-datos': lazy(() => import('./Validar')),
  'backend-fastapi/parametros': lazy(() => import('./Parametros')),
  'backend-fastapi/errores-y-codigos-de-estado': lazy(() => import('./Codigos')),
  'backend-fastapi/cors': lazy(() => import('./Cors')),
  'python-para-tu-backend/diccionarios': lazy(() => import('./Diccionarios')),
  'python-para-tu-backend/listas-de-diccionarios': lazy(() => import('./ListasDeDiccionarios')),
  'frontend-react/props': lazy(() => import('./Props')),
  'frontend-react/estado': lazy(() => import('./Estado')),
  'frontend-react/traer-datos-de-tu-api': lazy(() => import('./TraerDatos')),
  'frontend-react/listas': lazy(() => import('./Listas')),
  'frontend-react/formularios': lazy(() => import('./Formularios')),
  'usuarios-y-seguridad/autenticacion-y-autorizacion': lazy(() => import('./Sesion')),
  'usuarios-y-seguridad/cada-usuario-ve-lo-suyo': lazy(() => import('./Rls')),
  'usuarios-y-seguridad/proteger-tu-api': lazy(() => import('./ProtegerApi')),
  'cobrar-a-tus-usuarios/como-funciona-un-pago-online': lazy(() => import('./Pago')),
  'cobrar-a-tus-usuarios/webhooks': lazy(() => import('./Webhook')),
  'cobrar-a-tus-usuarios/planes-y-acceso': lazy(() => import('./Planes')),
  'publica-tu-saas/que-cambia-al-publicar': lazy(() => import('./Publicar')),
  'publica-tu-saas/dominio-y-https': lazy(() => import('./Dominio')),
  'agentes-ia/estado-nodos-y-aristas': lazy(() => import('./Grafo')),
  'agentes-ia/que-es-un-agente': lazy(() => import('./QueEsAgente')),
  'agentes-ia/decisiones-y-ciclos': lazy(() => import('./Ciclos')),
  'agentes-ia/memoria-y-humano-en-el-bucle': lazy(() => import('./Memoria')),
  'trabajar-con-ia/pasos-pequenos': lazy(() => import('./PasosPequenos')),
  'trabajar-con-ia/dar-contexto': lazy(() => import('./Contexto')),
  'trabajar-con-ia/cuando-algo-falla': lazy(() => import('./Errores')),
}

export const CLAVES = Object.keys(ANIMACIONES)

export function animacionDe(curso, leccion) {
  return ANIMACIONES[`${curso}/${leccion}`] ?? null
}
