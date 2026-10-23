export const pythonExample = {
  id: 'python-igv-001',
  statement:
    'Define una función total_con_igv(precios) que reciba una lista de precios y devuelva la suma de todos multiplicada por 1.18 (IGV).',
  starterCode: 'def total_con_igv(precios):\n    pass\n',
  tests: `
assert callable(total_con_igv), "total_con_igv debe ser una función"
assert total_con_igv([100]) is not None, "Tu función no devuelve nada: falta un return"
assert abs(total_con_igv([100]) - 118) < 1e-9, "Con [100] se esperaba 118.0"
assert abs(total_con_igv([50, 50, 100]) - 236) < 1e-9, "Con [50, 50, 100] se esperaba 236.0"
assert total_con_igv([]) == 0, "Con una lista vacía se esperaba 0"
`,
}
