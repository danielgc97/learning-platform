---
title: "Traer datos de tu API"
---

# Traer datos de tu API

Ahora conectas lo que construiste en el backend. Para pedir datos usas `fetch`, y para hacerlo **al abrir la
pantalla** usas `useEffect`, que ejecuta código después de que el componente se dibuja.

## Práctica

1. Arranca tu API en otra terminal (`fastapi dev`, en la carpeta `tareas-api`).
2. En `tareas-web`, crea el archivo `.env.local` (ya lo ignora Git) con la dirección de tu API:

```
VITE_API_URL=http://127.0.0.1:8000
```

Reinicia `npm run dev`. En Vite, las variables que empiezan con `VITE_` quedan disponibles en el código, y
**cualquiera puede verlas**: nunca pongas secretos ahí.

3. Reescribe `App` así:

```jsx
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL

export default function App() {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignorar = false
    async function cargar() {
      try {
        const respuesta = await fetch(`${API}/tareas`)
        if (!respuesta.ok) throw new Error('No se pudieron cargar las tareas')
        const datos = await respuesta.json()
        if (!ignorar) setTareas(datos)
      } catch (e) {
        if (!ignorar) setError(e.message)
      } finally {
        if (!ignorar) setCargando(false)
      }
    }
    cargar()
    return () => { ignorar = true }
  }, [])

  if (cargando) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>
  return <ul>{tareas.map((t) => <Tarea key={t.id} titulo={t.titulo} hecha={t.hecha} />)}</ul>
}
```

El `[]` del final significa "ejecútalo una sola vez, al abrir". La variable `ignorar` evita usar una respuesta
que llegó tarde. En desarrollo verás dos peticiones: es normal.

Los estados `cargando` y `error` son importantes: le dicen al usuario qué está pasando en lugar de dejar una
pantalla en blanco.

Comprueba lo que entendiste con la pregunta de abajo.
