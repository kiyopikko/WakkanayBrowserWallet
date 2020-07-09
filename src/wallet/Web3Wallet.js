import { Address, BigNumber, Bytes } from '@cryptoeconomicslab/primitives'
import { Balance } from '@cryptoeconomicslab/wallet'
import { createTypedParams } from '@cryptoeconomicslab/ovm'
import { config } from '../config'
import { ethers } from 'ethers'
import { arrayify, AbiCoder } from 'ethers/utils'
const abi = new AbiCoder()

const ERC20abi = [
  'function balanceOf(address tokenOwner) view returns (uint)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint)'
]

/**
 * Web3Wallet is wallet implementation for Web3Provider
 */
export class Web3Wallet {
  /**
   * Web3Wallet
   * @param {*} address address string
   * @param {*} provider Web3Provider
   */
  constructor(address, provider) {
    this.address = address
    this.provider = provider
  }

  getAddress() {
    return Address.from(this.address)
  }

  async getL1Balance(tokenAddress) {
    let value, decimals, symbol
    if (tokenAddress) {
      const contract = new ethers.Contract(
        tokenAddress.data,
        ERC20abi,
        this.provider
      )
      const ERC20 = contract.connect(this.provider)
      const balance = await ERC20.balanceOf(this.address)
      value = BigNumber.fromString(balance.toString())
      decimals = Number(await ERC20.decimals())
      symbol = await ERC20.symbol()
    } else {
      const balance = await this.provider.getBalance(this.address)
      value = BigNumber.fromString(balance.toString())
      decimals = 18
      symbol = 'ETH'
    }
    return new Balance(value, decimals, symbol)
  }

  async signMessage(message) {
    const signature = await this.provider.send('eth_signTypedData', [
      createTypedParams(config, message),
      this.address
    ])
    return Bytes.fromHexString(signature)
  }
}
