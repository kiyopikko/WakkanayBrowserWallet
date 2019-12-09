//Font Awesome Import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faCaretDown)

import { connect } from 'react-redux'
import { setFilter } from '../store/block_expolorer'
import Dropdown from './Dropdown'

const BlockExplorer = props => {
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
      <div className="tx-list-wrapper">
        <div className="tx-list-title">Lastest Transaction</div>
        <div className="tx-list">
          <div className="tx-list-item">
            <div className="top-row-">
              <span>[34]</span>
              <span className="date"> 2019-03-11 10:30:00</span>
              <span> Range:34-45</span>
              <span> at Block:21133 </span>
              <FontAwesomeIcon icon="caret-down" />
            </div>
            <div className="token">
              <span className="token-title">Token</span>
              <span>: </span>
              <span>0x00000000000000000000000000000000004535332</span>
            </div>
            <div className="sender">
              <span className="sender-title">Sender</span>
              <span>: </span>
              <span>0x1b2e79791f28c27ed669f257397e1deb3eT</span>
              <div> (ENS: yuriko.eth) -></div>
            </div>
            <div className="recepient">
              <span className="recepient-title">Recepient</span>
              <span>: </span>
              <span>0x1b2e79791f28c27ed669f257397e1deb3eT</span>
              <div>(ENS: N/A) -></div>
            </div>
            <div className="claim-type">
              <span className="claim-type-title">Claim type</span>
              <span>: Ownership</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .block-explorer-page {
          background-color: #282828;
          color: white;
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
          background-color: black;
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
          background-color: black;
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
          background-color: black;
          color: white;
          font-size: 11px;
        }
        .search-button {
          height: 26px;
          border: solid 2px lightgray;
          background-color: black;
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockExplorer)
