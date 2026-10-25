---
title: "Listas: mostrar varios elementos"
---

# Listas: mostrar varios elementos

Tu app casi siempre mostrará listas: tareas, productos, citas. En React se transforma un arreglo de datos en
un arreglo de componentes con `map`.

## Práctica

En `App`, define una lista y dibújala:

```jsx
const tareas = [
  { id: 1, titulo: 'Comprar pan', hecha: false },
  { id: 2, titulo: 'Pagar la luz', hecha: true },
]

return (
  <div>
    <h1>Mis tareas</h1>
    {tareas.length === 0 ? (
      <p>No tienes tareas todavía.</p>
    ) : (
      <ul>
        {tareas.map((t) => (
          <Tarea key={t.id} titulo={t.titulo} hecha={t.hecha} />
        ))}
      </ul>
    )}
  </div>
)
```

Cómo se lee:

- `tareas.map((t) => ...)` recorre la lista y devuelve un componente `<Tarea />` por cada elemento. Es el `for` de Python, pero que produce pantalla.
- La prop **`key`** es obligatoria en cada elemento de una lista. Debe ser un valor **único y estable**, como el `id` que viene de la base de datos. Así React sabe cuál es cuál cuando la lista cambia.
- La condición `tareas.length === 0 ? ... : ...` evita mostrar una lista vacía sin explicación. Siempre piensa en el caso "no hay nada".

Prueba vaciar la lista (`const tareas = []`) para ver el mensaje, y vuelve a llenarla.

Comprueba lo que entendiste con la pregunta de abajo.
