import { createAction, createReducer } from '@reduxjs/toolkit'

export const setEditedAddress = createAction('SET_EDITED_ADDRESS')
export const setEditedName = createAction('SET_EDITED_NAME')

export const editedAddressListItemReducer = createReducer(
  { name: 'Name', address: '0x00000000000' },
  {
    [setEditedName]: (state, action) => {
      state.name = action.payload
    },
    [setEditedAddress]: (state, action) => {
      state.address = action.payload
    }
  }
)
