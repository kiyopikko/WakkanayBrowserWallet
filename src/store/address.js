import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setAddress = createAction('SET_ADDRESS')

// thunk action: higher order function
export const getAddress = () => {
  return dispatch => {
    const client = clientWrapper.getClient()
    if (!client) return
    client.getAddress().then(value => {
      dispatch(setAddress(value))
    })
  }
}

export const addressReducer = createReducer(
  '0x0000000000000000000000000000000000000000',
  {
    [setAddress]: (state, action) => action.payload
  }
)
