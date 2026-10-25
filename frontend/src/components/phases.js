// Las fases de la ruta y los cursos de cada una (por slug, en el orden de content/*/course.yaml).
export const PHASES = [
  {
    key: 'entender',
    title: 'Entender',
    text: 'Cómo funciona una aplicación y cómo trabajar con la IA como copiloto.',
    tile: 'bg-c1',
    courses: ['como-funciona-una-app', 'herramientas-del-dia-a-dia', 'trabajar-con-ia'],
  },
  {
    key: 'construir',
    title: 'Construir',
    text: 'Tus datos, la lógica, el backend, el frontend, la seguridad y los agentes.',
    tile: 'bg-c2',
    courses: [
      'sql-para-tu-base',
      'python-para-tu-backend',
      'backend-fastapi',
      'frontend-react',
      'login-seguridad-pagos',
      'agentes-ia',
    ],
  },
  {
    key: 'publicar',
    title: 'Publicar',
    text: 'Llevar tu producto a internet para que otros lo usen.',
    tile: 'bg-c3',
    courses: ['publica-tu-saas'],
  },
  {
    key: 'cierre',
    title: 'Cierre',
    text: 'Un recorrido guiado de la idea al producto publicado.',
    tile: 'bg-c4',
    courses: ['proyecto-primer-saas'],
  },
]
