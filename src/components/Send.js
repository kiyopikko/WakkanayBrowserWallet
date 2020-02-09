import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { SUBTEXT, BACKGROUND, SECTION_BACKGROUND } from '../colors'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSignOutAlt)

import { connect } from 'react-redux'
import Dropdown from './Dropdown'
import { getBalance, getETHtoUSD } from '../store/tokenBalanceList'
import {
  setTransferredToken,
  setTransferredAmount,
  setRecepientAddress
} from '../store/transfer'
import { shortenAddress, TOKEN_CURRENCY_MAP } from '../utils'

const Send = props => {
  const router = useRouter()
  const recepientAddressRef = useRef('')
  const amountRef = useRef('')
  const transferredToken = props.transferredToken
  const tokenBalanceList = props.tokenBalanceList

  useEffect(() => {
    props.getBalance()
    props.getETHtoUSD()
  }, [])

  const tokenBalance = tokenBalanceList.find(
    ({ tokenAddress }) => tokenAddress === transferredToken
  )

  return (
    <div className="send-section" id="send">
      <div className="send-section-title">Send Token</div>
      {/* <div className="balance-box">
        <div className="your-balance-title">
          {shortenAddress(transferredToken)} Balance
        </div>
        <div className="balance-board">
          <img
            className="ethereum-logo"
            src="../ethereum-icon.png"
            alt="Ethereum Logo"
          ></img>
          <div className="total-balance-box">
            <span className="total-balance-number">
              {tokenBalance ? tokenBalance.amount : ''}
            </span>
            <span className="total-balance-unit">
              {TOKEN_CURRENCY_MAP[transferredToken]}
            </span>
            <div className="balance-in-usd">
              {props.ETHtoUSD * props.balance} USD
            </div>
          </div>
        </div>
      </div> */}
      <div className="address-box">
        <div className="address-title">Address</div>
        <input
          placeholder={'0x00000000000'}
          className="recepient-address-input"
          type="text"
          ref={recepientAddressRef}
        />
      </div>
      <div className="token-box">
        <div className="token-select-box-wrapper">
          <Dropdown
            onSelected={props.setTransferredToken}
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
                  {shortenAddress(transferredToken)} (
                  {TOKEN_CURRENCY_MAP[transferredToken]})
                </div>
              </div>
            }
            items={tokenBalanceList.map(({ tokenAddress }) => ({
              name: shortenAddress(tokenAddress),
              value: tokenAddress
            }))}
          />
        </div>
        <div className="amount-box">
          <input className="amount-input" type="number" ref={amountRef} />
          <span className="sent-amount-unit">
            {TOKEN_CURRENCY_MAP[transferredToken]}
          </span>
          <span className="sent-amount-in-usd">
            ({props.ETHtoUSD * amountRef} USD)
          </span>
        </div>
      </div>
      <div
        className="send-button"
        onClick={e => {
          props.setTransferredAmount(Number(amountRef.current.value))
          props.setRecepientAddress(recepientAddressRef.current.value)
          e.preventDefault()
          const href = `${router.route}?transfer`
          router.push(href, href, { shallow: true })
        }}
      >
        Send
      </div>

      <style jsx>{`
        .send-section {
          width: calc(100% - 40px);
          display: flex;
          flex-direction: column;
          padding: 20px;
          margin: 20px 0px;
          background-color: ${SECTION_BACKGROUND};
          position: relative;
        }
        .send-section-title {
          font-size: 24px;
          font-weight: 400;
        }
        .address-box {
          margin-top: 20px;
        }
        .recepient-address-input {
          width: 683px;
          height: 40px;
          padding: 4px;
          font-size: 16px;
          color: ${SUBTEXT};
          background-color: transparent;
          border: 1px solid rgba();
          border-width: 0 0 1px;
        }
        .recepient-address-input:focus {
          outline: 0;
        }
        .token-box {
          margin-top: 16px;
          display: flex;
        }
        .amount-box {
          margin-bottom: 16px;
        }
        .address-title {
          font-size: 16px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.5);
        }
        .token-select-box-wrapper {
          width: 128px;
          height: 47px;
          background-color: ${BACKGROUND};
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
          margin-left: 10px;
          height: 47px;
          width: 85px;
          padding: 4px;
          font-size: 36px;
          font-weight: 300;
          color: white;
          border-radius: 4px;
          background-color: ${BACKGROUND};
          border: none;
        }
        .sent-amount-unit {
          font-size: 18px;
          font-weight: 650;
          margin: 0px 6px;
        }
        .sent-amount-in-usd {
          color: ${SUBTEXT};
        }
        .send-button {
          padding: 6px;
          width: 109px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(122.3deg, #eb3959 0.21%, #c13087 93.55%);
          border-radius: 80.7px;
          font-size: 14px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          position: absolute;
          bottom: 25px;
          right: 20px;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  address: state.address,
  tokenBalanceList: state.balance.tokenBalanceList,
  ETHtoUSD: state.balance.ETHtoUSD,
  transferredToken: state.transferState.transferredToken,
  transferredAmount: state.transferState.transferredAmount,
  recepientAddress: state.transferState.recepientAddress
})

const mapDispatchToProps = {
  getBalance,
  getETHtoUSD,
  setTransferredToken,
  setTransferredAmount,
  setRecepientAddress
}
export default connect(mapStateToProps, mapDispatchToProps)(Send)
