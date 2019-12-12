import Layout from '../components/Layout'

//Font Awesome Import
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
library.add(faCaretDown)

export default function Home() {
  return (
    <Layout>
      <div className="display-box">
        <p>this is a function display box</p>
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
        .display-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 558px;
          height: 300px;
          border: solid 2px lightgray;
          margin: 20px;
        }
        .transaction-history {
          margin: 20px;
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
        .amount,
        .time {
          margin-right: 8px;
        }
        .amount-unit {
          margin-right: 40px;
        }
        .ampm {
          margin-right: 16px;
        }
        .caret-down {
          font-size: 16px;
        }
      `}</style>
    </Layout>
  )
}
