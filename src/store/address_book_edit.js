import { createAction, createReducer } from '@reduxjs/toolkit'

export const setEditedAddress = createAction('SET_EDITED_ADDRESS')
export const setEditedName = createAction('SET_EDITED_NAME')

export const editedAddressListReducer = createReducer(null, {
  [setEditedAddress]: (state, action) => action.payload,
  [setEditedName]: (state, action) => action.payload
})
