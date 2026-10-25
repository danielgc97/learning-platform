---
title: "Tus tablas: servicios, clientes y citas"
---

# Tus tablas: servicios, clientes y citas

Busca los sustantivos de la frase: "Un **cliente** agenda una **cita** para un **servicio**". Salen tres tablas,
y la tabla del medio es la que conecta:

| Tabla | Qué guarda |
|-------|------------|
| `servicios` | nombre, precio, duración en minutos |
| `clientes` | nombre, teléfono |
| `citas` | **qué cliente**, **qué servicio**, día, hora y estado |

`citas` tiene dos claves foráneas: `cliente_id` y `servicio_id`. El **estado** es un texto con pocos valores
posibles: `pendiente`, `completada` o `cancelada`. Así puedes preguntar "¿cuántas se completaron?" sin borrar
nada.

No guardes la duración dentro de la cita: ya está en el servicio. Repetirla es la clase de duplicado que las
claves foráneas evitan.

En el ejercicio, `servicios` y `clientes` ya existen y tú defines `citas`. Para simplificar, el día y la hora se
guardan como **texto** (`'2026-10-26'` y `'09:00'`). En Supabase usarás tipos propios de fecha y hora.

La columna `user_id` (quién es el dueño del negocio) la agregarás en el paso final.

Ahora te toca a ti: resuelve el ejercicio de abajo.
