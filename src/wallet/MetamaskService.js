import { Web3ProviderWallet } from './Web3Wallet'
import { ethers } from 'ethers'

/**
 * MetamaskWallet is wallet implementation for Metamask
 */
export class MetamaskService {
  static async initialize(networkName) {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider)
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
