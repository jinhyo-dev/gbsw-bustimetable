import { db } from '../../utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function IntercityBusTable(req: NextApiRequest, res: NextApiResponse)  {
  const { starting_point, destination } = req.query
  const sql = `SELECT * FROM intercityBusTable WHERE starting_point = '${starting_point}' AND destination = '${destination}' ORDER BY starting_time asc`
  const busTime = await db.raw(sql)
  return res.send({Success: true, busTime: busTime[0]})
}