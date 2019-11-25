//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faClipboard)

import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip'

// import mock light client
// import LightClient from 'wakkanay-plasma-light-client'
// const client = new LightClient()
// client.init()

// Redux
import { connect } from 'react-redux'

const shortenAddress = address => {
  const former = address.slice(0, 7)
  const latter = address.slice(address.length - 5, address.length)
  return `${former}...${latter}`
}

const AccountInfo = props => {
  return (
    <div className="account-info">
      <div className="account-info-box">
        <img
          className="profile-picture"
          src="yuriko-profile-picture.jpg"
          alt="Yuriko Profile Picture"
        ></img>
        <div className="user-info-bar">
          <span className="account-name">yuriko.eth</span>
        </div>
        <CopyToClipboard text={props.address}>
          <div className="account-address-set" data-tip="React-tooltip">
            <div className="account-address">
              {shortenAddress(props.address)}
            </div>
            <div className="copy-button">
              <FontAwesomeIcon icon="clipboard" />
            </div>
          </div>
        </CopyToClipboard>
        <ReactTooltip place="bottom" type="dark" effect="solid">
          <span>Copy to Clipboard</span>
        </ReactTooltip>
        <div className="total-balance-title">Total </div>
        <div className="total-balance">$450.34 USD</div>
        <div className="deposit-withdraw-buttons">
          <div className="deposit-button">
            <a className="deposit">Deposit</a>
          </div>
          <div className="withdraw-button">
            <a className="withdraw">Withdraw</a>
          </div>
        </div>
        {props.balance.map(item => (
          <div className="token-box" key={item.tokenAddress}>
            {/* TODO: dynamically get logo image */}
            <img
              className="eth-logo"
              src="../ethereum-icon.png"
              art="ETH Token Logo"
            />
            <div className="token-amount-box">
              <div className="token-amount-in-crypto-box">
                <div className="token-amount">{item.amount}</div>
                <div className="token-type">{item.tokenName.toUpperCase()}</div>
              </div>
              {/* TODO: Use API to get usd-amount */}
              <div className="usd-amount">$432.122USD</div>{' '}
            </div>
          </div>
        ))}

        <div className="token-box">
          <div className="add-new-token-text">+ New Token</div>
        </div>
        <div className="bottom-box">
          <span className="setting">Setting</span>
          <span className="help">Help</span>
        </div>
      </div>
      <style jsx>{`
        .account-info {
          width: 280px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 20px;
          background-color: #fcf7f5;
          overflow: scroll;
        }
        .token-list-icon {
          font-size: 24px;
        }
        .account-info-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .user-info-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .account-name {
          margin-top: 4px;
          font-weight: 680;
          font-size: x-large;
        }
        .account-address-set {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          cursor: pointer;
        }
        .account-address-set:hover {
          background-color: lightgray;
        }
        .account-address {
          color: lightslategray;
          font-size: smaller;
          font-weight: 500;
        }
        .copy-button {
          font-size: 12px;
          margin-left: 4px;
        }
        .profile-picture {
          width: 60%;
          border-radius: 50%;
          border: 4px solid #c0d3ff;
        }
        .total-balance-title {
          font-weight: 640;
          font-size: 20px;
          margin-top: 14px;
        }
        .total-balance {
          font-size: xx-large;
          font-weight: 680;
        }
        .deposit-withdraw-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          width: 100%;
          margin-top: 28px;
        }
        .deposit-button,
        .withdraw-button {
          padding: 12px;
          border: solid lightgray 1px;
          border-right: none;
          width: 100%;
          text-align: center;
          background-color: white;
        }
        .deposit-button {
          border-left: none;
        }
        .deposit,
        .withdraw {
          color: #0091ff;
          font-size: 18px;
          font-weight: 600;
        }
        .token-box {
          padding: 10px;
          border-top: solid lightgray 1px;
          width: 100%;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .eth-logo {
          width: 24px;
          margin-right: 32px;
          margin-left: 12px;
        }
        .token-amount-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .token-amount-in-crypto-box {
          display: flex;
          align-items: center;
        }
        .token-amount {
          margin-right: 8px;
          font-size: 20px;
          font-weight: 540;
        }
        .token-type {
          font-size: 20px;
          font-weight: 540;
        }

        .usd-amount {
          font-size: 14px;
        }
        .add-new-token-text {
          margin-left: 48px;
          font-size: 20px;
          margin-top: 10px;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .bottom-box {
          width: 100%;
          padding: 40px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: solid lightgray 1px;
        }
        .setting,
        .help {
          color: #0091ff;
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  address: state.address,
  balance: state.balance
})

export default connect(mapStateToProps)(AccountInfo)
