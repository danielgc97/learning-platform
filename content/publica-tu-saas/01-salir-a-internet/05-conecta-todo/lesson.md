---
title: "Conecta todo: CORS e inicio de sesión"
---

# Conecta todo: CORS e inicio de sesión

Las tres piezas ya están en internet, pero aún no se reconocen entre sí. Faltan dos ajustes.

## 1. CORS en el backend

En desarrollo tu backend aceptaba `http://localhost:5173`. Ahora debe aceptar la dirección de Vercel. En
`main.py`, lee la lista desde una variable de entorno:

```python
origenes = os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origenes,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Haz `git push`. Luego, en Render, cambia `CORS_ORIGINS` a la dirección de Vercel (sin `/` al final), por ejemplo
`https://tareas-web.vercel.app`. Puedes separar varias con comas.

**Importante:** tu backend lee las variables de entorno **al arrancar**. Si cambias una y el servicio no se
reinicia, seguirá usando el valor viejo y creerás que tu cambio no funcionó. Si eso pasa, fuerza el reinicio
desde **Manual Deploy → Deploy latest commit**.

## 2. Direcciones de inicio de sesión en Supabase

En el panel de Supabase, en la configuración de autenticación (**URL Configuration**), cambia la **Site URL** de
`localhost` a la dirección pública de tu frontend, y agrégala a **Redirect URLs**. Si la dejas en `localhost`,
los correos de confirmación y de recuperación de contraseña llevarán a una dirección que no existe.

## Prueba completa

Abre tu dirección pública y recorre el camino de un usuario nuevo: registrarte, confirmar el correo, iniciar
sesión, crear una tarea, recargar y cerrar sesión.

## Cuando algo falla

1. Abre la consola del navegador (**F12**): errores de CORS o de red.
2. Revisa los **Logs** de Render: errores del backend.
3. Revisa los registros del despliegue en Vercel: errores al construir.

Pega el error completo a tu IA, indicando de cuál de los tres lugares viene.

Comprueba lo que entendiste con la pregunta de abajo.
