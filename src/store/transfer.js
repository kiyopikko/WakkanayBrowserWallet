import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setTransferredToken = createAction('SET_TRANSFERRED_TOKEN')
export const setTransferredAmount = createAction('SET_TRANSFERRED_AMOUNT')
export const setRecepientAddress = createAction('SET_RECEPIENT_ADDRESS')
export const setTransferPage = createAction('SET_TRANSFER_PAGE')

export const transferReducer = createReducer(
  {
    transferredToken: undefined,
    transferredAmount: 0,
    recepientAddress: '0x00000000000',
    transferPage: 'confirmation-page'
  },
  {
    [setTransferredToken]: (state, action) => {
      state.transferredToken = action.payload
    },
    [setTransferredAmount]: (state, action) => {
      state.transferredAmount = action.payload
    },
    [setRecepientAddress]: (state, action) => {
      state.recepientAddress = action.payload
    },
    [setTransferPage]: (state, action) => {
      state.transferPage = action.payload
    }
  }
)
export const transfer = (amount, depositContractAddress, recepientAddress) => {
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.transfer(
        Number(amount),
        depositContractAddress,
        recepientAddress
      )
      dispatch(setTransferPage('completion-page'))
    } catch (error) {
      console.log(error)
    }
  }
}
