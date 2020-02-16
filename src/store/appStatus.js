import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'
import { EthCoder } from '@cryptoeconomicslab/eth-coder'
import { setupContext } from '@cryptoeconomicslab/context'
import { getBalance, getETHtoUSD } from './tokenBalanceList'
import { getAddress } from './address'

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
    const initialGetters = () => {
      dispatch(getBalance())
      dispatch(getAddress())
      dispatch(getETHtoUSD()) // get the latest ETH price, returned value's unit is USD/ETH
    }

    if (!process.browser) {
      dispatch(setAppStatus(APP_STATUS.UNLOADED))
      return
    }

    setupContext({ coder: EthCoder })
    const client = clientWrapper.getClient()
    if (client) {
      dispatch(setAppStatus(APP_STATUS.LOADED))
      dispatch(subscribeEvents())
      initialGetters()
      return
    }

    const localKey = localStorage.getItem('privateKey')
    if (localKey) {
      try {
        await clientWrapper.initializeClient(localKey)
        dispatch(setAppStatus(APP_STATUS.LOADED))
        dispatch(subscribeEvents())
        initialGetters()
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
    const initialGetters = () => {
      dispatch(getBalance())
      dispatch(getAddress())
      dispatch(getETHtoUSD()) // get the latest ETH price, returned value's unit is USD/ETH
    }

    dispatch(setAppError(null))
    try {
      await clientWrapper.initializeClient(privateKey)
      dispatch(setAppStatus(APP_STATUS.LOADED))
      dispatch(subscribeEvents())
      initialGetters()
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
      await clientWrapper.initializeClient()

      // get permissions to interact with and install the plugin
      await window.ethereum.send({
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

export const subscribeEvents = () => dispatch => {
  console.log('🔥Subscribe light client events')
  const client = clientWrapper.getClient()
  if (!client) {
    throw new Error('client is not initialized yet.')
  }

  client.subscribeCheckpointFinalized((checkpointId, checkpoint) => {
    console.info(
      `new %ccheckpoint %cdetected: %c{ id: ${checkpointId.toHexString()}, range: (${
        checkpoint[0].start.data
      }, ${checkpoint[0].end.data}) }`,
      'color: pink; font-weight: bold;',
      '',
      'font-weight: bold;'
    )
    dispatch(getBalance())
  })

  client.subscribeSyncFinished(blockNumber => {
    console.info(`sync new state: ${blockNumber.data}`)
    dispatch(getBalance())
  })

  client.subscribeTransferComplete(stateUpdate => {
    console.info(
      `%c transfer complete for range: %c (${stateUpdate.range.start.data}, ${stateUpdate.range.end.data})`,
      'color: brown; font-weight: bold;',
      'font-weight: bold;'
    )
    dispatch(getBalance())
  })

  client.subscribeExitFinalized(exitId => {
    console.info(`exit finalized for exit: ${exitId.toHexString()}`)
  })
}
