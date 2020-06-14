import React from 'react'
import { connect } from 'react-redux'

import { withdraw, setWithdrawProgress } from '../store/withdraw'
import DepositWithdrawModal from './Base/DepositWithdrawModal'

const WithdrawModal = ({ withdraw, progress, setProgress }) => {
  return (
    <DepositWithdrawModal
      type={'withdraw'}
      action={withdraw}
      progress={progress}
      setProgress={setProgress}
    />
  )
}

const mapStateToProps = ({ withdrawState: { withdrawProgress } }) => ({
  progress: withdrawProgress
})

const mapDispatchToProps = {
  withdraw,
  setProgress: setWithdrawProgress
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawModal)
