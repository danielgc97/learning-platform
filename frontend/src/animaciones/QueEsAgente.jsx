import Escena, { Chip, Flujo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: agentes con IA · qué es un agente.
// Los tres niveles de la tabla de la lección, dibujados: lo que los separa es la forma,
// y el bucle del tercero se ve volver sobre sí mismo.

export default function QueEsAgente() {
  return (
    <Escena duracion={15} alto={330} etiqueta="Los tres niveles de autonomía">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Agentes con IA"
        titulo={<>Tres niveles, <span className="verde">no uno</span></>}
        bajada={<>Lo que cambia es quién decide el siguiente paso.</>}
      />

      {/* 1. Entra texto, sale texto. */}
      <Nota desde={2.6} centrado={false} x={16} y={54}>llamada simple</Nota>
      <Son en={2.7} tipo="toque" />
      <Chip desde={2.8} centrado={false} x={170} y={44}>«resume este correo»</Chip>
      <Riel desde={3.0} x={332} y={57} largo={30} />
      <Chip desde={3.2} centrado={false} x={368} y={44}>el resumen</Chip>
      <Son en={3.3} tipo="fila" />

      {/* 2. Varios pasos, en un orden que decides tú. */}
      <Nota desde={4.2} centrado={false} x={16} y={124}>workflow</Nota>
      <Son en={4.3} tipo="toque" />
      <Chip desde={4.4} centrado={false} x={170} y={114}>extraer</Chip>
      <Riel desde={4.7} x={248} y={127} largo={24} />
      <Chip desde={4.9} centrado={false} x={276} y={114}>validar</Chip>
      <Son en={5.0} tipo="fila" />
      <Riel desde={5.2} x={352} y={127} largo={24} />
      <Chip desde={5.4} centrado={false} x={380} y={114}>guardar</Chip>
      <Son en={5.5} tipo="fila" />
      <Nota desde={6.0} fin={8.0} y={290}>los pasos y su orden los decides tú, antes de empezar</Nota>

      {/* 3. Un bucle: decide, actúa, mira el resultado y vuelve a decidir. */}
      <Nota desde={6.6} centrado={false} x={16} y={204}>agente</Nota>
      <Son en={6.7} tipo="toque" />
      <Chip desde={6.8} centrado={false} x={170} y={194}>
        <span className="verbo">el modelo</span>decide
      </Chip>
      <Riel desde={7.2} x={322} y={207} largo={30} />
      <Chip desde={7.4} centrado={false} x={358} y={194}>una herramienta</Chip>
      <Son en={7.5} tipo="viaje" />
      <Flujo desde={7.6} x={324} y={205} dx={28} dur={0.8} tono="var(--accent)" n={3} />

      <Riel desde={8.2} x={210} y={224} largo={26} vertical />
      <Riel desde={8.3} x={210} y={250} largo={200} />
      <Riel desde={8.4} x={410} y={224} largo={26} vertical />
      <Flujo desde={8.6} x={404} y={248} dx={-190} dur={1.6} tono="var(--ok)" n={6} />
      <Son en={8.7} tipo="viaje" />
      <Nota desde={9.2} fin={11.4} y={290}>decide, actúa, mira el resultado y vuelve a decidir</Nota>
      <Son en={9.3} tipo="bien" />

      <Nota desde={11.8} fin={13.2} y={290}>más autonomía no siempre es mejor: más lento y más caro</Nota>
      <Son en={11.9} tipo="mal" />
      <Nota desde={13.6} y={290}>si ya conoces los pasos, usa un flujo</Nota>
      <Son en={13.7} tipo="cierra" />
    </Escena>
  )
}
