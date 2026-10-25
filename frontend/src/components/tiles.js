const TILES = ['bg-c1', 'bg-c2', 'bg-c3', 'bg-c4']

// Mismo orden que la ruta de cursos (campo position de content/*/course.yaml).
const ORDER = [
  'como-funciona-una-app',
  'herramientas-del-dia-a-dia',
  'trabajar-con-ia',
  'sql-para-tu-base',
  'python-para-tu-backend',
  'backend-fastapi',
  'frontend-react',
  'login-seguridad-pagos',
  'agentes-ia',
  'publica-tu-saas',
  'proyecto-primer-saas',
]

export function tileFor(slug) {
  const index = ORDER.indexOf(slug)
  return TILES[(index === -1 ? [...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) : index) % TILES.length]
}
