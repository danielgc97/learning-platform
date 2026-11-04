import Escena, { Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: herramientas del día a día · GitHub.
// Git guarda en tu computadora; GitHub, en la nube. Lo que no se ve leyendo es que esa
// copia es además de donde leen los servicios al publicar, y que lo que subes se queda.

export default function GitHub() {
  return (
    <Escena duracion={15} alto={310} etiqueta="GitHub: respaldo y puerta">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Herramientas del día a día"
        titulo={<>Una copia <span className="verde">fuera de tu equipo</span></>}
        bajada={<>Git guarda versiones en tu computadora. GitHub, en la nube.</>}
      />

      <Nodo desde={2.6} x={30} y={60} rotulo="tu computadora" sub="git, en local" tono="var(--accent)" late={4.3}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={2.8} x={190} y={60} rotulo="GitHub" sub="la copia en la nube" tono="var(--c2-ink)" late={5.5}>
        <div className="esc-rejilla"><i /><i /><i /><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={3.0} x={350} y={60} rotulo="al publicar" sub="Vercel y Render" tono="var(--ok)" late={7.0}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </Nodo>
      <Son en={2.7} tipo="toque" />
      <Riel desde={3.2} x={138} y={109} largo={94} />
      <Riel desde={3.4} x={298} y={109} largo={94} />

      <Chip desde={4.2} centrado={false} x={120} y={26} dx={100} dur={1.5}>
        <span className="verbo">git push</span>
      </Chip>
      <Son en={4.3} tipo="viaje" />
      <Son en={5.6} tipo="llega" />
      <Nota desde={6.0} fin={8.4} y={186}>si pierdes el equipo, no pierdes el trabajo</Nota>

      <Flujo desde={6.8} x={300} y={107} dx={90} dur={1.3} tono="var(--ok)" />
      <Son en={6.9} tipo="viaje" />
      <Nota desde={8.8} fin={10.8} y={186}>y es de ahí de donde leen tu código los que lo publican</Nota>
      <Son en={8.9} tipo="bien" />

      {/* Lo que nunca sube. */}
      <Chip desde={11.2} y={222}>
        <span className="verbo">.gitignore</span><span className="dato">.env · venv/ · node_modules/</span>
      </Chip>
      <Son en={11.3} tipo="toque" />
      <Chip desde={12.0} y={266} mal>
        <span className="verbo">lo que subes queda en el historial</span>aunque lo borres luego
      </Chip>
      <Son en={12.1} tipo="mal" />
      <Nota desde={12.6} y={186}>por eso el .gitignore va antes del primer git add</Nota>
      <Son en={12.7} tipo="cierra" />
    </Escena>
  )
}
