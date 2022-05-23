import React from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Table = () => {
    const router = useRouter()
    console.log(router.query.arrive)
  return (
      <div>

      </div>
    )
}

export default Table;