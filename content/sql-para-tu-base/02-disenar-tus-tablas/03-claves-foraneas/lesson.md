---
title: "Claves foráneas: relacionar tablas"
---

# Claves foráneas: relacionar tablas

Imagina que guardas los pedidos así, repitiendo los datos del cliente en cada uno:

| pedido | cliente | correo | total |
|--------|---------|--------|-------|
| 1 | Ana | ana@mail.com | 120 |
| 2 | Ana | ana@mail.com | 80 |

Si Ana cambia de correo, tendrías que corregirlo en cada fila. La solución es guardar al cliente **una sola
vez**, en su propia tabla, y que cada pedido apunte a él con su `id`.

**clientes**

| id | nombre | correo |
|----|--------|--------|
| 1 | Ana | ana@mail.com |

**pedidos**

| id | cliente_id | total |
|----|------------|-------|
| 1 | 1 | 120 |
| 2 | 1 | 80 |

La columna `cliente_id` de `pedidos` es una **clave foránea**: guarda el `id` de una fila de otra tabla. Se
declara así:

```sql
CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  total DOUBLE
);
```

`REFERENCES clientes(id)` le dice a la base que `cliente_id` debe existir en `clientes`. Si intentas
guardar un pedido de un cliente que no existe, la base lo **rechaza con un error**. Así tus datos se
mantienen coherentes aunque falle un programa.

La regla práctica: cuando una cosa "pertenece" a otra (un pedido a un cliente, una tarea a un usuario),
la tabla que pertenece lleva la columna `..._id`.

Comprueba lo que entendiste con las preguntas de abajo.
