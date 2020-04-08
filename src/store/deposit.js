import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'
import { utils } from 'ethers'
import JSBI from 'jsbi'

export const setDepositedToken = createAction('SET_DEPOSITED_TOKEN')
export const setDepositPage = createAction('SET_DEPOSIT_PAGE')

export const depositReducer = createReducer(
  {
    depositedToken: process.env.DEPOSIT_CONTRACT_ADDRESS,
    depositPage: 'input-page'
  },
  {
    [setDepositedToken]: (state, action) => {
      state.depositedToken = action.payload
    },
    [setDepositPage]: (state, action) => {
      state.depositPage = action.payload
    }
  }
)

/**
 * deposit
 * @param {*} amount formatted ether string. e.g. "0.1"
 * @param {*} addr deposit contract address
 */
export const deposit = (amount, addr) => {
  const amountWei = JSBI.BigInt(utils.parseEther(amount).toString())

  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.deposit(amountWei, addr)
      dispatch(setDepositPage('completion-page'))
    } catch (error) {
      console.log(error)
    }
  }
}
