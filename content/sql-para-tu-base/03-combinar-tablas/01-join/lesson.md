---
title: "JOIN: unir tablas"
---

# JOIN: unir tablas

Separar los datos en tablas evita repetirlos, pero a la hora de mostrarlos quieres verlos juntos: el nombre
del cliente al lado de cada pedido. Eso hace `JOIN`.

Con estas dos tablas:

**clientes**

| id | nombre |
|----|--------|
| 1 | Ana |
| 2 | Luis |

**pedidos**

| id | cliente_id | total |
|----|------------|-------|
| 1 | 1 | 120 |
| 2 | 2 | 200 |

```sql
SELECT c.nombre, p.total
FROM pedidos p
JOIN clientes c ON c.id = p.cliente_id;
```

Cómo se lee:

- `FROM pedidos p` parte de la tabla pedidos y le da el apodo corto `p`.
- `JOIN clientes c` suma la tabla clientes con el apodo `c`.
- `ON c.id = p.cliente_id` dice **cómo se emparejan**: cada pedido con el cliente cuyo `id` coincide con su `cliente_id`.

Los apodos evitan confusiones cuando dos tablas tienen una columna con el mismo nombre (aquí, `id`). Se
escribe `tabla.columna`.

El `JOIN` a secas solo muestra las filas que **tienen pareja** en ambas tablas: un cliente sin pedidos no
aparece. En la siguiente lección verás cómo incluirlos.

Ahora te toca a ti: resuelve el ejercicio de abajo.
