---
title: "Registro e inicio de sesión en React"
---

# Registro e inicio de sesión en React

Con **Supabase Auth** no programas el manejo de contraseñas: llamas a funciones que ya existen.

## Práctica

1. En el panel de Supabase copia la **URL** del proyecto y la **clave pública** (*publishable key*). Esta sí puede ir en el navegador. <!-- REVISAR: ubicación exacta en el panel -->
2. En `tareas-web`, agrégalas a `.env.local`:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-clave-publica
```

3. Instala el paquete: `npm install @supabase/supabase-js`, y crea `src/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)
```

4. Las tres llamadas que necesitas:

```js
await supabase.auth.signUp({ email, password })              // registrarse
await supabase.auth.signInWithPassword({ email, password })  // entrar
await supabase.auth.signOut()                                // salir
```

Cada una devuelve `{ data, error }`: si `error` tiene algo, muéstraselo al usuario.

5. Para saber si hay alguien con sesión, escucha los cambios:

```jsx
const [sesion, setSesion] = useState(null)

useEffect(() => {
  const { data } = supabase.auth.onAuthStateChange((evento, sesionNueva) => {
    setSesion(sesionNueva)
  })
  return () => data.subscription.unsubscribe()
}, [])
```

Si `sesion` es `null`, muestra el formulario de ingreso; si no, la app. Por defecto, Supabase envía un
**correo de confirmación** al registrarse.

## Con tu IA

"Crea un componente `Login` con campos de correo y contraseña y dos botones, Entrar y Registrarme, que use
`supabase.auth`. Muestra los errores en pantalla."

Comprueba lo que entendiste con la pregunta de abajo.
