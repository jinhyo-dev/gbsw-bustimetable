import React, {useState} from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import FancyModal from "../components/FancyModal"
import styles from '../../styles/city/Table.module.scss'
import classNames from 'classnames/bind'

const cs = classNames.bind(styles)

export default function Table() {
  const router = useRouter()
  const {
    data,
    error
  } = useSWR(`../api/cityBusTable?start=${router.query.starting_point}&destination=${router.query.destination}`, fetcher)

  if (error) {
    return <div>에러</div>
  }

  if (!data) {
    return (
      <>
        <div className="ring">Loading
          <span></span>
        </div>
      </>
    )
  } else {
    if (data.table.length === 0) {
      return (
        <div className='container'>
          <div className={cs('notExist')}><span className={cs('infoIcon')}>ⓘ</span> 다음 버스가 없습니다.</div>
          <FancyModal/>
          <p>Go to <a href={'/'} className={cs('mainBtn')}>Main?</a></p>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <div>Bus Timetable</div>
          <table>
            <thead>
            <tr>
              <th>시간</th>
              <th>경로</th>
              <th>번호</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(data.table).map((log: any) => (
              <tr key={1}>
                <td>{log.starting_point}</td>
                <td>{log.route}</td>
                <td>{log.time}</td>
              </tr>
            ))}
            </tbody>
          </table>
          <FancyModal/>
        </div>
      )
    }
  }
}