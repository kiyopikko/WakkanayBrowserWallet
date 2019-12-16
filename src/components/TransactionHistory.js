import { connect } from 'react-redux'
import { setFilter } from '../store/transaction_history'
import Dropdown from './Dropdown'

//Font Awesome Import
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
library.add(faCaretDown)

const TransactionHistory = props => {
  const currentFilter = props.currentFilter
  return (
    <div className="block-explorer-page">
      <div className="search-box-wrapper">
        <div className="search-box">
          <div className="filter">
            <Dropdown
              onSelected={props.setFilter}
              buttonName={currentFilter}
              items={[
                { name: 'Filter ▽', value: 'Filter ▽' },
                { name: 'Address', value: 'Address' },
                { name: 'Token', value: 'Token' },
                { name: 'ENS', value: 'ENS' },
                { name: 'Block #', value: 'Block #' },
                { name: 'Range', value: 'Range' }
              ]}
            />
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Seach address, ENS, token, block height"
          ></input>
        </div>
        <div className="search-button">Search</div>
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
        .block-explorer-page {
          width: 420px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 14px;
        }
        .search-box-wrapper {
          margin-top: 4px;
          border: solid 2px lightgray;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          font-size: 12px;
          border-radius: 6px;
        }
        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          border: solid 2px lightgray;
          margin: 8px;
          width: 320px;
          height: 28px;
          border-radius: 6px;
        }
        .filter {
          min-width: 60px;
          border-right: solid 2px lightgray;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .filter > :global(.dropdown) {
          position: relative;
          width: 64px;
          height: 100%;
        }
        .filter > :global(.dropdown) > :global(.dropdown-button) {
          font-size: 11px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 24px;
          cursor: pointer;
        }
        .filter
          > :global(.dropdown)
          > :global(.dropdown-button)
          > :global(.dropdown-caret) {
          display: none;
        }
        .filter > :global(.dropdown) > :global(.dropdown-content) {
          display: none;
          position: absolute;
          left: 1px;
          bottom: -163px;
          width: 65px;
          border: solid 2px lightgray;
          border-bottom: none;
          opacity: 90%;
        }
        .filter
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item):hover {
          font-weight: 600;
        }
        .filter
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
          border-bottom: solid 2px lightgray;
        }
        .search-input {
          padding: 8px;
          width: 252px;
          height: 22px;
          border: none;
          color: white;
          font-size: 11px;
        }
        .search-button {
          height: 26px;
          border: solid 2px lightgray;
          padding: 4px 4px;
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
        }
        .tx-list-title {
          margin-top: 20px;
          margin-bottom: 16px;
          font-size: 16px;
          width: 100%;
          font-family: courier;
        }
        .tx-list-item {
          font-family: courier;
          color: white;
          font-size: 12px;
        }
        .date {
          color: #6dd400;
        }
        .token-title {
          color: #44d7b6;
          font-size: 500;
        }
        .sender-title {
          color: #88c7d4;
        }
        .recepient-title {
          color: #80a2be;
        }
        .claim-type-title {
          color: #f7b500;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  currentFilter: state.currentFilter
})

const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
