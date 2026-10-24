import * as duckdb from '@duckdb/duckdb-wasm'
import mvpWasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url'
import mvpWorker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url'
import ehWasm from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url'
import ehWorker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url'

const BUNDLES = {
  mvp: { mainModule: mvpWasm, mainWorker: mvpWorker },
  eh: { mainModule: ehWasm, mainWorker: ehWorker },
}

let dbPromise
const connections = new Map()

async function getDb() {
  dbPromise ??= (async () => {
    const bundle = await duckdb.selectBundle(BUNDLES)
    const worker = new Worker(bundle.mainWorker)
    const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker)
    await db.instantiate(bundle.mainModule)
    return db
  })()
  return dbPromise
}

// Cada ejercicio (según su setup_sql) tiene su propio esquema, así sus tablas no se mezclan.
async function getConnection(setupSql) {
  if (!connections.has(setupSql)) {
    connections.set(
      setupSql,
      (async () => {
        const db = await getDb()
        const conn = await db.connect()
        const schema = `ejercicio_${connections.size}`
        await conn.query(`CREATE SCHEMA ${schema}; USE ${schema};`)
        if (setupSql) await conn.query(setupSql)
        return conn
      })(),
    )
  }
  return connections.get(setupSql)
}

// Único punto de ejecución de SQL: si luego se migra al servidor, solo cambia esta función.
export async function runSql(query, setupSql = '') {
  const conn = await getConnection(setupSql)
  const result = await conn.query(query)
  return {
    columns: result.schema.fields.map((f) => f.name),
    rows: result.toArray().map((row) => Object.values(row.toJSON())),
  }
}
