import { Address, BigNumber, Bytes } from '@cryptoeconomicslab/primitives'
import { Balance } from '@cryptoeconomicslab/wallet'
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

  async signTypedDataV1(tokenAddress, range, stateObjectParams, txBody) {
    const msgParams = [
      {
        type: 'address',
        name: 'token',
        value: tokenAddress
      },
      {
        type: 'uint256',
        name: 'amount',
        value: range[1].sub(range[0]).toString()
      }
    ]
    const txBodyParam = {
      type: 'bytes',
      name: 'transaction',
      value: txBody
    }
    return await this.provider.send('eth_signTypedData', [
      msgParams.concat(stateObjectParams).concat([txBodyParam]),
      this.address
    ])
  }

  decodeTransaction(transactionMessage) {
    const transactionProperty = abi.decode(
      ['tuple(address, bytes[])'],
      arrayify(transactionMessage.toHexString())
    )[0]
    const tokenAddress = abi.decode(
      ['address'],
      arrayify(transactionProperty[1][0])
    )[0]
    const range = abi.decode(
      ['tuple(uint256, uint256)'],
      arrayify(transactionProperty[1][1])
    )[0]
    const stateObject = abi.decode(
      ['tuple(address, bytes[])'],
      arrayify(transactionProperty[1][3])
    )[0]
    return {
      tokenAddress,
      range,
      stateObject
    }
  }

  decodeStateObject(stateObject) {
    const owner = abi.decode(['address'], arrayify(stateObject[1][0]))[0]
    return [
      {
        type: 'address',
        name: 'owner',
        value: owner
      }
    ]
  }

  async signMessage(message) {
    const transaction = this.decodeTransaction(message)
    const stateObjectParams = this.decodeStateObject(transaction.stateObject)
    const signature = await this.signTypedDataV1(
      transaction.tokenAddress,
      transaction.range,
      stateObjectParams,
      message.toHexString()
    )
    return Bytes.fromHexString(signature)
  }
}
