import { ethers } from 'ethers'
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal'
import Web3 from 'web3'
import { Web3Wallet } from './Web3Wallet'

let WalletConnectProvider
if (global.window) {
  WalletConnectProvider = require('@walletconnect/web3-provider').default
}

/**
 * WalletConnect is wallet implementation for Wallet Connect
 */
export class WalletConnectService {
  /**
   * initilize WalletConnect service
   */
  static async initilize() {
    const walletConnectProvider = new WalletConnectProvider({
      infuraId: 'b4c8518704574fe3992f9a479de0c004'
    })

    let connecting = false
    walletConnectProvider.wc.on('disconnect', (error, payload) => {
      if (connecting) {
        console.warn('disconnect', error, payload)
        WalletConnectQRCodeModal.close()
      }
    })
    try {
      connecting = true
      await walletConnectProvider.enable()
      connecting = false
    } catch (e) {
      connecting = false
      await walletConnectProvider.close()
    }
    const web3 = new Web3(walletConnectProvider)
    const provider = new ethers.providers.Web3Provider(web3.currentProvider)
    const address = await provider.getSigner().getAddress()
    await provider.ready
    return new Web3Wallet(address, provider)
  }
}
