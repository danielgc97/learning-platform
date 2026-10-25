---
title: "Varias pantallas con React Router"
---

# Varias pantallas con React Router

Un producto real tiene varias pantallas: inicio, ingreso, panel. **React Router** hace que cada dirección
(`/`, `/acerca`) muestre un componente distinto, sin recargar la página.

## Práctica

1. Instala el paquete: `npm install react-router`.
2. En `src/main.jsx`, envuelve la app con `BrowserRouter`:

```jsx
import { BrowserRouter } from 'react-router'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
```

(Deja los demás `import` y el `StrictMode` que ya trae el archivo; solo envuelve `<App />`.)

3. Mueve tu pantalla de tareas a un componente `Tareas` y deja `App` como el menú y el mapa de rutas:

```jsx
import { Link, Route, Routes } from 'react-router'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Tareas</Link> | <Link to="/acerca">Acerca de</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Tareas />} />
        <Route path="/acerca" element={<h1>Acerca de esta app</h1>} />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </>
  )
}
```

- `Link` navega sin recargar; úsalo en lugar de `<a href>`.
- Cada `Route` une una dirección (`path`) con un componente (`element`).
- La ruta `*` atrapa cualquier dirección que no exista.

Más adelante, esta misma estructura te servirá para separar las pantallas públicas (inicio) de las privadas
(el panel de quien inició sesión).

## Con tu IA

Para organizar bien el proyecto: "Mueve cada pantalla a su propio archivo dentro de `src/pages`, sin cambiar
su comportamiento".

Comprueba lo que entendiste con la pregunta de abajo.
