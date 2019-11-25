import { combineReducers, createStore } from 'redux'

//Action Creator
/**
 * state = {
 *  address: address
 *  balance: [{tokenAddress: string, tokenName: string, amount: number}]
 * }
 *
 * action = {
 *   type: string,
 *   payload: {isOpen: Boolean},
 * }
 */

export const setAddress = address => ({
  type: 'SET_ADDRESS',
  payload: {
    address: address
  }
})

export const setBalance = balance => ({
  type: 'SET_BALANCE',
  payload: balance
})

// Reducer

export function addressReducer(
  state = '0x0000000000000000000000000000000000000000',
  action
) {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { address: action.payload.address }
    default:
      return state
  }
}

export function balanceReducer(
  state = [
    {
      tokenAddress: '0x0000000000000000000000000000000000000000',
      tokenName: 'eth',
      amount: 1.2
    },
    {
      tokenAddress: '0x0000000000000000000000000000000000000001',
      tokenName: 'dai',
      amount: 204
    }
  ],
  action
) {
  switch (action.type) {
    case 'SET_BALANCE':
      return action.payload
    default:
      return state
  }
}

const reducer = combineReducers({
  address: addressReducer,
  balance: balanceReducer
})

export const initStore = initialState => {
  return createStore(reducer, initialState)
}
