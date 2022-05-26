import { db } from '../../utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function CityBusTable(req: NextApiRequest, res: NextApiResponse)  {
  const { start, destination } = req.query
  const sql = `SELECT * FROM cityBusTable WHERE starting_point LIKE '${start}' AND destination LIKE '%${destination}%' AND time > curtime() ORDER BY time asc, ABS(time-curtime()) LIMIT 1`
  const sql2 = `SELECT * FROM cityBusTable WHERE starting_point LIKE '${start}' AND destination LIKE '%${destination}%' ORDER BY time asc`
  const table = await db.raw(sql)
  const AllTable = await db.raw(sql2)
  return res.send({Success: true, table: table[0], AllTable: AllTable[0]})
}