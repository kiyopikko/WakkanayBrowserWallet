import { createAction, createReducer } from '@reduxjs/toolkit'

export const registerAddressListItem = createAction(
  'REGISTER_ADDRESS_LIST_ITEM'
)
export const editAddressListItem = createAction('EDIT_ADDRRESS_LIST_ITEM')
export const removeAddressListItem = createAction('REMOVE_ADDRESS_LIST_ITEM')

export const addressListReducer = createReducer([], {
  [registerAddressListItem]: (state, action) => {
    const addressListItem = action.payload
    state.push(addressListItem)
  },
  [editAddressListItem]: (state, action) => {
    const isEdited = element => element.id === action.payload.id
    const editedAddressListItemIndex = state.findIndex(isEdited)
    state[editedAddressListItemIndex].name = action.payload.name
    state[editedAddressListItemIndex].address = action.payload.address
  },
  [removeAddressListItem]: (state, action) => {
    const isRemoved = element => element.id === action.payload
    const removedAddressListItemIndex = state.findIndex(isRemoved)
    state.splice(removedAddressListItemIndex, 1)
  }
})
