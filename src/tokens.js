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
    tokenContractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    depositContractAddress: '',
    imgSrc: '../tokenIcons/dai-logo.png',
    imgAspect: 1
  }
]
