import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Table() {
  const router = useRouter()
  console.log(router.query.start, router.query.arrive)
  return (
    <div>table</div>
  )
}