import { combineReducers, createStore } from 'redux'

import { addressReducer } from './address'
import { balanceReducer } from './balance'

/**
 * state = {
 *  address: address
 *  balance: [{tokenAddress: string, tokenName: string, amount: number}]
 * }
 */

const reducer = combineReducers({
  address: addressReducer,
  balance: balanceReducer
})

export const initStore = initialState => {
  return createStore(reducer, initialState)
}
