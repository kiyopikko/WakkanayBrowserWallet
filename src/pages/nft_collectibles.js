import Layout from '../components/Layout'
import NftCollection from '../components/NftCollection'
import NftTrade from '../components/NftTrade'

export default function Collectibles() {
  return (
    <Layout>
      <NftCollection />
      <NftTrade />
    </Layout>
  )
}
