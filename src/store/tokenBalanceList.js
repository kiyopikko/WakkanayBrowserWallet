import { Address } from '@cryptoeconomicslab/primitives'
import { createAction, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'
import { formatEther } from 'ethers/utils'
import clientWrapper from '../client'
import { TOKEN_LIST } from '../tokens'

export const setL1Balance = createAction('SET_L1_BALANCE')
export const setL1TotalBalance = createAction('SET_L1_TOTAL_BALANCE')
export const setTokenBalance = createAction('SET_TOKEN_BALANCE')
export const setTokenTotalBalance = createAction('SET_TOKEN_TOTAL_BALANCE')
export const setETHtoUSD = createAction('SET_ETH_TO_USD')

async function getL1BalanceFunc() {
  const client = await clientWrapper.getClient()
  if (!client) return
  const balance = TOKEN_LIST.reduce(async (map, token) => {
    // TODO: all tokens will be ERC20
    const addr = token.tokenContractAddress
      ? Address.from(token.tokenContractAddress)
      : undefined
    const balance = await client.wallet.getL1Balance(addr)
    map[token.unit] = {
      name: token.name,
      amount: balance.value.raw,
      decimals: balance.decimals
    }
    return map
  }, {})
  return balance
}
export const getL1Balance = () => {
  return async dispatch => {
    const balances = await getL1BalanceFunc()
    dispatch(setL1Balance(balances))
  }
}
export const getL1TotalBalance = () => {
  return async dispatch => {
    const balance = await getL1BalanceFunc()
    const ethUSD = await getETHtoUSDFunc()
    let total = 0
    for (const [key, value] of Object.entries(balance)) {
      if (key === 'ETH') {
        total += formatEther(value.amount.toString()) * ethUSD
      } else {
        total += Number(value.amount.toString())
      }
    }
    dispatch(setL1TotalBalance(total))
  }
}

// thunk action: higher order function to get deposited token balance from mock client
async function getBalanceFunc() {
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
  return balance
}
export const getBalance = () => {
  return async dispatch => {
    const balance = await getBalanceFunc()
    dispatch(setTokenBalance(balance))
  }
}
export const getTotalBalance = () => {
  return async dispatch => {
    const balance = await getBalanceFunc()
    const ethUSD = await getETHtoUSDFunc()
    let total = 0
    for (const [key, value] of Object.entries(balance)) {
      if (key === 'ETH') {
        total += formatEther(value.amount.toString()) * ethUSD
      } else {
        total += Number(formatEther(value.amount.toString()))
      }
    }
    dispatch(setTokenTotalBalance(total))
  }
}

// thunk action: higher order function to get deposited token's fiat balance
const EtherLatestPriceURL =
  'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=ANJAFJARGHU6JKSBJ7G6YG4N3TSKUMV2PG'
async function getETHtoUSDFunc() {
  const res = await axios.get(EtherLatestPriceURL)
  return res.data.result.ethusd
}
export const getETHtoUSD = () => {
  return async dispatch => {
    const ethusd = await getETHtoUSDFunc()
    dispatch(setETHtoUSD(ethusd))
  }
}

export const tokenBalanceReducer = createReducer(
  {
    l1Balance: {},
    l1TotalBalance: 0,
    tokenBalance: {},
    tokenTotalBalance: 0,
    ETHtoUSD: 0
  },
  {
    [setL1Balance]: (state, action) => {
      state.l1Balance = action.payload
    },
    [setL1TotalBalance]: (state, action) => {
      state.l1TotalBalance = action.payload
    },
    [setTokenBalance]: (state, action) => {
      state.tokenBalance = action.payload
    },
    [setTokenTotalBalance]: (state, action) => {
      state.tokenTotalBalance = action.payload
    },
    [setETHtoUSD]: (state, action) => {
      state.ETHtoUSD = action.payload
    }
  }
)
