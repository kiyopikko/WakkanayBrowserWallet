import Layout from '../components/Layout'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faArrowsAltH)

export default function OrderBook() {
  return (
    <Layout>
      <div className="orderbook-page">
        <div className="orderbook-page-title">Exchange Order Book</div>
        <div className="search-box">
          <div className="search-box-content">
            <div className="paid-token-box">
              <div className="paid-token-title">Exchange</div>
              <input className="paid-token-input" type="text" placeholder=" e.g. Ethereum"></input>
            </div>
            <div className="received-token-box">
              <div className="recieved-token-title">Receive</div>
              <input className="received-token-input" type="text" placeholder=" e.g. Dai"></input>
            </div>
            <div className="max-paid-amount-box">
              <div className="max-amount-title">Max Exchange $</div>
              <input className="max-paid-amount-input" placeholder=" 0.01ETH"></input>
            </div>
          </div>
          <div className="search-button-wrapper">
            <div className="search-button">
            <img className="seach-icon" src="//ssl.gstatic.com/images/icons/material/system/2x/search_white_24dp.png" height="24" width="24" />
            <span className="search-button-text">Search</span>
            </div>
          </div>
        </div>
        <div className="order-list-box">
          <div className="order-list">
            <div className="token-box">
              <img className="token-image" src="../ethereum-icon.png" alt="Ethereum Icon"></img>
              <div className="amount-content">
                <div className="amount-box">
                  <div className="amount">0.01</div>
                  <div className="token-type">ETH</div>
                </div>
                <div className="amount-in-usd">$9.33 USD</div>
              </div>
            </div>
            <div className="arrow"><FontAwesomeIcon icon="arrows-alt-h" /></div>
            <div className="token-box">
              <img className="token-image" src="../dai-icon.png" alt="Dai Icon"></img>
              <div className="amount-content">
                <div className="amount-box">
                  <div className="amount">9.35</div>
                  <div className="token-type">DAI</div>
                </div>
                <div className="amount-in-usd">$9.35 USD</div>
              </div>
            </div>
          </div>
          <div className="order-list">
            <div className="token-box">
              <img className="token-image" src="../ethereum-icon.png" alt="Ethereum Icon"></img>
              <div className="amount-content">
                <div className="amount-box">
                  <div className="amount">0.01</div>
                  <div className="token-type">ETH</div>
                </div>
                <div className="amount-in-usd">$9.33 USD</div>
              </div>
            </div>
            <div className="arrow"><FontAwesomeIcon icon="arrows-alt-h" /></div>
            <div className="token-box">
              <img className="token-image" src="../dai-icon.png" alt="Dai Icon"></img>
              <div className="amount-content">
                <div className="amount-box">
                  <div className="amount">9.33</div>
                  <div className="token-type">DAI</div>
                </div>
                <div className="amount-in-usd">$9.33 USD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .orderbook-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .orderbook-page-title {
        margin-top: 24px;
        font-weight: 680;
        font-size: x-large;
      }
      .search-box {
        width: 480px;
        height:108px;
        border: solid 1px lightgray;
        margin-top: 20px;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 1px 3px rgba(60,64,67, 0.3), 0 4px 8px 3px rgba(60,64,67, 0.15);
      }
      .search-box-content {
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      .paid-token-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-right: 8px;
        margin-bottom: 24px;
      }
      .paid-token-title, .recieved-token-title, .max-amount-title {
        font-weight: 600;
        margin-bottom: 2px;
      }
      .paid-token-input {
        border: solid 2px lightgray;
        border-radius: 6px;
        width: 132px;
        height: 32px;
        font-size: 16px;
      }
      ::placeholder{
        color: darkgray;
      }
      .received-token-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-right: 16px;
        margin-bottom: 24px;
      }
      .received-token-input {
        border: solid 2px lightgray;
        border-radius: 6px;
        font-size: 16px;
        width: 132px;
        height: 32px;
      }
      .max-paid-amount-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24px;
      }
      .max-paid-amount-input {
        border: solid 2px lightgray;
        border-radius: 6px;
        font-size: 16px;
        width: 132px;
        height: 32px;
      }
      .search-button-wrapper {
        align-items: center;
        bottom: calc(16px/2);
        display: flex;
        flex-direction: column;
        left: 0;
        margin: 0 auto;
        pointer-events: none;
        position: relative;
        right: 0;
      }
      .search-button {
        border-radius: 20px;
        height: 36px;
        min-width: 40px;
        background-color: #1a73e8;
        pointer-events: auto;
        align-items: center;
        border: none;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12);
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: flex;
        outline: none;
        padding: 0 8px;
        position: absolute;
        user-select: none;
        transition: all 0.05s linear;
      }

      .search-button:active {
        transform: translateY(2px) translateX(1px);
      }
      .search-icon {
        height: 24px;
        width: 24px;
        pointer-events: auto;
      }
      .search-button-text {
        padding: 0 16px 0 8px;
        color: white;
        cursor: pointer;
      }
      .order-list-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 480px;
        margin-top: 28px;
      }
      .order-list {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 2px lightgray;
        margin-bottom: 12px;
        border-radius: 6px;
      }
      .token-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 16px;
      }
      .token-image {
        width: 28px;
        height: 48px;
      }
      .amount-content {
        margin-left: 12px;
      }
      .amount-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .amount {
        font-size: 20px;
        font-weight: 600;
      }
      .token-type {
        font-size: 14px;
        margin-left: 4px;
      }
      .amount-in-usd {
        font-size: 13px;
        color: darkgray;
        font-weight: 640;
      }
      .arrow {
        font-size: 28px;
      }
      `}</style>
    </Layout>
  )
}