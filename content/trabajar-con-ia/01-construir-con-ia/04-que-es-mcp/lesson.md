---
title: "Qué es MCP"
---

# Qué es MCP

**MCP** (*Model Context Protocol*) es un **estándar abierto** que define cómo una aplicación de IA se conecta
con herramientas y fuentes de datos externas: archivos, bases de datos, o servicios como GitHub.

Una buena analogía es el **USB-C**: un solo tipo de conexión para muchos dispositivos distintos. Antes de MCP,
cada integración había que hacerla a medida.

## Cómo funciona

- Un **servidor MCP** expone capacidades: herramientas que se pueden ejecutar y datos que se pueden leer.
- Un **cliente** (tu asistente o aplicación de IA) las descubre y las usa cuando las necesita.

Así, un asistente puede, por ejemplo, consultar tu base de datos o leer un archivo de tu proyecto sin que
nadie programe esa conexión específica.

## Lo que debes tener presente

Un servidor MCP puede **actuar en tu nombre**. Conecta solo los que sean de confianza y dales el **mínimo
acceso** necesario.

Verás de nuevo la idea de "herramientas" en el curso de agentes, donde se vuelve práctica.

Responde la pregunta de abajo.
