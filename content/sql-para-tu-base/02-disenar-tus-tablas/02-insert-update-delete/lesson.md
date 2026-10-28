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

Cada vez que pulsas **Ejecutar**, la tabla vuelve a su estado inicial. Así puedes repetir un `INSERT` o
probar cosas por curiosidad sin que los cambios se acumulen. En una base de datos real no es así: ahí cada
cambio queda, y por eso el `WHERE` importa tanto.

Ahora te toca a ti: resuelve los dos ejercicios de abajo.
