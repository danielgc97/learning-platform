---
title: "Seguridad: lo que nunca le das a la IA"
---

# Seguridad: lo que nunca le das a la IA

Las herramientas de IA envían lo que escribes a servidores externos. Por eso hay cosas que no debes pegar en
un chat ni dejar a su alcance.

**Nunca compartas:**

- Claves de API, contraseñas y el contenido de tu archivo `.env`.
- Datos reales de tus usuarios (correos, teléfonos, pagos). Para probar, usa datos inventados.

Si necesitas mostrar una configuración, sustituye los valores por `XXXX`.

**Desconfía de paquetes desconocidos.** A veces la IA recomienda instalar un paquete que **no existe** o que
suena parecido a uno famoso. Antes de ejecutar `pip install` o `npm install` con un nombre que no conoces:

1. Busca el paquete en pypi.org o npmjs.com.
2. Comprueba que tenga muchas descargas, un repositorio visible y actividad reciente.
3. Si tiene un nombre casi igual al de uno conocido, sospecha.

**Revisa con más cuidado el código de login, pagos y permisos.** Un error de diseño allí no se nota hasta
que alguien lo aprovecha.

**Usa `.gitignore` desde el principio**, como viste en la lección de GitHub, para que tus secretos no se
suban por accidente.

Comprueba lo que entendiste con la pregunta de abajo.
