import Escena, { Capa, Chip, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: frontend con React · estado con useState.
// El contador de la lección. Lo que hay que ver es el círculo: pulsas, cambia el
// valor guardado, y React vuelve a dibujar la pantalla con el valor nuevo.

function Boton({ veces }) {
  return (
    <span className="mx-auto inline-flex rounded-md bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink">
      Clics: {veces}
    </span>
  )
}

export default function Estado() {
  return (
    <Escena duracion={17} etiqueta="Estado con useState">
      <Son en={0.3} tipo="toque" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={95}
        ojo="Frontend con React"
        titulo={<>Pantallas que <span className="verde">reaccionan</span></>}
        bajada={<>Guardas el valor en el estado, y React redibuja cuando cambia.</>}
      />

      {/* La pantalla, con el valor que se ve. */}
      <Capa desde={2.6} fin={7.6} y={70} centrado><Boton veces={0} /></Capa>
      <Son en={2.7} tipo="toque" />

      <Nodo desde={3.0} x={185} y={150} rotulo="el estado" sub="useState(0)" tono="var(--accent)" late={9.2}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--accent)' }}>0</span>
      </Nodo>

      <Chip desde={4.6} fin={7.0} y={258}>
        <span className="verbo">onClick</span>setVeces(veces + 1)
      </Chip>
      <Son en={4.7} tipo="toque" />
      <Nota desde={5.6} fin={7.0} y={296}>pulsar no cambia la pantalla: cambia el valor guardado</Nota>

      {/* El cambio y el redibujo. */}
      <Riel desde={7.4} fin={13.6} x={199} y={120} largo={30} vertical />
      <Chip desde={7.8} y={222} dy={-96} dur={1.6}>
        <span className="verbo">veces</span>ahora vale <span className="dato">1</span>
      </Chip>
      <Son en={7.9} tipo="viaje" />
      <Son en={9.4} tipo="llega" />
      <Capa desde={9.6} y={70} centrado><Boton veces={1} /></Capa>
      <Son en={9.7} tipo="bien" />
      <Nota desde={10.4} fin={13.6} y={258}>React vuelve a dibujar el componente con el valor nuevo</Nota>

      <Nota desde={14.0} y={258}>sin estado, la pantalla se quedaría en <b>Clics: 0</b> para siempre</Nota>
      <Son en={14.1} tipo="toque" />
    </Escena>
  )
}
