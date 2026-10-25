---
title: "Entornos virtuales y dependencias"
---

# Entornos virtuales y dependencias

Tu proyecto usará paquetes de otras personas (por ejemplo, FastAPI). A esos paquetes se les llama
**dependencias**. Para que las de un proyecto no se mezclen con las de otro, cada proyecto de Python tiene su
propio **entorno virtual**: una carpeta con su propia copia de Python y de sus paquetes.

## Práctica en Python

Dentro de tu carpeta de proyecto:

```
python -m venv venv
```

Esto crea la carpeta `venv`. Para **activarla**:

```
# Windows (PowerShell)
venv\Scripts\Activate.ps1

# Mac / Linux
source venv/bin/activate
```

Sabrás que está activa porque aparece `(venv)` al inicio de la línea. Ahora instala y guarda la lista:

```
pip install requests
pip freeze > requirements.txt
```

`pip` descarga el paquete y `requirements.txt` anota qué versiones usas. Quien reciba tu proyecto lo instala
todo con `pip install -r requirements.txt`.

Si PowerShell bloquea la activación con un mensaje sobre "ejecución de scripts", es una protección de Windows.
Una solución habitual es ejecutar una vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. <!-- REVISAR: confirmar el comando contra la documentación actual de Microsoft -->

## En el frontend

El equivalente en Node se llama **npm**. `npm install` lee el archivo `package.json` e instala lo que falta
en la carpeta `node_modules`. No necesitas activar nada.

Comprueba lo que entendiste con la pregunta de abajo.
