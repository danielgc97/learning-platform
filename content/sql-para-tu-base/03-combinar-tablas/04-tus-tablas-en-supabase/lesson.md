---
title: "Tus tablas en Supabase"
---

# Tus tablas en Supabase

Hasta ahora practicaste con una base dentro del navegador. Tu producto usará una base de datos real en la nube:
**Supabase**, que ofrece PostgreSQL. Todo lo que aprendiste de SQL se aplica igual.

## Práctica: crea tu base

1. Crea una cuenta en supabase.com y pulsa **New project**.
2. Ponle nombre (por ejemplo, `tareas`), elige una región cercana y define una **contraseña de base de datos**. Guárdala en un gestor de contraseñas, no en el chat de una IA.
3. Espera unos minutos a que el proyecto esté listo.
4. En el menú izquierdo abre **SQL Editor**, crea una consulta nueva, pega esto y pulsa **Run**:

```sql
create table tareas (
  id bigint generated always as identity primary key,
  titulo text not null,
  hecha boolean not null default false,
  creada_en timestamptz not null default now()
);
```

5. Abre **Table Editor**: verás tu tabla `tareas`. Agrega una fila a mano.

Dos novedades en esa instrucción:

- `generated always as identity` hace que la base asigne sola un `id` nuevo y único a cada fila.
- `default` da un valor automático cuando no lo indicas (`false`, o la fecha y hora actuales con `now()`).

## Una advertencia

Una tabla nueva puede quedar accesible desde internet con la clave pública del proyecto si no activas
**RLS** (seguridad por filas). Lo harás en el curso de Usuarios y seguridad. Hasta entonces, usa solo datos
de prueba.

Comprueba lo que entendiste con la pregunta de abajo.
