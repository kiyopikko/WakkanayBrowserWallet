import { createAction, createReducer } from '@reduxjs/toolkit'

export const setBalance = createAction('SET_BALANCE')

export const balanceReducer = createReducer(
  [
    {
      tokenAddress: '0x0000000000000000000000000000000000000000',
      tokenName: 'eth',
      amount: 1.2
    },
    {
      tokenAddress: '0x0000000000000000000000000000000000000001',
      tokenName: 'dai',
      amount: 204
    }
  ],
  {
    [setBalance]: (state, action) => action.payload
  }
)
