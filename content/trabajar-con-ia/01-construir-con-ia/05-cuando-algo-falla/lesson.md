---
title: "Cuando algo falla: leer el error"
---

# Cuando algo falla: leer el error

Los errores asustan, pero casi siempre dicen exactamente qué pasó. La clave es saber dónde mirar. En Python,
un error se ve así:

```
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    print(precio * cantidad)
NameError: name 'cantidad' is not defined
```

Se lee **de abajo hacia arriba**:

- **La última línea** dice el tipo de error y el motivo: `NameError: name 'cantidad' is not defined` (usaste una variable que no existe).
- **Las líneas de arriba** dicen dónde: archivo `main.py`, línea 5.

Los errores del navegador funcionan igual: se ven en la consola de las herramientas de desarrollo (tecla F12).

Cuando le pidas ayuda a la IA:

1. **Pega el error completo**, no un resumen.
2. Cuéntale **qué estabas intentando** y qué cambiaste justo antes.
3. Pídele primero **la causa**, y después la solución: "Explícame por qué pasa esto y luego propón un arreglo".

Si después de dos intentos la IA da vueltas en círculos, no insistas: vuelve al último commit bueno y
plantea el problema de nuevo, desde cero y con más contexto.

Comprueba lo que entendiste con la pregunta de abajo.
