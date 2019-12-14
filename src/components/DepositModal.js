import { useRouter } from 'next/router'
import ClickOutside from 'react-click-outside'
import React, { useState, useRef } from 'react'

//react-font-awesome import
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faEthernet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fab, faTimes, faEthernet)

import Dropdown from './Dropdown'
import { connect } from 'react-redux'
import { setToken, setUnit, setPage } from '../store/deposit_modal'

const TOKEN_CURRENCY_MAP = {
  Ethereum: 'ETH',
  Dai: 'DAI'
}

const DepositModal = props => {
  const router = useRouter()
  const currentToken = props.currentToken
  const currentUnit = props.currentUnit
  const currentPage = props.currentPage
  const [tokenAmount, setTokenAmount] = useState(0)
  const amountInput = useRef('')
  return (
    <div className="modal-bg">
      <ClickOutside
        className="modal-main"
        onClickOutside={e => {
          e.preventDefault()
          const href = `${router.route}`
          router.push(href)
          props.setPage(0)
        }}
      >
        <div
          className="close-button"
          onClick={e => {
            e.preventDefault()
            const href = `${router.route}`
            router.push(href)
            props.setPage(0)
          }}
        >
          <FontAwesomeIcon icon="times" />
        </div>
        <div className="deposit-page-title">Deposit from Metamask</div>
        <div className="contents">
          {currentPage === 0 ? (
            <div className="input-page">
              <div className="token-box-wrapper">
                <div className="token-box-title">Token</div>
                <div className="token-select-box-wrapper">
                  <Dropdown
                    onSelected={props.setToken}
                    renderItem={item => {
                      return (
                        <div className="button-name-inner">
                          <div className="token-icon">
                            <FontAwesomeIcon icon={['fab', 'ethereum']} />
                          </div>
                          <div className="token-name">{item.name}</div>
                        </div>
                      )
                    }}
                    buttonName={
                      <div className="button-name-inner">
                        <div className="token-icon">
                          <FontAwesomeIcon icon={['fab', 'ethereum']} />
                        </div>
                        <div className="token-name">
                          {currentToken} ({TOKEN_CURRENCY_MAP[currentToken]})
                        </div>
                      </div>
                    }
                    items={[
                      {
                        name: 'Ethereum (ETH)',
                        value: 'Ethereum'
                      },
                      { name: 'Dai (DAI)', value: 'Dai' }
                    ]}
                  />
                </div>
              </div>
              <div className="amount-box-wrapper">
                <div className="amount-box-title">Amount</div>
                <div className="amount-box">
                  <input
                    className="amount-input"
                    type="number"
                    ref={amountInput}
                    onChange={e => {
                      setTokenAmount(e.target.value)
                    }}
                  />
                  <div className="amount-unit-box-wrapper">
                    <Dropdown
                      onSelected={props.setUnit}
                      buttonName={currentUnit}
                      items={[
                        { name: 'USD', value: 'USD' },
                        { name: 'EUR', value: 'EUR' },
                        { name: 'JPY', value: 'JPY' }
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="token-amount-confirm-section">
                <div className="token-amount-confirm-title">
                  You will deposit:
                </div>
                <div className="token-amount">{tokenAmount}</div>
                <div className="token-currency">
                  {TOKEN_CURRENCY_MAP[currentToken]}
                </div>
              </div>
              <div className="cancel-next-buttons">
                <div
                  className="cancel-button"
                  onClick={() => {
                    amountInput.current.value = ''
                    setTokenAmount(0)
                  }}
                >
                  <a className="cancel">Cancel</a>
                </div>
                <div className="next-button" onClick={props.setPage}>
                  <a className="next">Next</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="confirmation-page">
              This is the confirmation page.
              {console.log(currentPage, 0)}
            </div>
          )}
        </div>
      </ClickOutside>
      <style jsx>{`
        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background-color: rgba(40, 40, 40, 0.5);
          display: flex;
          justify-content: center;
        }
        .modal-bg > :global(.modal-main) {
          position: fixed;
          top: calc(10% + 10px);
          width: 50%;
          min-width: 520px;
          height: calc(80% - 20px);
          min-height: 440px;
          background-color: white;
          opacity: 1;
          box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 15px 0px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: scroll;
        }
        .close-button {
          text-align: end;
          font-size: 32px;
          position: absolute;
          top: 0px;
          right: 0px;
          margin-top: 16px;
          margin-right: 24px;
          color: darkgray;
          cursor: pointer;
        }
        .deposit-page-title {
          margin: 60px;
          margin-right: 40px;
          font-size: 34px;
          font-weight: 700;
          text-align: center;
        }
        .contents {
          padding: 0px 32px 16px 32px;
        }
        .token-box-title {
          font-size: 18px;
          font-weight: 650;
        }
        .token-select-box-wrapper {
          width: 321px;
          height: 40px;
          border: solid 1px darkgray;
          border-radius: 6px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .token-select-box-wrapper:hover .token-dropdown-button {
          color: #1d63e6;
        }
        .token-select-box-wrapper > :global(.dropdown) {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-button) {
          width: 100%;
          height: 32px;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3d5bf1;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-button)
          > :global(.button-name) {
          width: 280px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button-name-inner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .token-name {
          margin-left: 8px;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-button)
          > :global(.dropdown-caret) {
          font-size: 20px;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-content) {
          display: none;
          position: absolute;
          left: 4px;
          bottom: -63px;
          width: 312px;
          background-color: white;
          border: solid 1px darkgray;
          border-bottom: none;
          opacity: 90%;
          z-index: 1;
          color: #3d5bf1;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item):hover {
          font-weight: 600;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
          padding: 4px;
          border-bottom: solid 1px darkgray;
        }
        .token-dropdown-button {
          font-size: 20px;
          padding: 0px 8px;
          cursor: pointer;
          height: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .amount-box-wrapper {
          margin-top: 16px;
        }
        .amount-box-title {
          font-size: 18px;
          font-weight: 650;
        }
        .amount-box {
          width: 320px;
          border: solid 1px darkgray;
          border-radius: 6px;
          display: flex;
        }
        .amount-input {
          width: 246px;
          padding: 4px;
          font-size: 16px;
          margin-left: 4px;
          border: none;
        }
        .amount-unit-box-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #b1c6f7;
          border-radius: 0 5px 5px 0;
          width: 68px;
          cursor: pointer;
        }
        .amount-unit-box-wrapper > :global(.dropdown) {
          position: relative;
          height: 100%;
          width: 100%;
        }
        .amount-unit-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-button) {
          height: 38px;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 500;
          color: #3d5bf1;
        }
        .amount-unit-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-content) {
          display: none;
          font-size: 15px;
          font-weight: 400;
          position: absolute;
          left: 0px;
          bottom: -78px;
          width: 65px;
          background-color: #c0d3ff;
          border: solid 1px darkgray;
          border-bottom: none;
          opacity: 90%;
        }
        .amount-unit-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(100% + 1px);
          padding: 2px;
          height: 100%;
          cursor: pointer;
          border-bottom: solid 1px darkgray;
          color: #007bff;
        }
        .amount-unit-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item):hover {
          font-weight: 600;
        }
        .amount-unit-box-wrapper:hover {
          background-color: #c0d3ff;
        }
        .filter > :global(.dropdown) > :global(.dropdown-button):hover {
          color: #1d63e6;
        }
        .amount-unit-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-button)
          > :global(.dropdown-caret) {
          margin-left: 8px;
          font-size: 20px;
          color: #3d5bf1;
        }
        .token-amount-confirm-section {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .token-amount-confirm-title,
        .token-currency {
          font-size: 16px;
          font-weight: 500;
        }
        .token-amount {
          margin: -3px 14px;
          margin-left: 10px;
          font-size: 26px;
          font-weight: 600;
        }

        .cancel-next-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin: 16px 0px;
          width: inherit;
        }
        .cancel-button,
        .next-button {
          padding: 6px;
          width: 108px;
          text-align: center;
          background-color: #b1c6f7;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }
        .cancel-button {
          margin-right: 24px;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  currentToken: state.currentToken,
  currentUnit: state.currentUnit,
  currentPage: state.currentPage
})

const mapDispatchToProps = {
  setToken,
  setUnit,
  setPage
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)
