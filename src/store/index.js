import { combineReducers, createStore } from 'redux'

import { addressReducer } from './address'
import { balanceReducer } from './balance'
import { addressListReducer } from './address_list_item_register'
import { editedAddressListItemReducer } from './address_list_item_edit'

/**
 * state = {
 *  address: address
 *  balance: [{tokenAddress: string, tokenName: string, amount: number}]
 *  addressList: [{id: number, name: string, address: string}]
 *  editedAddress: string
 *  editedName: string
 * }
 */

const reducer = combineReducers({
  address: addressReducer,
  balance: balanceReducer,
  addressList: addressListReducer,
  editedAddress: editedAddressListItemReducer,
  editedName: editedAddressListItemReducer
})

export const initStore = initialState => {
  return createStore(reducer, initialState)
}
