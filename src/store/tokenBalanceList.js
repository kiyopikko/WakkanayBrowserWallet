import { Address } from '@cryptoeconomicslab/primitives'
import { createAction, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'
import { formatEther } from 'ethers/utils'
import { createSelector } from 'reselect'
import clientWrapper from '../client'
import { TOKEN_LIST } from '../constants/tokens'

// selector
const getL1BalanceState = state => state.tokenBalance.l1Balance
const getTokenBalanceState = state => state.tokenBalance.tokenBalance
const getEthToUsdState = state => state.tokenBalance.ETHtoUSD

const calcTotalBalance = (balance, ethToUsd) => {
  let total = 0
  for (const [key, value] of Object.entries(balance)) {
    if (key === 'ETH') {
      total += formatEther(value.amount.toString()) * ethToUsd
    } else {
      total += Number(formatEther(value.amount.toString()))
    }
  }
  return total
}

export const getL1TotalBalance = createSelector(
  [getL1BalanceState, getEthToUsdState],
  (l1Balance, ethToUsd) => {
    return calcTotalBalance(l1Balance, ethToUsd)
  }
)

export const getTokenTotalBalance = createSelector(
  [getTokenBalanceState, getEthToUsdState],
  (tokenBalance, ethToUsd) => {
    return calcTotalBalance(tokenBalance, ethToUsd)
  }
)

// actions
export const setL1Balance = createAction('SET_L1_BALANCE')
export const setTokenBalance = createAction('SET_TOKEN_BALANCE')
export const setETHtoUSD = createAction('SET_ETH_TO_USD')

export const getL1Balance = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const balance = await TOKEN_LIST.reduce(async (map, token) => {
      // TODO: all tokens will be ERC20
      const addr = token.tokenContractAddress
        ? Address.from(token.tokenContractAddress)
        : undefined
      const balance = await client.wallet.getL1Balance(addr)
      map[token.unit] = {
        amount: balance.value.raw,
        decimals: balance.decimals
      }
      return map
    }, {})
    console.log('BALANCE:', balance)
    dispatch(setL1Balance(balance))
  }
}

// thunk action: higher order function to get deposited token balance from mock client
export const getBalance = () => {
  return async dispatch => {
    const client = await clientWrapper.getClient()
    if (!client) return
    const balanceList = await client.getBalance()
    const balance = balanceList.reduce((map, balance) => {
      // TODO: update after gazelle balance
      // map[balance.symbol] = {
      const token = TOKEN_LIST.find(
        ({ depositContractAddress }) =>
          depositContractAddress.toLowerCase() ===
          balance.depositContractAddress.toLowerCase()
      )
      map[token.unit] = {
        amount: balance.amount.toString(),
        decimals: balance.decimals
      }
      return map
    }, {})
    dispatch(setTokenBalance(balance))
  }
}

// thunk action: higher order function to get deposited token's fiat balance
const EtherLatestPriceURL =
  'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=ANJAFJARGHU6JKSBJ7G6YG4N3TSKUMV2PG'

export const getETHtoUSD = () => {
  return async dispatch => {
    const res = await axios.get(EtherLatestPriceURL)
    dispatch(setETHtoUSD(res.data.result.ethusd))
  }
}

export const tokenBalanceReducer = createReducer(
  {
    l1Balance: {},
    tokenBalance: {},
    ETHtoUSD: 0
  },
  {
    [setL1Balance]: (state, action) => {
      state.l1Balance = action.payload
    },
    [setTokenBalance]: (state, action) => {
      state.tokenBalance = action.payload
    },
    [setETHtoUSD]: (state, action) => {
      state.ETHtoUSD = action.payload
    }
  }
)
