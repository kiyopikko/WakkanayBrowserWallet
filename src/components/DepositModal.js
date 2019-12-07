import { useRouter } from 'next/router'
import ClickOutside from 'react-click-outside'
//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faTimes)

import { connect } from 'react-redux'
import { setToken } from '../store/deposit_modal'
import { setUnit } from '../store/deposit_modal'

const DepositModal = props => {
  const router = useRouter()
  const currentToken = props.currentToken
  const currentUnit = props.currentUnit
  return (
    <div className="modal-bg">
      <ClickOutside
        className="modal-main"
        onClickOutside={e => {
          e.preventDefault()
          const href = `${router.route}`
          router.push(href)
        }}
      >
        <div
          className="close-button"
          onClick={e => {
            e.preventDefault()
            const href = `${router.route}`
            router.push(href)
          }}
        >
          <FontAwesomeIcon icon="times" />
        </div>
        <div className="deposit-page-title">Deposit from Metamask</div>
        <div className="contents">
          <div className="token-box-wrapper">
            <div className="token-box-title">Token</div>
            <div className="token-select-box-wrapper">
              <a className="selected-token">{currentToken}</a>
              <div className="token-dropdown-button">
                <FontAwesomeIcon icon="caret-down" />
              </div>
              <div className="dropdown-content"></div>
            </div>
          </div>
          <div className="amount-box-wrapper">
            <div className="amount-box-title">Amount</div>
            <div className="amount-box">
              <input className="amount-input" type="number" />
              <div className="amount-unit-button">
                <div className="selected-unit">{currentUnit}</div>
                <div className="unit-dropdown-button">
                  <FontAwesomeIcon icon="caret-down" />
                </div>
                <div className="dropdown-content"></div>
              </div>
            </div>
          </div>
          <div className="token-amount-confirm-section">You will deposit:</div>
          <div className="cancel-next-buttons">
            <div className="cancel-button">
              <a className="cancel">Cancel</a>
            </div>
            <div className="next-button">
              <a className="next">Next</a>
            </div>
          </div>
        </div>
      </ClickOutside>
      <style jsx>{`
        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background-color: rgba(40, 40, 40, 0.5);
          display: flex;
          justify-content: center;
        }
        .modal-bg > :global(.modal-main) {
          position: fixed;
          top: calc(10% + 10px);
          width: 50%;
          min-width: 520px;
          height: calc(80% - 20px);
          background-color: white;
          opacity: 1;
          box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 15px 0px;
          border-radius: 6px;
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
        .deposit-page-title {
          margin: 36px;
          margin-right: 40px;
          font-size: 34px;
          font-weight: 700;
          text-align: center;
        }
        .contents {
          padding: 16px 32px;
        }
        .token-box-title {
          font-size: 18px;
          font-weight: 650;
        }
        .token-select-box-wrapper {
          width: 320px;
          height: 32px;
          border: solid 1px lightgray;
          border-radius: 6px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .token-select-box-wrapper:hover .token-dropdown-button {
          color: #1d63e6;
        }
        .selected-token {
          width: 284px;
          height: 32px;
          font-size: 20px;
          margin-left: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .token-dropdown-button {
          font-size: 20px;
          padding: 0px 8px;
          cursor: pointer;
          height: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .amount-box-wrapper {
          margin-top: 16px;
        }
        .amount-box-title {
          font-size: 18px;
          font-weight: 650;
        }
        .amount-box {
          width: 320px;
          border: solid 1px lightgray;
          border-radius: 6px;
          display: flex;
        }
        .amount-input {
          width: 240px;
          padding: 4px;
          font-size: 16px;
          margin-left: 4px;
          border: none;
        }
        .amount-unit-button {
          width: 80px;
          height: inherit;
          background-color: #b1c6f7;
          border-radius: 0 5px 5px 0;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .amount-unit-button:hover {
          background-color: #c0d3ff;
        }
        .amount-unit-button:hover .selected-unit {
          color: #1d63e6;
        }
        .selected-unit {
          font-size: 15px;
          font-weight: 500;
          color: #3d5bf1;
        }
        .unit-dropdown-button {
          margin-left: 8px;
          font-size: 20px;
          color: #3d5bf1;
        }
        .token-amount-confirm-section {
          font-size: 16px;
          font-weight: 500;
          margin-top: 28px;
        }
        .cancel-next-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin: 16px 0px;
          width: inherit;
        }
        .cancel-button,
        .next-button {
          padding: 3px 4px;
          border: solid lightgray 2px;
          width: 104px;
          height: 36px;
          text-align: center;
          background-color: white;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .cancel-button:hover,
        .next-button:hover {
          color: #007bff;
        }
        .cancel-button {
          margin-right: 8px;
        }
        .next-buttom {
          margin-left: 8px;
        }
        .cancel,
        .next {
          font-size: smaller;
          font-weight: 680;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  currentToken: state.currentToken,
  currentUnit: state.currentUnit
})

const mapDispatchToProps = {
  setToken,
  setUnit
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal)
