---
title: "Variables de entorno y secretos"
---

# Variables de entorno y secretos

Tu app necesitará datos que no deben estar escritos en el código: la clave de tu base de datos, la
contraseña de un servicio, la dirección de tu API. Se guardan como **variables de entorno**: valores que
viven fuera del código y que cambian según dónde corra la app (tu computadora o internet).

En desarrollo se guardan en un archivo llamado `.env`:

```
SUPABASE_URL=https://abc123.supabase.co
SUPABASE_KEY=una-clave-secreta
```

Reglas que debes seguir desde el primer día:

- **`.env` va en `.gitignore`.** Nunca se sube al repositorio.
- Crea un **`.env.example`** con los mismos nombres pero valores falsos. Este sí se sube y le dice a otros qué variables necesita el proyecto.
- En el frontend, lo que pongas en variables que se envían al navegador (en Vite, las que empiezan con `VITE_`) **lo puede ver cualquiera**. Ahí nunca van secretos.

En Python se leen así:

```python
import os

clave = os.environ["SUPABASE_KEY"]
```

## Si ya subiste un secreto por error

Borrar el archivo del repositorio no basta, porque la clave queda en el historial. Lo correcto es **cambiar la
clave** en el servicio que la emitió, de inmediato.

Comprueba lo que entendiste con la pregunta de abajo.
