import Escena, { Chip, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: cómo funciona una app · las tres capas.
// La lección las explica con un restaurante, así que la animación usa ese mismo
// restaurante: comedor, cocina y despensa, con el nombre técnico debajo.

export default function TresCapas() {
  return (
    <Escena duracion={15} etiqueta="Las tres capas de una app">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={95}
        ojo="Cómo funciona una app"
        titulo={<>Un <span className="verde">restaurante</span> con tres zonas</>}
        bajada={<>Comedor, cocina y despensa. Nunca entras en las dos últimas.</>}
      />

      <Nodo desde={2.5} fin={13.4} x={25} y={90} rotulo="Comedor" sub="el frontend" tono="var(--accent)" late={4.3}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.4">
          <rect x="3" y="5" width="18" height="12" rx="2" />
          <path d="M7 20h10M12 17v3" />
        </svg>
      </Nodo>
      <Nodo desde={2.7} fin={13.4} x={185} y={90} rotulo="Cocina" sub="el backend" tono="var(--c2-ink)" late={5.9}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--c2-ink)" strokeWidth="1.4">
          <path d="M6 3v7M10 3v7M8 10v11" />
          <path d="M17 3c-1.5 1.5-2 3.5-2 5.5 0 1.5.5 2.5 2 2.5s2-1 2-2.5c0-2-.5-4-2-5.5zM17 11v10" />
        </svg>
      </Nodo>
      <Nodo desde={2.9} fin={13.4} x={345} y={90} rotulo="Despensa" sub="la base de datos" tono="var(--ok)" late={7.5}>
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <ellipse cx="20" cy="11" rx="12" ry="4.5" />
          <path d="M8 11v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V11" />
          <path d="M8 20c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5" opacity=".55" />
        </svg>
      </Nodo>
      <Riel desde={3.2} fin={13.4} x={133} y={139} largo={94} />
      <Riel desde={3.4} fin={13.4} x={293} y={139} largo={94} />

      {/* El recorrido de un plato, que es el de cualquier dato. */}
      <Chip desde={4.1} centrado={false} x={136} y={56} dx={96} dur={1.4}>pides algo</Chip>
      <Son en={4.2} tipo="viaje" />
      <Chip desde={5.7} centrado={false} x={282} y={56} dx={96} dur={1.4}>coge lo que hay</Chip>
      <Son en={5.8} tipo="viaje" />
      <Chip desde={7.3} centrado={false} x={320} y={238} dx={-230} dur={1.9}>y el plato vuelve a tu mesa</Chip>
      <Son en={7.4} tipo="viaje" />
      <Son en={9.3} tipo="llega" />

      {/* Y lo que no pasa nunca. */}
      <Nota desde={9.8} fin={13.4} y={272}>tú nunca entras en la cocina ni en la despensa</Nota>
      <Son en={9.9} tipo="toque" />
      <Chip desde={10.6} fin={13.4} centrado={false} x={25} y={198} mal>
        <span className="verbo">contraseña de la base</span>
      </Chip>
      <Nota desde={11.4} fin={13.4} centrado={false} x={190} y={204}>
        <span className="mal">aquí no</span> · vive en la cocina
      </Nota>
      <Son en={11.5} tipo="mal" />

      <Rotulo
        desde={13.8}
        y={110}
        titulo={<>Cada zona, <span className="verde">un trabajo</span>.</>}
        bajada={<>Las reglas importantes viven donde nadie las ve.</>}
      />
      <Son en={13.9} tipo="bien" />
    </Escena>
  )
}
