import { createAction, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'
import clientWrapper from '../client'

export const setL1Balance = createAction('SET_L1_BALANCE')
export const setTokenBalance = createAction('SET_TOKEN_BALANCE')
export const setETHtoUSD = createAction('SET_ETH_TO_USD')

export const getL1Balance = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const balance = await client.wallet.getL1Balance()
    dispatch(setL1Balance(balance.value.raw))
  }
}

// thunk action: higher order function to get deposited token balance from mock client
export const getBalance = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const balance = await client.getBalance()
    dispatch(setTokenBalance(balance))
  }
}
const EtherLatestPriceURL =
  'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=ANJAFJARGHU6JKSBJ7G6YG4N3TSKUMV2PG'

// thunk action: higher order function to get deposited token's fiat balance
export const getETHtoUSD = () => {
  return dispatch => {
    axios.get(EtherLatestPriceURL).then(response => {
      dispatch(setETHtoUSD(response.data.result.ethusd))
    })
  }
}

export const tokenBalanceReducer = createReducer(
  { L1Balance: 0, tokenBalanceList: [], ETHtoUSD: 0 },
  {
    [setL1Balance]: (state, action) => {
      state.L1Balance = action.payload
    },
    [setTokenBalance]: (state, action) => {
      state.tokenBalanceList = action.payload
    },
    [setETHtoUSD]: (state, action) => {
      state.ETHtoUSD = action.payload
    }
  }
)
