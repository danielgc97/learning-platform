import * as duckdb from '@duckdb/duckdb-wasm'
import mvpWasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url'
import mvpWorker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url'
import ehWasm from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url'
import ehWorker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url'

const BUNDLES = {
  mvp: { mainModule: mvpWasm, mainWorker: mvpWorker },
  eh: { mainModule: ehWasm, mainWorker: ehWorker },
}

const SETUP_SQL = `
  CREATE TABLE ventas (id INTEGER, producto VARCHAR, cantidad INTEGER, precio DOUBLE);
  INSERT INTO ventas VALUES
    (1, 'Laptop', 2, 3200.0),
    (2, 'Mouse', 10, 45.5),
    (3, 'Teclado', 5, 120.0),
    (4, 'Monitor', 3, 850.0);
`

let connPromise

async function init() {
  const bundle = await duckdb.selectBundle(BUNDLES)
  const worker = new Worker(bundle.mainWorker)
  const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker)
  await db.instantiate(bundle.mainModule)
  const conn = await db.connect()
  await conn.query(SETUP_SQL)
  return conn
}

// Único punto de ejecución de SQL: si luego se migra al servidor, solo cambia esta función.
export async function runSql(query) {
  connPromise ??= init()
  const conn = await connPromise
  const result = await conn.query(query)
  return {
    columns: result.schema.fields.map((f) => f.name),
    rows: result.toArray().map((row) => Object.values(row.toJSON())),
  }
}
