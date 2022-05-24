import React, {useState} from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import FancyModal from "../components/FancyModal"
import styles from '../../styles/city/Table.module.scss'
import classNames from 'classnames/bind'

const cs = classNames.bind(styles)

export default function Table() {
  let today = new Date()
  let hours = ('0' + today.getHours()).slice(-2)
  let minutes = ('0' + today.getMinutes()).slice(-2)
  let timeString = hours + '시   ' + minutes + '분'

  const router = useRouter()
  const {
    data,
    error
  } = useSWR(`../api/cityBusTable?start=${router.query.starting_point}&destination=${router.query.destination}`, fetcher)

  const getRemainTime = (currentTime: string, busTime: string) => {
    let currentTimeArray = currentTime.split(' ')
    let busTimeArray = busTime.split(':')
    let currentHour = Number(currentTimeArray[0].slice(0, -1))
    let currentMinute = Number(currentTimeArray[3].slice(0, -1))
    let busHour = Number(busTimeArray[0])
    let busMinute = Number(busTimeArray[1])

    if (busHour == currentHour) {
      return String(busMinute - currentMinute) + '분'
    } else {
      if (busMinute - currentMinute >= 0) {
        if (busHour === currentHour + 1) {
          return String(busMinute - currentMinute) + '분'
        } else {
          return String(busHour - currentHour) + '시간 ' + String(busMinute - currentMinute) + '분'
        }
      } else {
        if (busHour === currentHour + 1) {
          return String(60 - currentMinute + busMinute) + '분'
        } else {
          return String(busHour - currentHour - 1) + '시간 ' + String(60 - currentMinute + busMinute) + '분'
        }
      }
    }
  }

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
          <div className={cs('routerQuery')}>{router.query.starting_point} <span
            className={cs('arrowIcon')}>➦</span> {router.query.destination}</div>
          <div className={cs('notExist')}><span className={cs('infoIcon')}>ⓘ</span> 다음 버스가 없습니다.</div>
          <FancyModal/>
          <p>Go to <a href={'/'} className={cs('mainBtn')}>Main?</a></p>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <div className='title'>Bus Timetable</div>
          <div className={cs('routerQuery')}>{router.query.starting_point} <span
            className={cs('arrowIcon')}>➦</span> {router.query.destination}</div>
          <div className={cs('currentTime')}>현재 시간 : {timeString}</div>
          <table className={cs('mainTable')}>
            <thead>
            <tr>
              <th>시간</th>
              <th>번호</th>
              <th>남은시간</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(data.table).map((log: any) => (
              <tr key={1}>
                <td className={cs('time')}><span>다음버스</span>{log.time}</td>
                <td className={cs('bus_num')}>{log.bus_num}</td>
                <td className={cs('remainTime')}>{getRemainTime(timeString, log.time)}</td>
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