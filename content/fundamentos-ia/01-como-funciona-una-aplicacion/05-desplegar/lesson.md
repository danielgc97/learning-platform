---
title: "De tu PC a internet: qué es desplegar"
---

# De tu PC a internet: qué es desplegar

Mientras desarrollas, tu aplicación corre **en tu computador**, en una dirección como `localhost`. Solo tú
puedes verla. Eso se llama entorno **local**.

**Desplegar** es publicar la aplicación en un servidor de internet, en el entorno de **producción**, para que
otras personas puedan usarla.

## Las piezas de un despliegue

Una aplicación como esta suele repartirse en servicios especializados:

- El **frontend** en un servicio de alojamiento de páginas (por ejemplo, Vercel).
- El **backend** en un servidor que lo mantenga corriendo (por ejemplo, Railway).
- La **base de datos** en un servicio gestionado (por ejemplo, Supabase).

## Qué cambia al pasar a producción

- Las direcciones dejan de ser `localhost` y pasan a ser URLs reales.
- Las **claves y variables de entorno** se cargan en el panel de cada servicio, nunca dentro del código ni de GitHub.
- El backend debe **permitir** explícitamente el origen del frontend publicado (la configuración llamada CORS).
- Los enlaces de los correos (como la confirmación de cuenta) deben apuntar a la dirección real.

Muchos servicios **redespliegan solos** cada vez que subes cambios a GitHub.

Comprueba lo que entendiste con la pregunta de abajo.
