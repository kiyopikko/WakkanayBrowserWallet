import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setDepositedToken = createAction('SET_DEPOSITED_TOKEN')
export const setDepositPage = createAction('SET_DEPOSIT_PAGE')

export const depositReducer = createReducer(
  { depositedToken: 'Ethereum', depositPage: 'input-page' },
  {
    [setDepositedToken]: (state, action) => {
      state.depositedToken = action.payload
    },
    [setDepositPage]: (state, action) => {
      state.depositPage = action.payload
    }
  }
)

export const deposit = amount => {
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.deposit(amount)
      dispatch(setDepositPage('completion-page'))
    } catch (error) {
      console.log(error)
    }
  }
}
