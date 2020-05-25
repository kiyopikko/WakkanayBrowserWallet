import { formatEther } from 'ethers/utils'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { ActionType } from '@cryptoeconomicslab/plasma-light-client/lib/UserAction'
import clientWrapper from '../client'

export const setHistoryList = createAction('SET_HISTORY_LIST')

export const historyReducer = createReducer(
  {
    historyList: []
  },
  {
    [setHistoryList]: (state, action) => {
      state.historyList = action.payload
    }
  }
)

export const getTransactionHistories = () => {
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      const histories = (await client.getAllUserActions()).map(history => {
        return {
          type: history.type,
          message: ActionType[history.type],
          amount: formatEther(history.amount.toString()),
          // TODO: update client to get unit
          unit: 'ETH',
          blockNumber: history.blockNumber.raw
        }
      })
      dispatch(setHistoryList(histories))
    } catch (error) {
      console.log(error)
    }
  }
}

// state = {
// currentFilter: "Filter ▽" | "Address" | "Tokens" | "ENS" | "Block #" | "Range"
//  }
