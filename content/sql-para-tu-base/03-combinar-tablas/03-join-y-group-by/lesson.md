---
title: "JOIN + GROUP BY: tu primer reporte"
---

# JOIN + GROUP BY: tu primer reporte

Las preguntas de negocio suelen necesitar las dos herramientas que ya conoces: **unir** tablas para tener
los datos juntos y **agrupar** para resumirlos. Por ejemplo: "¿cuánto ha gastado cada cliente?".

```sql
SELECT c.nombre,
       COUNT(*) AS pedidos,
       SUM(p.total) AS gastado
FROM pedidos p
JOIN clientes c ON c.id = p.cliente_id
GROUP BY c.nombre
ORDER BY gastado DESC;
```

Cómo pensarlo, en este orden:

1. **Qué quiero ver en cada fila:** un cliente. Eso es lo que va en `GROUP BY`.
2. **Qué datos necesito:** el nombre (de `clientes`) y los totales (de `pedidos`). Por eso hace falta el `JOIN`.
3. **Qué resumo:** cuántos pedidos (`COUNT`) y cuánto dinero (`SUM`).
4. **Cómo lo ordeno:** de mayor a menor gasto.

Un detalle: agrupar por nombre junta a dos clientes distintos que se llamen igual. En un producto real,
conviene agrupar por `c.id` (y mostrar también el nombre) para no mezclarlos.

Con esta combinación puedes responder casi cualquier pregunta de un panel de control: ventas por mes,
productos más vendidos, clientes más frecuentes.

Ahora te toca a ti: resuelve el ejercicio de abajo.
