---
title: "SELECT: pídele datos a una tabla"
---

# SELECT: pídele datos a una tabla

Tu base de datos guarda la información en tablas. **SQL** es el lenguaje con el que le haces preguntas. En
los ejercicios de este curso trabajarás con una tabla `ventas`:

| id | producto | categoria | cantidad | precio |
|----|----------|-----------|----------|--------|
| 1 | Laptop | Cómputo | 2 | 3200 |
| 2 | Mouse | Accesorios | 10 | 45.5 |
| 3 | Teclado | Accesorios | 5 | 120 |
| 4 | Monitor | Cómputo | 3 | 850 |
| 5 | Cable HDMI | Accesorios | 8 | 15 |
| 6 | Silla | Muebles | 1 | 400 |

La consulta más básica tiene dos partes: **qué columnas** quieres (`SELECT`) y **de qué tabla** (`FROM`).

```sql
SELECT producto, precio
FROM ventas;
```

- Para pedir todas las columnas, usa `*`: `SELECT * FROM ventas;`
- Con `AS` le pones otro nombre a una columna en el resultado: `SELECT precio AS valor FROM ventas;`
- Puedes hacer cuentas: `SELECT producto, cantidad * precio AS total FROM ventas;`

Cada consulta termina con punto y coma. Las mayúsculas no importan, pero escribir las palabras de SQL en
mayúscula ayuda a leerlas.

En los ejercicios, **Ejecutar** te muestra el resultado y **Verificar** comprueba si es el que se pedía.

Ahora te toca a ti: resuelve el ejercicio de abajo.
