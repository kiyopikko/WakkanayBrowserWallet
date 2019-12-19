import Layout from '../components/Layout'
import OrderBook from '../components/OrderBook'
import OrderRequest from '../components/OrderRequest'

export default function Exchange() {
  return (
    <Layout>
      <OrderBook />
      <OrderRequest />
    </Layout>
  )
}
