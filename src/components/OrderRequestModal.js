//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowsAltH, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faArrowsAltH, faTimes)

import { useRouter } from 'next/router'
import ClickOutside from 'react-click-outside'
import { connect } from 'react-redux'
import { useState, useRef } from 'react'
import Dropdown from './Dropdown'
import { shortenAddress, TOKEN_CURRENCY_MAP } from '../utils'

import {
  setRequestedTokenToExchange,
  setRequestedAmountToExchange,
  setRequestedTokenToReceive,
  setRequestedAmountToReceive,
  setOrderRequestPage
} from '../store/exchange'
import { MODAL_BACKGROUND, SUBTEXT } from '../colors'
import { PrimaryButton } from './PrimaryButton'

const OrderRequestModal = props => {
  const router = useRouter()
  const requestedTokenToExchange = props.requestedTokenToExchange
  const requestedTokenToReceive = props.requestedTokenToReceive
  const orderRequestPage = props.orderRequestPage
  const [requestedAmountToExchange, setRequestedAmountToExchnage] = useState(0)
  const amountInput = useRef('')
  const tokenBalanceList = props.tokenBalanceList

  return (
    <div className="modal-bg">
      <ClickOutside
        className="modal-main"
        onClickOutside={e => {
          e.preventDefault()
          const href = `${router.route}`
          router.push(href)
          props.setOrderRequestPage('input-page')
        }}
      >
        <div
          className="close-button"
          onClick={e => {
            e.preventDefault()
            const href = `${router.route}`
            router.push(href)
            props.setOrderRequestPage('input-page')
          }}
        >
          <FontAwesomeIcon icon="times" />
        </div>
        <div className="contents">
          {orderRequestPage === 'input-page' ? (
            <div className="order-request-page" id="order-request">
              <div className="exchange-order-request-title-box">
                Exchange Order Request
              </div>
              <div className="exchange-order-request-box">
                <div className="token-box">
                  <div className="action-title">Pay</div>
                  <div className="token-select-box-wrapper">
                    <Dropdown
                      onSelected={props.setRequestedTokenToExchange}
                      renderItem={item => {
                        return (
                          <div className="button-name-inner">
                            <div className="l2-token-img-bg">
                              <img
                                className="l2-token-img"
                                src="../ethereum-icon.png"
                                alt="Ethereum Logo"
                              ></img>
                            </div>
                            <div className="token-name">{item.name}</div>
                          </div>
                        )
                      }}
                      buttonName={
                        <div className="button-name-inner">
                          <div className="l2-token-img-bg">
                            <img
                              className="l2-token-img"
                              src="../ethereum-icon.png"
                              alt="Ethereum Logo"
                            ></img>
                          </div>
                          <div className="token-name">
                            {shortenAddress(requestedTokenToExchange)} (
                            {TOKEN_CURRENCY_MAP[requestedTokenToExchange]})
                          </div>
                        </div>
                      }
                      items={tokenBalanceList.map(({ tokenAddress }) => ({
                        name: shortenAddress(tokenAddress),
                        value: tokenAddress
                      }))}
                    />
                  </div>
                  <input className="amount-input" type="number"></input>
                  <div className="amount-in-usd">9.33 USD</div>
                  <div className="insufficient-fund">Insufficient Fund</div>
                </div>
                <div className="arrow">
                  <FontAwesomeIcon icon="arrows-alt-h" />
                </div>
                <div className="token-box">
                  <div className="action-title">Receive</div>
                  <div className="token-select-box-wrapper">
                    <Dropdown
                      onSelected={props.setRequestedTokenToReceive}
                      renderItem={item => {
                        return (
                          <div className="button-name-inner">
                            <div className="l2-token-img-bg">
                              <img
                                className="l2-token-img"
                                src="../ethereum-icon.png"
                                alt="Ethereum Logo"
                              ></img>
                            </div>
                            <div className="token-name">{item.name}</div>
                          </div>
                        )
                      }}
                      buttonName={
                        <div className="button-name-inner">
                          <div className="l2-token-img-bg">
                            <img
                              className="l2-token-img"
                              src="../ethereum-icon.png"
                              alt="Ethereum Logo"
                            ></img>
                          </div>
                          <div className="token-name">
                            {shortenAddress(requestedTokenToReceive)} (
                            {TOKEN_CURRENCY_MAP[requestedTokenToReceive]})
                          </div>
                        </div>
                      }
                      items={tokenBalanceList.map(({ tokenAddress }) => ({
                        name: shortenAddress(tokenAddress),
                        value: tokenAddress
                      }))}
                    />
                  </div>
                  <input className="amount-input"></input>
                  <div className="amount-in-usd">9.33 USD</div>
                  <div className="insufficient-fund">Insufficient Fund</div>
                </div>
              </div>
              <div className="expected-balance-box">
                <div className="expected-balance-title">
                  Expected New Balance
                </div>
                <div className="expected-balance-contents">
                  <div className="token-expected-balance-box-left">
                    <div className="token-new-amount">
                      <div className="token-new-amount-in-eth">
                        <span className="token-new-amount-text">1.05</span>
                        <span className="token-type-unit">ETH</span>
                      </div>
                      <div className="token-new-amount-in-usd">215.18 USD</div>
                    </div>
                    <div className="token-paying-diff">▼ 0.05ETH</div>
                  </div>
                  <div className="token-expected-balance-box-right">
                    <div className="token-new-amount">
                      <div className="token-new-amount-in-eth">
                        <span className="token-new-amount-text">70</span>
                        <span className="token-type-unit">DAI</span>
                      </div>
                      <div className="token-new-amount-in-usd">70 USD</div>
                    </div>
                    <div className="token-receiving-diff">▲ 9.33DAI</div>
                  </div>
                </div>
              </div>
              <div className="cancel-confirm-buttons">
                <div className="cancel-button">
                  <a className="cancel">Cancel</a>
                </div>
                <div className="create-button">
                  <PrimaryButton
                    onClick={() => {
                      props.setOrderRequestPage('confirm-page')
                    }}
                  >
                    Create
                  </PrimaryButton>
                </div>
              </div>
            </div>
          ) : orderRequestPage === 'confiramtion-page' ? (
            <div className="confirmation-page">
              <div className="mordal-page-title">Transaction Summary</div>
              <div
                className="back-button"
                onClick={() => {
                  props.setOrderRequestPage('input-page')
                }}
              >
                <FontAwesomeIcon icon="arrow-left" />
              </div>
              <div className="amount-confirmation-section">
                exchange transaction summary
              </div>
              <div className="cancel-next-buttons">
                <div
                  className="cancel-button"
                  onClick={() => {
                    props.setOrderRequestPage('input-page')
                  }}
                >
                  <a className="cancel">Cancel</a>
                </div>
                <div className="confirm-button">
                  <PrimaryButton>Confirm</PrimaryButton>
                </div>
              </div>
              <div>Click confirm to open Metamask</div>
            </div>
          ) : (
            <div>Exchange Order Requested </div>
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
          background-color: ${MODAL_BACKGROUND};
          display: flex;
          justify-content: center;
        }
        .modal-bg > :global(.modal-main) {
          position: fixed;
          top: calc(10% + 10px);
          min-width: 438px;
          min-height: 440px;
          background-color: rgba(32, 32, 32, 0.9);
          opacity: 1;
          box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 15px 0px;
          border-radius: 10px;
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
        .mordal-page-title {
          margin: 60px 40px 12px 40px;
          margin-right: 40px;
          font-size: 32px;
          font-weight: 700;
          text-align: center;
        }
        .contents {
          width: 100%;
          padding: 26px;
        }
        .order-request-page {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .exchange-order-request-title-box {
          margin-top: 32px;
          font-weight: 400;
          font-size: 24px;
        }
        .exchange-order-request-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 27px;
        }
        .token-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3),
            0 4px 8px 3px rgba(60, 64, 67, 0.15);
        }
        .action-title {
          font-weight: 400;
          font-size: 24px;
        }
        .token-select-box-wrapper {
          margin-top: 14px;
          width: 128px;
          height: 47px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          display: flex;
          align-items: center;
          cursor: pointer;
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
          font-size: 16px;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-button)
          > :global(.button-name) {
          width: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button-name-inner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .l2-token-img-bg {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 14px;
        }
        .l2-token-img {
          height: 22px;
        }
        .token-name {
          margin-left: 8px;
        }
        .token-select-box-wrapper
          > :global(.dropdown)
          > :global(.dropdown-content) {
          display: none;
          position: absolute;
          left: 4px;
          top: 38px;
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
        .amount-input {
          width: 129px;
          height: 47px;
          font-size: 36px;
          font-weight: 300;
          color: white;
          border: none;
          background-color: rgba(255, 255, 255, 0.04);
          border-radius: 4px;
          margin-top: 10px;
        }
        .amount-input:focus {
          outline: 0;
        }
        .amount-in-usd {
          font-size: 13px;
          color: darkgray;
          font-weight: 640;
          margin-top: 8px;
        }
        .insufficient-fund {
          color: red;
          font-size: 13px;
          margin-top: 4px;
        }
        .arrow {
          font-size: 28px;
        }
        .expected-balance-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 16px;
          margin-top: 14px;
          border-radius: 6px;
        }
        .expected-balance-title {
          font-size: 16px;
          font-weight: 400;
          width: 100%;
        }
        .expected-balance-contents {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }
        .token-expected-balance-box-left {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: 58px;
        }
        .token-expected-balance-box-right {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .token-new-amount-text {
          font-size: 36px;
          font-weight: 300;
        }
        .token-type-unit {
          font-size: 14px;
          font-weight: 400;
          margin-left: 6px;
        }
        .token-new-amount-in-usd {
          font-size: 14px;
          font-weight: 400;
          color: ${SUBTEXT};
        }
        .token-paying-diff {
          font-size: 12px;
          font-weight: 400;
          margin-left: 5px;
          color: #eb3959;
        }
        .token-receiving-diff {
          font-size: 12px;
          font-weight: 400;
          margin-left: 5px;
          color: #2baef8;
        }
        .cancel-confirm-buttons {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 24px 0px;
          width: 100%;
          border-radius: 6px;
        }
        .cancel-button {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-right: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 108px;
          height: 40px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  tokenBalanceList: state.balance.tokenBalanceList,
  requestedTokenToExchange: state.exchangeState.requestedTokenToExchange,
  requestedAmountToExchange: state.exchangeState.requestedAmountToExchange,
  requestedTokenToReceive: state.exchangeState.requestedTokenToReceive,
  requestedAmountToReceive: state.exchangeState.requestedAmountToReceive,
  orderRequestPage: state.exchangeState.orderRequestPage
})

const mapDispatchToProps = {
  setRequestedTokenToExchange,
  setRequestedAmountToExchange,
  setRequestedTokenToReceive,
  setRequestedAmountToReceive,
  setOrderRequestPage
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderRequestModal)
