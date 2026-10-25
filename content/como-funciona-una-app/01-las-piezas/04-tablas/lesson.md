---
title: "Tablas: cómo se guardan los datos"
---

# Tablas: cómo se guardan los datos

La base de datos de la mayoría de los productos organiza la información en **tablas**, parecidas a una
hoja de cálculo. Cada tabla guarda un solo tipo de cosa.

Esta es la tabla `tareas`:

| id | titulo | hecha |
|----|--------|-------|
| 1 | Comprar pan | no |
| 2 | Pagar el internet | sí |
| 3 | Llamar al dentista | no |

- Cada **columna** es un dato que describe la cosa (`titulo`, `hecha`).
- Cada **fila** es un elemento concreto: una tarea.
- La columna **`id`** es la **clave primaria**: un número único para cada fila. Sirve para distinguir
  dos tareas aunque tengan el mismo título, y para pedir "la tarea 2" sin confusiones.

Los productos reales tienen varias tablas conectadas. Por ejemplo, una tabla `usuarios` y otra `tareas`
con una columna `usuario_id` que indica a quién pertenece cada tarea. Así no repites los datos del
usuario en cada tarea.

Este lenguaje de tablas se consulta con **SQL**, que aprenderás más adelante. Por ahora basta con que
sepas pensar tu producto como "cosas" (tablas) con "datos" (columnas).

Comprueba lo que entendiste con la pregunta de abajo.
