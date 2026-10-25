---
title: "Componentes y JSX: tu pantalla en piezas"
---

# Componentes y JSX: tu pantalla en piezas

En React, una pantalla se arma con **componentes**: piezas reutilizables, como bloques. Un componente es
simplemente una **función que devuelve lo que se debe dibujar**. Eso que devuelve se escribe en **JSX**, que
se parece a HTML pero vive dentro de JavaScript.

## Práctica

Reemplaza todo el contenido de `src/App.jsx` por esto y guarda:

```jsx
function Encabezado() {
  return <h1>Mis tareas</h1>
}

export default function App() {
  const usuario = 'Ana'

  return (
    <div>
      <Encabezado />
      <p>Hola, {usuario}</p>
    </div>
  )
}
```

La página se actualiza al instante. Fíjate en las reglas del JSX:

- Los componentes **empiezan con mayúscula**. Así React distingue `<Encabezado />` (tu pieza) de `<h1>` (una etiqueta HTML normal).
- Una función devuelve **un solo elemento raíz**: por eso todo está dentro del `<div>`.
- Con **llaves** `{}` insertas valores de JavaScript: `{usuario}`.
- En lugar de `class`, se escribe `className`.

Un componente puede usar a otros, como `App` usa a `Encabezado`. Así una pantalla enorme se divide en
partes pequeñas que puedes pedirle a la IA una por una.

Comprueba lo que entendiste con la pregunta de abajo.
