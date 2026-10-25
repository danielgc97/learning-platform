---
title: "Planes y acceso: quién puede usar qué"
---

# Planes y acceso: quién puede usar qué

Cobrar no es solo recibir dinero: es **decidir qué puede hacer cada persona según lo que pagó**. Para eso
necesitas guardar el estado de cada suscripción en tu propia base de datos. Una tabla sencilla:

```sql
create table public.suscripciones (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id),
  plan text not null,
  estado text not null,            -- 'activa', 'vencida', 'cancelada'
  vence_en timestamptz not null
);
```

El flujo completo queda así:

1. El webhook de pago aprobado **crea o renueva** la fila: `estado = 'activa'` y una nueva fecha en `vence_en`.
2. Cuando el usuario pide algo protegido, tu **backend** consulta su suscripción.
3. Si está `activa` y `vence_en` es futura, responde; si no, devuelve un `403` con un mensaje claro ("Tu plan venció").

Esa comprobación se hace **en el backend, en cada petición protegida**: ocultar un botón en la pantalla no
basta, porque cualquiera puede llamar a tu API directamente.

También decide qué ocurre cuando termina el plan: casi siempre es mejor **bloquear funciones nuevas pero no
borrar sus datos**.

Para empezar, es válido ofrecer **planes prepagados con renovación manual** (el usuario paga un mes y debe
volver a pagar al siguiente): es más simple que el cobro automático. El cobro recurrente automático puede
llegar en una segunda versión.

Guarda de la pasarela solo lo que necesites (un identificador de cliente, no datos de tarjeta).

Comprueba lo que entendiste con la pregunta de abajo.
