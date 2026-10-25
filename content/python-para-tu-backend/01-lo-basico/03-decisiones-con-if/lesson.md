---
title: "Decisiones con if, elif y else"
---

# Decisiones con if, elif y else

Tu producto tomará decisiones constantemente: ¿hay stock?, ¿el usuario tiene permiso?, ¿el pago llegó? En
Python se escriben con `if`.

```python
def estado_envio(total):
    if total >= 100:
        return "gratis"
    elif total >= 50:
        return "reducido"
    else:
        return "normal"
```

- `if` ejecuta su bloque si la condición es verdadera.
- `elif` ("si no, y además...") prueba otra condición, solo si las anteriores fallaron.
- `else` es lo que pasa si ninguna se cumplió.

Python revisa las condiciones **de arriba hacia abajo** y se queda con la primera que sea verdadera. Por eso
el orden importa.

Para comparar:

| Operador | Significa |
|----------|-----------|
| `==` | igual a |
| `!=` | distinto de |
| `>` `<` `>=` `<=` | mayor, menor, mayor o igual, menor o igual |

Y para combinar condiciones: `and` (ambas), `or` (alguna) y `not` (lo contrario). Por ejemplo:
`if stock > 0 and activo:`.

Como en las funciones, lo que pertenece a cada bloque va **indentado**. Un error de indentación es de las
cosas más frecuentes al empezar; el mensaje suele decir `IndentationError`.

Ahora te toca a ti: resuelve el ejercicio de abajo.
