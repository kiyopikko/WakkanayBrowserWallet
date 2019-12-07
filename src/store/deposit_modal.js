import { createAction, createReducer } from '@reduxjs/toolkit'

export const setToken = createAction('SET_TOKEN')
export const setUnit = createAction('SET_UNIT')

export const tokenSelectReducer = createReducer('ETH', {
  [setToken]: (state, action) => action.payload
})

export const unitSelectReducer = createReducer('USD', {
  [setUnit]: (state, action) => action.payload
})

// state = {
// currentToken: "Ethereum" | "Dai"}]
// currentUnit: "USD" | "EUR" | "JPY"
//  }
