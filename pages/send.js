import Layout from '../components/Layout'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSignOutAlt)

export default function Send() {
  return (
    <Layout>
      <div className="balance-box">
        <div className="your-balance-title">Your Ethereum balance</div>
        <div className="balance-board">
          <img className="ethereum-logo" src="../ethereum-icon.png" alt="Ethereum Logo"></img>
          <div className="total-balance-box">
            <span className="total-balance-number">2</span><span className="total-balance-unit">ETH</span>
            <div className="balance-in-usd">$370.34 USD</div>
          </div>
        </div>
      </div>
      <div className="send-section">
        <div className="send-eth-title-box">
          <div className="send-eth">Send ETH</div>
          <div className="send-icon"><FontAwesomeIcon icon="sign-out-alt" /></div>
        </div>
        <div className="address-box">
          <div className="address-tag"><a className="address">Address:</a></div>
          <input className="address-input"/>
        </div>
        <div className="amount-box">
          <div className="amount-tag"><a className="amount">Amount:</a></div>
          <input className="amount-input" type="number"/><span className="sent-amount-unit">ETH</span><span className="sent-amount-in-usd">(9.33USD)</span>
        </div>
        <div className="cancel-confirm-buttons">
          <div className="cancel-button"><a className="cancel">Cancel</a></div>
          <div className="confirm-button"><a className="confirm">Confirm</a></div>
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
          font-weight: 680;
          font-size: x-large;
          margin-top: 24px;
        }
        .ethereum-logo {
          width:48px;
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
          font-size:18px;
          font-weight: 650;
        }
        .send-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px;
          margin: 24px;
          background-color: #FCF7F5;
          border: solid lightgray 2px;
          border-radius: 6px;
        }
        .send-eth-title-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .send-eth {
          font-size: 22px;
          font-weight: 680;
        }
        .send-icon {
          font-size: 18px;
          margin-left: 8px;
        }
        .address-box, .amount-box {
          margin: 8px 0px;
        }
        .address, .amount {
          font-size: 18px;
          font-weight: 650;
        }
        .address-input, .amount-input {
          padding: 4px;
          border: solid 1px lightgray;
          font-size: 16px;
          border-radius: 6px;
        }
        .address-input {
          width: 400px;
        }
        .sent-amount-unit {
          font-size: 18px;
          font-weight: 650;
          margin: 0px 6px;
        }
        .cancel-confirm-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin-top: 12px;
          width: inherit;
        }
        .cancel-button, .confirm-button {
          padding: 3px 4px;
          border: solid gray 2px;
          width: 104px;
          text-align: center;
          background-color: white;
          border-radius: 6px;
        }
        .cancel-button {
          margin-right: 8px;
        }
        .confirm-buttom {
          margin-left: 8px;
        }
        .cancel, .confirm {
          font-size: smaller;
          font-weight: 680;
        }
      `}</style>
    </Layout>
  )
}