import * as ethers from 'ethers'
import LightClient, {
  types,
  ethWallet,
  db,
  ovm,
  ethContract,
  StateManager,
  SyncManager,
  CheckpointManager
} from 'wakkanay-plasma-light-client'
import MetamaskWallet from './metamaskWallet'
const { DeciderManager } = ovm
const { EthWallet } = ethWallet
const { Address, Bytes } = types
const { IndexedDbKeyValueStore } = db
const { DepositContract, ERC20Contract, CommitmentContract } = ethContract
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

  // TODO: fix light client interface
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

  const commitmentContract = new CommitmentContract(
    Address.from(process.env.COMMITMENT_CONTRACT_ADDRESS),
    eventDb,
    signer
  )

  const witnessDb = await kvs.bucket(Bytes.fromString('witness'))
  const deciderManager = new DeciderManager(witnessDb)
  const mainChainEnv = process.env.MAIN_CHAIN_ENV || 'local'
  const config = await import(`../config.${mainChainEnv}`)
  deciderManager.loadJson(config)

  return new LightClient(
    wallet,
    kvs,
    depositContractFactory,
    tokenContractFactory,
    commitmentContract,
    stateManager,
    syncManager,
    checkpointManager,
    deciderManager
  )
}

export default async function initialize(privateKey) {
  const lightClient = await instantiate(privateKey)
  await lightClient.start()

  // TODO: need more secure way to store private key.
  localStorage.setItem('privateKey', privateKey)

  return lightClient
}
