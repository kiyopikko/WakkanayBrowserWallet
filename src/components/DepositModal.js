import React from 'react'
import { connect } from 'react-redux'

// react-font-awesome import
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faArrowLeft)

import { setDepositedToken, setDepositPage, deposit } from '../store/deposit'
import DepositWithdrawModal from './Base/DepositWithdrawModal'

const DepositModal = props => {
  return (
    <DepositWithdrawModal
      type={'deposit'}
      setPage={props.setDepositPage}
      setToken={props.setDepositedToken}
      action={props.deposit}
      token={props.depositedToken}
      page={props.depositPage}
    />
  )
}

const mapStateToProps = state => ({
  tokenBalanceList: state.tokenBalance.tokenBalance,
  depositedToken: state.depositState.depositedToken,
  depositPage: state.depositState.depositPage,
  ETHtoUSD: state.tokenBalance.ETHtoUSD,
  address: state.address
})

const mapDispatchToProps = {
  setDepositedToken,
  setDepositPage,
  deposit
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)
