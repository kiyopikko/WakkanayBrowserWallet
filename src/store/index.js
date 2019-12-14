import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { addressReducer } from './address'
import { balanceReducer } from './balance'
import { addressListReducer } from './address_list_item_register'
import { editedAddressListItemReducer } from './address_list_item_edit'
import { filterReducer } from './block_expolorer'
import {
  tokenSelectReducer,
  unitSelectReducer,
  pageTransitionReducer
} from './deposit_modal'
import {
  withdrawnTokenSelectReducer,
  withdrawnTokenUnitSelectReducer
} from './withdraw_modal.js'

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
 *  currentPage: number
 *  currentlyWithdrawnToken: string
 *  currentlyWithdrawnTokenUnit: string
 */

const reducer = combineReducers({
  address: addressReducer,
  balance: balanceReducer,
  addressList: addressListReducer,
  editedAddress: editedAddressListItemReducer,
  editedName: editedAddressListItemReducer,
  currentFilter: filterReducer,
  currentToken: tokenSelectReducer,
  currentUnit: unitSelectReducer,
  currentPage: pageTransitionReducer,
  currentlyWithdrawnToken: withdrawnTokenSelectReducer,
  currentlyWithdrawnTokenUnit: withdrawnTokenUnitSelectReducer
})

export const initStore = initialState => {
  return createStore(reducer, initialState, applyMiddleware(logger))
}
