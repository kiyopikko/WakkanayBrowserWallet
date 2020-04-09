import * as ethers from 'ethers'
import LightClient from '@cryptoeconomicslab/plasma-light-client'
import MetamaskWallet from './metamaskWallet'
import { EthWallet } from '@cryptoeconomicslab/eth-wallet'
import { Address, Bytes } from '@cryptoeconomicslab/primitives'
import { IndexedDbKeyValueStore } from '@cryptoeconomicslab/indexeddb-kvs'
import {
  DepositContract,
  ERC20Contract,
  CommitmentContract,
  AdjudicationContract,
  OwnershipPayoutContract,
  PETHContract
} from '@cryptoeconomicslab/eth-contract'
import * as Sentry from '@sentry/browser'
if (process.env.SENTRY_ENDPOINT) {
  Sentry.init({
    dsn: process.env.SENTRY_ENDPOINT
  })
}

function getProvider(network) {
  if (network === 'local') {
    return new ethers.providers.JsonRpcProvider(process.env.MAIN_CHAIN_HOST)
  } else if (network === 'kovan') {
    return new ethers.getDefaultProvider('kovan')
  }
}

async function instantiate(privateKey) {
  const kvs = new IndexedDbKeyValueStore(Bytes.fromString('plasma_aggregator'))
  const eventDb = await kvs.bucket(Bytes.fromString('event'))

  let wallet, signer
  if (typeof privateKey === 'string') {
    wallet = new EthWallet(
      new ethers.Wallet(privateKey, getProvider(process.env.ETH_NETWORK))
    )
    signer = wallet.getEthersWallet()
  } else {
    await window.ethereum.enable()
    wallet = new MetamaskWallet()
    signer = new ethers.providers.Web3Provider(window.ethereum).getSigner()
    wallet.getEthersWallet = () =>
      new ethers.providers.Web3Provider(window.ethereum).getSigner()
  }

  const mainChainEnv = process.env.MAIN_CHAIN_ENV || 'local'
  const config = await import(`../config.${mainChainEnv}`)

  const adjudicationContract = new AdjudicationContract(
    Address.from(config.adjudicationContract),
    eventDb,
    signer
  )

  const ownershipPayoutContract = new OwnershipPayoutContract(
    Address.from(config.payoutContracts.OwnershipPayout),
    signer
  )

  function depositContractFactory(address) {
    return new DepositContract(address, eventDb, signer)
  }

  function tokenContractFactory(address) {
    return new ERC20Contract(address, signer)
  }

  const commitmentContract = new CommitmentContract(
    Address.from(config.commitmentContract),
    eventDb,
    signer
  )

  const client = await LightClient.initilize({
    wallet,
    witnessDb: kvs,
    adjudicationContract,
    depositContractFactory,
    tokenContractFactory,
    commitmentContract,
    ownershipPayoutContract,
    deciderConfig: config,
    aggregatorEndpoint: process.env.AGGREGATOR_HOST
  })

  // register Peth
  client.registerCustomToken(
    new PETHContract(Address.from(config.PlasmaETH), signer),
    depositContractFactory(Address.from(config.payoutContracts.DepositContract))
  )

  return client
}

export default async function initialize(privateKey) {
  const lightClient = await instantiate(privateKey)
  await lightClient.start()

  // TODO: need more secure way to store private key.
  localStorage.setItem('privateKey', privateKey)

  return lightClient
}
