---
title: "Prepara tu proyecto FastAPI"
---

# Prepara tu proyecto FastAPI

**FastAPI** es el framework de Python que convierte funciones en los endpoints de tu API. En este curso
construirás, paso a paso, la API de la app de tareas. Esta lección es práctica y se hace en tu computadora.

## Práctica

1. En la terminal, crea y abre la carpeta del proyecto:

```
mkdir tareas-api
cd tareas-api
code .
```

2. En la terminal de VS Code, crea y activa el entorno virtual (como aprendiste en la caja de herramientas):

```
python -m venv venv
```

3. Instala FastAPI con sus herramientas estándar (las comillas son importantes):

```
pip install "fastapi[standard]"
```

4. Crea un archivo `.gitignore` con estas líneas:

```
venv/
__pycache__/
.env
```

5. Guarda la lista de dependencias y tu primera versión:

```
pip freeze > requirements.txt
git init
git add .
git commit -m "Proyecto FastAPI inicial"
```

Comprueba que quedó instalado con `pip show fastapi`: debe mostrar un número de versión.

## Con tu IA

Crea un archivo de instrucciones del proyecto (por ejemplo, `CLAUDE.md`) con tu stack: "Backend con FastAPI y
Python; base de datos en Supabase; todo el código y los comentarios en español; no agregues dependencias sin
avisarme". La IA lo leerá cada vez que trabaje contigo.

Comprueba lo que entendiste con la pregunta de abajo.
