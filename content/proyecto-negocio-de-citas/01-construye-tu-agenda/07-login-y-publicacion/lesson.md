---
title: "Login, un negocio por usuario y publicación"
---

# Login, un negocio por usuario y publicación

Último tramo: que cada dueño vea **solo su negocio**, y poner todo en internet.

## 1. Inicio de sesión

Agrega la pantalla de ingreso y el envío del token, como en el curso de Usuarios y seguridad. En el backend,
protege todos los endpoints con `Depends(usuario_actual)` y filtra por `user_id` en **cada** consulta; al
crear servicios, clientes y citas, guarda el `user_id` del token.

## 2. Reglas en la base (RLS)

Activa RLS en las tres tablas, con las cuatro políticas de siempre en cada una. Aquí hay una trampa: una cita
apunta a un cliente y a un servicio. Comprueba en el backend que el `cliente_id` y el `servicio_id` que llegan
**pertenecen al mismo usuario**. Si no, alguien podría agendar usando datos de otro negocio.

```sql
alter table public.citas enable row level security;

create policy "ver mis citas" on public.citas
  for select to authenticated using ((select auth.uid()) = user_id);
```

## 3. Publica

Sigue el curso **Publica tu SaaS** con `citas-api` y `citas-web`: repositorios, Render, Vercel, variables,
CORS y direcciones de inicio de sesión. Termina con la **revisión antes de abrir**, incluida la prueba de las
dos cuentas.

## Punto de control final

Con dos cuentas distintas, ¿cada una ve solo su agenda? ¿Una cita que choca se rechaza? Si ambas respuestas son
sí, tu producto está listo para sus primeros usuarios.

## Y ahora, tu propia idea

Ya conoces el camino completo. Tu idea es una variante de este patrón: define tu alcance, diseña tus tablas,
escribe tus reglas y repite el recorrido.

Comprueba lo que entendiste con la pregunta de abajo.
