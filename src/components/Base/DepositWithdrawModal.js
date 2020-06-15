import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

// react-font-awesome import
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faArrowLeft)

import { shortenAddress, roundBalance } from '../../utils'
import { TokenSelector } from '../TokenSelector'
import { getTokenByTokenContractAddress } from '../../tokens'
import { BaseModal } from './BaseModal'
import Button from './Button'

import { SMALLPLUS, MEDIUM, LARGER, BOLD, NORMAL, SMALLER } from '../../fonts'
import { BACKGROUND, TEXT, SUBTEXT } from '../../colors'

const modalTexts = {
  deposit: {
    title: 'Deposit from Mainchain',
    inputButton: 'Deposit',
    confirmTitle: 'You will deposit',
    confirmText: '',
    completeTitle: 'Deposit Completed'
  },
  withdraw: {
    title: 'Withdraw Funds from Mainchain Account',
    inputButton: 'Withdraw',
    confirmTitle: 'You will withdraw',
    confirmText: 'Withdrawals need to go through a period (about a week)',
    completeTitle: 'Withdraw Completed'
  }
}

const DepositWithdrawModal = props => {
  const [tokenAmount, setTokenAmount] = useState(0)
  const amountInput = useRef('')
  const router = useRouter()
  const selectedToken = router.query.token
  const selectedTokenObj = getTokenByTokenContractAddress(selectedToken)

  return (
    <BaseModal
      title={modalTexts[props.type].title}
      onClose={() => {
        props.setPage('input-page')
      }}
      render={modal => (
        <>
          {props.page === 'input-page' ? (
            <div className="input-contents-box">
              <TokenSelector
                width={420}
                onSelected={selectedTokenContractAddress =>
                  props.setToken(selectedTokenContractAddress)
                }
                selectedToken={selectedTokenObj}
              />
              <div className="amount-input-wrapper">
                <input
                  className="amount-input"
                  type="number"
                  placeholder="0.0"
                  ref={amountInput}
                  onChange={e => {
                    setTokenAmount(e.target.value)
                  }}
                />
                <div className="deposited-token-unit">
                  {selectedTokenObj.unit}
                </div>
              </div>
              <div className="deposited-token-confirm">
                = {roundBalance(props.ETHtoUSD * tokenAmount)} USD / from
                {shortenAddress(props.address)}
              </div>
              <div className="deposit-button btn">
                <Button
                  size="full"
                  onClick={() => {
                    props.setPage('confirmation-page')
                  }}
                >
                  {modalTexts[props.type].inputButton}
                </Button>
              </div>
            </div>
          ) : props.page === 'confirmation-page' ? (
            <div className="confirmation-page">
              <div className="amount-confirmation-section">
                <div className="amount-confirmation-title">
                  <a>{modalTexts[props.type].confirmTitle}</a>
                </div>
                <div className="amount-confirmation-box">
                  <img
                    className="token-logo"
                    src="../tokenIcons/ethereum-logo.png"
                    alt="Ethereum Logo"
                  ></img>
                  <div className="total-balance-box">
                    <span className="total-balance-number">{tokenAmount}</span>
                    <span className="total-balance-unit">
                      {selectedTokenObj.unit}
                    </span>
                    <div className="balance-in-usd">
                      {roundBalance(props.ETHtoUSD * tokenAmount)} USD
                    </div>
                  </div>
                </div>
              </div>
              <div className="account-confirmation-section">
                <div className="from">
                  from
                  <a className="address">{shortenAddress(props.address)}</a>
                </div>
                <div className="to">to your wallet</div>
              </div>
              <div className="cancel-next-buttons">
                <div className="cancel-button btn">
                  <Button
                    size="medium"
                    style={{ margin: '0 auto' }}
                    border
                    onClick={() => {
                      props.setPage('input-page')
                      modal.close()
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="confirm-button btn">
                  <Button
                    size="medium"
                    onClick={() => {
                      props.action(tokenAmount, props.token)
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
              <p className="confirm-text">
                {modalTexts[props.type].confirmText}
              </p>
            </div>
          ) : (
            <div>
              <div className="deposit-complete-title amount-confirmation-title">
                {modalTexts[props.type].completeTitle}
              </div>
              <div className="btn deposit-complete-btn">
                <Button
                  size="medium"
                  onClick={() => modal.close()}
                  style={{ margin: '0 auto' }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
          <style jsx>{`
            .input-contents-box {
              margin-top: 30px;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
            .amount-input-wrapper {
              width: 420px;
              display: flex;
              margin-top: 16px;
              align-items: center;
              justify-content: center;
              background: ${BACKGROUND};
              padding-right: 14px;
              border-radius: 20px;
            }
            .amount-input {
              width: 100%;
              height: 48px;
              font-size: ${MEDIUM};
              font-weight: ${NORMAL};
              color: ${TEXT};
              border: none;
              background: transparent;
              padding: 0 1rem;
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
            .deposit-button {
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
            .confirm-text {
              margin-top: 8px;
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
            .btn {
              margin-top: 0.5rem;
            }
          `}</style>
        </>
      )}
    ></BaseModal>
  )
}

const mapStateToProps = state => ({
  tokenBalanceList: state.tokenBalance.tokenBalance,
  ETHtoUSD: state.tokenBalance.ETHtoUSD,
  address: state.address
})

export default connect(mapStateToProps)(DepositWithdrawModal)
