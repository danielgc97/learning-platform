---
title: "Dominio propio y HTTPS"
---

# Dominio propio y HTTPS

Una dirección como `tareas-web.vercel.app` sirve para pruebas. Un producto serio tiene su propio dominio
(`mitareas.com`). Este paso es opcional para empezar, pero genera confianza.

## Práctica

1. **Compra el dominio** en un registrador (la empresa que los vende). Compara precios de renovación, no solo el del primer año.
2. En Vercel, abre tu proyecto: **Settings → Domains → Add Domain** y escribe tu dominio.
3. Vercel te mostrará qué **registros DNS** crear. El DNS es la "agenda" que traduce un nombre a un servidor. Se crean en el panel de tu registrador:

| Si usas... | Registro | Valor |
|------------|----------|-------|
| Dominio raíz (`mitareas.com`) | Tipo **A** | El valor que muestra Vercel |
| Subdominio (`app.mitareas.com`) | Tipo **CNAME** | El valor que muestra Vercel |

4. Espera. Los cambios de DNS pueden tardar desde minutos hasta unas horas. Vercel te avisa cuando quede bien configurado. Si agregas el dominio raíz, te propondrá añadir también `www` y redirigir uno al otro.

Copia siempre los valores que muestra tu panel de Vercel, no los de otro tutorial.

## HTTPS

El candado del navegador (**HTTPS**) significa que la conexión va cifrada. Vercel emite y renueva el
certificado por ti cuando conectas el dominio. <!-- REVISAR: confirmar que la emisión del certificado es automática en el plan gratuito -->

## No olvides actualizar

Al cambiar de dirección, vuelve a actualizar: `CORS_ORIGINS` en Render y la **Site URL** y **Redirect URLs** en
Supabase, para que apunten a tu dominio nuevo.

Comprueba lo que entendiste con la pregunta de abajo.
