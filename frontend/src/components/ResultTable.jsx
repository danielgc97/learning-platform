export default function ResultTable({ columns, rows }) {
  return (
    <div className="mt-3 overflow-x-auto border border-line">
      <table className="w-full font-mono text-sm">
        <thead className="bg-panel text-left">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 text-xs font-medium tracking-wider text-muted uppercase">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {row.map((v, j) => (
                <td key={j} className="px-3 py-2">{String(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
