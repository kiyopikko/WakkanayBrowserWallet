import initialize from './initialize'

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
  async initializeClient(kind, privateKey) {
    if (this.instance) return

    if (process.browser) {
      const client = await initialize(kind, privateKey)
      this.instance = client
    }
  }
}

const clientWrapper = new ClientWrapper()
export default clientWrapper
