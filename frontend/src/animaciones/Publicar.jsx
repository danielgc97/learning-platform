import Escena, { Capa, Chip, Nodo, Nota, Rotulo, Son } from './Escena'

// Lección: publica tu SaaS · de tu computadora a internet.
// Las tres piezas cambian de casa y de dirección. Lo que más se olvida es que el .env
// no viaja: los valores se vuelven a escribir en el panel de cada servicio.

export default function Publicar() {
  return (
    <Escena duracion={17} alto={360} etiqueta="De tu computadora a internet">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Publica tu SaaS"
        titulo={<>Cada pieza, <span className="verde">a su casa</span></>}
        bajada={<>Publicar es mudar lo que corre en tu computadora a un sitio encendido siempre.</>}
      />

      <Nodo desde={2.6} fin={14.0} x={25} y={90} rotulo="Frontend" sub="React" tono="var(--accent)" late={5.2}>
        <div className="esc-rejilla"><i /><i /><i /><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={2.8} fin={14.0} x={185} y={90} rotulo="Backend" sub="FastAPI" tono="var(--c2-ink)" late={7.0}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={3.0} fin={14.0} x={345} y={90} rotulo="Base de datos" sub="Supabase" tono="var(--ok)" late={3.8}>
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <ellipse cx="20" cy="11" rx="12" ry="4.5" />
          <path d="M8 11v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V11" />
        </svg>
      </Nodo>
      <Son en={2.7} tipo="toque" />

      <Capa desde={3.6} fin={14.0} y={198} centrado>
        <span className="esc-chip"><span className="verbo">ya está en la nube</span>Supabase</span>
      </Capa>

      {/* Las direcciones cambian: eso es lo que rompe las cosas. */}
      <Chip desde={5.0} fin={8.6} centrado={false} x={20} y={238} mal>
        <span className="verbo">localhost:5173</span>deja de existir
      </Chip>
      <Son en={5.1} tipo="mal" />
      <Chip desde={6.6} fin={8.6} centrado={false} x={255} y={238}>
        <span className="verbo">https://</span>tu-app.vercel.app
      </Chip>
      <Son en={6.7} tipo="bien" />

      <Chip desde={9.0} fin={12.0} y={238}>
        <span className="verbo">.env</span>no viaja: lo reescribes en el panel de cada servicio
      </Chip>
      <Son en={9.1} tipo="toque" />
      <Nota desde={10.4} fin={12.0} y={286}>y con las direcciones nuevas hay que repasar <b>CORS</b></Nota>

      <Nota desde={12.4} fin={14.0} y={286}>los errores ya no salen en tu terminal: están en los registros</Nota>
      <Son en={12.5} tipo="toque" />

      <Rotulo
        desde={14.4}
        y={130}
        titulo={<>El orden <span className="verde">importa</span>.</>}
        bajada={<>Primero el backend, que ya existe, y después el frontend que lo llama.</>}
      />
      <Son en={14.5} tipo="bien" />
    </Escena>
  )
}
