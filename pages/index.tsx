import type { NextPage } from 'next'
import React, { useState } from "react";
import { useRouter } from 'next/router';
import styles from '../styles/index.module.scss'
import classNames from "classnames/bind"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cs = classNames.bind(styles)

const Home: NextPage = () => {
  const [location, setLocation] = useState<string>('')
  console.log(location)
  const router = useRouter()

  const changePage = () => {
    if (!location) {
      toast.info('둘 중 하나를 선택해주세요.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    else {
      router.push(location)
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className={cs('title')}>
        Bus Timetable
      </div>
      <div className={cs('container')}>
        <h1>Choose one!</h1>
        <div style={{ marginTop: '5rem' }}>
          <label className={cs("rad-label")} style={{ width: "16rem", margin: "auto" }}>
            <input type="radio" className={cs("rad-input")} name="rad" onChange={(e) => {
              setLocation('intercity/setDestination')
            }} />
            <div className={cs("rad-design")}></div>
            <div className={cs("rad-text")}>시외버스</div>
          </label><br />

          <label className={cs("rad-label")} style={{ width: "16rem", margin: "auto", marginTop: '1rem' }}>
            <input type="radio" className={cs("rad-input")} name="rad" onChange={(e) => {
              setLocation('city/setDestination')
            }} />
            <div className={cs("rad-design")}></div>
            <div className={cs("rad-text")}>농어촌버스</div>
          </label>
        </div>
        <button className={cs('btn')} onClick={changePage}>확인</button>
      </div>
    </div>
  )
}

export default Home