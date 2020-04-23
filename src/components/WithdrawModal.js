import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'

//react-font-awesome import
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEthernet } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEthernet)

import { setWithdrawnToken, setWithdrawPage, withdraw } from '../store/withdraw'
import { shortenAddress, roundBalance } from '../utils'
import Dropdown from './Dropdown'
import { TokenSelectButton } from './TokenSelectButton'
import { PrimaryButton } from './PrimaryButton'

import {
  SMALL,
  SMALLPLUS,
  MEDIUM,
  LARGER,
  BOLD,
  XLARGE,
  NORMAL,
  SMALLER
} from '../fonts'
import { White, BACKGROUND, SUBTEXT } from '../colors'
import { TOKEN_LIST } from '../tokens'
import { BaseModal } from './Base/BaseModal'

const WithdrawModal = props => {
  const [tokenAmount, setTokenAmount] = useState(0)
  const amountInput = useRef('')
  const withdrawnTokenObj = TOKEN_LIST.find(
    ({ depositContractAddress }) =>
      depositContractAddress === props.withdrawnToken
  )

  return (
    <BaseModal
      title={'Withdraw Funds from Mainchain Account'}
      onClose={() => {
        props.setWithdrawPage('input-page')
      }}
      render={modal => {
        return (
          <>
            {props.withdrawPage === 'input-page' ? (
              <div className="input-contents-box">
                <div className="token-select-box-wrapper">
                  <Dropdown
                    onselect={selectedTokenContractAddress => {
                      props.setWithdrawnToken(selectedTokenContractAddress)
                    }}
                    topButtonName={item => (
                      <TokenSelectButton item={item} padding="8px 16px" />
                    )}
                    items={TOKEN_LIST}
                    renderItem={item => (
                      <TokenSelectButton item={item} padding="8px 16px" />
                    )}
                    selectedItem={withdrawnTokenObj}
                  />
                </div>
                <div className="amount-input-wrapper">
                  <input
                    className="amount-input"
                    type="number"
                    ref={amountInput}
                    onChange={e => {
                      setTokenAmount(e.target.value)
                    }}
                  />
                  <div className="deposited-token-unit">
                    {withdrawnTokenObj.unit}
                  </div>
                </div>
                <div className="deposited-token-confirm">
                  = {roundBalance(props.ETHtoUSD, tokenAmount)} USD / from{' '}
                  {shortenAddress(props.address)}
                </div>
                <div className="withdraw-button">
                  <PrimaryButton
                    onClick={() => {
                      props.setWithdrawPage('confirmation-page')
                    }}
                  >
                    Withdraw
                  </PrimaryButton>
                </div>
              </div>
            ) : props.withdrawPage === 'confirmation-page' ? (
              <div className="confirmation-page">
                <div className="amount-confirmation-section">
                  <div className="amount-confirmation-title">
                    <a>You will withdraw</a>
                  </div>
                  <div className="amount-confirmation-box">
                    <img
                      className="token-logo"
                      src="../tokenIcons/ethereum-logo.png"
                      alt="Ethereum Logo"
                    ></img>
                    <div className="total-balance-box">
                      <span className="total-balance-number">
                        {tokenAmount}
                      </span>
                      <span className="total-balance-unit">
                        {withdrawnTokenObj.unit}
                      </span>
                      <div className="balance-in-usd">
                        {roundBalance(props.ETHtoUSD, tokenAmount)} USD
                      </div>
                    </div>
                  </div>
                </div>
                <div className="account-confirmation-section">
                  <div className="from">
                    from{' '}
                    <a className="address">{shortenAddress(props.address)}</a>
                  </div>
                  <div className="to">to your Wakkanay Wallet</div>
                </div>
                <div className="cancel-next-buttons">
                  <div
                    className="cancel-button"
                    onClick={() => {
                      props.setWithdrawPage('input-page')
                    }}
                  >
                    <a className="cancel" onClick={() => modal.close()}>
                      Cancel
                    </a>
                  </div>
                  <div
                    className="confirm-button"
                    onClick={() => {
                      props.withdraw(
                        tokenAmount,
                        withdrawnTokenObj.depositContractAddress
                      )
                    }}
                  >
                    <PrimaryButton>Confirm</PrimaryButton>
                  </div>
                </div>
                <div>Click confirm to open Metamask</div>
              </div>
            ) : (
              <div>
                <div>Withdraw Completed</div>
                <a className="confirm-button" onClick={() => modal.close()}>
                  Cancel
                </a>
              </div>
            )}
            <style jsx>{`
              .input-contents-box {
                margin-top: 30px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              }
              .token-select-box-wrapper {
                width: 420px;
                height: 48px;
                background: ${White(0.05)};
                border-radius: 4px;
                display: flex;
              }
              .button-name-inner {
                width: 100%;
                padding: 8px 8px 8px 22px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
              }
              .token-select-box-wrapper :global(.dropdown-button) {
                font-size: ${SMALL};
                font-weight: 400;
              }
              .token-select-box-wrapper :global(.dropdown-caret) {
                font-size: ${MEDIUM};
              }
              .l2-token-img-bg {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background-color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .l2-token-img {
                height: 22px;
              }
              .token-name {
                margin-left: 8px;
              }
              .amount-input-wrapper {
                width: 420px;
                display: flex;
                margin-top: 16px;
                align-items: center;
                justify-content: center;
                background: ${BACKGROUND};
                padding-right: 14px;
              }
              .amount-input {
                height: 48px;
                font-size: ${XLARGE};
                font-weight: ${NORMAL};
                color: #ffffff;
                border: none;
                background: transparent;
                border-radius: 4px;
                padding: 8px;
              }
              .deposited-token-unit,
              .deposited-token-confirm {
                font-weight: ${BOLD};
                font-size: ${SMALLER};
                color: ${SUBTEXT};
              }
              .deposited-token-confirm {
                margin-top: 8px;
                margin-right: 4px;
              }
              .token-amount-confirm-section {
                margin-top: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .token-amount {
                margin: -3px 14px;
                margin-left: 10px;
                font-size: ${LARGER};
                font-weight: 600;
              }
              .withdraw-button {
                width: 100%;
              }
              .confirmation-page {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .from,
              .to {
                font-size: ${MEDIUM};
                font-weight: 500;
              }
              .address {
                font-size: ${MEDIUM};
                font-weight: 500;
                color: lightslategray;
              }
              .account-confirmation-section {
                margin-bottom: 20px;
              }
              .amount-confirmation-section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .amount-confirmation-title {
                font-size: 28px;
                font-weight: 500;
                margin-bottom: 8px;
              }
              .back-button {
                margin-right: 8px;
                font-size: 28px;
                width: 100%;
                margin-left: 116px;
                cursor: pointer;
              }
              .token-logo {
                width: 48px;
                margin-right: 16px;
              }
              .amount-confirmation-box {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 16px;
              }
              .total-balance-number {
                font-size: 52px;
                font-weight: 650;
              }
              .total-balance-unit {
                font-size: 30px;
                font-weight: 650;
                margin-left: 8px;
              }
              .balance-in-usd {
                color: darkgray;
                font-size: ${SMALLPLUS};
                font-weight: 650;
              }
            `}</style>
          </>
        )
      }}
    ></BaseModal>
  )
}

const mapStateToProps = state => ({
  tokenBalanceList: state.tokenBalance.tokenBalanceList,
  withdrawnToken: state.withdrawState.withdrawnToken,
  withdrawPage: state.withdrawState.withdrawPage,
  ETHtoUSD: state.tokenBalance.ETHtoUSD,
  address: state.address
})

const mapDispatchToProps = {
  setWithdrawnToken,
  setWithdrawPage,
  withdraw
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawModal)
