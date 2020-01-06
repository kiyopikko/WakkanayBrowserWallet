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
  async initializeClient(privateKey) {
    if (this.instance) return

    if (process.browser) {
      const client = await initialize(privateKey)
      this.instance = client
    }
  }
}

const wrapper = new ClientWrapper()
export default wrapper
