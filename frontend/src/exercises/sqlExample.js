export const sqlExample = {
  id: 'sql-ventas-001',
  statement:
    'Muestra cada producto con su total vendido (cantidad * precio) en una columna llamada total, ordenado de mayor a menor.',
  starterQuery: 'SELECT * FROM ventas;',
  expected: {
    columns: ['producto', 'total'],
    rows: [
      ['Laptop', 6400],
      ['Monitor', 2550],
      ['Teclado', 600],
      ['Mouse', 455],
    ],
  },
}
