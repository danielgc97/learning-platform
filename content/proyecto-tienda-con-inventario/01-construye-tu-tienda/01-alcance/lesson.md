---
title: "Alcance: qué entra en la versión 1"
---

# Alcance: qué entra en la versión 1

Este proyecto reúne todo lo aprendido: construirás una **tienda con inventario** (por ejemplo, una bodega, una
ferretería o una tienda de ropa) donde su dueño controla qué tiene, qué vende y qué se está acabando.

Los pasos 5 a 7 no repiten lo ya enseñado: te dan las especificaciones y los puntos de control, y tú construyes
con tu IA apoyándote en los cursos anteriores. Haz el proyecto en carpetas nuevas (`tienda-api` y
`tienda-web`), con la misma estructura de `tareas-api` y `tareas-web`.

## Qué entra en la versión 1

| Entra | Se queda para después |
|-------|-----------------------|
| Registrar productos con precio y stock | Facturación electrónica |
| Avisar cuando un producto tiene poco stock | Varias sucursales |
| Registrar una venta y descontar el stock | Proveedores y compras |
| Ver las ventas por mes | Código de barras |
| Cada dueño ve solo su negocio | Cobro en línea a clientes |

## Las tres pantallas

1. **Inventario**: lista de productos, con un aviso en los que tienen poco stock, y un formulario para agregar.
2. **Nueva venta**: elegir productos y cantidades, y ver el total.
3. **Ventas**: resumen del total vendido por mes.

## La regla que manda

El **stock nunca puede ser negativo**. Es la regla más importante del negocio, y la comprobará tu backend.

**Tarea para ti:** si tu idea es otro tipo de tienda, escribe qué dato propio necesita un producto (talla,
color, fecha de vencimiento) y déjalo anotado para después de terminar la versión 1. Primero, la base.

Comprueba lo que entendiste con la pregunta de abajo.
