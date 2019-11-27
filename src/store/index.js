import { combineReducers, createStore } from 'redux'

import { addressReducer } from './address'
import { balanceReducer } from './balance'
import { addressBookReducer } from './address_book_register'
import { editedAddressListReducer } from './address_book_edit'

/**
 * state = {
 *  address: address
 *  balance: [{tokenAddress: string, tokenName: string, amount: number}]
 *  addressLists: [{id: number, name: string, address: string}]
 *  editedAddress: string
 *  editedName: string
 * }
 */

const reducer = combineReducers({
  address: addressReducer,
  balance: balanceReducer,
  addressLists: addressBookReducer,
  editedAddress: editedAddressListReducer,
  editedName: editedAddressListReducer
})

export const initStore = initialState => {
  return createStore(reducer, initialState)
}
