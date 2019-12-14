import Header from './Header'
import AccountInfo from './Account'
import MainDisplay from './MainDisplay'
import Tabs from './Tabs'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import { useRouter } from 'next/router'

const Layout = props => {
  const router = useRouter()
  const isDepositModalOpen = router.query.deposit !== undefined
  const isWithdrawModalOpen = router.query.withdraw !== undefined
  return (
    <div>
      <div>
        <Header />
        <div className="back-ground">
          <AccountInfo />
          <div className="main-display-background">
            <Tabs />
            <MainDisplay>{props.children}</MainDisplay>
          </div>
        </div>
        <footer>
          <h4>Cryptoeconomics Lab Inc.</h4>
        </footer>
      </div>
      {isDepositModalOpen && <DepositModal />}
      {isWithdrawModalOpen && <WithdrawModal />}
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
          font-family: 'Avenir Next';
          ${isDepositModalOpen ? 'overflow: hidden;' : ''}
          ${isWithdrawModalOpen ? 'overflow: hidden;' : ''}
        }
        input {
          font-family: 'Avenir Next';
        }
      `}</style>
      <style jsx>{`
        .back-ground {
          display: flex;
          height: 600px;
          width: 1268px;
          border-right: none;
          margin: 0px 24px;
          border: solid 2px lightgray;
        }
        .main-display-background {
          width: calc(100% - 240px);
          display: flex;
          flex-direction: column;
          border-left: solid 2px lightgray;
        }
        footer {
          padding: 16px;
          width: 1252px;
        }
        footer > h4 {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default Layout
