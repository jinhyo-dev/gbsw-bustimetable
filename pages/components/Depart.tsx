import React, { useState } from 'react'
import Link from 'next/link';
import classNames from 'classnames/bind'
import styles from '../../styles/intercity/components.module.scss'

const cs = classNames.bind(styles)

export default function Depart() {
  const [pos, setPos] = useState<string>('')
  return (
    <>
      <div className={cs('defaultLocation')}>도리원버스터미널 </div>
      <div className={cs('arrow')} style={{}}>⇂</div>
      <div className="selectBox">
        <select id="select-box1" className="selects" onChange={(e) => { setPos(e.target.value) }}>
          <option value="back">도착지를 선택하세요</option>
          <option value="구미">구미종합버스터미널</option>
          <option value="군위">군위시외버스공용터미널</option>
          <option value="대구">대구북부시외버스터미널</option>
          <option value="서울">동서울종합터미널</option>
          <option value="안동">안동터미널</option>
          <option value="인천">인천종합터미널</option>
        </select>
      </div>
      <Link href={"/arrive?destinationLocation=" + pos}><button className='btn'>확인</button></Link>
    </>
  )
}