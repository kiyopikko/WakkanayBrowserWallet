export const TOKEN_LIST = [
  {
    name: 'Ethereum',
    unit: 'ETH',
    tokenContractAddress: process.env.PETH_ADDRESS,
    depositContractAddress: process.env.DEPOSIT_CONTRACT_ADDRESS,
    imgSrc: '../tokenIcons/ethereum-logo.png'
  },
  {
    name: 'Dai Stablecoin',
    unit: 'DAI',
    tokenContractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    depositContractAddress: '',
    imgSrc: '../tokenIcons/dai-logo.png'
  }
]
