import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

//react-font-awesome import
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faArrowLeft)

import { setDepositedToken, setDepositPage, deposit } from '../store/deposit'
import { shortenAddress, roundBalance } from '../utils'
import { TokenSelector } from './TokenSelector'
import { TOKEN_LIST } from '../tokens'
import { BaseModal } from './Base/BaseModal'
import Button from './Base/Button'

import {
  SMALLPLUS,
  MEDIUM,
  LARGER,
  BOLD,
  XLARGE,
  NORMAL,
  SMALLER
} from '../fonts'
import { BACKGROUND, TEXT, SUBTEXT } from '../colors'

const DepositModal = props => {
  const [tokenAmount, setTokenAmount] = useState(0)
  const amountInput = useRef('')
  const router = useRouter()
  const depositedToken = router.query.token
  const depositedTokenObj = TOKEN_LIST.find(
    ({ depositContractAddress }) => depositContractAddress === depositedToken
  )

  return (
    <BaseModal
      title={'Deposit from Mainchain'}
      onClose={() => {
        props.setDepositPage('input-page')
      }}
      render={modal => (
        <>
          {props.depositPage === 'input-page' ? (
            <div className="input-contents-box">
              <TokenSelector
                width={420}
                onSelected={selectedTokenContractAddress =>
                  props.setDepositedToken(selectedTokenContractAddress)
                }
                selectedToken={depositedTokenObj}
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
                  {depositedTokenObj.unit}
                </div>
              </div>
              <div className="deposited-token-confirm">
                = {roundBalance(props.ETHtoUSD, tokenAmount)} USD / from{' '}
                {shortenAddress(props.address)}
              </div>
              <div className="deposit-button btn">
                <Button
                  size="full"
                  onClick={() => {
                    props.setDepositPage('confirmation-page')
                  }}
                >
                  Deposit
                </Button>
              </div>
            </div>
          ) : props.depositPage === 'confirmation-page' ? (
            <div className="confirmation-page">
              <div className="amount-confirmation-section">
                <div className="amount-confirmation-title">
                  <a>You will deposit</a>
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
                      {depositedTokenObj.unit}
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
                <div className="to">to your wallet</div>
              </div>
              <div className="cancel-next-buttons">
                <div
                  className="cancel-button btn"
                  onClick={() => {
                    props.setDepositPage('input-page')
                  }}
                >
                  <Button
                    size="medium"
                    style={{ margin: '0 auto' }}
                    border
                    onClick={() => {
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
                      props.deposit(tokenAmount, props.depositedToken)
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="deposit-complete-title amount-confirmation-title">
                Deposit Completed
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
              border-radius: 8px;
            }
            .amount-input {
              height: 48px;
              font-size: ${XLARGE};
              font-weight: ${NORMAL};
              color: ${TEXT};
              border: none;
              background: transparent;
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
