---
title: "Formularios: enviar datos a tu API"
---

# Formularios: enviar datos a tu API

Para crear una tarea, el usuario escribe en un formulario y tu pantalla envía los datos con un `POST`, igual
que lo probaste en `/docs`.

## Práctica

Dentro de `App`, agrega un estado para el campo y la función que envía:

```jsx
const [titulo, setTitulo] = useState('')

async function agregar(evento) {
  evento.preventDefault()
  if (!titulo.trim()) return

  const respuesta = await fetch(`${API}/tareas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo }),
  })
  if (!respuesta.ok) {
    setError('No se pudo guardar la tarea')
    return
  }
  const nueva = await respuesta.json()
  setTareas([...tareas, nueva])
  setTitulo('')
}
```

Y el formulario, que va dentro del `return` (arriba de la lista):

```jsx
<form onSubmit={agregar}>
  <input
    value={titulo}
    onChange={(e) => setTitulo(e.target.value)}
    placeholder="Nueva tarea"
  />
  <button type="submit">Agregar</button>
</form>
```

Qué hace cada pieza:

- `evento.preventDefault()` evita que el navegador **recargue la página** al enviar, que es su comportamiento por defecto.
- `JSON.stringify({ titulo })` convierte el objeto a texto JSON, el idioma de las APIs.
- `[...tareas, nueva]` crea una lista nueva con todas las anteriores y la recién creada. En React **no se modifica** la lista existente; se crea una nueva y se guarda con `setTareas`.
- Si la API falla, se avisa al usuario.

Pruébalo y comprueba en el **Table Editor** de Supabase que la fila se guardó de verdad.

Comprueba lo que entendiste con la pregunta de abajo.
