import Escena, { Chip, Nota, Rotulo, Son } from './Escena'

// Lección: trabajar con IA · dar contexto.
// Los dos pedidos de la lección, uno encima del otro. El de abajo se arma a la vista,
// parte por parte, para que se vea de qué está hecho un prompt que funciona.

export default function Contexto() {
  return (
    <Escena duracion={15} alto={320} etiqueta="Dar contexto a la IA">
      <Son en={0.3} tipo="aparece" />
      <Rotulo
        desde={0.2}
        fin={2.4}
        y={100}
        ojo="Trabajar con IA"
        titulo={<>Lo que recibes depende de <span className="verde">lo que cuentas</span></>}
        bajada={<>Un buen pedido tiene cuatro partes, y ninguna es opcional.</>}
      />

      <Chip desde={2.6} fin={12.0} y={56} mal>
        <span className="verbo">«Haz el login»</span>y a ver qué sale
      </Chip>
      <Son en={2.7} tipo="mal" />
      <Nota desde={3.2} fin={5.4} y={96}>la IA adivina tu stack, tus archivos y qué no debe tocar</Nota>

      <Chip desde={6.0} fin={12.0} y={110}>
        <span className="verbo">objetivo</span>un formulario de inicio de sesión en React
      </Chip>
      <Son en={6.1} tipo="fila" />
      <Chip desde={7.0} fin={12.0} y={152}>
        <span className="verbo">contexto</span>app de tareas con React y FastAPI, con Supabase Auth
      </Chip>
      <Son en={7.1} tipo="fila" />
      <Chip desde={8.0} fin={12.0} y={194}>
        <span className="verbo">restricciones</span>no cambies main.py
      </Chip>
      <Son en={8.1} tipo="fila" />
      <Chip desde={9.0} fin={12.0} y={236}>
        <span className="verbo">resultado</span>un mensaje si la contraseña es incorrecta
      </Chip>
      <Son en={9.1} tipo="fila" />
      <Nota desde={10.0} fin={12.0} y={284}>así no adivina nada, y no toca lo que no pediste</Nota>
      <Son en={10.1} tipo="bien" />

      {/* Y lo que no hace falta repetir nunca más. */}
      <Chip desde={12.4} y={152}>
        <span className="verbo">CLAUDE.md</span>tu stack y tus reglas, escritas una sola vez
      </Chip>
      <Son en={12.5} tipo="toque" />
      <Nota desde={13.2} y={200}>y si no sabes qué pedir, pídele que te haga preguntas antes</Nota>
      <Son en={13.3} tipo="cierra" />
    </Escena>
  )
}
