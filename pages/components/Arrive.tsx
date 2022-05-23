import React, {ChangeEvent, useState} from 'react'
import classNames from 'classnames/bind'
import styles from '../../styles/intercity/components.module.scss'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {router} from "next/client";
import {useRouter} from "next/router";

const cs = classNames.bind(styles)

export default function Arrive() {
  const router = useRouter()
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
      router.push('/intercity/Table?start=도리원&arrive=' + pos)
    }

  }
  const [pos, setPos] = useState<string>('')
  console.log(pos)
  return (
    <>
      <div className="selectBox" style={{marginTop: '2.5rem'}}>
        <select id="select-box1" className="selects" onChange={(e) => {
          setPos(e.target.value)
        }}>
          <option value="back">출발지를 선택하세요</option>
          <option value="구미">구미종합버스터미널</option>
          <option value="군위">군위시외버스공용터미널</option>
          <option value="북대구">대구북부시외버스터미널</option>
          <option value="동서울">동서울종합터미널</option>
          <option value="안동">안동터미널</option>
          <option value="인천">인천종합터미널</option>
        </select>
      </div>
      <div className={cs('arrow', 'redArrow')}>⇂</div>
      <div className={cs('defaultLocation')} style={{marginTop: '2rem'}}>도리원버스터미널</div>
      <button className="btn" onClick={changePage}>확인</button>
      <ToastContainer/>
    </>
  )
}