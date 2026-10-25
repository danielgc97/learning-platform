---
title: "Prepara tu proyecto React con Vite"
---

# Prepara tu proyecto React con Vite

**React** es la librería con la que construirás las pantallas. **Vite** es la herramienta que crea el
proyecto, lo muestra en el navegador mientras trabajas y lo prepara para publicar. El frontend es un proyecto
**separado** de tu backend: su propia carpeta y su propio repositorio de Git.

## Práctica

Necesitas Node.js instalado (Vite pide la versión 20.19 o superior, o la 22.12+). Revisa con `node --version`.

1. Sal de la carpeta de tu API (`cd ..`) y crea el proyecto:

```
npm create vite@latest tareas-web -- --template react
cd tareas-web
npm install
npm run dev
```

Si el asistente te hace preguntas, elige las opciones por defecto. <!-- REVISAR: el asistente de create-vite cambia seguido (preguntas sobre variantes experimentales) -->

2. Abre `http://localhost:5173`: verás la página de ejemplo de Vite.
3. Abre la carpeta en VS Code (`code .`) y mira lo importante:

| Archivo | Para qué sirve |
|---------|----------------|
| `index.html` | La única página; React dibuja dentro de ella |
| `src/main.jsx` | El punto de entrada que arranca React |
| `src/App.jsx` | Tu primera pantalla |
| `package.json` | Lista de dependencias y comandos |

4. Detén el servidor con `Ctrl + C` cuando termines. Para volver a arrancarlo: `npm run dev`.
5. Guarda tu primera versión: `git init`, `git add .`, `git commit -m "Proyecto React inicial"`.

La carpeta `node_modules` ya viene en el `.gitignore` que crea Vite.

Comprueba lo que entendiste con la pregunta de abajo.
