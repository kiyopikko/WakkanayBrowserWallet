import Layout from '../components/Layout'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSignInAlt)

export default function Receive() {
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
      <div className="receive-section">
        <div className="receive-eth-title-box">
          <div className="receive-eth">Request to receive ETH</div>
          <div className="receive-icon"><FontAwesomeIcon icon="sign-in-alt" /></div>
        </div>
        <div className="address-box">
          <div className="address-title">Your Plasma Wallet Address:</div>
          <div className="address">0x51535cA2E01985a7b4D6412958B438aa23111BaC</div>
          <div className="qr-code-box"><img className="qr-code" src="qr-code.png" alt="Your QR Code" /></div>
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
        .receive-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px 24px;
          margin: 24px;
          background-color: #FCF7F5;
          border: solid lightgray 2px;
          border-radius: 6px;
        }
        .receive-eth-title-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .receive-eth {
          font-size: 22px;
          font-weight: 680;
        }
        .receive-icon {
          font-size: 18px;
          margin-left: 8px;
        }
        .address-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .address-title {
          font-size: 18px;
          font-weight: 500;
          text-align: center;
          margin-top: 8px;
          margin-bottom: 2px;
        }
        .address {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          color: #0091FF;
        }
        .qr-code-box {
          width: 180px;
          margin-top: 16px
        }
        .qr-code {
          width: 180px;
        }
      `}</style>
    </Layout>
  )
}