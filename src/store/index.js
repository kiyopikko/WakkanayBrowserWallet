import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { addressReducer } from './address'
import { tokenBalanceReducer } from './tokenBalanceList'
import { addressListReducer } from './address_list_item'
import { editedAddressListItemReducer } from './edited_address_list_item.js'
import { filterReducer } from './transaction_history'
import { depositReducer } from './deposit'
import { transferReducer } from './transfer'
import { withdrawReducer } from './withdraw'
import { appStatusReducer } from './appStatus'
import { exchangeReducer } from './exchange'

const reducer = combineReducers({
  address: addressReducer,
  balance: tokenBalanceReducer,
  addressList: addressListReducer,
  editedAddressListItem: editedAddressListItemReducer,
  currentFilter: filterReducer,
  depositState: depositReducer,
  transferState: transferReducer,
  withdrawState: withdrawReducer,
  appStatus: appStatusReducer,
  exchangeState: exchangeReducer
})

export const initStore = initialState => {
  return createStore(reducer, initialState, applyMiddleware(logger, thunk))
}
