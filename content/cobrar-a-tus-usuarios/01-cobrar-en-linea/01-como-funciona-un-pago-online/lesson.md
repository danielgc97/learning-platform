---
title: "Cómo funciona un pago online"
---

# Cómo funciona un pago online

Este curso es **opcional**: puedes publicar tu producto gratis, validar que a la gente le sirve y volver aquí
cuando quieras cobrar. Aquí aprenderás las ideas, que son las mismas con cualquier proveedor.

Cobrar con tarjeta involucra cuatro participantes:

| Quién | Qué hace |
|-------|----------|
| **Tu cliente** | Quiere pagar |
| **Tu app** | Decide qué se vende y a qué precio |
| **La pasarela de pago** | Procesa el cobro (existen varias: Stripe, Mercado Pago, Culqi, entre otras) |
| **El banco** | Aprueba o rechaza |

La regla más importante: **tú nunca manejas los datos de la tarjeta**. Guardarlos exige cumplir normas
estrictas de seguridad. Por eso la pasarela ofrece una **página de pago alojada** (o campos seguros que ella
controla), y tu app solo recibe el resultado.

El flujo típico:

1. El cliente pulsa "Pagar" en tu app.
2. Tu **backend** le pide a la pasarela que cree un cobro (qué producto, cuánto, para qué usuario) y recibe una dirección de pago.
3. Llevas al cliente a esa página, donde ingresa su tarjeta.
4. Al terminar, la pasarela lo devuelve a tu app.

Un detalle que parece menor y no lo es: **que el cliente vuelva a tu página no prueba que pagó.** Cualquiera
puede escribir esa dirección a mano. En la siguiente lección verás cómo se confirma de verdad.

Para elegir pasarela, compara según tu país: comisiones, métodos de pago (tarjeta, billeteras locales), plazo
en que te depositan el dinero y calidad de su documentación. Pregunta también a un contador por los
comprobantes que debes emitir.

Comprueba lo que entendiste con la pregunta de abajo.
