import Layout from '../components/Layout'
import { FZ_SMALL, FW_BOLD, FZ_MEDIUM } from '../fonts'
import { SUBTEXT } from '../colors'
import TransactionHistory from '../components/TransactionHistory'

export default function History() {
  return (
    <Layout>
      <TransactionHistory />
    </Layout>
  )
}
