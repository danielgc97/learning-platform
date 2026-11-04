import Escena, { Chip, Flujo, Nodo, Nota, Riel, Rotulo, Son } from './Escena'

// Lección: cobrar a tus usuarios · webhooks.
// Un webhook es un endpoint que no llama el navegador, sino la pasarela. Y como la
// dirección es pública, lo que decide si es verdad es la firma.

export default function Webhook() {
  return (
    <Escena duracion={18} alto={350} etiqueta="Webhooks: confirmar que te pagaron">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Cobrar a tus usuarios"
        titulo={<>Que te lo diga <span className="verde">la pasarela</span></>}
        bajada={<>Ella te llama a ti cuando el dinero llega de verdad.</>}
      />

      <Nodo desde={2.6} x={25} y={100} rotulo="La pasarela" sub="cobró el dinero" tono="var(--ok)" late={4.2}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" strokeWidth="1.5">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19" />
        </svg>
      </Nodo>
      <Nodo desde={2.9} x={345} y={100} rotulo="Tu backend" sub="/webhooks/pagos" tono="var(--c2-ink)" late={7.0}>
        <div className="esc-lineas"><i /><i /><i /></div>
      </Nodo>
      <Riel desde={3.1} x={133} y={149} largo={254} />
      <Son en={2.7} tipo="toque" />

      {/* El aviso de verdad, firmado. */}
      <Chip desde={4.0} centrado={false} x={110} y={66} dx={190} dur={1.7}>
        <span className="verbo">POST</span>pago aprobado<span className="dato">+ firma</span>
      </Chip>
      <Son en={4.1} tipo="viaje" />
      <Flujo desde={4.4} x={140} y={147} dx={250} dur={1.7} tono="var(--ok)" />
      <Son en={6.0} tipo="llega" />
      <Nota desde={6.4} fin={9.0} y={200}>tu backend recalcula la firma con el secreto que solo ella y tú conocen</Nota>
      <Son en={6.5} tipo="bien" />
      <Chip desde={7.4} fin={9.0} y={240}>
        <span className="verbo">200</span>recibido · y le das acceso
      </Chip>

      {/* El aviso falso: cualquiera conoce la dirección. */}
      <Chip desde={9.8} centrado={false} x={110} y={66} dx={190} dur={1.7} mal>
        <span className="verbo">POST</span>«Ana pagó»<span className="dato">sin firma válida</span>
      </Chip>
      <Son en={9.9} tipo="viaje" />
      <Nota desde={12.0} fin={14.2} y={200}>
        <span className="mal">la firma no cuadra</span> · se rechaza sin mirar nada más
      </Nota>
      <Son en={12.1} tipo="corta" />

      {/* Y el mismo aviso dos veces. */}
      <Chip desde={14.6} fin={16.8} y={240}>
        el mismo aviso <span className="verbo">otra vez</span>
      </Chip>
      <Son en={14.7} tipo="toque" />
      <Nota desde={15.4} fin={16.8} y={200}>guardas el identificador del evento: si ya lo hiciste, lo ignoras</Nota>

      <Nota desde={17.0} y={200}>el navegador nunca decide si te pagaron</Nota>
      <Son en={17.1} tipo="cierra" />
    </Escena>
  )
}
