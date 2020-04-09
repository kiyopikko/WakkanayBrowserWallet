import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'
import { utils } from 'ethers'
import JSBI from 'jsbi'
import { config } from '../config'

export const setTransferredToken = createAction('SET_TRANSFERRED_TOKEN')
export const setTransferredAmount = createAction('SET_TRANSFERRED_AMOUNT')
export const setRecepientAddress = createAction('SET_RECEPIENT_ADDRESS')
export const setTransferPage = createAction('SET_TRANSFER_PAGE')

export const transferReducer = createReducer(
  {
    transferredToken: config.payoutContracts.DepositContract,
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

/**
 * transfer token
 * @param {*} amount amount of wei
 * @param {*} depositContractAddress deposit contract address of token
 * @param {*} recipientAddress the address of token recipient
 */
export const transfer = (amount, depositContractAddress, recipientAddress) => {
  const amountWei = JSBI.BigInt(utils.parseEther(amount).toString())
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.transfer(amountWei, depositContractAddress, recipientAddress)
      dispatch(setTransferPage('completion-page'))
    } catch (error) {
      console.log(error)
    }
  }
}
