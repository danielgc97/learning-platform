---
title: "Webhooks: confirmar que te pagaron"
---

# Webhooks: confirmar que te pagaron

Si volver a tu página no prueba el pago, ¿cómo te enteras de que de verdad llegó el dinero? La pasarela te lo
avisa con un **webhook**: cuando ocurre algo (un pago aprobado, una suscripción cancelada), ella envía un
`POST` a una dirección de **tu backend** con los detalles.

Un webhook es un endpoint más, que en lugar del navegador recibe llamadas de la pasarela.

Pero cualquiera podría enviar un `POST` falso a esa dirección diciendo "Ana pagó". Por eso se aplican reglas:

1. **Verifica la firma.** La pasarela firma cada mensaje con un secreto que solo ella y tú conocen. Tu backend recalcula la firma y rechaza lo que no coincida. Cada proveedor tiene su método exacto y una librería oficial para esto: úsala en vez de inventar el tuyo.
2. **Activa el acceso solo desde el webhook**, nunca desde la redirección del navegador.
3. **Prepárate para duplicados.** A veces el mismo aviso llega dos veces. Guarda el identificador del evento y, si ya lo procesaste, ignóralo.
4. **Responde rápido** con un código `200` y haz el trabajo pesado después. Si no respondes, la pasarela reintenta.

La idea de la firma, simplificada:

```python
import hashlib
import hmac

esperada = hmac.new(secreto.encode(), cuerpo_recibido, hashlib.sha256).hexdigest()
es_valida = hmac.compare_digest(esperada, firma_recibida)
```

Casi todas las pasarelas tienen un **modo de pruebas** con tarjetas falsas. Practica todo ahí antes de cobrar
dinero real.

Comprueba lo que entendiste con las preguntas de abajo.
