import { Contract, Signer } from 'ethers'
import { BigNumber } from 'ethers/utils'
import JSBI from 'jsbi'

export class PETHContract {
  public static abi = [
    'function wrap(uint256 _amount) payable',
    'function unwrap(uint256 _amount)'
  ]

  private connection: Contract

  constructor(readonly address: string, signer: Signer) {
    this.connection = new Contract(address, PETHContract.abi, signer)
  }

  /**
   * wrapping PETH
   * @name wrap
   * @param amount amount of wei.
   */
  public async wrap(amount: JSBI) {
    const bigNumberifiedAmount = new BigNumber(amount.toString())
    await this.connection.wrap(bigNumberifiedAmount)
  }

  /**
   * unwrapping PETH
   * @name unwrap
   * @param amount amount of wei.
   */
  public async unwrap(amount: JSBI) {
    const bigNumberifiedAmount = new BigNumber(amount.toString())
    await this.connection.unwrap(bigNumberifiedAmount)
  }
}
