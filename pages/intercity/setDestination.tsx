import React, {useEffect, useState} from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/intercity/components.module.scss'
import Depart from '../components/Depart'
import Arrive from '../components/Arrive'

const cs = classNames.bind(styles)

export default function SetDestination() {
  const [location, setLocation] = useState<number>(0)

  const alertOnce = () => {
    alert('도리원에서 출발하는 버스를 타시면 출발, 도착하는 버스를 타시면 도착 버튼을 눌러주세요.')
  }

  useEffect(() => {
    alertOnce()
  }, [])

  return (
    <div className="container">
      <div className={cs('btnContainer')}>
        <button className={cs('setLocationBtn')} onClick={(e) => setLocation(1)}>출발</button>
        <button className={cs('setLocationBtn', 'setLocationBtn2')} onClick={(e) => setLocation(2)}>도착</button>
      </div>
      {
        location == 1 && (
          <Depart/>
        )
      }
      {
        location == 2 && (
          <Arrive/>
        )
      }
    </div>
  )
}
