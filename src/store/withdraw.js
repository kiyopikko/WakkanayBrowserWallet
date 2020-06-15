import { createAction, createReducer } from '@reduxjs/toolkit'
import { utils } from 'ethers'
import JSBI from 'jsbi'
import { getBalance } from './tokenBalanceList'
import clientWrapper from '../client'
import { config } from '../config'

export const setWithdrawToken = createAction('SET_WITHDRAW_TOKEN')
export const setWithdrawPage = createAction('SET_WITHDRAW_PAGE')

export const withdrawReducer = createReducer(
  {
    withdrawToken: config.PlasmaETH,
    withdrawPage: 'input-page'
  },
  {
    [setWithdrawToken]: (state, action) => {
      state.withdrawToken = action.payload
    },
    [setWithdrawPage]: (state, action) => {
      state.withdrawPage = action.payload
    }
  }
)

/**
 * withdraw token
 * @param {*} amount amount of wei to exit
 * @param {*} tokenContractAddress token contract address of token
 */
export const withdraw = (amount, tokenContractAddress) => {
  const amountWei = JSBI.BigInt(utils.parseEther(amount).toString())
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.startWithdrawal(amountWei, tokenContractAddress)
      dispatch(setWithdrawPage('completion-page'))
      dispatch(getBalance())
    } catch (error) {
      console.log(error)
    }
  }
}

export const completeWithdrawal = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const exitList = await client.getPendingWithdrawals()
    exitList.map(async exit => {
      try {
        console.log(exit)
        await client.completeWithdrawal(exit)
        dispatch({
          type: `NOTIFY_FINALIZE_EXIT`,
          payload: exit.id.intoHexString()
        })
      } catch (e) {
        // @NOTE: 'Exit property is not decidable' is fine
        if (e.message === 'Exit property is not decidable') return
        console.error(e)
        return
      }
    })
  }
}
export const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export const autoCompleteWithdrawal = async dispatch => {
  await sleep(20000)
  dispatch(completeWithdrawal())
  return await autoCompleteWithdrawal(dispatch)
}
