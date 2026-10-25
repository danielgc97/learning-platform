---
title: "El viaje de un clic"
---

# El viaje de un clic

Imagina una app de tareas. Escribes "Comprar pan", pulsas **Guardar** y la tarea aparece en la lista.
Parece instantáneo, pero tu clic hizo un viaje de ida y vuelta:

1. **El frontend** (lo que ves en el navegador) junta lo que escribiste y arma una **petición**: un mensaje que dice "guarda esta tarea".
2. La petición viaja por internet hasta el **backend**, el programa que vive en un servidor.
3. El backend revisa que los datos tengan sentido (¿el texto no está vacío?).
4. El backend le pide a la **base de datos** que guarde la tarea.
5. La base confirma y el backend arma una **respuesta**.
6. La respuesta vuelve al navegador y el frontend actualiza la pantalla.

Las peticiones y respuestas siguen un idioma común llamado **HTTP**. Y los datos suelen viajar en
**JSON**, un formato de texto que tanto las personas como los programas pueden leer:

```json
{ "id": 7, "titulo": "Comprar pan", "hecha": false }
```

La respuesta también trae un **código de estado**, un número que resume cómo salió todo: `200` significa
"todo bien" y `500` significa "falló algo en el servidor".

Cuando algo no funciona, esta cadena te dice dónde buscar: ¿falló el envío, la validación o el guardado?

Comprueba lo que entendiste con la pregunta de abajo.
