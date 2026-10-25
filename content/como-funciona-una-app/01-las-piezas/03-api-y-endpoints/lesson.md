---
title: "API y endpoints"
---

# API y endpoints

El frontend y el backend son programas distintos, y necesitan un acuerdo para entenderse. Ese acuerdo es
la **API**: la lista de cosas que el backend sabe hacer y la forma de pedirlas. Es como la carta de un
restaurante: no ves la cocina, pero sabes qué puedes pedir.

Cada plato de la carta es un **endpoint**: una dirección más un verbo que indica la acción.

| Verbo | Dirección | Qué hace |
|-------|-----------|----------|
| `GET` | `/tareas` | Pide la lista de tareas |
| `POST` | `/tareas` | Crea una tarea nueva |
| `PUT` | `/tareas/7` | Modifica la tarea número 7 |
| `DELETE` | `/tareas/7` | Borra la tarea número 7 |

Los cuatro verbos corresponden a las cuatro acciones básicas con cualquier dato: **leer, crear,
modificar y borrar**. Los programadores las llaman CRUD, por sus siglas en inglés.

La dirección completa sería algo como `https://mi-app.com/tareas`. Si abres una dirección así en el
navegador, estás haciendo un `GET`.

Cuando le pidas a la IA que construya tu backend, estas son las decisiones que le darás: qué recursos
tiene tu producto (tareas, clientes, citas) y qué se puede hacer con cada uno.

Comprueba lo que entendiste con la pregunta de abajo.
