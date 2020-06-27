import { Web3Wallet } from './Web3Wallet'
import { ethers } from 'ethers'
import { Magic } from 'magic-sdk'

let magic
if (process.browser) {
  magic = new Magic('pk_test_DDFC92FA5147E263', {
    network: {
      rpcUrl: 'http://localhost:8545'
    }
  })
}

/**
 * MagicLinkWallet is wallet implementation for MagicLink
 */
export class MagicLinkService {
  static async initialize(email) {
    const isLoggedIn = await magic.user.isLoggedIn()
    if (isLoggedIn) {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider)
      const address = await provider.getSigner().getAddress()
      const network = await provider.getNetwork()
      return new Web3Wallet(address, provider)
    } else {
      await magic.auth.loginWithMagicLink({ email })
    }
  }
}
