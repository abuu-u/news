import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { close } from '../src/modal-slice'
import { useAppDispatch, useAppSelector } from '../src/store'
import {
  loginAsync,
  reset,
  selectErrorMessage,
  selectStatus,
} from '../src/user-slice'

const LoginModal: NextPage = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const serverError = useAppSelector(selectErrorMessage)
  const [formError, setFormError] = useState<string>('')
  const isError = formError.length > 0 || status === 'error'

  const userNameReference = useRef<HTMLInputElement>(null)
  const passwordReference = useRef<HTMLInputElement>(null)

  const formReference = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleClickOutside = (event_: Event) => {
      if (
        formReference.current &&
        !formReference.current.contains(event_.target as Node)
      ) {
        document.removeEventListener('keydown', handleEscClick)
        dispatch(close())
        dispatch(reset())
      }
    }

    const handleEscClick = (event_: KeyboardEvent) => {
      if (event_.key === 'Escape') {
        document.removeEventListener('mousedown', handleClickOutside)
        dispatch(close())
        dispatch(reset())
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscClick)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscClick)
    }
  }, [dispatch, formReference])

  return (
    <div className="modal">
      <form
        className="form"
        ref={formReference}
        onSubmit={(event_) => {
          event_.preventDefault()
          dispatch(reset())
          setFormError('')

          const username = userNameReference.current?.value
          const password = passwordReference.current?.value

          if (username && password) {
            dispatch(loginAsync({ username, password }))
          } else {
            setFormError('Имя и пароль должы быть заполнены')
          }
        }}
      >
        {isError && <p className="form__error">{serverError ?? formError}</p>}

        <label className="form__label label" htmlFor="username">
          Имя:
        </label>
        <input
          className="form__input input"
          ref={userNameReference}
          type="text"
          id="username"
        />

        <label className="form__label label" htmlFor="password">
          Пароль:
        </label>
        <input
          className="form__input input"
          ref={passwordReference}
          type="password"
          id="password"
        />

        <button className="form__button button" type="submit">
          Войти
        </button>
      </form>
    </div>
  )
}

export default LoginModal
