import knex, { Knex } from 'knex'

let cachedConnection: Knex | undefined

export const createDBConnection = () => {
  if (cachedConnection) {
    return cachedConnection
  }

  const db = knex({
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'jinhyo',
      database: 'Bus_TimeTable',
    }
  })

  cachedConnection = db
  return db
}