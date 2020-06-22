import { Address, BigNumber, Bytes } from '@cryptoeconomicslab/primitives'
import { Balance } from '@cryptoeconomicslab/wallet'
import { ethers } from 'ethers'

const ERC20abi = [
  'function balanceOf(address tokenOwner) view returns (uint)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint)'
]

export class MetamaskWallet {
  /**
   * MetamaskWallet
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
    const signer = this.provider.getSigner()
    return Bytes.fromHexString(signer.signMessage(message.toHexString()))
  }
}
