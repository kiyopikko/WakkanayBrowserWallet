const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  env: {
    MAIN_CHAIN_HOST: process.env.MAIN_CHAIN_HOST,
    AGGREGATOR_HOST: process.env.AGGREGATOR_HOST,
    MAIN_CHAIN_ENV: process.env.MAIN_CHAIN_ENV,
    PETH_ADDRESS: process.env.PETH_ADDRESS,
    DEPOSIT_CONTRACT_ADDRESS: process.env.DEPOSIT_CONTRACT_ADDRESS,
    COMMITMENT_CONTRACT_ADDRESS: process.env.COMMITMENT_CONTRACT_ADDRESS,
    UNIVERSAL_ADJUDICATION_CONTRACT_ADDRESS:
      process.env.UNIVERSAL_ADJUDICATION_CONTRACT_ADDRESS,
    OWNERSHIP_PAYOUT_CONTRACT_ADDRESS:
      process.env.OWNERSHIP_PAYOUT_CONTRACT_ADDRESS,
    THERE_EXISTS_ADDRESS: process.env.THERE_EXISTS_ADDRESS,
    IS_VALID_SIG_ADDRESS: process.env.IS_VALID_SIG_ADDRESS,
    TEST_PRIVATE_KEY: process.env.TEST_PRIVATE_KEY,
    ETH_NETWORK: process.env.ETH_NETWORK,
    SENTRY_ENDPOINT: process.env.SENTRY_ENDPOINT
  },
  webpack: config => {
    config.node = {
      module: 'empty',
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      dns: 'empty',
      tls: 'empty'
    }
    config.optimization.minimize = false
    config.optimization.minimizer = []
    return config
  }
}
