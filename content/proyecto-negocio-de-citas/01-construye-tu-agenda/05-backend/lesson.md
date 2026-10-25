---
title: "Construye el backend de la agenda"
---

# Construye el backend de la agenda

Construyes la API en `citas-api`, repitiendo lo del curso de FastAPI. Esta lección es la especificación y el
punto de control.

## 1. Las tablas en Supabase

```sql
create table public.servicios (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  nombre text not null,
  precio numeric not null check (precio >= 0),
  duracion_min integer not null check (duracion_min > 0)
);

create table public.clientes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  nombre text not null,
  telefono text
);

create table public.citas (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  cliente_id bigint not null references public.clientes (id),
  servicio_id bigint not null references public.servicios (id),
  dia date not null,
  hora time not null,
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'completada', 'cancelada'))
);
```

## 2. Los endpoints

| Endpoint | Qué hace |
|----------|----------|
| `GET/POST /servicios`, `GET/POST /clientes` | Listar y crear |
| `GET /citas?dia=2026-10-26` | La agenda de un día, ordenada por hora |
| `POST /citas` | Crea una cita **si no choca** |
| `PUT /citas/{id}/estado` | Cambia a completada o cancelada |
| `GET /reportes/ingresos` | Ingresos por servicio (solo completadas) |

Supabase devuelve la hora como texto (`"09:00:00"`). Conviértela a minutos para tus reglas:

```python
def a_minutos(hora: str) -> int:
    h, m = hora.split(":")[:2]
    return int(h) * 60 + int(m)
```

En `POST /citas`: lee las citas **no canceladas** de ese día, calcula `inicio` y `duracion` de cada una (la
duración sale de su servicio) y usa tu función `hay_choque`. Si choca, responde `409` ("conflicto") con un
mensaje claro y no guardes nada.

## Con tu IA

Dale tu `main.py` de `tareas-api`, la tabla de endpoints y tus funciones de Python de la lección anterior.
Pídele un endpoint por vez y prueba cada uno en `/docs`.

Comprueba lo que entendiste con las preguntas de abajo.
