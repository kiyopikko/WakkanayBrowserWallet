const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

class Client {
  async getBalance() {
    await sleep(5000)
    return [
      {
        tokenAddress: '0x51535cA2E01985a7b4D6412958B438aa23111BaC',
        amount: 12.4
      },
      {
        tokenAddress: '0xc891B3462aedd0bCf391986E8cd1Ae56705b8656',
        amount: 15.5
      }
    ]
  }
  async getAddress() {
    await sleep(3500)
    return '0x51535cA2E019010104D6412958B4381233111BaC'
  }
  send() {
    return new Promise.resolve()
  }
  withdraw() {
    return new Promise.resolve()
  }
}

class ClientWrapper {
  constructor() {
    this.instance = null
  }

  /**
   * Returns client singleton. Lazily initialized on client side.
   * Returns null on server side.
   * @returns {?Client}
   */
  getClient() {
    if (this.instance) return this.instance

    if (process.browser) {
      const client = new Client()
      this.instance = client
      return client
    }
    return null
  }
}

const wrapper = new ClientWrapper()

export default wrapper
