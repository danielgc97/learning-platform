# SPEC — Plataforma de práctica SQL, Python y agentes con feedback de IA

> Versión 0.1 · 22-oct-2026 · Documento vivo: actualizarlo cuando cambie una decisión.
> Cada decisión técnica incluye su razón. Las marcadas **[CONFIRMAR]** están abiertas.

## 1. Producto

Plataforma web en español donde el usuario aprende y practica **SQL, Python y construcción de agentes** con ejercicios ejecutables en el navegador y feedback de IA sobre su código. Acceso completo por suscripción.

- **Usuario objetivo:** personas que aprenden datos/programación (alumnos actuales y anteriores como primeros usuarios).
- **Precio inicial:** S/20 al mes, acceso completo. Planes trimestral/anual: por definir.
- **Meta de validación:** ~100 suscriptores. Antes de eso, preventa de 15-20 pagos como señal.
- **Diferenciador:** contenido propio en español + práctica ejecutable + feedback que explica el error sin regalar la solución.

## 2. Alcance del MVP

**Incluye**
1. Registro, login y recuperación de contraseña.
2. Catálogo: Curso → Módulo → Lección → Ejercicio.
3. Lecciones en Markdown y ejercicios ejecutables (SQL y Python) en el navegador.
4. Validación automática con casos de prueba + feedback de IA con pistas graduales.
5. Progreso por usuario.
6. Suscripción con pasarela de pago (ver §7) y control de acceso por plan.
7. Panel mínimo de administración: ver usuarios, suscripciones y costo de IA.

**No incluye (por ahora)**
Certificados, foros, app móvil, modelo local, panel para otros docentes, inteligencia de precios, gamificación, ejecución de llamadas reales a LLM dentro de los ejercicios.

## 3. Decisiones técnicas

| Tema | Decisión | Razón |
|---|---|---|
| Backend | Python 3.11 + FastAPI | Un solo lenguaje que ya dominas; fácil de depurar y mantener solo. |
| Base de datos | Supabase (PostgreSQL + Auth). Migraciones en SQL puro en `supabase/migrations/`; el backend usa el cliente `supabase` de Python | Gratuita hasta 500MB, esquema versionado en Git, una sola dependencia. Se puede sumar SQLAlchemy después si el modelo se complica. |
| Frontend | React 18 + Vite | Stack estándar, escalable, amplia demanda laboral. Fácil de mantener y extender. |
| Ejecución de SQL | DuckDB-WASM (o sql.js) en el navegador | El código del usuario nunca corre en tu servidor: cero riesgo de seguridad y cero costo de cómputo. |
| Ejecución de Python | Pyodide (WebAssembly) en el navegador | Mismo motivo. Limitación: descarga inicial pesada y no todas las librerías disponibles; verificar pandas/numpy. |
| Validación | En el navegador (compara resultados con lo esperado) | Se puede manipular, pero es una plataforma de aprendizaje: solo se engañaría el propio alumno. |
| IA de feedback | Claude Haiku 5.5 vía API, desde el backend | Barato y rápido para este uso (ver §6). La API key nunca llega al navegador. |
| Auth | Librería probada (p. ej. fastapi-users o authlib). Nada de criptografía propia | Es una zona sensible: mejor no reinventarla. |
| Contenido | Archivos Markdown + YAML en el repo, cargados a la BD con un script | Versionado con git y fácil de editar con Claude Code. |
| Despliegue | Frontend: Vercel. Backend: Railway. BD: Supabase. | Cero config, escalamiento automático, gratis en fase MVP. Sin necesidad de Docker inicialmente. |
| Idioma | UI y contenido en español; código, nombres de variables y commits en inglés **[CONFIRMAR]** | Cómodo para portafolio internacional. |

**Módulo de agentes (decisión del MVP):** como los ejercicios corren en el navegador y no deben exponer API keys, este módulo se limita a lecciones + ejercicios donde el alumno escribe el código del agente (herramientas, bucle, prompts) y se valida con **pruebas con un cliente LLM simulado (mock)** más revisión de la IA contra una rúbrica. Los proyectos con llamadas reales los ejecuta el alumno en su propio entorno.

## 4. Modelo de datos (borrador)

- `users`, `plans`, `subscriptions` (estado, inicio, fin), `payments` (proveedor, referencia, monto, estado)
- `courses`, `modules`, `lessons`, `exercises`
- `submissions` (usuario, ejercicio, código, pasó/no pasó, fecha)
- `feedback_events` (submission, modelo, tokens de entrada/salida, costo estimado, latencia)
- `progress` (usuario, lección/ejercicio, completado)

**Formato de un ejercicio (YAML):**
```yaml
id: sql-joins-001
type: sql            # sql | python | agent
statement: "..."
starter_code: "..."
dataset: datasets/ventas.csv      # solo SQL
tests: "..."                      # resultado esperado o código de prueba
rubric: "..."                     # criterios para el feedback de IA
hints: ["...", "...", "..."]      # de menos a más reveladora
```

## 5. Flujo de práctica

1. El alumno escribe código y lo ejecuta en el navegador.
2. Se corren las pruebas automáticas (determinista, sin IA).
3. Si falla, el alumno pide feedback: el backend envía a la IA el enunciado, la rúbrica, el código y el resultado de las pruebas.
4. La IA explica el error y da una pista, **sin entregar la solución completa** (salvo petición explícita tras agotar las pistas).

**Por qué primero pruebas y luego IA:** la IA no decide si el código es correcto (puede equivocarse); solo explica. Además reduce costos.

## 6. Control de costo de IA

- Modelo: `claude-haiku-5-5`. Referencia de precio al 22-oct-2026: $0.10 entrada / $0.50 salida por millón de tokens con prompts ≤100K. **Verificar antes de lanzar.**
- Esfuerzo de razonamiento en nivel **bajo** (los tokens de razonamiento cuentan como salida).
- Límite diario por usuario (valor inicial: 30 feedbacks/día, ajustable) y tope mensual global con alerta.
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

| Hito | Objetivo | Criterio de salida |
|---|---|---|
| M0 | Prueba de concepto: ejecutar SQL y Python en el navegador, validar y pedir feedback de IA, sin diseño | Funciona un ejercicio de cada tipo y el costo por feedback es el esperado |
| M1 | Backend núcleo: auth, modelo de datos, API de cursos y progreso, límites de IA | Tests pasando; flujo completo por API |
| M2 | Frontend: catálogo, lecciones y ejercicios | Un curso completo navegable |
| M3 | Pagos y control de acceso por plan | Pago de prueba activa la suscripción |
| M4 | Despliegue y beta con alumnos | Primeros usuarios reales y medición de costo/uso |

## 10. Instrucciones para Claude Code

- **Antes de implementar cada tarea, explica el enfoque y espera mi aprobación.** Quiero entender el porqué de cada decisión.
- Trabaja en tareas pequeñas, cada una con tests y un commit.
- No agregues dependencias nuevas sin justificarlas y pedir confirmación.
- En **autenticación, pagos, webhooks y manejo de secretos**, señala los riesgos y explica el diseño con detalle antes de escribirlo.
- Nunca guardes secretos en el repo; usa variables de entorno y un `.env.example`.
- Entorno: Windows, VS Code, PowerShell para Python/venv y Git Bash para git; Python 3.11. Los comandos que propongas deben funcionar ahí.
- Si una decisión de este documento choca con algo que encuentres, avísame en vez de desviarte en silencio.
- Respeta el alcance de §2: no construyas lo que está en "No incluye".

## 11. Preguntas abiertas

1. ¿Qué pasarela de pago? (§7) — Validar con 2-3 proveedores locales (Yape/Plin)
2. Nombre del producto y del dominio
3. Precio de planes trimestral y anual
4. ¿Variables de entorno locales o .env.example en repo?
