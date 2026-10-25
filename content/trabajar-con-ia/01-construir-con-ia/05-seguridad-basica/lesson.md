---
title: "Seguridad: lo que no se delega a ciegas"
---

# Seguridad: lo que no se delega a ciegas

Hay áreas donde un error cuesta caro. En ellas, usa la IA como apoyo, pero **revisa con más cuidado**.

## Las áreas delicadas

- **Inicio de sesión y contraseñas:** usa servicios probados (como un sistema de autenticación ya hecho). Nunca inventes tu propia criptografía.
- **Pagos:** un cobro se da por válido solo cuando **lo confirma la pasarela de pago**, no porque el navegador diga que pagó.
- **Secretos:** las claves de API **nunca** van dentro del código ni se suben a GitHub. Se guardan en variables de entorno (por ejemplo, en un archivo `.env` que Git ignora).
- **Datos personales:** piensa qué guardas, por qué, y quién puede verlo.

## Si se filtra una clave

Borrar el archivo **no basta**: el historial de Git conserva la clave. Lo correcto es **revocarla** y crear una nueva.

## Un buen hábito con la IA

En estas áreas, pídele primero que **explique el diseño y los riesgos** antes de escribir código, y luego revisa
lo que produzca con calma.

Comprueba lo que entendiste con la pregunta de abajo.
