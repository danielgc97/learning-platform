---
title: "De tu computadora a internet: qué cambia"
---

# De tu computadora a internet: qué cambia

Hasta ahora todo vivía en tu computadora (*local*). **Publicar** es poner cada pieza en un servidor que está
encendido siempre y es accesible para cualquiera. Al lugar donde corre la versión real se le llama
**producción**.

Tu producto tiene tres piezas y cada una vive en un sitio:

| Pieza | Dónde queda | Estado |
|-------|-------------|--------|
| Base de datos y usuarios | **Supabase** | Ya está en la nube |
| Backend (FastAPI) | **Render** | Lo publicarás ahora |
| Frontend (React) | **Vercel** | Lo publicarás ahora |

Estos servicios, y no otros, son el ejemplo con el que trabaja esta ruta (son los que usa esta misma
plataforma). Existen alternativas con pasos parecidos.

Qué cambia al pasar a producción:

- **Las direcciones.** `localhost:5173` y `127.0.0.1:8000` dejan de existir: cada pieza tendrá una dirección pública (`https://...`).
- **Las variables de entorno.** Tu archivo `.env` no se sube. Los valores se configuran en el panel de cada servicio.
- **Las reglas de acceso.** Con CORS y los redireccionamientos de inicio de sesión, debes declarar las nuevas direcciones.
- **Los errores.** Ya no los verás en tu terminal. Los leerás en los registros (*logs*) de cada servicio.

## El orden importa

1. Primero el **backend**, para conocer su dirección pública.
2. Luego el **frontend**, que necesita esa dirección.
3. Al final, **conectar** las piezas entre sí (CORS e inicio de sesión).

Comprueba lo que entendiste con la pregunta de abajo.
