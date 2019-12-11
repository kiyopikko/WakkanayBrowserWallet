import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { addressReducer } from './address'
import { balanceReducer } from './balance'
import { addressListReducer } from './address_list_item_register'
import { editedAddressListItemReducer } from './address_list_item_edit'
import { filterReducer } from './block_expolorer'
import { tokenSelectReducer } from './deposit_modal'
import { unitSelectReducer } from './deposit_modal'

/**
 * state = {
 *  address: address
 *  balance: [{tokenAddress: string, tokenName: string, amount: number}]
 *  addressList: [{id: number, name: string, address: string}]
 *  editedAddress: string
 *  editedName: string
 *  currentFilter: string
 *  currentToken: string
 *  currentUnit: string
 */

const reducer = combineReducers({
  address: addressReducer,
  balance: balanceReducer,
  addressList: addressListReducer,
  editedAddress: editedAddressListItemReducer,
  editedName: editedAddressListItemReducer,
  currentFilter: filterReducer,
  currentToken: tokenSelectReducer,
  currentUnit: unitSelectReducer
})

export const initStore = initialState => {
  return createStore(reducer, initialState, applyMiddleware(logger))
}
