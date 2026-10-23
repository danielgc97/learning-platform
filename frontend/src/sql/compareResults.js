const normalize = (v) => (typeof v === 'string' ? v : Number(v))

const sameValue = (a, b) => {
  const x = normalize(a)
  const y = normalize(b)
  return typeof x === 'number' && typeof y === 'number' ? Math.abs(x - y) < 1e-9 : x === y
}

export function compareResults(actual, expected) {
  const actualCols = actual.columns.map((c) => c.toLowerCase())
  const expectedCols = expected.columns.map((c) => c.toLowerCase())
  if (actualCols.join() !== expectedCols.join()) {
    return { ok: false, message: `Las columnas deben ser: ${expected.columns.join(', ')}. Tu consulta devolvió: ${actual.columns.join(', ')}.` }
  }
  if (actual.rows.length !== expected.rows.length) {
    return { ok: false, message: `Se esperaban ${expected.rows.length} filas y tu consulta devolvió ${actual.rows.length}.` }
  }
  for (let i = 0; i < expected.rows.length; i++) {
    const match = expected.rows[i].every((v, j) => sameValue(actual.rows[i][j], v))
    if (!match) {
      return { ok: false, message: `La fila ${i + 1} no coincide con lo esperado (revisa los valores y el orden).` }
    }
  }
  return { ok: true, message: 'Correcto.' }
}
