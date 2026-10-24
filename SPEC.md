# SPEC — Plataforma de práctica SQL, Python y agentes con feedback de IA

> Versión 0.2 · 24-oct-2026 · Documento vivo: actualizarlo cuando cambie una decisión.
> Cada decisión técnica incluye su razón. Las marcadas **[CONFIRMAR]** están abiertas.

## 1. Producto

Plataforma web en español donde el usuario aprende y practica **SQL, Python y construcción de agentes**, más un curso de fundamentos para construir con IA, con ejercicios ejecutables en el navegador, quizzes y feedback de IA sobre su código. Acceso completo por suscripción. Nombre provisorio: **CodeVibeBooster** (pendiente verificar disponibilidad de nombre y dominio).

- **Usuario objetivo:** personas que aprenden datos/programación (alumnos actuales y anteriores como primeros usuarios).
- **Precio inicial:** S/20 al mes, acceso completo. Planes trimestral/anual: por definir.
- **Meta de validación:** ~100 suscriptores. Antes de eso, preventa de 15-20 pagos como señal.
- **Diferenciador:** contenido propio en español + práctica ejecutable + feedback que explica el error sin regalar la solución + un curso de fundamentos del software pensado para quien construye con IA (vibecoding): "lo mínimo indispensable".

## 2. Alcance del MVP

**Incluye**
1. Registro, login y recuperación de contraseña.
2. Catálogo: Curso → Módulo → Lección → Ejercicio.
3. Lecciones en Markdown, ejercicios ejecutables (SQL y Python) en el navegador y quizzes de opción múltiple.
4. Validación automática con casos de prueba + feedback de IA con pistas graduales.
5. Progreso por usuario.
6. Suscripción con pasarela de pago (ver §7) y control de acceso por plan.
7. Panel mínimo de administración: ver usuarios, suscripciones y costo de IA.

**No incluye (por ahora)**
Certificados, foros, app móvil, modelo local, panel para otros docentes, inteligencia de precios, gamificación, ejecución de llamadas reales a LLM dentro de los ejercicios, videos (se evaluarán si los alumnos los piden; bastaría una columna `video_url` y un servicio de video).

## 3. Decisiones técnicas

| Tema | Decisión | Razón |
|---|---|---|
| Backend | Python 3.12 + FastAPI | Un solo lenguaje que ya dominas; fácil de depurar y mantener solo. |
| Base de datos | Supabase (PostgreSQL + Auth). Migraciones en SQL puro en `supabase/migrations/`; el backend usa el cliente `supabase` de Python | Gratuita hasta 500MB, esquema versionado en Git, una sola dependencia. Se puede sumar SQLAlchemy después si el modelo se complica. |
| Frontend | React 19 + Vite (JavaScript) + React Router, Tailwind CSS 4 y editor Monaco | Stack estándar y escalable. Tailwind mantiene el diseño consistente (modo claro/oscuro con botón); Monaco da una experiencia de código como la de VS Code. |
| Ejecución de SQL | DuckDB-WASM (o sql.js) en el navegador | El código del usuario nunca corre en tu servidor: cero riesgo de seguridad y cero costo de cómputo. |
| Ejecución de Python | Pyodide (WebAssembly) en el navegador | Mismo motivo. Limitación: descarga inicial pesada y no todas las librerías disponibles; verificar pandas/numpy. |
| Validación | En el navegador (SQL: compara el resultado con el esperado; Python: pruebas con `assert`; quiz: opción correcta) | Se puede manipular, pero es una plataforma de aprendizaje: solo se engañaría el propio alumno. |
| IA de feedback | Claude Haiku 5.5 vía API, desde el backend | Barato y rápido para este uso (ver §6). La API key nunca llega al navegador. |
| Auth | Supabase Auth: el frontend inicia sesión y el backend valida el token en cada petición protegida. Nada de criptografía propia | Es una zona sensible: mejor no reinventarla. |
| Contenido | Archivos Markdown + YAML en `content/`, cargados a la BD con `backend/scripts/load_content.py` (manual, repetible) | Versionado con git y fácil de editar con Claude Code. |
| Despliegue | Frontend: Vercel. Backend: Railway. BD: Supabase. | Cero config, escalamiento automático, gratis en fase MVP. Sin necesidad de Docker inicialmente. |
| Idioma | UI y contenido en español; código, nombres de variables y commits en inglés **[CONFIRMAR]** | Cómodo para portafolio internacional. |

**Módulo de agentes (decisión del MVP):** como los ejercicios corren en el navegador y no deben exponer API keys, este módulo se limita a lecciones + ejercicios donde el alumno escribe el código del agente (herramientas, bucle, prompts) y se valida con **pruebas con un cliente LLM simulado (mock)** más revisión de la IA contra una rúbrica. Los proyectos con llamadas reales los ejecuta el alumno en su propio entorno.

**Estado del módulo de agentes:** arranca con lecciones conceptuales y quizzes (sin ejecutar código). Antes de crear ejercicios de código hay que **comprobar si LangGraph puede correr dentro de Pyodide** en el navegador; si no, se evalúa otra vía.

## 4. Modelo de datos (borrador)

- **Usuarios:** los gestiona Supabase Auth (`auth.users`); no hay tabla propia con contraseñas. Las demás tablas los referencian por su `id`.
- `courses`, `modules`, `lessons`, `exercises` (implementadas; el detalle de cada ejercicio vive en la columna `spec`)
- `submissions` (usuario, ejercicio, código, pasó/no pasó, fecha), `progress` (usuario, ejercicio, completado) y `feedback_events` (usuario, intento, modelo, tokens, costo, latencia): implementadas
- `plans`, `subscriptions` (estado, inicio, fin), `payments` (proveedor, referencia, monto, estado): pendientes, llegan en M3
- Seguridad: RLS activado en todas las tablas sin políticas; solo el backend accede con la clave de servicio.

**Formato de un ejercicio (YAML):**
```yaml
id: sql-joins-001
type: sql            # sql | python | agent | quiz
statement: "..."
starter_code: "..."
dataset: datasets/ventas.csv      # solo SQL
tests: "..."                      # resultado esperado o código de prueba
rubric: "..."                     # criterios para el feedback de IA
hints: ["...", "...", "..."]      # de menos a más reveladora
```

**Formato de un quiz (YAML):**
```yaml
id: agentes-concepto-001
type: quiz
statement: "..."
options: ["...", "...", "..."]
correct: 1             # posición de la opción correcta, empezando en 0
explanation: "..."     # se muestra al acertar
```

## 5. Flujo de práctica

1. El alumno escribe código y lo ejecuta en el navegador.
2. Se corren las pruebas automáticas (determinista, sin IA).
3. Si falla, el alumno pide feedback: el backend envía a la IA el enunciado, la rúbrica, el código y el resultado de las pruebas.
4. La IA explica el error y da una pista, **sin entregar la solución completa** (salvo petición explícita tras agotar las pistas).

**Por qué primero pruebas y luego IA:** la IA no decide si el código es correcto (puede equivocarse); solo explica. Además reduce costos.

**Quizzes:** el alumno elige una opción y verifica; al acertar ve la explicación. No usan IA (costo cero e instantáneo). Cada verificación se guarda como intento y, si acierta, se marca el progreso.

**Pistas graduales:** los ejercicios ya traen `hints` en su YAML, pero la interfaz todavía no las muestra de una en una (pendiente).

## 6. Control de costo de IA

- Modelo: `claude-haiku-5-5`. Referencia de precio al 22-oct-2026: $0.10 entrada / $0.50 salida por millón de tokens con prompts ≤100K. **Verificar antes de lanzar.**
- Esfuerzo de razonamiento en nivel **bajo** (los tokens de razonamiento cuentan como salida).
- Límite diario por usuario (implementado: 30 feedbacks/día en hora de Lima, y 200 intentos/día; ajustables) y tope mensual global con alerta (pendiente: configurar el límite de gasto en la consola de Anthropic).
- Registrar tokens y costo en cada llamada (`feedback_events`) para medir costo real por usuario.
- Estimado previo (a validar con uso real): unos $3/mes con 100 usuarios y 40 feedbacks por usuario.

## 7. Pagos y suscripción

- **MVP:** planes prepagados con renovación manual; evita la complejidad del cobro recurrente al inicio.
- Una capa `PaymentProvider` abstracta, de modo que cambiar de pasarela no afecte el resto.
- Flujo: el usuario paga → webhook de la pasarela → se verifica la firma → se activa la suscripción. Nunca activar por redirección del navegador.
- **Elegir pasarela [CONFIRMAR]** tras consultar a 2-3 proveedores. Criterios: cobros recurrentes/tokenización, comisión fija sobre un ticket de S/20, plazo de abono, requisitos de afiliación, calidad de la API, Yape/Plin.
- Fase 2: renovación automática con cobro recurrente.

## 8. Legal y operación (validar con contador/abogado)

- Negocio formalizado (RUC) y comprobantes electrónicos.
- Términos y condiciones, política de privacidad (datos personales) y política de reembolsos publicados.
- Cuenta bancaria del negocio para los abonos.

## 9. Hitos

| Hito | Objetivo | Criterio de salida | Estado |
|---|---|---|---|
| M0 | Prueba de concepto: ejecutar SQL y Python en el navegador, validar y pedir feedback de IA, sin diseño | Funciona un ejercicio de cada tipo y el costo por feedback es el esperado | Hecho (falta medir el costo real con más uso) |
| M1 | Backend núcleo: auth, modelo de datos, API de cursos y progreso, límites de IA | Flujo completo por API | Hecho (sin suite de tests automatizados todavía) |
| M2 | Frontend: catálogo, lecciones y ejercicios | Un curso completo navegable | En curso: base lista; falta contenido real y pulido |
| M3 | Pagos y control de acceso por plan | Pago de prueba activa la suscripción | Pendiente |
| M4 | Despliegue y beta con alumnos | Primeros usuarios reales y medición de costo/uso | Pendiente |

## 10. Instrucciones para Claude Code

- **Antes de implementar cada tarea, explica el enfoque y espera mi aprobación.** Quiero entender el porqué de cada decisión.
- Trabaja en tareas pequeñas, cada una con tests y un commit.
- No agregues dependencias nuevas sin justificarlas y pedir confirmación.
- En **autenticación, pagos, webhooks y manejo de secretos**, señala los riesgos y explica el diseño con detalle antes de escribirlo.
- Nunca guardes secretos en el repo; usa variables de entorno y un `.env.example`.
- Entorno: Windows, VS Code, PowerShell para Python/venv y Git Bash para git; Python 3.12. Los comandos que propongas deben funcionar ahí.
- Si una decisión de este documento choca con algo que encuentres, avísame en vez de desviarte en silencio.
- Respeta el alcance de §2: no construyas lo que está en "No incluye".

## 11. Preguntas abiertas

1. ¿Qué pasarela de pago? (§7) — Validar con 2-3 proveedores locales (Yape/Plin)
2. Nombre definitivo del producto y del dominio (hoy: CodeVibeBooster, sin verificar disponibilidad)
3. Precio de planes trimestral y anual
4. Temario y contenido real de los cuatro cursos (hoy hay placeholders y ejemplos)
5. ¿Funciona LangGraph dentro de Pyodide? (§3, módulo de agentes)

## 12. Pendientes antes de abrir la plataforma

- Pantalla de recuperación de contraseña (Supabase Auth ya la soporta).
- Panel mínimo de administración (§2.7).
- Pistas graduales en la interfaz (§5).
- Límite de gasto mensual en la consola de Anthropic y verificación de los precios de Haiku.
- Supabase: *Site URL* real y correo propio (SMTP); el envío gratuito tiene un límite bajo.
- Desplegar en Vercel y Railway con variables de entorno (CORS y URL de la API hoy apuntan a localhost).
- Límite de peticiones por segundo contra ráfagas.
- Aviso de seguridad en `npm audit` por una dependencia interna de Monaco; no llega al build de producción (el editor se carga desde una CDN), pero revisar antes del lanzamiento.
- Aspectos legales (§8).
