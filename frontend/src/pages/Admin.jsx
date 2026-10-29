import Alert from '../components/Alert'
import { useApi } from '../useApi'

const money = (n) => `$${n.toFixed(4)}`

// El valor va en la tipografía de texto, no en la de títulos: en una cifra grande
// una fuente de display se lee como decoración.
function Stat({ label, value, hint }) {
  return (
    <div className="lab-card p-4">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <p className="mt-2 text-3xl leading-none font-semibold">{value}</p>
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  )
}

function CostByDay({ days }) {
  if (!days.length) return <p className="text-sm text-muted">Todavía nadie ha pedido ayuda a la IA.</p>
  const max = Math.max(...days.map((d) => d.cost_usd))
  return (
    <ul className="space-y-2">
      {days.map((d) => (
        <li key={d.day} className="flex items-center gap-3 text-sm">
          <span className="w-24 shrink-0 font-mono text-xs text-muted tabular-nums">{d.day}</span>
          <span className="h-3 min-w-24 flex-1 overflow-hidden rounded-sm bg-panel">
            <span
              className="block h-full rounded-r-sm bg-chart-fill"
              style={{ width: `${max > 0 ? Math.max(2, (d.cost_usd / max) * 100) : 0}%` }}
            />
          </span>
          <span className="w-20 shrink-0 text-right font-mono text-xs tabular-nums">{money(d.cost_usd)}</span>
          <span className="w-16 shrink-0 text-right text-xs text-muted tabular-nums">
            {d.calls} {d.calls === 1 ? 'ayuda' : 'ayudas'}
          </span>
        </li>
      ))}
    </ul>
  )
}

const th = 'px-3 py-2 text-left text-xs font-semibold text-muted'
const td = 'border-t border-line px-3 py-2'

export default function Admin() {
  const { data, error, loading } = useApi('/admin/overview')

  if (loading) return <p className="text-muted">Cargando panel...</p>
  if (error) return <Alert tone="error">{error}</Alert>

  const { totals, users, hardest, cost_by_day: byDay } = data

  return (
    <>
      <h1 className="font-display text-4xl">Panel</h1>
      <p className="mt-2 text-muted">
        Datos de personas reales: no compartas capturas de esta pantalla.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Usuarios" value={totals.users} hint={`${totals.active_7d} activos en 7 días`} />
        <Stat label="Intentos" value={totals.attempts} hint={`${totals.passed_pct}% acertados`} />
        <Stat label="Ayudas de IA" value={totals.ai_calls} hint={`${money(totals.ai_cost_7d_usd)} en 7 días`} />
        <Stat label="Costo de IA" value={money(totals.ai_cost_usd)} hint="Acumulado" />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Gasto de IA por día</h2>
        <div className="lab-card mt-4 p-5">
          <CostByDay days={byDay} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Dónde se atasca la gente</h2>
        <p className="mt-1 text-sm text-muted">
          Si varias personas fallan el mismo ejercicio, suele ser el enunciado o la lección, no ellas.
        </p>
        <div className="lab-card mt-4 overflow-x-auto">
          {hardest.length === 0 ? (
            <p className="p-5 text-sm text-muted">Todavía no hay intentos fallidos.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-panel">
                <tr>
                  <th className={th}>Ejercicio</th>
                  <th className={`${th} text-right`}>Fallos</th>
                  <th className={`${th} text-right`}>Intentos</th>
                </tr>
              </thead>
              <tbody>
                {hardest.map((e) => (
                  <tr key={e.slug}>
                    <td className={`${td} font-mono text-xs`}>{e.slug}</td>
                    <td className={`${td} text-right tabular-nums`}>{e.failed}</td>
                    <td className={`${td} text-right tabular-nums`}>{e.attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Usuarios</h2>
        <div className="lab-card mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-panel">
              <tr>
                <th className={th}>Correo</th>
                <th className={th}>Se registró</th>
                <th className={th}>Último intento</th>
                <th className={`${th} text-right`}>Completados</th>
                <th className={`${th} text-right`}>Intentos</th>
                <th className={`${th} text-right`}>Costo IA</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email}>
                  <td className={td}>{u.email}</td>
                  <td className={`${td} whitespace-nowrap tabular-nums`}>{u.signed_up ?? '—'}</td>
                  <td className={`${td} whitespace-nowrap tabular-nums`}>{u.last_attempt ?? 'nunca'}</td>
                  <td className={`${td} text-right tabular-nums`}>{u.completed}</td>
                  <td className={`${td} text-right tabular-nums`}>{u.attempts}</td>
                  <td className={`${td} text-right tabular-nums`}>{money(u.ai_cost_usd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
