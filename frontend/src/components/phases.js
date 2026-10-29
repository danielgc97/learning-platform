// Las fases de la ruta y los cursos de cada una (por slug, en el orden de content/*/course.yaml).
export const PHASES = [
  {
    key: 'entender',
    title: 'Entender',
    text: 'Cómo funciona una aplicación, cómo trabajar con la IA como copiloto y qué vas a construir.',
    tile: 'tint-1',
    courses: ['como-funciona-una-app', 'herramientas-del-dia-a-dia', 'trabajar-con-ia', 'define-tu-producto'],
  },
  {
    key: 'construir',
    title: 'Construir',
    text: 'Tus datos, la lógica, el backend, el frontend, los usuarios y, si quieres, cobros y agentes.',
    tile: 'tint-2',
    courses: [
      'sql-para-tu-base',
      'python-para-tu-backend',
      'backend-fastapi',
      'frontend-react',
      'usuarios-y-seguridad',
      'cobrar-a-tus-usuarios',
      'agentes-ia',
    ],
  },
  {
    key: 'publicar',
    title: 'Publicar',
    text: 'Llevar tu producto a internet para que otros lo usen.',
    tile: 'tint-3',
    courses: ['publica-tu-saas'],
  },
  {
    key: 'cierre',
    title: 'Cierre',
    text: 'Elige un proyecto según el tipo de negocio y constrúyelo de punta a punta.',
    tile: 'tint-4',
    courses: ['proyecto-tienda-con-inventario', 'proyecto-negocio-de-citas'],
  },
]
