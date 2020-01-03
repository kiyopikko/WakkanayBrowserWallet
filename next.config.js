const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  env: {
    MAIN_CHAIN_HOST: process.env.MAIN_CHAIN_HOST,
    AGGREGATOR_HOST: process.env.AGGREAGATOR_HOST,
    ETH_ADDRESS: process.env.ETH_ADDRESS,
    TOKEN_ADDRESS: process.env.TOKEN_ADDRESS,
    DEPOSIT_CONTRACT_ADDRESS: process.env.DEPOSIT_CONTRACT_ADDRESS,
    COMMITMENT_CONTRACT_ADDRESS: process.env.COMMITMENT_CONTRACT_ADDRESS,
    UNIVERSAL_ADJUDICATION_CONTRACT_ADDRESS:
      process.env.UNIVERSAL_ADJUDICATION_CONTRACT_ADDRESS,
    THERE_EXISTS_ADDRESS: process.env.THERE_EXISTS_ADDRESS,
    IS_VALID_SIG_ADDRESS: process.env.IS_VALID_SIG_ADDRESS,
    TEST_PRIVATE_KEY: process.env.TEST_PRIVATE_KEY
  },
  webpack: config => {
    config.node = {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      dns: 'empty',
      tls: 'empty'
    }
    return config
  }
}
