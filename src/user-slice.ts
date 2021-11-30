import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { close } from './modal-slice'
import type { AppState, AppThunk } from './store'
import { login } from './user-api'

export interface UserState {
  status: 'idle' | 'loading' | 'error'
  name?: string
  errorMessage?: string
}

const initialState: UserState = {
  status: 'idle',
}

export const loginAsync = createAsyncThunk(
  'user/login',
  async ({ username, password }: User, { dispatch }) => {
    const response = await login({ username, password })
    if (response.name) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user-name', response.name)
      }

      dispatch(close())
    }

    return response
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle'
      state.errorMessage = undefined
    },
    logout: (state) => {
      state.status = 'idle'
      state.name = undefined
      state.errorMessage = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload.name) {
          state.status = 'idle'
          state.name = action.payload.name
        } else {
          state.status = 'error'
          state.errorMessage = action.payload.errorMessage!
        }
      })
  },
})

export const logout = (): AppThunk => {
  return (dispatch) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user-name')
    }

    dispatch(userSlice.actions.logout())
  }
}

export const { reset } = userSlice.actions

export const selectName = (state: AppState) => state.user.name
export const selectStatus = (state: AppState) => state.user.status
export const selectErrorMessage = (state: AppState) => state.user.errorMessage

export default userSlice.reducer
