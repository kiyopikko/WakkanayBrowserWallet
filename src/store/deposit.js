import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setDepositedToken = createAction('SET_DEPOSITED_TOKEN')
export const setDepositPage = createAction('SET_DEPOSIT_PAGE')

export const depositReducer = createReducer(
  { depositedToken: process.env.PETH_ADDRESS, depositPage: 'input-page' },
  {
    [setDepositedToken]: (state, action) => {
      state.depositedToken = action.payload
    },
    [setDepositPage]: (state, action) => {
      state.depositPage = action.payload
    }
  }
)

export const deposit = (amount, addr) => {
  console.log('deposit', amount, addr)
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.deposit(Number(amount), addr)
      dispatch(setDepositPage('completion-page'))
    } catch (error) {
      console.log(error)
    }
  }
}
