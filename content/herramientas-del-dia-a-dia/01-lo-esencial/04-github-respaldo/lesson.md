---
title: "GitHub: respaldo y puerta a la publicación"
---

# GitHub: respaldo y puerta a la publicación

Git guarda las versiones **en tu computadora**. **GitHub** es un sitio web que guarda una copia en la nube.
Te da dos ventajas: un respaldo si pierdes tu equipo y la forma en que los servicios de publicación leerán tu
código más adelante.

## Práctica: sube tu proyecto

1. Crea una cuenta en github.com.
2. Pulsa **New repository**, ponle el nombre `tareas` y créalo vacío (sin README ni otros archivos).
3. GitHub te mostrará una sección con comandos para un proyecto que ya existe en tu computadora. Cópialos y pégalos en tu terminal. Se parecen a estos:

```
git remote add origin https://github.com/tu-usuario/tareas.git
git branch -M main
git push -u origin main
```

La primera vez puede abrirse el navegador para que inicies sesión.

## El archivo `.gitignore`

Hay archivos que **nunca** debes subir: contraseñas, claves y carpetas pesadas que se pueden regenerar. Para
eso existe `.gitignore`, un archivo de texto con la lista de lo que Git debe ignorar:

```
.env
venv/
node_modules/
__pycache__/
```

Créalo antes de tu primer `git add`. Es tu primera medida de seguridad: lo que se sube a un repositorio
queda en su historial.

Comprueba lo que entendiste con la pregunta de abajo.
