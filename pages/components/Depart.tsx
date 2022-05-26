import React, { useState } from 'react'
import Link from 'next/link';
import classNames from 'classnames/bind'
import styles from '../../styles/intercity/components.module.scss'
import {toast, ToastContainer} from "react-toastify";
import { useRouter} from "next/router";

const cs = classNames.bind(styles)

export default function Depart() {
  const router = useRouter()
  const [pos, setPos] = useState<string>('')

  const changePage = () => {
    if (!pos || pos === 'back') {
      toast.error('도착지를 선택해주세요.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      router.push(`/intercity/Table?starting_point=도리원&destination=${pos}`)
    }
  }

  return (
    <>
      <div className={cs('defaultLocation')}>도리원버스터미널 </div>
      <div className={cs('arrow', 'greenArrow')} style={{}}>⇂</div>
      <div className="selectBox">
        <select id="select-box1" className="selects" onChange={(e) => { setPos(e.target.value) }}>
          <option value="back">도착지를 선택하세요</option>
          <option value="구미">구미종합버스터미널</option>
          <option value="군위">군위시외버스공용터미널</option>
          <option value="북대구">대구북부시외버스터미널</option>
          <option value="동서울">동서울종합터미널</option>
          <option value="안동">안동터미널</option>
          <option value="인천">인천종합터미널</option>
        </select>
      </div>
      <button className='btn' onClick={changePage}>확인</button>
      <ToastContainer />
    </>
  )
}