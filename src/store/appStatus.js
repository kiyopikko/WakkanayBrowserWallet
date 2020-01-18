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
  return async dispatch => {
    if (!process.browser) {
      dispatch(setAppStatus(APP_STATUS.UNLOADED))
      return
    }

    const client = clientWrapper.getClient()
    if (client) {
      dispatch(setAppStatus(APP_STATUS.LOADED))
      return
    }

    const localKey = localStorage.getItem('privateKey')
    if (localKey) {
      try {
        await clientWrapper.initializeClient(localKey)
        dispatch(setAppStatus(APP_STATUS.LOADED))
      } catch (e) {
        localStorage.removeItem('privateKey')
        dispatch(setAppStatus(APP_STATUS.UNLOADED))
      }
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
      dispatch(setAppError(error))
      dispatch(setAppStatus(APP_STATUS.ERROR))
    }
  }
}

export const initializeMetamaskWallet = () => {
  return async dispatch => {
    dispatch(setAppError(null))
    try {
      // identify the Snap by the location of its package.json file
      const snapId = new URL('package.json', window.location.href).toString()

      // get permissions to interact with and install the plugin
      await ethereum.send({
        method: 'wallet_enable',
        params: [
          {
            wallet_plugin: { [snapId]: {} }
          }
        ]
      })
      dispatch(setAppStatus(APP_STATUS.LOADED))
    } catch (error) {
      dispatch(setAppError(error))
    }
  }
}
