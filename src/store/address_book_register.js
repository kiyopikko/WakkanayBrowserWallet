import { createAction, createReducer } from '@reduxjs/toolkit'

export const registerAddressList = createAction('REGISTER_ADDRESS_LIST')
export const editAddressList = createAction('EDIT_ADDRRESS_LIST')
export const removeAddressList = createAction('REMOVE_ADDRESS_LIST')

export const addressBookReducer = createReducer([], {
  [registerAddressList]: (state, action) => {
    const addressList = action.payload
    state.push(addressList)
  },
  [editAddressList]: (state, action) => {
    const isEdited = element => element.id === action.payload.id
    const editedAddressListIndex = state.findIndex(isEdited)
    state[editedAddressListIndex].name = action.payload.name
    state[editedAddressListIndex].address = action.payload.address
  },
  [removeAddressList]: (state, action) => {
    const isRemoved = element => element.id === action.payload
    console.log(isRemoved)
    const removedAddressListIndex = state.findIndex(isRemoved)
    console.log(removedAddressListIndex)
    state.splice(removedAddressListIndex, 1)
  }
})
