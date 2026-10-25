---
title: "Prepara tu computadora"
---

# Prepara tu computadora

Antes de construir necesitas cuatro programas. Todos son gratuitos; descárgalos siempre desde su página
oficial.

| Programa | Para qué sirve | Dónde |
|----------|----------------|-------|
| **Visual Studio Code** | Editor donde verás y editarás tu código | code.visualstudio.com |
| **Python** (3.12 o superior) | Ejecutar tu backend | python.org |
| **Node.js** (versión LTS) | Ejecutar y construir tu frontend | nodejs.org |
| **Git** | Guardar versiones de tu proyecto | git-scm.com |

Sigue el instalador de cada uno con las opciones por defecto. En Windows, al instalar Python marca la casilla
**Add python.exe to PATH**; sin ella, la terminal no encontrará Python.

## Práctica: comprueba que todo quedó bien

Abre VS Code y la terminal integrada (menú **Terminal → New Terminal**). Escribe estos comandos uno por uno:

```
python --version
node --version
npm --version
git --version
```

Cada uno debe mostrar un número de versión. En algunos equipos Mac o Linux, Python se llama `python3`.

Si un comando dice que "no se reconoce" o "command not found", el programa no se instaló bien o la
terminal se abrió antes de instalarlo. Cierra VS Code, ábrelo de nuevo y repite.

Comprueba lo que entendiste con la pregunta de abajo.
