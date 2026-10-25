---
title: "INSERT, UPDATE y DELETE: cambiar datos"
---

# INSERT, UPDATE y DELETE: cambiar datos

Tu producto no solo lee datos: también los crea, los corrige y los borra. Son tres instrucciones.

**Agregar una fila** con `INSERT`:

```sql
INSERT INTO inventario (producto, stock)
VALUES ('Cable', 30);
```

**Cambiar filas existentes** con `UPDATE`:

```sql
UPDATE inventario
SET stock = 12
WHERE producto = 'Mouse';
```

**Borrar filas** con `DELETE`:

```sql
DELETE FROM inventario
WHERE producto = 'Silla';
```

## El peligro del WHERE

En `UPDATE` y `DELETE`, el `WHERE` decide **cuáles filas** se afectan. Si lo olvidas, la instrucción se
aplica a **todas**: `DELETE FROM inventario;` vacía la tabla entera. Revisa siempre el `WHERE` antes de
ejecutar, sobre todo en código que te escribió la IA.

## Una nota sobre los ejercicios

Los cambios se quedan guardados mientras la página esté abierta. Si ejecutas un `INSERT` dos veces, la fila
queda duplicada. Por eso el ejercicio de esta lección usa `UPDATE` y `DELETE` con valores fijos, que dan
el mismo resultado aunque los ejecutes varias veces. Si algo se descuadra, recarga la página.

Ahora te toca a ti: resuelve el ejercicio de abajo.
