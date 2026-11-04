import Escena, { Chip, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: publica tu SaaS · dominio propio y HTTPS.
// El DNS como lo que es, una agenda. Y al final lo que se olvida siempre: al cambiar de
// dirección hay dos sitios que se quedan apuntando a la vieja.

export default function Dominio() {
  return (
    <Escena duracion={15} alto={310} etiqueta="Dominio propio y HTTPS">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Publica tu SaaS"
        titulo={<>Un nombre que <span className="verde">apunta a un sitio</span></>}
        bajada={<>El DNS es la agenda que traduce tu dominio en un servidor.</>}
      />

      <Tabla
        desde={2.6}
        x={110}
        y={50}
        ancho={300}
        nombre="lo que creas en tu registrador"
        columnas={['nombre', 'registro', 'apunta a']}
        filas={[
          { celdas: ['mitareas.com', 'A', 'Vercel'], desde: 3.6 },
          { celdas: ['app.mitareas.com', 'CNAME', 'Vercel'], desde: 4.4 },
        ]}
        plantilla="1fr 80px 80px"
      />
      <Son en={2.7} tipo="toque" />
      <Son en={3.7} tipo="fila" />
      <Son en={4.5} tipo="fila" />
      <Nota desde={5.0} fin={7.4} y={272}>copia los valores de tu panel, no los de otro tutorial</Nota>

      <Chip desde={5.8} fin={7.4} y={180}>
        <span className="verbo">tarda</span>de unos minutos a unas horas
      </Chip>
      <Son en={5.9} tipo="espera" />

      {/* El candado. */}
      <Chip desde={7.8} fin={11.0} y={180}>
        <span className="verbo">https://</span>mitareas.com
      </Chip>
      <Son en={7.9} tipo="bien" />
      <Nota desde={8.4} fin={11.0} y={272}>Vercel se lo pide a Let’s Encrypt y lo renueva solo</Nota>
      <Chip desde={9.4} fin={11.0} y={224}>
        <span className="verbo">tú no haces nada</span><span className="dato">pero el dominio debe seguir bien puesto</span>
      </Chip>
      <Son en={9.5} tipo="toque" />

      {/* Y lo que se queda atrás. */}
      <Chip desde={11.4} y={180} mal>
        <span className="verbo">CORS_ORIGINS</span>en Render
      </Chip>
      <Son en={11.5} tipo="mal" />
      <Chip desde={12.0} y={224} mal>
        <span className="verbo">Site URL</span>y Redirect URLs<span className="dato">en Supabase</span>
      </Chip>
      <Son en={12.1} tipo="toque" />
      <Nota desde={12.6} y={272}>al cambiar de dirección, estas dos apuntan a la vieja</Nota>
      <Son en={12.7} tipo="cierra" />
    </Escena>
  )
}
