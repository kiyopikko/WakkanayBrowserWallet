import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

export const setToken = createAction('SET_TOKEN')
export const setUnit = createAction('SET_UNIT')
export const setPage = createAction('SET_PAGE')

export const tokenSelectReducer = createReducer('Ethereum', {
  [setToken]: (state, action) => action.payload
})

export const unitSelectReducer = createReducer('USD', {
  [setUnit]: (state, action) => action.payload
})

export const pageTransitionReducer = createReducer(0, {
  [setPage]: (state, action) => action.payload
})

export const deposit = amount => {
  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      await client.deposit(amount)
      dispatch(setPage(2))
    } catch (error) {
      console.log(error)
    }
  }
}

// state = {
// currentToken: [tokenName:"Ethereum (ETH)", currencyName:"ETH"] | [tokenName:"Dai (DAI)", currencyName:DAI]}]
// currentUnit: "USD" | "EUR" | "JPY"
// currentPage: 0
//  }
