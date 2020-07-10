import React from 'react'
import { connect } from 'react-redux'

import DepositWithdrawModal from './Base/DepositWithdrawModal'

import { deposit, setDepositProgress } from '../store/deposit'

const DepositModal = ({ deposit, progress, setProgress }) => {
  return (
    <DepositWithdrawModal
      type={'deposit'}
      action={deposit}
      progress={progress}
      setProgress={setProgress}
    />
  )
}

const mapStateToProps = ({ depositState: { depositProgress } }) => ({
  progress: depositProgress
})

const mapDispatchToProps = {
  deposit,
  setProgress: setDepositProgress
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)
