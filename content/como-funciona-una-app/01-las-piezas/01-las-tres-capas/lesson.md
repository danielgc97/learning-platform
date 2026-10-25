---
title: "Las tres capas de una app"
---

# Las tres capas de una app

Casi toda aplicación web se puede entender como un restaurante con tres zonas:

| Capa | En el restaurante | En una app |
|------|-------------------|------------|
| **Frontend** | El comedor: lo que ve el cliente | Las pantallas, botones y formularios que ves en el navegador |
| **Backend** | La cocina: donde se decide y se prepara todo | El programa que vive en un servidor y aplica las reglas |
| **Base de datos** | La despensa: donde se guarda lo que importa | El lugar donde quedan guardados los datos |

El cliente nunca entra a la cocina ni a la despensa. Pide algo en el comedor, la cocina lo prepara con
lo que hay en la despensa y el plato vuelve a la mesa.

¿Por qué separar las capas? Por seguridad y orden. Si la contraseña de tu base de datos estuviera en la
pantalla, cualquiera podría verla. Por eso las reglas importantes (quién puede ver qué, cuánto cuesta
algo) viven en el backend, no en el navegador.

Para construir tu producto necesitas las tres capas, y la buena noticia es que cada una tiene un
trabajo pequeño y claro. En este curso las conocerás una por una.

Comprueba lo que entendiste con la pregunta de abajo.
