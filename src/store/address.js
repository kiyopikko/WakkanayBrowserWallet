import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setAddress = createAction('SET_ADDRESS')

// thunk action: higher order function
export const getAddress = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const addr = client.address
    dispatch(setAddress(addr))
  }
}

export const addressReducer = createReducer('', {
  [setAddress]: (state, action) => action.payload
})
