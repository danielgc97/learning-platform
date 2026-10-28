---
title: "Claves y secretos: qué va en el navegador"
---

# Claves y secretos: qué va en el navegador

Supabase te da dos tipos de clave. Confundirlas es uno de los errores más peligrosos al construir con IA.

| Clave | Aspecto | Dónde puede vivir |
|-------|---------|--------------------|
| **Pública** (*publishable*) | `sb_publishable_...` | En el navegador y en el código del frontend |
| **Secreta** (*secret*) | `sb_secret_...` | **Solo** en tu backend |

La clave pública tiene pocos poderes y queda limitada por las reglas de RLS. La **secreta** se salta esas
reglas: quien la tenga puede leer y borrar toda tu base.

(Los proyectos más antiguos usan los nombres `anon` y `service_role`, que equivalen a la pública y a la secreta.)

## Revisión rápida

Antes de cada publicación, comprueba:

- La clave secreta aparece **solo** en el `.env` del backend, que está en `.gitignore`.
- Ninguna variable del frontend que empiece con `VITE_` contiene la clave secreta, porque todo lo que empieza así **se incluye en el navegador**.
- Nunca pegaste una clave en un chat con la IA ni en un mensaje de commit.
- Buscaste en tu código por si quedó alguna escrita a mano (por ejemplo, con el buscador de VS Code).

Si alguna vez una clave secreta se expone, **genérala de nuevo** en Supabase de inmediato y actualiza tu
`.env`. Cambiarla es lo único que lo arregla.

Comprueba lo que entendiste con la pregunta de abajo.
