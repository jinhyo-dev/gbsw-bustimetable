import React from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import fetcher from "../../utils/fetcher"
import classNames from 'classnames/bind'
import styles from "../../styles/city/Table.module.scss";

const cs = classNames.bind(styles)


const Table = () => {
  const router = useRouter()
  const {
    data,
    error
  } = useSWR(`../api/intercityBusTable?starting_point=${router.query.starting_point}&destination=${router.query.destination}`, fetcher)
  console.log(data)
  return (
    <div>
      <div className='title'>Bus Timetable</div>
      <div className={cs('routerQuery')}>{router.query.starting_point} <span
        className={cs('arrowIcon')}>➦</span> {router.query.destination}</div>
      <table className={cs('mainTable')}>
        <thead>
        <tr>
          <th>출발시간</th>
          <th>도착시간</th>
          <th>요금</th>
          <th>소요시간</th>
        </tr>
        </thead>
        <tbody>
        {Object.values(data.busTime).map((log: any) => (
          <tr key={1}>
            <td>{log.starting_point}</td>
            <td>{log.arrival_time}</td>
            <td>{log.price}</td>
            <td>{log.using_time}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;