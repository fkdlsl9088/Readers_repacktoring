import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AppLayout from '../components/Layout/AppLayout'
import Router from 'next/router'
import Head from 'next/head'

const mypage = () => {
  const { isLoggedIn } = useSelector(state => state.user)

  useEffect(() => {
    if (!isLoggedIn) {
      Router.replace('/')
    }
  }, [isLoggedIn])

  return (
    <AppLayout>
      <Head>
        <title>리더스 마이페이지</title>
      </Head>
      마이페이지
    </AppLayout>
  )
}

export default mypage
