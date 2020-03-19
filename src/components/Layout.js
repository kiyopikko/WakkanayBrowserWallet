import MainDisplay from './MainDisplay'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import TransferModal from './TransferModal'
import OrderRequestModal from './OrderRequestModal'
import { useRouter } from 'next/router'
import { SUBTEXT } from '../colors'
import { NORMAL, XXSMALL } from '../fonts'
import { connect } from 'react-redux'

const Layout = props => {
  const router = useRouter()
  const isDepositModalOpen = router.query.deposit !== undefined
  const isWithdrawModalOpen = router.query.withdraw !== undefined
  const isTransferModalOpen = router.query.transfer !== undefined
  const isOrderRequestModalOpen = router.query.orderRequest !== undefined
  return (
    <div>
      <div>
        <div className="layout">
          <div className="main">
            <MainDisplay>{props.children}</MainDisplay>
            <div className="wallet-id-section">
              Your wallet ID: {props.address}
            </div>
            <footer>
              Copyright © 2020 Cryptoeconomics lab, Inc. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
      {isDepositModalOpen && <DepositModal />}
      {isWithdrawModalOpen && <WithdrawModal />}
      {isTransferModalOpen && <TransferModal />}
      {isOrderRequestModalOpen && <OrderRequestModal />}
      <style jsx>{`
        .layout {
          display: flex;
          height: 100%;
          min-height: 100vh;
        }
        .main {
          display: flex;
          flex-direction: column;
        }
        .wallet-id-section {
          height: 32px;
          background-color: #2d2a2c;
          font-size: ${XXSMALL};
          font-weight: ${NORMAL};
          color: ${SUBTEXT};
          display: flex;
          align-items: center;
          padding: 10px;
        }
        footer {
          font-weight: 300;
          color: ${SUBTEXT};
          font-size: 0.75rem;
          padding: 2rem 0 1.5rem;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  address: state.address
})
export default connect(mapStateToProps, undefined)(Layout)
