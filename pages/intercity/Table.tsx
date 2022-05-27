import React from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import fetcher from "../../utils/fetcher"
import classNames from 'classnames/bind'
import Load from '../components/Load'
import styles from "../../styles/Table.module.scss";

const cs = classNames.bind(styles)

const Table = () => {
  const router = useRouter()
  const {
    data,
    error
  } = useSWR(`../api/intercityBusTable?starting_point=${router.query.starting_point}&destination=${router.query.destination}`, fetcher)

  if (error) {
    return <Load/>
  } else if (!data) {
    return <Load/>
  } else {
    return (
      <div>
        <div className='title'>Bus Timetable</div>
        <div className={cs('routerQuery')}>{router.query.starting_point} <span
          className={cs('arrowIcon')}>➦</span> {router.query.destination}</div>
        <table className={cs('mainTable')} style={{ width: '100%', marginTop: '2rem', maxWidth: '70rem' }}>
          <thead>
          <tr className={cs('table_tr')}>
            <th>출발시간</th>
            <th>도착시간</th>
            <th>요금</th>
            <th className={cs('usingTimeTh')}>소요시간</th>
          </tr>
          </thead>
          <tbody>
          {Object.values(data.busTime).map((log: any) => (
            <tr key={1}>
              <td className={cs('startTime')}>{log.starting_time}</td>
              <td className={cs('arrivalTime')}>{log.arrival_time}</td>
              <td className={cs('price')}>{log.price}</td>
              <td className={cs('usingTime')}>{log.using_time}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <p style={{ textAlign: 'center'}}>Go to <a href={'/'} className={cs('mainBtn')}>Main?</a></p>
      </div>
    )
  }
}

export default Table;