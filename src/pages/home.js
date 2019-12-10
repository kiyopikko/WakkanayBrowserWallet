import Layout from '../components/Layout'
import Link from 'next/link'

//Font Awesome Import
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
library.add(faCaretDown)

export default function Home() {
  return (
    <Layout>
      <div className="balance-box">
        <div className="your-balance-title">Your Ethereum Balance</div>
        <div className="balance-board">
          <img
            className="ethereum-logo"
            src="../ethereum-icon.png"
            alt="Ethereum Logo"
          ></img>
          <div className="total-balance-box">
            <span className="total-balance-number">2</span>
            <span className="total-balance-unit">ETH</span>
            <div className="balance-in-usd">$370.34 USD</div>
          </div>
        </div>
        <div className="send-receive-buttons">
          <Link href="./send">
            <div className="send-button">
              <a className="send">Send</a>
            </div>
          </Link>
          <Link href="./receive">
            <div className="receive-button">
              <a className="receive">Receive</a>
            </div>
          </Link>
        </div>
      </div>
      <div className="transaction-history">
        <div className="transaction-hisotry-title">Transaction History</div>
        <div className="transaction-date">Nov 13, 2019</div>
        <hr />
        <div className="history-container">
          <li className="transaction">
            <div className="transation-right-content">
              <img className="transaction-type-icon"></img>
              <a className="amount">0.05</a>
              <a className="amount-unit">ETH</a>
              <a className="transaction-type">Sent</a>
            </div>
            <div className="transaction-left-content">
              <a className="time">5:06</a>
              <a className="ampm">AM</a>
              <a className="caret-down">
                <FontAwesomeIcon icon="caret-down" />
              </a>
            </div>
          </li>
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
      .send-receive-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 200px;
        margin-top: 12px;
        text
      }
      .send-button, .receive-button {
        padding: 6px 4px;
        border: solid gray 2px;
        width: 96px;
        text-align: center;
        background-color: #FCF7F5;
        cursor: pointer;
      }
      .send-button:hover, .receive-button:hover {
        color: #007bff;
      }
      .send, .receive {
        font-size: smaller;
        font-weight: 680;
        text-decoration: none;
      }

      .transaction-history {
        margin: 20px 20px;
      }

      .transaction-hisotry-title {
        font-size: 24px;
        font-weight: 700;
      }
      .transaction-date {
        margin-top: 8px;
      }

      .transaction {
        list-style-type: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .amount, .time {
        margin-right: 8px;
      }
      .amount-unit {
        margin-right: 40px;
      }
      .ampm {
        margin-right: 16px;
      }
      .caret-down {
        font-size:16px;
      }
      `}</style>
    </Layout>
  )
}
