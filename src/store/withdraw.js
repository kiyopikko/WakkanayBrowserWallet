import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'
import { utils } from 'ethers'
import JSBI from 'jsbi'
import { config } from '../config'

export const setWithdrawToken = createAction('SET_WITHDRAW_TOKEN')
export const setWithdrawPage = createAction('SET_WITHDRAW_PAGE')

export const withdrawReducer = createReducer(
  {
    withdrawToken: config.payoutContracts.DepositContract,
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
 * @param {*} depositContractAddress deposit contract address of token
 */
export const withdraw = (amount, depositContractAddress) => {
  const amountWei = JSBI.BigInt(utils.parseEther(amount).toString())
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.exit(amountWei, depositContractAddress)
      dispatch(setWithdrawPage('completion-page'))
    } catch (error) {
      console.log(error)
    }
  }
}

export const finalizeExit = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const exitList = await client.getExitList()
    exitList.map(async exit => {
      try {
        console.log(exit)
        await client.finalizeExit(exit)
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

export const autoFinalizeExit = async dispatch => {
  await sleep(20000)
  dispatch(finalizeExit())
  return await autoFinalizeExit(dispatch)
}
