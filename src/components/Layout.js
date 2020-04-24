import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import OrderRequestModal from './OrderRequestModal'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { Fragment } from 'react'

const Layout = props => {
  const router = useRouter()
  const isDepositModalOpen = router.query.modal === 'deposit'
  const isWithdrawModalOpen = router.query.modal === 'withdraw'
  const isOrderRequestModalOpen = router.query.modal === 'orderRequest'
  return (
    <Fragment>
      {props.children}
      {isDepositModalOpen && <DepositModal />}
      {isWithdrawModalOpen && <WithdrawModal />}
      {isOrderRequestModalOpen && <OrderRequestModal />}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  address: state.address
})
export default connect(mapStateToProps, undefined)(Layout)
