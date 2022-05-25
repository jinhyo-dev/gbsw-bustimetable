import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import {useRouter} from 'next/router'
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import styles from '../../styles/city/modal.module.scss'
import classNames from "classnames/bind"
import {table} from 'table';

const cs = classNames.bind(styles)

const FancyModal = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const {
    data,
    error
  } = useSWR(`../api/cityBusTable?start=${router.query.starting_point}&destination=${router.query.destination}`, fetcher)

  console.log(isOpen)


  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  console.log(data.AllTable)

  return (
    <div>
      <button onClick={toggleModal} className={cs('information')}>운행정보</button>
      <Modal isOpen={isOpen} className={cs('modal')}>
        <div onClick={toggleModal} className={cs('overlay')}>
          <table className={cs('table')}>
            <thead style={{textAlign: 'center'}}>
            <tr>
              <th>시간</th>
              <th>번호</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(data.AllTable).map((log: any) => (
              <tr key={1}>
                <td className={cs('time')}>{log.time}</td>
                <td className={cs('number')}>{log.bus_num}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  )
}

export default FancyModal