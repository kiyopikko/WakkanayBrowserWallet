import { Web3Wallet } from './Web3Wallet'
import { ethers } from 'ethers'

/**
 * MetamaskWallet is wallet implementation for Metamask
 */
export class MetamaskService {
  static async initialize(networkName) {
    if (typeof window.ethereum === undefined) {
      throw new Error('cannot find ethereum object.')
    }
    await window.ethereum.enable()
    window.web3 = new Web3(window.ethereum)
    const provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    )
    const address = await provider.getSigner().getAddress()
    const network = await provider.ready
    if (networkName !== 'local' && network.name !== networkName) {
      throw new Error(
        `Your wallet is connecting to ${network.name} but ${networkName} is expected.`
      )
    }
    return new Web3Wallet(address, provider)
  }
}
