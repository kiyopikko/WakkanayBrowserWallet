import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AccountInfo = () => {
  return (
    <div className="account-info">
      <div className="account-info-box">
        <div className="user-info-bar">
          <div className="token-list-icon"><FontAwesomeIcon icon="align-justify" /></div>
          <div className="account-name-box">
            <span className="account-name">Yuriko</span>
            <div className="edit-icon"><FontAwesomeIcon icon="edit" /></div>
          </div>
        </div>
        <div className="account-address">0x5153…1BaC</div>
        <div className="account-qr-code"><img /></div>
        <div className="total-balance-title">Total Balance</div>
        <div className="total-balance">450.34 USD</div>
        <div className="total-balance-unit">(ETH + DAI)</div>
        <div className="deposit-withdraw-buttons">
          <div className="deposit-button"><a className="deposit">Deposit</a></div>
          <div className="withdraw-button"><a className="withdraw">Withdraw</a></div>
        </div>
      </div>
      <style jsx>{`
      .account-info {
        width: 320px;
        display: flex;
        justify-content:center;
        align-items: center;
      }
      .account-info-box {
        width: 240px;
        height:620px;
        border: solid 2px lightgray;
        display: flex;
        flex-direction: column;
        align-items:center;
      }
      .user-info-bar {
        display: flex;
        align-items: center;
        margin-top: 20px;
        width: 240px;
        padding-left: 20px;
      }
      .token-list-icon {
        font-size:24px;
      }
      .account-name-box {
        display: flex;
        align-items:center;
        margin-left: 40px;
      }
      .account-name {
        font-weight: 680;
        font-size: x-large;
      }
      .edit-icon {
        margin-left:4px;
        color: gray;
        font-size:16px;
      }
      .account-address {
        color: lightslategray;
        font-size: smaller;
        font-weight: 500;
      }
      .account-qr-code {
        border: solid 1px lightgray;
        width: 180px;
        height: 180px;
        margin: 24px 0px;
      }
      .total-balance-title {
        font-weight: 680;
        font-size: x-large;
        margin-top: 20px;
      }
      .total-balance {
        font-size:xx-large;
        font-weight: 680;
        margin-top: 4px;
      }
      .total-balance-unit {
        font-weight: 680;
        font-size: large;
      }
      .deposit-withdraw-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 200px;
        margin-top: 32px;
      }
      .deposit-button, .withdraw-button {
        padding: 8px;
        border: solid lightgray 2px;
        width: 96px;
        text-align: center;
      }
      .deposit, .withdraw {
        font-size: smaller;
        font-weight: 680;
      }
      `}</style>
    </div>
  )
}

export default AccountInfo