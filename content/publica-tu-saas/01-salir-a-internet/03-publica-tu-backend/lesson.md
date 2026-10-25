---
title: "Publica tu backend en Render"
---

# Publica tu backend en Render

**Render** puede ejecutar tu backend en un servidor y actualizarlo cada vez que subes cambios a GitHub.

## Práctica

1. Crea una cuenta en render.com y conéctala con tu GitHub.
2. Pulsa **New → Web Service** y elige el repositorio `tareas-api`.
3. Configura:

| Campo | Valor |
|-------|-------|
| Language | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Instance type | Free |

4. En **Environment Variables** agrega `SUPABASE_URL` y `SUPABASE_KEY` (tu clave secreta) con los mismos valores
que tu `.env`. Aquí sí se escriben en el panel, nunca en el código. Añade también `CORS_ORIGINS` con
`http://localhost:5173` por ahora.
5. Pulsa **Create Web Service** y espera a que termine. Los mensajes del proceso aparecen en **Logs**.
6. Abre `https://tu-servicio.onrender.com/docs`. Si ves la documentación de tu API, ya está en internet.

El comando de inicio es el que ya conoces, pero ahora lo ejecuta el servidor: `main:app` significa "el objeto
`app` del archivo `main.py`", y `$PORT` es el puerto que Render te asigna.

## Una advertencia del plan gratuito

Render apaga el servicio gratuito tras **15 minutos sin visitas**. La siguiente petición lo despierta, y tarda
**cerca de un minuto**. Sirve para validar tu idea, pero para usuarios reales conviene un plan de pago.

## Con tu IA

Si el despliegue falla, copia el final de los **Logs** completo y pregunta: "Mi FastAPI falla al desplegar en
Render con este error, ¿cuál es la causa?".

Comprueba lo que entendiste con la pregunta de abajo.
