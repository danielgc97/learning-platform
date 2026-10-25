---
title: "Las preguntas del dueño, en SQL"
---

# Las preguntas del dueño, en SQL

Un dueño de carwash no quiere tablas: quiere respuestas. Tu producto debe contestar:

| Pregunta del dueño | Herramienta |
|--------------------|-------------|
| ¿Qué tengo agendado hoy? | `JOIN` + `WHERE` + `ORDER BY` |
| ¿Cuánto dinero me deja cada servicio? | `JOIN` + `GROUP BY` con una suma |
| ¿Quiénes son mis mejores clientes? | `JOIN` + `GROUP BY` + `ORDER BY` + `LIMIT` |

Las tres serán después endpoints de tu API y pantallas de tu frontend.

Las tablas de los ejercicios:

- `servicios` (id, nombre, precio, duracion_min)
- `clientes` (id, nombre, telefono)
- `citas` (id, cliente_id, servicio_id, dia, hora, estado)

Una pista importante: el dinero solo cuenta cuando la cita está **completada**. Una cita `pendiente` o
`cancelada` no es un ingreso, así que filtra por `estado = 'completada'` antes de sumar.

Piensa siempre en tres pasos: ¿qué debe ser **una fila** de mi resultado? ¿qué tablas necesito unir? ¿qué
tengo que filtrar o resumir?

Ahora te toca a ti: resuelve los tres ejercicios de abajo.
