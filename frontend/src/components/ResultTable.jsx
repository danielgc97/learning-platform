export default function ResultTable({ columns, rows }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-md border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left dark:bg-slate-800">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-200 dark:border-slate-800">
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
