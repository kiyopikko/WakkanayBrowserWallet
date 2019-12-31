import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setBalance = createAction('SET_BALANCE')

export const getBalance = () => {
  return dispatch => {
    const client = clientWrapper.getClient()
    if (!client) return
    client.getBalance().then(value => {
      dispatch(setBalance(value[0].amount))
    })
  }
}

export const balanceReducer = createReducer(0, {
  [setBalance]: (state, action) => action.payload
})
