import { createAction, createReducer } from '@reduxjs/toolkit'

export const setWithdrawnToken = createAction('SET_WITHDRAWN_TOKEN')
export const setWithdrawPage = createAction('SET_WITHDRAW_PAGE')

export const withdrawReducer = createReducer(
  {
    withdrawnToken: 'Ethereum',
    withdrawPage: 'input-page'
  },
  {
    [setWithdrawnToken]: (state, action) => {
      state.withdrawnToken = action.payload
    },
    [setWithdrawPage]: (state, action) => {
      state.withdrawPage = action.payload
    }
  }
)
