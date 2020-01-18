import { types } from 'wakkanay-plasma-light-client'
const Address = types.Address
const Bytes = types.Bytes

export default class MetamaskWallet {
  getAddress() {
    return Address.from('0x00000000000000000000')
  }
  getL1Balance() {
    throw new Error('not implemented')
  }
  async signMessage(message) {
    try {
      // identify the Snap by the location of its package.json file
      const snapId = new URL('package.json', window.location.href).toString()

      // call Plapp Snap (Metamask Plugin)'s "signL2Message" method
      const response = await ethereum.send({
        method: 'wallet_invokePlugin',
        params: [
          snapId,
          {
            method: 'signL2Message',
            params: [message.data]
          }
        ]
      })
      return Bytes.fromHexString(response)
    } catch (err) {
      console.error(err)
      alert('Problem happened: ' + err.message || err)
    }
  }
}
