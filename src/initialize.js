import * as ethers from 'ethers'
import LightClient, {
  StateManager,
  SyncManager,
  CheckpointManager,
  DepositedRangeManager
} from '@cryptoeconomicslab/plasma-light-client'
import MetamaskWallet from './metamaskWallet'
import { EthWallet } from '@cryptoeconomicslab/eth-wallet'
import { Address, Bytes } from '@cryptoeconomicslab/primitives'
import { RangeDb } from '@cryptoeconomicslab/db'
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

  const adjudicationContract = new AdjudicationContract(
    Address.from(process.env.UNIVERSAL_ADJUDICATION_CONTRACT_ADDRESS),
    eventDb,
    signer
  )

  const ownershipPayoutContract = new OwnershipPayoutContract(
    Address.from(process.env.OWNERSHIP_PAYOUT_CONTRACT_ADDRESS),
    signer
  )

  function depositContractFactory(address) {
    return new DepositContract(address, eventDb, signer)
  }

  function tokenContractFactory(address) {
    return new ERC20Contract(address, signer)
  }

  const stateDb = await kvs.bucket(Bytes.fromString('state'))
  const stateManager = new StateManager(stateDb)

  const syncDb = await kvs.bucket(Bytes.fromString('sync'))
  const syncManager = new SyncManager(syncDb)

  const checkpointDb = await kvs.bucket(Bytes.fromString('checkpoint'))
  const checkpointManager = new CheckpointManager(checkpointDb)

  const depositedRangeDb = await kvs.bucket(Bytes.fromString('depositedRange'))
  const depositedRangeManager = new DepositedRangeManager(
    new RangeDb(depositedRangeDb)
  )

  const commitmentContract = new CommitmentContract(
    Address.from(process.env.COMMITMENT_CONTRACT_ADDRESS),
    eventDb,
    signer
  )

  const mainChainEnv = process.env.MAIN_CHAIN_ENV || 'local'
  const config = await import(`../config.${mainChainEnv}`)

  const client = new LightClient(
    wallet,
    kvs,
    adjudicationContract,
    depositContractFactory,
    tokenContractFactory,
    commitmentContract,
    ownershipPayoutContract,
    stateManager,
    syncManager,
    checkpointManager,
    depositedRangeManager,
    config,
    {
      aggregatorEndpoint: process.env.AGGREGATOR_HOST
    }
  )

  // register Peth
  client.registerCustomToken(
    new PETHContract(Address.from(process.env.PETH_ADDRESS), signer),
    depositContractFactory(Address.from(process.env.DEPOSIT_CONTRACT_ADDRESS))
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
