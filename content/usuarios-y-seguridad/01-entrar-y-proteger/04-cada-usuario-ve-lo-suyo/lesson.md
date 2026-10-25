---
title: "Cada usuario ve solo lo suyo: user_id y RLS"
---

# Cada usuario ve solo lo suyo: user_id y RLS

Para saber de quién es cada tarea, la tabla necesita una columna `user_id`. Además, activarás **RLS** (*Row
Level Security*, seguridad por filas): reglas dentro de la propia base de datos sobre qué filas puede tocar
cada persona. Es una segunda capa por si algo falla en tu código.

## Práctica en el SQL Editor de Supabase

1. Borra las tareas de prueba y agrega la columna:

```sql
delete from public.tareas;

alter table public.tareas
  add column user_id uuid not null references auth.users (id) on delete cascade;
```

2. Activa RLS y define quién puede hacer qué:

```sql
alter table public.tareas enable row level security;

create policy "ver mis tareas" on public.tareas
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "crear mis tareas" on public.tareas
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "editar mis tareas" on public.tareas
  for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "borrar mis tareas" on public.tareas
  for delete to authenticated using ((select auth.uid()) = user_id);
```

`auth.uid()` es el id de quien hace la consulta; cada política dice: "solo filas cuyo `user_id` sea yo".

3. Supabase recomienda además quitar permisos al rol anónimo: <!-- REVISAR: confirmar contra la guía actual de RLS de Supabase -->

```sql
revoke all on table public.tareas from anon;
```

## Dos capas

- Tu **backend** usa la clave secreta, que se salta RLS: ahí **tú** filtras con `user_id`.
- Si alguien usa la clave pública directamente contra la base, **RLS** lo frena.

Con una sola capa, un olvido deja tus datos expuestos. Con las dos, tendría que fallar ambas.

Una tabla con RLS activado y sin políticas no deja ver nada a la clave pública: es lo más seguro por defecto.

Comprueba lo que entendiste con las preguntas de abajo.
