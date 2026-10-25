---
title: "Módulos y JSON: el idioma de las APIs"
---

# Módulos y JSON: el idioma de las APIs

Python trae muchas herramientas listas, organizadas en **módulos**. Para usar una, la **importas**:

```python
import json
```

Cuando instales paquetes (como FastAPI), los importarás igual: `from fastapi import FastAPI`.

El módulo `json` convierte entre los dos mundos que ya conoces:

- **Diccionario de Python → texto JSON**, con `json.dumps(...)`.
- **Texto JSON → diccionario de Python**, con `json.loads(...)`.

```python
import json

tarea = {"id": 7, "titulo": "Comprar pan", "hecha": False}

texto = json.dumps(tarea)
# '{"id": 7, "titulo": "Comprar pan", "hecha": false}'

de_vuelta = json.loads(texto)
# {'id': 7, 'titulo': 'Comprar pan', 'hecha': False}
```

Los datos que viajan por una API son **texto** en formato JSON, no diccionarios. Por eso hay que convertir
al enviar y al recibir. FastAPI lo hará por ti, pero conviene saber qué ocurre.

Fíjate en una diferencia: en JSON los valores lógicos se escriben en minúscula (`true`, `false`, `null`),
mientras que en Python son `True`, `False` y `None`. La conversión de `json` los traduce sola.

Ahora te toca a ti: resuelve el ejercicio de abajo.
