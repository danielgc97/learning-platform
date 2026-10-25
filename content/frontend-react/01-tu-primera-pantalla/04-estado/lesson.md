---
title: "Estado con useState: pantallas que reaccionan"
---

# Estado con useState: pantallas que reaccionan

Una pantalla real cambia: escribes en un campo, pulsas un botón, llegan datos. Para que React sepa **qué
cambió y vuelva a dibujar**, guardas esos valores en el **estado**, con la función `useState`.

## Práctica

Agrega este componente a `src/App.jsx` y úsalo en `App` con `<Contador />`:

```jsx
import { useState } from 'react'

function Contador() {
  const [veces, setVeces] = useState(0)

  return (
    <button onClick={() => setVeces(veces + 1)}>
      Clics: {veces}
    </button>
  )
}
```

(El `import` va en la primera línea del archivo.)

`useState(0)` devuelve dos cosas, que recibes con la sintaxis `[veces, setVeces]`:

1. El **valor actual** (`veces`), que empieza en `0`.
2. Una **función para cambiarlo** (`setVeces`).

La regla de oro: **nunca cambies el valor directamente** (`veces = veces + 1` no funciona). Siempre usa la
función. Al llamarla, React guarda el nuevo valor y dibuja de nuevo la pantalla.

Prueba ahora un campo de texto que muestre lo que escribes:

```jsx
const [texto, setTexto] = useState('')

<input value={texto} onChange={(e) => setTexto(e.target.value)} />
<p>Escribiste: {texto}</p>
```

Esta es la base de todos los formularios que harás. `onClick` y `onChange` son **eventos**: funciones que
React ejecuta cuando el usuario interactúa.

Comprueba lo que entendiste con la pregunta de abajo.
