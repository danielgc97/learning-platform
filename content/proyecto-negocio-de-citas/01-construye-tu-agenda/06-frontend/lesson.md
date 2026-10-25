---
title: "Construye el frontend de la agenda"
---

# Construye el frontend de la agenda

En `citas-web` construyes las tres pantallas con React Router y `fetch`, como en el curso de React. Esta
lección es la especificación y el punto de control.

## Pantalla 1: Agenda del día (`/`)

- Un selector de día (empieza en hoy) que pide `GET /citas?dia=...`.
- Las citas ordenadas por hora, mostrando cliente, servicio y estado.
- Botones para marcar una cita como **completada** o **cancelada** (`PUT /citas/{id}/estado`).
- Un mensaje claro cuando no hay citas ese día.

## Pantalla 2: Nueva cita (`/nueva`)

- Lista desplegable de clientes y de servicios (traídos de la API).
- Campos de día y hora.
- Al enviar, si la API responde `409`, mostrar su mensaje ("Ese horario ya está ocupado") sin perder lo que
  el usuario escribió.

## Pantalla 3: Clientes y servicios (`/datos`)

- Dos listas con su formulario para agregar un cliente o un servicio.

## Detalles que hacen que se sienta profesional

- Estados de **cargando** y **error** en cada pantalla.
- Que el formulario de cita **no permita enviar** sin cliente, servicio, día y hora.
- Recargar la agenda después de crear o cambiar una cita.

## Con tu IA

Pídele una pantalla por vez, indicando la ruta de la API que usa y los estados que debe tener. Revisa el código
antes de aceptarlo y haz un commit cuando cada pantalla funcione.

Comprueba lo que entendiste con la pregunta de abajo.
