---
title: "Las reglas de la agenda en Python"
---

# Las reglas de la agenda en Python

La regla central del negocio, **dos citas no pueden chocar**, necesita lógica en Python. Para trabajar con
horas es más fácil convertir cada hora a **minutos desde la medianoche**: las 9:00 son `540` y las 10:30, `630`.
Una cita se describe con su inicio y su duración:

```python
cita = {"inicio": 540, "duracion": 60}   # 9:00 a 10:00
fin = cita["inicio"] + cita["duracion"]  # 600
```

Dos citas **chocan** cuando cada una empieza antes de que termine la otra. Si una termina exactamente cuando
empieza la siguiente (`600` y `600`), **no** chocan.

Para mostrar los minutos como hora, necesitarás dos operadores: `//` (división entera) y `%` (resto):

```python
minutos = 630
f"{minutos // 60:02d}:{minutos % 60:02d}"   # '10:30'
```

Para el segundo ejercicio, buscar un hueco libre, el método es:

1. Ordena las citas por inicio: `sorted(citas, key=lambda c: c["inicio"])`.
2. Mantén un "cursor" que parte de la hora de apertura.
3. Antes de cada cita, si caben los minutos que necesitas entre el cursor y su inicio, el hueco es el cursor.
4. Si no, mueve el cursor al fin de esa cita (o déjalo donde estaba si ya lo había pasado).
5. Al final, comprueba si cabe antes de la hora de cierre.

Ahora te toca a ti: resuelve los dos ejercicios de abajo.
