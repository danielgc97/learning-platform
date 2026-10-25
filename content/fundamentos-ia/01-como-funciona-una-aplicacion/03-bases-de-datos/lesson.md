---
title: "Bases de datos: dónde viven los datos"
---

# Bases de datos: dónde viven los datos

Un programa que solo guarda información en su memoria **la pierde al cerrarse**. Una **base de datos** guarda los
datos de forma **permanente y ordenada**, para consultarlos después.

## Tablas, filas y columnas

En una base de datos **relacional**, la información se organiza en tablas, parecidas a una hoja de cálculo:
cada **fila** es un registro y cada **columna** es un dato.

Algunas tablas de esta plataforma:

- `courses`: los cursos.
- `lessons`: las lecciones, cada una apuntando al módulo al que pertenece.
- `progress`: qué ejercicios completó cada usuario.

Las tablas se **relacionan entre sí** mediante identificadores. Así, una fila de `progress` sabe a qué usuario y a
qué ejercicio se refiere sin copiar toda la información.

## SQL

**SQL** es el lenguaje para consultar y modificar esos datos. Es justo lo que practicarás en el curso de SQL.

## Quién habla con la base

El frontend **no** se conecta directo a la base de datos. Le pide los datos al backend, que decide qué se puede
leer o escribir y para quién.

Comprueba lo que entendiste con la pregunta de abajo.
