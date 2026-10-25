---
title: "Construye el backend de la tienda"
---

# Construye el backend de la tienda

Ahora construyes la API de la tienda en `tienda-api`, repitiendo lo que hiciste con `tareas-api` (revisa el
curso de FastAPI si lo necesitas). Esta lección es la especificación y el punto de control.

## 1. Las tablas en Supabase

```sql
create table public.productos (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  nombre text not null,
  precio numeric not null check (precio >= 0),
  stock integer not null check (stock >= 0),
  stock_minimo integer not null default 0
);

create table public.ventas (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  creada_en timestamptz not null default now()
);

create table public.items_venta (
  id bigint generated always as identity primary key,
  venta_id bigint not null references public.ventas (id) on delete cascade,
  producto_id bigint not null references public.productos (id),
  cantidad integer not null check (cantidad > 0),
  precio_unitario numeric not null
);
```

El `check (stock >= 0)` es una segunda defensa: aunque tu código falle, la base **rechaza** un stock negativo.

## 2. Los endpoints

| Endpoint | Qué hace |
|----------|----------|
| `GET /productos` | Lista tus productos |
| `POST /productos` | Crea un producto |
| `PUT /productos/{id}` | Modifica un producto |
| `GET /productos/bajo-stock` | Los que tienen `stock <= stock_minimo` |
| `POST /ventas` | Registra una venta con sus líneas |
| `GET /ventas/resumen` | Total vendido por mes |

`POST /ventas` recibe una lista de `{producto_id, cantidad}`. Debe tomar el **precio de la base**, comprobar el
stock con tu regla de Python, guardar la venta y sus líneas, y descontar el stock. Si falta stock, responde
`400` con un mensaje claro y **no guarda nada**.

Con supabase-py cada llamada es independiente: si algo falla entre dos, la venta puede quedar a medias. Para
la versión 1, valida todo antes de escribir. Una versión más robusta usa una función SQL que haga todo en una
sola transacción.

## Con tu IA

Pásale como contexto tu `main.py` de `tareas-api` y esta tabla de endpoints. Pide un endpoint por vez y prueba
cada uno en `/docs`.

Comprueba lo que entendiste con las preguntas de abajo.
