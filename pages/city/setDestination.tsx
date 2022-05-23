import React, { useState } from 'react'
import Select from 'react-select'
import styles from '../../styles/city/setLocation.module.scss'
import classNames from 'classnames/bind'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const cs = classNames.bind(styles)

export default function SetDestination() {
  const router = useRouter()
  const [startLocation, setStartLocation] = useState<string>('')
  const [arriveLocation, setArriveLocation] = useState<string>('')

  const changePage = () => {
    if (!startLocation || !arriveLocation) {
      toast.error('출발지와 목적지를 확인해주세요.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    else if (startLocation === arriveLocation) {
      toast.error('출발지와 목적지가 같습니다.', {
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
      router.push('/city/Table?starting_point=' + startLocation + '&destination=' + arriveLocation)
    }
  }

  const starts = [
    { value: '봉양', label: '봉양' },
    { value: '안계', label: '안계' },
    { value: '의성', label: '의성' },
    { value: '탑리', label: '탑리' }
  ]

  const arrives = [
    { value: '봉양', label: '봉양' },
    { value: '안계', label: '안계' },
    { value: '의성', label: '의성' },
    { value: '탑리', label: '탑리' }
  ]

  return (
    <div>
      <div className='container' style={{ marginTop: '3rem' }}>
        <div className={cs('title')}>출발지와 목적지를 <br />선택하세요.</div>
        <Select options={starts} className={cs('select', 'select1')} onChange={(e: any) => { setStartLocation(e.value) }} />
        <Select options={arrives} className={cs('select', 'select2')} onChange={(e: any) => { setArriveLocation(e.value)}} />
        <button onClick={changePage} className='btn'>확인</button>
      </div>
      <ToastContainer />
    </div>
  )
}