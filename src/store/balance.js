import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'
import axios from 'axios'

export const setBalance = createAction('SET_BALANCE')
export const setETHtoUSD = createAction('SET_ETH_TO_USD')

// thunk action: higher order function to get deposited token balance from mock client
export const getBalance = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const balance = await client.getBalance()
    dispatch(setBalance(balance[0].amount))
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

export const balanceReducer = createReducer(
  {
    balance: 0,
    ETHtoUSD: 0
  },
  {
    [setBalance]: (state, action) => {
      state.balance = action.payload
    },
    [setETHtoUSD]: (state, action) => {
      state.ETHtoUSD = action.payload
    }
  }
)
