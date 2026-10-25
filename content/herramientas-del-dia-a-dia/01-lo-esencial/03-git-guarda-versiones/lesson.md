---
title: "Git: guarda versiones de tu proyecto"
---

# Git: guarda versiones de tu proyecto

Git es como el "guardar partida" de un videojuego, pero para tu proyecto. Cada vez que algo funciona,
guardas una versión (un **commit**). Si más adelante rompes algo, puedes volver a una versión anterior.

Esto es especialmente importante cuando trabajas con IA: si te cambia veinte archivos y todo deja de
funcionar, vuelves al último commit y pruebas otra vez.

La primera vez, dile a Git quién eres (con tus datos reales):

```
git config --global user.name "Tu Nombre"
git config --global user.email "tu@correo.com"
```

Luego, dentro de la carpeta de tu proyecto, solo necesitas cuatro comandos:

| Comando | Qué hace |
|---------|----------|
| `git init` | Convierte la carpeta en un proyecto con Git (una sola vez) |
| `git status` | Muestra qué archivos cambiaron |
| `git add .` | Prepara todos los cambios para guardarlos |
| `git commit -m "mensaje"` | Guarda la versión, con un mensaje que la describe |

El mensaje debe decir qué hiciste: "Agrego la lista de tareas" es mejor que "cambios".

## Práctica

En la carpeta `tareas`, crea un archivo `README.md` con una línea de texto. Luego ejecuta `git init`,
`git add .` y `git commit -m "Primer commit"`. Termina con `git status`: debe decir que no hay nada
pendiente.

Comprueba lo que entendiste con la pregunta de abajo.
