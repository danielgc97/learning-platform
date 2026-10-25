---
title: "Dar contexto: el prompt que sí funciona"
---

# Dar contexto: el prompt que sí funciona

Un **prompt** es la instrucción que le escribes a la IA. La calidad de lo que recibes depende casi por
completo de lo que le cuentas. Un buen prompt tiene cuatro partes:

1. **Objetivo**: qué quieres lograr, en una frase.
2. **Contexto**: tu stack, tus archivos y lo que ya existe.
3. **Restricciones**: lo que no debe hacer o tocar.
4. **Resultado esperado**: cómo sabrás que quedó bien.

Compara estos dos pedidos:

| Prompt débil | Prompt con contexto |
|--------------|---------------------|
| "Haz el login" | "Estoy construyendo una app de tareas con React y FastAPI. Quiero un formulario de inicio de sesión en React que use Supabase Auth. No cambies el archivo `main.py`. Debe mostrar un mensaje si la contraseña es incorrecta." |

Con el segundo, la IA no tiene que adivinar tu tecnología ni sorprenderte tocando archivos que no pedías.

Muchas herramientas de IA para programar permiten un archivo de **instrucciones del proyecto** que leen al
empezar (por ejemplo, Claude Code lee uno llamado `CLAUDE.md`). Ahí puedes escribir una vez tu stack y tus
reglas ("todo en español", "no agregues paquetes sin avisarme") y no repetirlas.

Un último truco: si no sabes qué pedir, pídele a la IA que te haga preguntas antes de empezar. Suele detectar
huecos que tú no habías visto.

Comprueba lo que entendiste con la pregunta de abajo.
