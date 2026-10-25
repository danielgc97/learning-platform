---
title: "Autenticación y autorización"
---

# Autenticación y autorización

Dos palabras que se confunden mucho y que son la base de la seguridad de tu producto:

| Concepto | Pregunta que responde | Ejemplo |
|----------|-----------------------|---------|
| **Autenticación** | ¿Quién eres? | Iniciar sesión con correo y contraseña |
| **Autorización** | ¿Qué puedes ver o hacer? | Ver *solo tus* tareas, no las de otra persona |

Una persona puede estar autenticada y aun así **no estar autorizada** para algo. Si Ana inicia sesión y pide
la tarea 7, que es de Luis, el sistema sabe quién es Ana (autenticación) pero debe negarle el acceso
(autorización).

El flujo de tu producto será este:

1. El usuario inicia sesión en el frontend. **Supabase Auth** verifica su contraseña y entrega un **token** (una credencial temporal firmada).
2. En cada petición, el frontend envía ese token a tu API.
3. Tu backend **valida el token** y descubre qué usuario es.
4. Tu backend entrega solo los datos de ese usuario.

No programarás tú el manejo de contraseñas: guardarlas de forma segura es delicado y Supabase ya lo hace
bien. Tu trabajo es usar el token y aplicar la autorización.

Los códigos de estado ya los conoces: `401` significa "no estás autenticado" (falta o es inválido el token) y
`403` significa "estás autenticado pero no tienes permiso".

La regla de oro: **la autorización siempre se comprueba en el backend (y en la base)**, nunca solo
escondiendo botones en la pantalla.

Comprueba lo que entendiste con la pregunta de abajo.
