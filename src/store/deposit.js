import { createAction, createReducer } from '@reduxjs/toolkit'
import clientWrapper from '../client'
import { utils } from 'ethers'
import JSBI from 'jsbi'
// import { PETHContract } from '../contracts/PETHContract'
// import { TOKEN_LIST } from '../constants/tokens'

export const DEPOSIT_PROGRESS = {
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE'
}

export const setDepositProgress = createAction('SET_DEPOSIT_PROGRESS')

export const depositReducer = createReducer(
  {
    depositProgress: DEPOSIT_PROGRESS.INPUT
  },
  {
    [setDepositProgress]: (state, action) => {
      state.depositProgress = action.payload
    }
  }
)

/**
 * deposit
 * @param {*} amount formatted ether string. e.g. "0.1"
 * @param {*} addr deposit contract address
 */
export const deposit = (amount, addr) => {
  const amountWei = JSBI.BigInt(utils.parseEther(amount).toString())

  return async dispatch => {
    try {
      const client = await clientWrapper.getClient()
      if (!client) return
      // TODO: after delete PETHContract in the packages/eth-contract
      // const peth = TOKEN_LIST.find(token => token.unit === 'ETH')
      // if (peth !== undefined && addr === peth.depositContractAddress) {
      //   const contract = new PETHContract(
      //     peth.tokenContractAddress,
      //     client.wallet.getEthersWallet()
      //   )
      //   await contract.wrap(amount)
      //   console.info(`wrapped PETH: ${amount}`)
      // }
      await client.deposit(amountWei, addr)
      dispatch(setDepositProgress(DEPOSIT_PROGRESS.COMPLETE))
    } catch (error) {
      console.log(error)
    }
  }
}
