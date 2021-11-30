import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from './store'

export interface ModalState {
  isOpen: boolean
}

const initialState: ModalState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
  },
})

export const { open, close } = modalSlice.actions

export const selectIsOpen = (state: AppState) => state.modal.isOpen

export default modalSlice.reducer
