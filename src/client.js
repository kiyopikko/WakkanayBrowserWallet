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
  async getClient() {
    if (this.instance) return this.instance

    if (process.browser) {
      const client = await initialize()
      this.instance = client
      return client
    }
    return null
  }
}

const wrapper = new ClientWrapper()

export default wrapper
