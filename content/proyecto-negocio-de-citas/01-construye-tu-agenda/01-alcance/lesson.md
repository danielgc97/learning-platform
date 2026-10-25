---
title: "Alcance: qué entra en la versión 1"
---

# Alcance: qué entra en la versión 1

En este proyecto construirás la **agenda de un negocio que atiende por cita**: un carwash, una peluquería,
un consultorio, un taller. Usaremos un carwash como ejemplo: el dueño necesita saber **quién viene, cuándo y
para qué servicio**, y evitar que dos autos se citen a la misma hora.

Los pasos 5 a 7 no repiten lo ya enseñado: te dan las especificaciones y los puntos de control, y tú construyes
con tu IA apoyándote en los cursos anteriores. Haz el proyecto en carpetas nuevas (`citas-api` y `citas-web`),
con la misma estructura de `tareas-api` y `tareas-web`.

## Qué entra en la versión 1

| Entra | Se queda para después |
|-------|-----------------------|
| Registrar servicios con precio y duración | Recordatorios por WhatsApp |
| Registrar clientes (nombre, teléfono) | Reservas hechas por los propios clientes |
| Agendar una cita **sin choques de horario** | Varios empleados o varias bahías |
| Ver la agenda de un día y cambiar el estado de las citas | Cobro en línea |
| Ver ingresos por servicio | Programas de fidelidad |
| Cada dueño ve solo su negocio | App móvil |

## Las tres pantallas

1. **Agenda del día**: citas ordenadas por hora, con botones para marcarlas como completadas o canceladas.
2. **Nueva cita**: elegir cliente, servicio, día y hora.
3. **Clientes y servicios**: listas con formularios para agregar.

## La regla que manda

**Dos citas no pueden ocupar el mismo tiempo.** Es la regla central de un negocio de citas, y la comprobará
tu backend.

**Tarea para ti:** si tu negocio tiene varias bahías o empleados, anótalo para después. La versión 1 asume
**un solo puesto de atención**.

Comprueba lo que entendiste con la pregunta de abajo.
