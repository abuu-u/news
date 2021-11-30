import type { NextPage } from 'next'
import Head from 'next/head'
import { useAppSelector } from '../src/store'
import { selectName } from '../src/user-slice'

const Home: NextPage = () => {
  const username = useAppSelector(selectName)

  return (
    <div>
      <Head>
        <title>Главная</title>
      </Head>

      <h1 className="header">Привет, {username ?? 'Гость'}</h1>
    </div>
  )
}

export default Home
