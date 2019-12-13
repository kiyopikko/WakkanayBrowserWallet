import { createAction, createReducer } from '@reduxjs/toolkit'

export const setWithdrawnToken = createAction('SET_WITHDRAWN_TOKEN')
export const setWithdrawnTokenUnit = createAction('SET_WITHDRAWN_TOKEN_UNIT')

export const withdrawnTokenSelectReducer = createReducer('Ethereum', {
  [setWithdrawnToken]: (state, action) => action.payload
})

export const withdrawnTokenUnitSelectReducer = createReducer('USD', {
  [setWithdrawnTokenUnit]: (state, action) => action.payload
})

// state = {
// currentToken: [tokenName:"Ethereum (ETH)", currencyName:"ETH"] | [tokenName:"Dai (DAI)", currencyName:DAI]}]
// currentUnit: "USD" | "EUR" | "JPY"
//  }
