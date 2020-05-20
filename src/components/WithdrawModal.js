import React from 'react'
import { connect } from 'react-redux'

// react-font-awesome import
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEthernet } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEthernet)

import { setWithdrawToken, setWithdrawPage, withdraw } from '../store/withdraw'
import DepositWithdrawModal from './Base/DepositWithdrawModal'

const WithdrawModal = props => {
  return (
    <DepositWithdrawModal
      type={'withdraw'}
      setPage={props.setWithdrawPage}
      setToken={props.setWithdrawToken}
      action={props.withdraw}
      token={props.withdrawToken}
      page={props.withdrawPage}
    />
  )
}

const mapStateToProps = state => ({
  tokenBalanceList: state.tokenBalance.tokenBalance,
  withdrawToken: state.withdrawState.withdrawToken,
  withdrawPage: state.withdrawState.withdrawPage,
  ETHtoUSD: state.tokenBalance.ETHtoUSD,
  address: state.address
})

const mapDispatchToProps = {
  setWithdrawToken,
  setWithdrawPage,
  withdraw
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawModal)
