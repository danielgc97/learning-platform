---
title: "LEFT JOIN: incluir lo que no tiene pareja"
---

# LEFT JOIN: incluir lo que no tiene pareja

Una pregunta muy común en un negocio: **¿quiénes nunca compraron?** Con `JOIN` no puedes saberlo, porque
descarta a los clientes sin pedidos. Para eso existe `LEFT JOIN`.

`LEFT JOIN` conserva **todas las filas de la tabla de la izquierda** (la del `FROM`), tengan pareja o no.
Cuando no hay pareja, las columnas de la otra tabla quedan vacías (`NULL`).

```sql
SELECT c.nombre, p.total
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id;
```

Si Sofía no tiene pedidos, aparece una fila con su nombre y `total` vacío:

| nombre | total |
|--------|-------|
| Ana | 120 |
| Sofía | *(vacío)* |

Y para quedarte **solo con quienes no tienen pareja**, filtras por ese vacío con `IS NULL`:

```sql
SELECT c.nombre
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
WHERE p.id IS NULL;
```

Fíjate en el orden: la tabla que quieres conservar completa va en el `FROM`, a la izquierda.

Esta consulta responde preguntas como "¿qué productos no se han vendido?" o "¿qué usuarios nunca crearon
una tarea?".

Ahora te toca a ti: resuelve el ejercicio de abajo.
