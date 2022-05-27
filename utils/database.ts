import knex from 'knex'

export const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'jinhyo',
    database: 'Bus_TimeTable',
  }
})