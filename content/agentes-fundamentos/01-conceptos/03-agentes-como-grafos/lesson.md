---
title: "Agentes como grafos con LangGraph"
---

# Agentes como grafos con LangGraph

**LangGraph** es una librería de Python para construir agentes como un **grafo**: un conjunto de pasos
conectados entre sí.

- Un **nodo** es un paso: una función que recibe el estado y lo actualiza.
- Una **arista** conecta un nodo con el siguiente; puede ser fija o decidirse según el estado.
- El **estado** es la información compartida que viaja por el grafo: mensajes, resultados de herramientas, etc.

Pensar el agente como un grafo hace explícito su recorrido: dónde empieza, qué decisiones toma y cuándo termina.

En los siguientes cursos construirás tus propios grafos. Por ahora, comprueba el concepto con la pregunta de abajo.
