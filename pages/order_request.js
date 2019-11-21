import Layout from '../components/Layout'

export default function OrderRequest() {
  return (
    <Layout>
      <div className="order-request-page">
        <div className="exchange-order-request-title-box"><span className="exchange-order-request-title">Exchange Order Request</span></div>
        <div className="exchange-order-request-box">
          <div className="token-box">
            <div className="action-title">Paying:</div>
            <img className="token-image" src="../ethereum-icon.png" alt="Ethereum Icon"></img>
            <div className="amount-content">
              <div className="amount-box">
                <input className="amount-input"></input>
                <div className="token-type">ETH ▼</div>
              </div>
              <div className="amount-in-usd">$9.33 USD</div>
            </div>
            <div className="insufficient-fund">Insufficient Fund</div>
          </div>
          <div className="arrow">⇄</div>
          <div className="token-box">
            <div className="action-title">Receiving:</div>
            <img className="token-image" src="../dai-icon.png" alt="Dai Icon"></img>
            <div className="amount-content">
              <div className="amount-box">
                <input className="amount-input"></input>
                <div className="token-type">DAI ▼</div>
              </div>
              <div className="amount-in-usd">$9.33 USD</div>
            </div>
          </div>
        </div>
        <div className="expected-balance-box">
          <div className="expected-balance-title">Expected New Balance</div>
          <div className="expected-balance-contents">
            <div className="token-expected-balance-box">
              <div className="token-new-amount">
                <div className="token-new-amount-in-eth">
                  <span className="token-new-amount-text">1.05</span><span className="paying-token-type-unit">ETH</span>
                </div>
                <div className="token-new-amount-in-usd">$215.18 USD</div>
              </div>
              <div className="token-diff">▼ 0.05ETH</div>
            </div>
            <div className="token-expected-balance-box">
              <div className="token-new-amount">
                <div className="token-new-amount-in-eth">
                  <span className="token-new-amount-text">70</span><span className="paying-token-type-unit">DAI</span>
                </div>
                <div className="token-new-amount-in-usd">$70 USD</div>
              </div>
              <div className="token-diff">▲ 9.33DAI</div>
            </div>
          </div>
        </div>
        <div className="cancel-confirm-buttons">
          <div className="cancel-button"><a className="cancel">Cancel</a></div>
          <div className="confirm-button"><a className="confirm">Confirm</a></div>
        </div>
      </div>
      <style jsx>{`
      .order-request-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .exchange-order-request-title-box {
        margin-top: 24px;
        font-weight: 680;
        font-size: x-large;
      }
      .exchange-order-request-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .token-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 16px;
      }
      .action-title {
        font-weight: 640;
        font-size: 20px;
      }
      .token-image {
        width: 60px;
        height: 98px;
      }
      .amount-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .amount-input {
        margin-top: 12px;
        margin-right: 4px;
      }
      .token-type {
        margin-top: 12px;
        font-weight: 98px;
      }
      .amount-in-usd {
        font-size: 13px;
        color: darkgray;
        font-weight: 640;
      }
      .expected-balance-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        border: solid gray 2px;
        padding: 16px;
      }
      .expected-balance-title {
        font-weight: 640;
        font-size: 18px;
      }
      .expected-balance-contents {
        display: flex;
        justify-content: space-between;
        align-items: center;
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