import Header from './Header'
import MainDisplay from './MainDisplay'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import TransferModal from './TransferModal'
import TransactionHistory from './TransactionHistory'
import { useRouter } from 'next/router'
import { BACKGROUND, TEXT } from '../colors'
import Head from 'next/head'

const Layout = props => {
  const router = useRouter()
  const isDepositModalOpen = router.query.deposit !== undefined
  const isWithdrawModalOpen = router.query.withdraw !== undefined
  const isTransferModalOpen = router.query.transfer !== undefined
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,500,700&display=swap"
        />
      </Head>
      <div>
        <Header />
        <div className="layout">
          <div className="main">
            <MainDisplay>{props.children}</MainDisplay>
            <footer>Cryptoeconomics Lab Inc.</footer>
          </div>
          <div className="transaction-history-wrap">
            <TransactionHistory />
          </div>
        </div>
      </div>
      {isDepositModalOpen && <DepositModal />}
      {isWithdrawModalOpen && <WithdrawModal />}
      {isTransferModalOpen && <TransferModal />}
      <style>{`
        *,
        *:after,
        *:before {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
          background: ${BACKGROUND};
          color: ${TEXT};
          ${isDepositModalOpen ? 'overflow: hidden;' : ''}
          ${isWithdrawModalOpen ? 'overflow: hidden;' : ''}
          ${isTransferModalOpen ? 'overflow: hidden;' : ''}
        }
      `}</style>
      <style jsx>{`
        .layout {
          display: flex;
          height: 100%;
          min-height: 100vh;
        }
        .main {
          display: flex;
          flex-direction: column;
          width: 70%;
        }
        .transaction-history-wrap {
          position: fixed;
          width: 30%;
          height: 100%;
          min-height: 100vh;
          top: 0;
          right: 0;
        }
        footer {
          padding: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default Layout
