---
title: "Tus tablas: productos, ventas y sus líneas"
---

# Tus tablas: productos, ventas y sus líneas

Usa el método que aprendiste: busca los sustantivos. "Un **negocio vende productos** en **ventas**". Pero una
venta puede incluir varios productos, y un producto aparece en muchas ventas. Para relacionarlos hace falta
una tabla en el medio:

| Tabla | Qué guarda |
|-------|------------|
| `productos` | nombre, precio, stock actual, stock mínimo |
| `ventas` | una fila por venta (cuándo se hizo) |
| `items_venta` | una fila por **cada producto dentro de una venta**: cuánta cantidad y a qué precio |

Fíjate en `precio_unitario` dentro de `items_venta`: **guarda el precio del momento de la venta**. Si mañana
subes el precio del producto, las ventas pasadas no deben cambiar.

`items_venta` tiene dos claves foráneas: `venta_id` (a qué venta pertenece) y `producto_id` (qué producto se
vendió).

En el ejercicio de abajo, `productos` y `ventas` ya existen. Tú defines `items_venta`. Para simplificar, el
ejercicio guarda el mes como texto (`'2026-08'`); en Supabase usarás una columna de fecha.

La columna `user_id` (quién es el dueño del negocio) la agregarás en el paso final, como en el curso de
Usuarios y seguridad.

Ahora te toca a ti: resuelve el ejercicio de abajo.
