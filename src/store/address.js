import { createAction, createReducer } from '@reduxjs/toolkit'

export const setAddress = createAction('SET_ADDRESS')

export const addressReducer = createReducer(
  '0x0000000000000000000000000000000000000000',
  {
    [setAddress]: (state, action) => action.payload
  }
)
