import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setUserAddress = createAction('SET_USER_ADDRESS')

// thunk action: higher order function
export const getAddress = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const addrece = client.address
    dispatch(setUserAddress(addrece))
  }
}

export const addressReducer = createReducer('', {
  [setUserAddress]: (state, action) => action.payload
})
