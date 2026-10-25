import { PHASES } from './phases'

// El color de un curso es el de su fase; un curso fuera de la ruta usa uno neutro.
export function tileFor(slug) {
  return PHASES.find((phase) => phase.courses.includes(slug))?.tile ?? 'bg-panel'
}
