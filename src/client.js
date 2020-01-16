// import initialize from './initialize'

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

    return null
  }

  /**
   * initialize plasma light client with privateKey
   * @param {string} privateKey privateKey of user's account
   */
  async initializeClient(privateKey) {
    if (this.instance) return

    if (process.browser) {
      // const client = await initialize(privateKey)

      // TODO: fix below
      this.instance = {
        address: '0x00000000000000000000',
        subscribeSyncFinished: () => {},
        subscribeTransferComplete: () => {},
        subscribeCheckpointFinalized: () => {},
        subscribeExitFinalized: () => {},
        deposit: () => {
          return Promise.resolve()
        },
        getBalance: () => {
          return Promise.resolve([
            {
              tokenAddress: '0x00000000000000000000',
              amount: 12.5
            }
          ])
        },
        transfer: () => {
          return Promise.resolve()
        }
      }
    }
  }
}

const wrapper = new ClientWrapper()
export default wrapper
