import Escena, { Capa, Chip, Nodo, Nota, Rotulo, Son, Tabla } from './Escena'

// Lección: herramientas del día a día · variables de entorno y secretos.
// Tres archivos que se parecen y hacen cosas muy distintas. El error caro es subir
// el .env, así que aquí se ve el .gitignore parándolo.

export default function Secretos() {
  return (
    <Escena duracion={17} alto={370} etiqueta="Variables de entorno y secretos">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={110}
        ojo="Herramientas del día a día"
        titulo={<>Fuera del código, <span className="verde">fuera de git</span></>}
        bajada={<>Las claves viven en un archivo que nunca se sube.</>}
      />

      <Tabla
        desde={2.6}
        x={20}
        y={40}
        ancho={240}
        nombre=".env · en tu computadora"
        columnas={['variable', 'valor']}
        filas={[['SUPABASE_URL', 'https://…'], ['SUPABASE_KEY', 'una-clave-secreta']]}
        plantilla="1fr 110px"
      />
      <Son en={2.7} tipo="toque" />
      <Tabla
        desde={3.2}
        x={275}
        y={40}
        ancho={225}
        nombre=".env.example · sí se sube"
        columnas={['variable', 'valor']}
        filas={[['SUPABASE_URL', 'pon-la-tuya'], ['SUPABASE_KEY', 'pon-la-tuya']]}
        plantilla="1fr 100px"
      />

      <Nota desde={4.6} fin={7.4} y={150}>el mismo índice, sin ningún secreto dentro</Nota>
      <Son en={4.7} tipo="bien" />

      {/* El intento de subir el .env, y el .gitignore parándolo. */}
      <Nodo desde={7.8} fin={14.0} x={185} y={190} rotulo="tu repositorio" sub="GitHub" tono="var(--c2-ink)">
        <div className="esc-rejilla"><i /><i /><i /><i /><i /><i /></div>
      </Nodo>
      <Chip desde={8.8} centrado={false} x={40} y={300} dx={140} dur={1.5} mal>
        <span className="verbo">.env</span>intenta subirse
      </Chip>
      <Son en={8.9} tipo="viaje" />
      <Nota desde={10.6} fin={13.4} y={338}>
        <span className="mal">lo para el .gitignore</span> · por eso está ahí desde el primer día
      </Nota>
      <Son en={10.7} tipo="corta" />
      <Chip desde={11.8} fin={13.4} centrado={false} x={290} y={300}>
        <span className="verbo">.env.example</span>sube sin problema
      </Chip>
      <Son en={11.9} tipo="bien" />

      <Capa desde={14.4} x={60} y={158} ancho={400}>
        <span className="esc-chip">
          <span className="verbo">VITE_</span>todo lo que empieza así <span className="dato">lo ve cualquiera</span>
        </span>
      </Capa>
      <Son en={14.5} tipo="toque" />
      <Nota desde={15.4} y={204}>en el frontend no hay secretos: lo que llega al navegador, se lee</Nota>
      <Son en={15.5} tipo="mal" />
    </Escena>
  )
}
