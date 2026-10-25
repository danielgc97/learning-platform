---
title: "Construye el frontend de la tienda"
---

# Construye el frontend de la tienda

En `tienda-web` construyes las tres pantallas, con React Router y `fetch`, como en el curso de React.
Esta lección es la especificación y el punto de control.

## Pantalla 1: Inventario (`/`)

- Lista de productos con nombre, precio y stock.
- Los productos con poco stock se destacan (usa `GET /productos/bajo-stock` o compara `stock <= stock_minimo`).
- Formulario para agregar un producto, con validación: nombre obligatorio, precio y stock no negativos.

## Pantalla 2: Nueva venta (`/venta`)

- Elegir un producto y una cantidad, y agregarlo a la lista de la venta (un estado con un arreglo).
- Mostrar un **total estimado** mientras se arma.
- Botón **Registrar venta** que envía `POST /ventas`. Si la API responde con error (por ejemplo, falta de
  stock), mostrar su mensaje.

## Pantalla 3: Ventas (`/ventas`)

- Tabla con el total por mes, desde `GET /ventas/resumen`.

## Detalles que hacen que se sienta profesional

- Mensajes de **cargando** y de **error** en cada pantalla.
- Un mensaje cuando no hay datos ("Aún no tienes productos").
- Después de registrar una venta, recargar el inventario para ver el stock actualizado.

## Con tu IA

Pídele **una pantalla por vez**, indicando la ruta de la API que usa y los estados que debe tener
(cargando, error, vacío). Revisa el código antes de aceptarlo, y haz un commit cuando cada pantalla funcione.

Comprueba lo que entendiste con la pregunta de abajo.
