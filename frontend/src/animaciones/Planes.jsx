import Escena, { Chip, Marca, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: cobrar a tus usuarios · planes y acceso.
// La tabla suscripciones de la lección. La misma petición da 200 o 403 según la fila,
// y eso es lo que hay que ver: quién puede qué no lo decide la pantalla, lo decide una
// consulta que tu backend hace en cada petición protegida.

const fila = (tablaY, i) => tablaY + 46 + i * 25
const SUS_X = 80
const SUS_ANCHO = 360
const SUS_Y = 50

export default function Planes() {
  return (
    <Escena duracion={16} alto={300} etiqueta="Planes y acceso">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Cobrar a tus usuarios"
        titulo={<>Cobrar es <span className="verde">decidir quién puede qué</span></>}
        bajada={<>Y eso vive en una tabla tuya, no en la pasarela.</>}
      />

      <Tabla
        desde={2.6}
        x={SUS_X}
        y={SUS_Y}
        ancho={SUS_ANCHO}
        nombre="suscripciones"
        columnas={['usuario', 'plan', 'estado', 'vence_en']}
        filas={[
          ['ana', 'pro', 'activa', '2026-05-01'],
          ['luis', 'pro', 'vencida', '2026-01-12'],
        ]}
        plantilla="70px 55px 75px 1fr"
      />
      <Son en={2.7} tipo="toque" />

      {/* El webhook es quien escribe en esa tabla. */}
      <Chip desde={4.0} fin={6.0} y={170}>
        <span className="verbo">webhook</span>pago aprobado<span className="dato">crea o renueva la fila</span>
      </Chip>
      <Son en={4.1} tipo="toque" />
      <Marca desde={4.8} fin={6.0} x={SUS_X} ancho={SUS_ANCHO} y={fila(SUS_Y, 0)} />
      <Chip desde={4.8} fin={6.0} y={214}>
        <span className="verbo">estado = {"'activa'"}</span>y una fecha nueva en vence_en
      </Chip>
      <Son en={4.9} tipo="bien" />

      {/* Y el backend la lee en cada petición protegida. */}
      <Chip desde={6.4} fin={8.6} y={170}>
        <span className="verbo">GET</span>/informes<span className="dato">lo pide ana</span>
      </Chip>
      <Son en={6.5} tipo="toque" />
      <Marca desde={7.0} fin={8.6} x={SUS_X} ancho={SUS_ANCHO} y={fila(SUS_Y, 0)} />
      <Chip desde={7.0} fin={8.6} y={214}>
        <span className="verbo">200</span>activa, y la fecha aún no llegó
      </Chip>
      <Son en={7.1} tipo="bien" />

      <Chip desde={9.0} fin={11.2} y={170} mal>
        <span className="verbo">GET</span>/informes<span className="dato">lo pide luis</span>
      </Chip>
      <Son en={9.1} tipo="toque" />
      <Marca desde={9.6} fin={11.2} x={SUS_X} ancho={SUS_ANCHO} y={fila(SUS_Y, 1)} mal />
      <Chip desde={9.6} fin={11.2} y={214} mal>
        <span className="verbo">403</span>Tu plan venció
      </Chip>
      <Son en={9.7} tipo="corta" />

      {/* Lo que no sirve de nada. */}
      <Chip desde={11.6} fin={14.0} y={170} mal>
        <span className="verbo">ocultar el botón</span>en la pantalla<span className="dato">no basta</span>
      </Chip>
      <Son en={11.7} tipo="mal" />
      <Chip desde={12.4} fin={14.0} y={214}>
        la comprobación va en el <span className="verbo">backend</span>, en cada petición protegida
      </Chip>
      <Son en={12.5} tipo="toque" />
      <Nota desde={13.0} fin={14.0} y={258}>cualquiera puede llamar a tu API directamente</Nota>

      <Nota desde={14.4} y={258}>cuando el plan termina: bloquea lo nuevo, no borres sus datos</Nota>
      <Son en={14.5} tipo="cierra" />
    </Escena>
  )
}
