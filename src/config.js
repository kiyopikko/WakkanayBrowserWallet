import configLocal from '../config.local'
import configKovan from '../config.kovan'

const configs = {
  local: configLocal,
  kovan: configKovan
}

const mainChainEnv = process.env.MAIN_CHAIN_ENV || 'local'
export const config = configs[mainChainEnv]
