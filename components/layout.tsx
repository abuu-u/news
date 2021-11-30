import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.svg'
import { open } from '../src/modal-slice'
import { useAppDispatch, useAppSelector } from '../src/store'
import { logout, selectName } from '../src/user-slice'

const Layout: NextPage = ({ children }) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = !!useAppSelector(selectName)

  return (
    <div>
      <header className="main-header">
        <nav className="nav container">
          <Link href="/">
            <a className="nav__link nav__link--img">
              <Image src={logo} width="257" height="48" alt="Логотип" />
            </a>
          </Link>
          <Link href="/news">
            <a className="nav__link">Новости</a>
          </Link>
          {!isLoggedIn ? (
            <button
              className="button"
              onClick={(event_) => {
                event_.preventDefault()
                dispatch(open())
              }}
              type="button"
            >
              Вход
            </button>
          ) : (
            <button
              className="button"
              onClick={(event_) => {
                event_.preventDefault()
                dispatch(logout())
              }}
              type="button"
            >
              Выход
            </button>
          )}
        </nav>
      </header>

      <main className="container">{children}</main>
    </div>
  )
}

export default Layout
