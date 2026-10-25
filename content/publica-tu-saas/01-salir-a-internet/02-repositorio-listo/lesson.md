---
title: "Deja tu repositorio listo"
---

# Deja tu repositorio listo

Render y Vercel leen tu código desde **GitHub**. Antes de publicar, revisa que cada proyecto esté en orden.

## Práctica: el backend (`tareas-api`)

1. Actualiza la lista de dependencias, con el entorno virtual activo:

```
pip freeze > requirements.txt
```

2. Indica la versión de Python que usa tu proyecto. Crea un archivo `.python-version` con una línea:

```
3.12
```

Sin él, el servicio puede usar una versión distinta a la que probaste. <!-- REVISAR: Render cambia la versión de Python por defecto con el tiempo; confirmar en su documentación -->

3. Crea `.env.example` con los nombres de las variables y valores falsos:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=pon-aqui-tu-clave-secreta
CORS_ORIGINS=http://localhost:5173
```

4. Confirma que `.env` está en `.gitignore`.

## Práctica: el frontend (`tareas-web`)

1. Crea `vercel.json` en la raíz. Hace que direcciones como `/acerca` funcionen aunque alguien las abra directamente:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

2. Comprueba que el proyecto compila sin errores: `npm run build`.

## Subir a GitHub

En cada proyecto: `git add .`, `git commit -m "Listo para publicar"` y `git push`, como en la caja de
herramientas. Verifica en github.com que **no aparece ningún archivo `.env`**.

Comprueba lo que entendiste con la pregunta de abajo.
