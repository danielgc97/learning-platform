---
title: "Qué es una API y un endpoint"
---

# Qué es una API y un endpoint

Una **API** es la forma acordada en que un programa le pide cosas a otro. En una aplicación web, es la
conversación entre el frontend y el backend.

## La analogía del restaurante

- El **menú** es la API: lista lo que puedes pedir.
- Cada **plato** es un *endpoint*.
- El **mesero** lleva tu pedido a la cocina (el backend) y te trae la respuesta.

## Endpoint: una dirección y un método

Un **endpoint** combina una dirección con un tipo de petición. Algunos de esta plataforma:

- `GET /courses`: "dame la lista de cursos".
- `POST /feedback`: "te envío mi código, ayúdame".

**GET** pide datos sin cambiar nada. **POST** envía datos para que el servidor los guarde o los procese.

## La respuesta

El backend responde con los datos (normalmente en formato JSON) y un **código de estado**:

- `200`: todo salió bien.
- `401`: no iniciaste sesión.
- `404`: lo que pides no existe.
- `500`: falló algo dentro del servidor.

Responde la pregunta de abajo.
