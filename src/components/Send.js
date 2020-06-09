import React from 'react'
import { connect } from 'react-redux'

// react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignOutAlt)

// redux
import {
  isAbleToSubmit,
  setTransferredToken,
  setTransferredAmount,
  setRecepientAddress,
  transfer
} from '../store/transfer'

// internal import
import { SECTION_BACKGROUND } from '../constants/colors'
import { TOKEN_LIST } from '../constants/tokens'
import { TokenSelector } from './TokenSelector'
import { roundBalance } from '../utils'
import AddressInput from './AddressInput'
import Button from './Base/Button'
import ErrorMessage from './Base/ErrorMessage'
import { SectionTitle } from './SectionTitle'
import TokenInput from './TokenInput'

const Send = props => {
  const transferredTokenObj = TOKEN_LIST.find(
    ({ depositContractAddress }) =>
      depositContractAddress.toLowerCase() ===
      props.transferredToken.toLowerCase()
  )

  const tokensWithCurrentAmount = TOKEN_LIST.map(token => ({
    ...token,
    amount: props.tokenBalance[token.unit]
      ? props.tokenBalance[token.unit].amount /
        10 ** props.tokenBalance[token.unit].decimals
      : 0
  }))

  return (
    <div className="send-section" id="send">
      <SectionTitle>Send Token</SectionTitle>
      <TokenSelector
        items={tokensWithCurrentAmount}
        onSelected={props.setTransferredToken}
        selectedToken={transferredTokenObj}
      />

      <TokenInput
        className="mts mbs"
        unit={transferredTokenObj.unit}
        balance={roundBalance(props.ETHtoUSD, props.transferredAmount)}
        handleAmount={props.setTransferredAmount}
      />
      <AddressInput
        className="mbs"
        type="text"
        handleAddress={props.setRecepientAddress}
      />
      <Button
        full
        onClick={() => {
          props.transfer(
            props.transferredAmount,
            props.transferredToken,
            props.recepientAddress
          )
        }}
        disabled={props.isAbleToSubmit}
      >
        Send
      </Button>
      {props.transferError && (
        <ErrorMessage>{props.transferError}</ErrorMessage>
      )}

      <style jsx>{`
        .send-section {
          display: flex;
          flex-direction: column;
          margin: 20px 0px;
          background-color: ${SECTION_BACKGROUND};
          position: relative;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  address: state.address,
  tokenBalance: state.tokenBalance.tokenBalance,
  ETHtoUSD: state.tokenBalance.ETHtoUSD,
  isAbleToSubmit: isAbleToSubmit(state),
  transferredToken: state.transferState.transferredToken,
  transferredAmount: state.transferState.transferredAmount,
  recepientAddress: state.transferState.recepientAddress,
  transferError: state.transferState.transferError
})

const mapDispatchToProps = {
  setTransferredToken,
  setTransferredAmount,
  setRecepientAddress,
  transfer
}
export default connect(mapStateToProps, mapDispatchToProps)(Send)
