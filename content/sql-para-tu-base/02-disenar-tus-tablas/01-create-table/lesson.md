---
title: "CREATE TABLE: crear una tabla"
---

# CREATE TABLE: crear una tabla

Hasta ahora consultaste tablas que ya existían. Para tu producto tendrás que crear las tuyas. Se hace con
`CREATE TABLE`, indicando el nombre de cada columna y su **tipo de dato**.

```sql
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nombre VARCHAR NOT NULL,
  activo BOOLEAN
);
```

Los tipos más usados, y cómo suelen escribirse en PostgreSQL (la base de Supabase):

| Dato | En los ejercicios | En PostgreSQL |
|------|-------------------|----------------|
| Número entero | `INTEGER` | `integer` o `bigint` |
| Texto | `VARCHAR` | `text` |
| Número con decimales | `DOUBLE` | `numeric` |
| Verdadero o falso | `BOOLEAN` | `boolean` |
| Fecha y hora | `TIMESTAMP` | `timestamptz` |

Dos reglas que se agregan a una columna:

- `PRIMARY KEY`: es la columna que identifica cada fila; no se puede repetir.
- `NOT NULL`: la columna no puede quedar vacía.

Para añadir una fila se usa `INSERT INTO clientes VALUES (1, 'Ana', true);` (lo verás con detalle en la
siguiente lección).

En los ejercicios usaremos `CREATE OR REPLACE TABLE`, que reemplaza la tabla si ya existe, para que puedas
ejecutarlo varias veces. Esa forma **solo existe en el motor de los ejercicios**; en PostgreSQL se usa
`DROP TABLE IF EXISTS` antes de crearla.

Ahora te toca a ti: resuelve el ejercicio de abajo.
