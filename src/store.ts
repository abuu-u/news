import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import modalReducer from './modal-slice'
import userReducer from './user-slice'

let userName: string | undefined

if (typeof window !== 'undefined') {
  userName = localStorage.getItem('user-name') ?? undefined
}

export function makeStore() {
  return configureStore({
    reducer: { modal: modalReducer, user: userReducer },
    preloadedState: {
      user: {
        name: userName,
        status: 'idle',
      },
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
