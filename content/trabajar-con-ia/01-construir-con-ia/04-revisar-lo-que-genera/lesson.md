---
title: "Revisar lo que genera la IA"
---

# Revisar lo que genera la IA

Que el código "parezca" bien no significa que lo esté. Antes de aceptar un cambio, haz cuatro comprobaciones.

**1. ¿Entiendo qué hizo?** Si no, pregúntale: "Explícame este código línea por línea, como si no supiera
programar". No aceptes lo que no puedes explicar con tus palabras.

**2. ¿Qué archivos cambió?** Mira la lista de cambios (en VS Code, el panel de control de código fuente, o
`git status`). Si tocó archivos que no pediste, pregunta por qué.

**3. ¿Funciona?** Pruébalo tú, no solo la IA. Prueba el caso normal y también los raros: un campo vacío, un
texto larguísimo, un usuario que no existe.

**4. ¿Toca algo sensible?** Presta atención especial si el cambio involucra inicio de sesión, pagos, claves o
datos de usuarios. Ahí un error cuesta caro.

Una señal de alerta frecuente: código que **desactiva** una protección para que el error desaparezca (por
ejemplo, permitir acceso a todos "para probar"). Si la IA propone eso, pregunta qué riesgo introduce y cómo
hacerlo bien.

También puedes usar la IA como segunda opinión: "Revisa este cambio buscando errores y problemas de
seguridad". No reemplaza tu revisión, pero suma una mirada más.

Comprueba lo que entendiste con la pregunta de abajo.
