import { config } from './config'

export const TOKEN_LIST = [
  {
    name: 'Ethereum',
    unit: 'ETH',
    tokenContractAddress: config.PlasmaETH,
    depositContractAddress: config.payoutContracts.DepositContract,
    imgSrc: '../tokenIcons/ethereum-logo.png',
    imgAspect: 0.614
  },
  {
    name: 'Dai Stablecoin',
    unit: 'DAI',
    // TODO: change token addresses
    tokenContractAddress: config.PlasmaETH,
    depositContractAddress: config.payoutContracts.DepositContract,
    imgSrc: '../tokenIcons/dai-logo.png',
    imgAspect: 1
  }
]
