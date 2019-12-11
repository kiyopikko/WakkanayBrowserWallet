import { createAction, createReducer } from '@reduxjs/toolkit'

export const setFilter = createAction('SET_FILTER')

export const filterReducer = createReducer('Filter', {
  [setFilter]: (state, action) => action.payload
})

// state = {
// currentFilter: "Filter ▽" | "Address" | "Tokens" | "ENS" | "Block #" | "Range"
//  }
