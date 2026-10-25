# SPEC — Plataforma de práctica SQL, Python y agentes con feedback de IA

> Versión 0.4 · 25-oct-2026 · Documento vivo: actualizarlo cuando cambie una decisión.
> Cada decisión técnica incluye su razón. Las marcadas **[CONFIRMAR]** están abiertas.

## 1. Producto

Plataforma web en español donde el usuario aprende y practica **SQL, Python y construcción de agentes**, más un curso de fundamentos para construir con IA, con ejercicios ejecutables en el navegador, quizzes y feedback de IA sobre su código. Acceso completo por suscripción. Nombre actual: **CortexLab** (provisorio: "Cortex" es muy usado en datos e IA, como Snowflake Cortex y Cortex de Palo Alto Networks; pendiente verificar dominio y registro de marca).

**Finalidad (actualizada el 25-oct-2026):** que cualquier persona pueda construir su propio SaaS entendiendo lo mínimo indispensable de frontend, backend, base de datos y despliegue, con la IA como copiloto. La propia plataforma es la prueba: se construyó así (React, FastAPI, Supabase, Vercel y Render), con la IA escribiendo gran parte del código bajo dirección y revisión humana. SQL, Python y agentes de IA son **medios** para ese fin, no el fin. El mensaje público habla del resultado ("construye tu propio SaaS"), no del mecanismo ("practica en el navegador"); la práctica en el navegador sigue siendo el método para SQL y Python.

- **Usuario objetivo:** personas con una idea de producto que quieren construirla con ayuda de la IA, sin necesidad de ser programadoras (20 a 40 años); alumnos actuales y anteriores como primeros usuarios.
- **Precio inicial:** S/20 al mes, acceso completo. Planes trimestral/anual: por definir.
- **Meta de validación:** ~100 suscriptores. Antes de eso, preventa de 15-20 pagos como señal.
- **Diferenciador:** una ruta de la idea al SaaS publicado + contenido propio en español + práctica ejecutable + feedback que explica el error sin regalar la solución + un curso de fundamentos del software pensado para quien construye con IA (vibecoding): "lo mínimo indispensable".

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

### 2.1 Estructura de cursos: ruta de la idea al SaaS publicado

Catorce cursos en cuatro fases (Entender, Construir, Publicar y Cierre); el orden es el del campo `position` de `content/*/course.yaml` y la agrupación por fase está en `frontend/src/components/phases.js`. Contenido escrito el 25-oct-2026: 90 lecciones y 109 ejercicios (18 de SQL, 15 de Python, 76 quizzes). Todo es **borrador pendiente de revisión del autor**; las dudas de hechos técnicos quedan marcadas con comentarios `<!-- REVISAR -->` en las lecciones.

| Fase | Curso (slug) | Lecciones | Qué cubre | Tipo de práctica |
|---|---|---|---|---|
| 1. Entender | Cómo funciona una app (`como-funciona-una-app`) | 5 | Capas, petición y respuesta, API, tablas, stack | Quiz |
| | Tu caja de herramientas (`herramientas-del-dia-a-dia`) | 6 | Instalación, terminal, Git, GitHub, entornos, variables de entorno | Guiada + quiz |
| | Trabajar con IA como copiloto (`trabajar-con-ia`) | 6 | Vibecoding, contexto, pasos pequeños, revisar, errores, seguridad | Quiz |
| | Define tu producto (`define-tu-producto`) | 2 | MVP, datos y pantallas en papel | Quiz |
| 2. Construir | SQL para tu base de datos (`sql-para-tu-base`) | 12 | Consultar, diseñar tablas, JOIN, Supabase | SQL en el navegador |
| | Python para tu backend (`python-para-tu-backend`) | 9 | Lo básico, errores, JSON, clases | Python en el navegador |
| | Tu backend con FastAPI (`backend-fastapi`) | 8 | Endpoints, Pydantic, Supabase, CRUD, errores, CORS | Guiada + quiz |
| | Tu frontend con React (`frontend-react`) | 8 | Componentes, estado, fetch, formularios, rutas | Guiada + quiz |
| | Usuarios y seguridad (`usuarios-y-seguridad`) | 5 | Autenticación, token, RLS, claves y secretos | Guiada + quiz |
| | Cobrar a tus usuarios (`cobrar-a-tus-usuarios`), **opcional** | 3 | Pagos, webhooks, planes y acceso (neutral respecto a la pasarela) | Quiz |
| | Agentes de IA con LangGraph (`agentes-ia`), **opcional** | 5 | Agentes, grafos, ciclos, memoria, riesgos | Quiz (sin ejecutar código) |
| 3. Publicar | Publica tu SaaS (`publica-tu-saas`) | 7 | Render, Vercel, CORS, dominio, revisión final | Guiada + quiz |
| 4. Cierre | Proyecto: tienda con inventario (`proyecto-tienda-con-inventario`) | 7 | Tablas, consultas, reglas de stock, backend, frontend, publicación | SQL + Python + guiada |
| | Proyecto: negocio de citas (`proyecto-negocio-de-citas`) | 7 | Agenda sin choques de horario (ejemplo: carwash) | SQL + Python + guiada |

**Decisiones de diseño:**
- El orden va de lo conceptual a lo concreto: mapa de piezas, herramientas, método con IA, producto, datos, lógica, backend, frontend, usuarios, publicación y proyecto.
- Los cursos base usan un ejemplo común (una app de tareas); los proyectos de Cierre suben a varias tablas.
- Cada proyecto es un curso independiente y el alumno elige uno. Las lecciones 5 a 7 de cada proyecto son especificaciones y puntos de control, no reenseñan.
- Cobrar y Agentes son opcionales: se puede publicar sin ellos. Se marcan solo en el título del curso.
- Lo que no corre en la plataforma (FastAPI, React, Git, despliegues) se enseña como práctica guiada en el entorno del alumno, con quiz de comprobación y plantillas de prompt para la IA.

**Al reorganizar contenido:** los ejercicios conservan su `id` (slug) para no perder el progreso de los alumnos. Tras cargar con `load_content.py`, `load_content.py --prune` lista lo que sobra en la base y solo borra con `--yes`; se niega a borrar algo que aún contenga ejercicios vigentes.

**Limitaciones del ejecutor de ejercicios (condicionan cómo se escriben):**
- En SQL, con varias sentencias el motor devuelve el resultado del primer `SELECT`; cada ejercicio termina con uno solo.
- El estado de la base persiste mientras la página siga abierta: un `INSERT` repetido duplica filas. Los ejercicios usan `CREATE OR REPLACE`, `UPDATE` y `DELETE`.
- Los resultados esperados evitan `DECIMAL` y fechas (llegan al navegador en un formato que la comparación no entiende) y siempre llevan `ORDER BY`.

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

**Estado del módulo de agentes:** el curso de agentes es opcional y se evalúa solo con lecciones y quizzes de opción múltiple (con código de LangGraph para leer, que no se ejecuta en la plataforma). Por eso ya no hace falta comprobar si LangGraph corre dentro de Pyodide. Los ejemplos del curso se verificaron localmente con LangGraph 1.2.

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
2. Nombre definitivo del producto y del dominio (hoy: CortexLab, con riesgo de colisión con marcas existentes; verificar dominio e INDECOPI)
3. Precio de planes trimestral y anual
4. Revisión del contenido escrito (90 lecciones en borrador): resolver los comentarios `REVISAR` y probar las lecciones guiadas de punta a punta

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
