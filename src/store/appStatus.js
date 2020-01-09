import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'

const APP_STATUS = {
  UNLOADED: 'unloaded',
  LOADED: 'loaded',
  INITIAL: 'initial',
  ERROR: 'error'
}

export const setAppStatus = createAction('SET_APP_STATUS')
export const setAppError = createAction('SET_APP_ERROR')

export const appStatusReducer = createReducer(
  { status: APP_STATUS.INITIAL, error: null },
  {
    [setAppStatus]: (state, action) => {
      state.status = action.payload
    },
    [setAppError]: (state, action) => {
      state.error = action.payload
    }
  }
)

export const checkClientInitialized = () => {
  return dispatch => {
    if (clientWrapper.getClient()) {
      dispatch(setAppStatus(APP_STATUS.LOADED))
    } else {
      dispatch(setAppStatus(APP_STATUS.UNLOADED))
    }
  }
}

export const initializeClient = privateKey => {
  return async dispatch => {
    dispatch(setAppError(null))
    try {
      await clientWrapper.initializeClient(privateKey)
      dispatch(setAppStatus(APP_STATUS.LOADED))
    } catch (error) {
      dispatch(setAppStatus(APP_STATUS.ERROR))
      dispatch(setAppError(error))
    }
  }
}
