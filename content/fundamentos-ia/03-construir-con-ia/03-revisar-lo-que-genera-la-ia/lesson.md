---
title: "Revisar lo que genera la IA, sin confiar a ciegas"
---

# Revisar lo que genera la IA, sin confiar a ciegas

La IA puede escribir código que **se ve bien y no funciona**, o que **funciona y es inseguro**.
Por eso conviene tener hábitos de revisión.

## Hábitos que ayudan

- **Pídele que explique** qué hizo y por qué. Si no lo entiendes, sigue preguntando hasta entenderlo.
- **Mira los cambios antes de guardarlos.** En Git, un *diff* muestra qué líneas se agregaron y cuáles se quitaron.
- **Pruébalo tú mismo**, con casos normales y con casos raros (campos vacíos, textos largos, datos inesperados).
- **Usa pruebas automáticas** cuando existan: te avisan si algo que funcionaba dejó de funcionar.
- **Haz commits pequeños** para poder volver atrás si un cambio sale mal.
- **Desconfía de dependencias nuevas** que no pediste: cada librería extra es más código que no revisaste.

## La regla

No publiques algo "porque funciona". Publícalo porque **entiendes qué hace** y lo **probaste**.

Comprueba lo que entendiste con la pregunta de abajo.
