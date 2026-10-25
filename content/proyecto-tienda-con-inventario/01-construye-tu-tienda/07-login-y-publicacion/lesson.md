---
title: "Login, un negocio por usuario y publicación"
---

# Login, un negocio por usuario y publicación

Último tramo: que cada dueño vea **solo su tienda**, y poner todo en internet.

## 1. Inicio de sesión

Agrega la pantalla de ingreso y el envío del token, como en el curso de Usuarios y seguridad. En el backend,
protege todos los endpoints con `Depends(usuario_actual)` y filtra por `user_id` en **cada** consulta; al
crear productos y ventas, guarda el `user_id` del token.

## 2. Reglas en la base (RLS)

Activa RLS en las tres tablas. `productos` y `ventas` usan la regla de siempre. `items_venta` no tiene
`user_id`: hereda el acceso de su venta.

```sql
alter table public.items_venta enable row level security;

create policy "ver mis items" on public.items_venta
  for select to authenticated
  using (exists (
    select 1 from public.ventas v
    where v.id = venta_id and v.user_id = (select auth.uid())
  ));
```

Crea políticas equivalentes para insertar, y las de `productos` y `ventas` como en la lección de RLS.

## 3. Publica

Sigue el curso **Publica tu SaaS** con `tienda-api` y `tienda-web`: repositorios, Render, Vercel, variables,
CORS y direcciones de inicio de sesión. Termina con la **revisión antes de abrir**, incluida la prueba de las
dos cuentas.

## Punto de control final

Con dos cuentas distintas, ¿cada una ve solo sus productos y ventas? ¿Una venta sin stock se rechaza? Si ambas
respuestas son sí, tu producto está listo para sus primeros usuarios.

## Y ahora, tu propia idea

Ya conoces el camino completo. Tu idea es una variante de este mismo patrón: define tu alcance, diseña tus tablas,
escribe tus reglas y repite el recorrido.

Comprueba lo que entendiste con la pregunta de abajo.
