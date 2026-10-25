---
title: "Revisión antes de abrir"
---

# Revisión antes de abrir

Antes de compartir tu enlace, haz esta revisión. Cada punto evita un problema que ocurre con frecuencia.

| Área | Comprueba |
|------|-----------|
| **Secretos** | La clave secreta existe solo en el backend; no hay `.env` ni claves en GitHub |
| **Datos** | RLS está activado en todas tus tablas, y cada consulta del backend filtra por `user_id` |
| **Acceso** | Las rutas protegidas devuelven `401` sin sesión |
| **CORS** | `CORS_ORIGINS` lista solo tus direcciones reales, sin `*` |
| **Errores** | Los mensajes no muestran detalles internos (rutas, claves, consultas) |
| **Correos** | La confirmación y la recuperación de contraseña llevan a tu dirección pública |
| **Costos** | Revisa límites y planes de cada servicio, y pon un tope a cualquier gasto variable (como una API de IA) |

## La prueba que más importa

Crea **dos cuentas** distintas. Con la primera, registra datos. Entra con la segunda y comprueba que **no ve
nada de la primera**. Si lo ve, no abras al público.

## Lo legal y lo humano

- Publica una **política de privacidad** y **términos de uso**, sobre todo si guardas datos personales. Consulta a un abogado de tu país para redactarlos.
- Si cobras, consulta a un contador por los comprobantes que debes emitir.
- Deja a la vista **cómo contactarte** cuando alguien tenga un problema.

## Después de abrir

Mira los *logs* los primeros días y pide opinión a unas pocas personas antes de promocionar el producto.
Publicar no es el final: es el comienzo de aprender de tus usuarios.

Comprueba lo que entendiste con la pregunta de abajo.
