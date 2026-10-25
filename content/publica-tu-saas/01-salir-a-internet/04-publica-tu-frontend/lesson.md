---
title: "Publica tu frontend en Vercel"
---

# Publica tu frontend en Vercel

**Vercel** publica proyectos de frontend y reconoce automáticamente los de Vite.

## Práctica

1. Crea una cuenta en vercel.com con tu GitHub.
2. Pulsa **Add New → Project** e importa el repositorio `tareas-web`. Vercel detecta que es un proyecto Vite y propone el comando de construcción (`npm run build`) por sí solo.
3. Antes de desplegar, abre **Environment Variables** y agrega las tres variables de tu `.env.local`, ajustando la primera:

| Variable | Valor |
|----------|-------|
| `VITE_API_URL` | La dirección pública de tu backend en Render, sin `/` al final |
| `VITE_SUPABASE_URL` | La URL de tu proyecto en Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | La clave **pública** de Supabase |

4. Pulsa **Deploy**. Al terminar, Vercel te da una dirección como `https://tareas-web.vercel.app`.

Revisa dos cosas: que **no pusiste la clave secreta** (aquí solo van valores públicos, porque `VITE_` los
expone) y que la página abre.

## Un detalle de Vite

Las variables `VITE_` se **incorporan al código en el momento de construirlo**. Si cambias una en el panel,
debes volver a desplegar para que el cambio surta efecto.

Es normal que, por ahora, la app muestre un error al cargar los datos: falta la última pieza, que es
autorizar esta dirección en el backend. Es la siguiente lección.

Cada vez que hagas `git push`, Vercel (y Render) publican la nueva versión solos.

Comprueba lo que entendiste con la pregunta de abajo.
