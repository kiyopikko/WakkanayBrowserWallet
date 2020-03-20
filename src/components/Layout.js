import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import TransferModal from './TransferModal'
import OrderRequestModal from './OrderRequestModal'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { Fragment } from 'react'

const Layout = props => {
  const router = useRouter()
  const isDepositModalOpen = router.query.deposit !== undefined
  const isWithdrawModalOpen = router.query.withdraw !== undefined
  const isTransferModalOpen = router.query.transfer !== undefined
  const isOrderRequestModalOpen = router.query.orderRequest !== undefined
  return (
    <Fragment>
      {props.children}
      {isDepositModalOpen && <DepositModal />}
      {isWithdrawModalOpen && <WithdrawModal />}
      {isTransferModalOpen && <TransferModal />}
      {isOrderRequestModalOpen && <OrderRequestModal />}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  address: state.address
})
export default connect(mapStateToProps, undefined)(Layout)
