import Escena, { Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: backend con FastAPI · CORS.
// El error asusta porque parece un fallo del código, y no lo es: es el navegador
// cortando la llamada. Aquí se ve quién corta, por qué, y quién da el permiso.

export default function Cors() {
  return (
    <Escena duracion={17} etiqueta="CORS: permitir que tu frontend te hable">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={95}
        ojo="Backend con FastAPI"
        titulo={<>No es tu código: es el <span className="verde">navegador</span></>}
        bajada={<>«blocked by CORS policy» asusta, pero es una protección.</>}
      />

      <Nodo desde={2.6} x={25} y={90} rotulo="Tu frontend" sub="localhost:5173" tono="var(--accent)">
        <div className="esc-rejilla"><i /><i /><i /><i /><i /><i /></div>
      </Nodo>
      <Nodo desde={2.9} x={345} y={90} rotulo="Tu API" sub="127.0.0.1:8000" tono="var(--c2-ink)">
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Riel desde={3.1} x={133} y={139} largo={254} />
      <Son en={3.0} tipo="toque" />

      {/* El primer intento: el navegador lo corta antes de salir. */}
      <Chip desde={4.0} centrado={false} x={150} y={56} dx={70} dur={1.3} mal>
        <span className="verbo">GET</span>/tareas
      </Chip>
      <Son en={4.1} tipo="viaje" />
      <Nota desde={5.4} fin={9.0} y={178}>
        <span className="mal">puerto distinto = origen distinto</span>
      </Nota>
      <Son en={5.5} tipo="corta" />
      <Nota desde={6.4} fin={9.0} y={212}>el navegador corta la llamada antes de que salga</Nota>

      {/* El permiso lo da el backend, no el navegador. */}
      <Chip desde={9.6} fin={13.0} y={240}>
        <span className="verbo">allow_origins</span>=[&quot;http://localhost:5173&quot;]
      </Chip>
      <Son en={9.7} tipo="toque" />
      <Nota desde={10.6} fin={13.0} y={282}>tu API dice quién puede hablarle</Nota>

      {/* Segundo intento, ya con permiso. */}
      <Chip desde={11.6} centrado={false} x={150} y={56} dx={190} dur={1.6}>
        <span className="verbo">GET</span>/tareas
      </Chip>
      <Son en={11.7} tipo="viaje" />
      <Flujo desde={12.0} x={140} y={137} dx={250} dur={1.6} />
      <Son en={13.4} tipo="llega" />
      <Chip desde={13.6} fin={15.0} y={178}>
        <span className="verbo">200</span>OK<span className="dato">{'{ tus tareas }'}</span>
      </Chip>
      <Son en={13.7} tipo="bien" />

      <Nota desde={15.4} y={212}>quien autoriza es <b>el backend</b>, nunca el navegador</Nota>
      <Son en={15.5} tipo="cierra" />
    </Escena>
  )
}
