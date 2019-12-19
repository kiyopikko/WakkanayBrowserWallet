import { createAction, createReducer } from '@reduxjs/toolkit'

export const setToken = createAction('SET_TOKEN')

export const tokenSelectReducer = createReducer('Ethereum', {
  [setToken]: (state, action) => action.payload
})

// state = {
// currentToken: [tokenName:"Ethereum (ETH)", currencyName:"ETH"] | [tokenName:"Dai (DAI)", currencyName:DAI]}]
//  }
