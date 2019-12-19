import { connect } from 'react-redux'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSignInAlt)

import QRCode from 'qrcode.react'

const Receive = props => {
  return (
    <div>
      <div className="receive-section" id="receive">
        <div className="receive-eth-title-box">
          <div className="receive-eth">Request to Receive ETH</div>
          <div className="receive-icon">
            <FontAwesomeIcon icon="sign-in-alt" />
          </div>
        </div>
        <div className="address-box">
          <div className="address-title">Your Plasma Wallet Address:</div>
          <div className="address">{props.address}</div>
          <div className="qr-code-box">
            <QRCode
              className="qr-code"
              value={props.address}
              alt="Your QR Code"
              size={140}
              includeMargin={true}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .balance-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .your-balance-title {
          font-size: 24px;
          font-weight: 600;
          margin-top: 24px;
        }
        .ethereum-logo {
          width: 48px;
          margin-right: 16px;
        }
        .balance-board {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
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
          font-size: 18px;
          font-weight: 650;
        }
        .receive-section {
          width: 452px;
          display: flex;
          flex-direction: column;
          padding: 20px 24px;
          margin: 24px;
          background-color: #fcf7f5;
          border: solid lightgray 2px;
          border-radius: 6px;
        }
        .receive-eth-title-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .receive-eth {
          font-size: 28px;
          font-weight: 700;
        }
        .receive-icon {
          font-size: 18px;
          margin-left: 8px;
        }
        .address-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .address-title {
          font-size: 16px;
          font-weight: 500;
          margin-top: 16px;
          margin-bottom: 2px;
        }
        .address {
          font-size: 15px;
          font-weight: 500;
          color: lightslategray;
        }
        .qr-code-box {
          width: 180px;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  address: state.address,
  balance: state.balance
})

export default connect(mapStateToProps)(Receive)
