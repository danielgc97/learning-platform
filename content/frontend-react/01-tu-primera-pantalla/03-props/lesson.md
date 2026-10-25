---
title: "Props: pasar datos a un componente"
---

# Props: pasar datos a un componente

Un componente que siempre muestra lo mismo sirve de poco. Lo útil es que reciba datos desde afuera, y eso se
hace con **props** (de *properties*, propiedades): los datos que le pasas al usarlo, igual que los parámetros
de una función de Python.

## Práctica

Agrega este componente en `src/App.jsx` (arriba de `App`) y úsalo dentro:

```jsx
function Tarea({ titulo, hecha }) {
  return (
    <li>
      {hecha ? '✅' : '⬜'} {titulo}
    </li>
  )
}
```

```jsx
<ul>
  <Tarea titulo="Comprar pan" hecha={false} />
  <Tarea titulo="Pagar la luz" hecha={true} />
</ul>
```

Cómo funciona:

- Los valores se pasan como atributos. Los **textos** van entre comillas y todo lo demás (números, `true`, variables) va entre llaves `{}`.
- Dentro del componente, las props llegan como un objeto; las escribimos entre llaves `{ titulo, hecha }` para sacarlas directamente.
- `{hecha ? '✅' : '⬜'}` es un "si... entonces... si no": muestra una marca u otra según `hecha`.

Un mismo componente puede usarse muchas veces con datos distintos. Es lo que hace que una pantalla con cien
tareas no requiera cien veces el código.

Las props son de solo lectura: un componente no debe modificar lo que recibe.

Comprueba lo que entendiste con la pregunta de abajo.
