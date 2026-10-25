---
title: "Tu stack: qué usarás y dónde vive"
---

# Tu stack: qué usarás y dónde vive

Al conjunto de tecnologías de un producto se le llama **stack**. Este es el que usarás en esta ruta:

| Capa | Tecnología | Para qué |
|------|------------|----------|
| Frontend | **React** (con Vite) | Construir las pantallas |
| Backend | **FastAPI** (Python) | Crear tu API |
| Base de datos | **Supabase** (PostgreSQL) | Guardar datos y manejar el inicio de sesión |
| Publicación | **Vercel** y **Render** | Poner todo en internet |

Dos palabras que verás mucho:

- Una **librería** es una caja de herramientas: tú decides cuándo usar cada una. React se suele describir así.
- Un **framework** es un esqueleto con reglas: tú rellenas las partes y él se encarga del resto. FastAPI es un ejemplo.

No necesitas memorizar la diferencia; basta con que no te asusten los nombres.

Y una distinción importante: mientras construyes, tu app vive **solo en tu computadora**. Funciona en una
dirección como `localhost`, que nadie más puede abrir. **Publicar** (o desplegar) es copiarla a servidores
conectados a internet para que otras personas la usen. A eso le dedicaremos una fase entera.

Comprueba lo que entendiste con la pregunta de abajo.
