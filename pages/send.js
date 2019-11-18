import Layout from '../components/Layout'

export default function Send() {
  return (
    <Layout>
      <div className="balance-title">Your balance</div>
      <div className="balance-board"><img className="ethereum-logo"></img>
      <div className="total-balance-box"><span className="total-balance-number">2</span><span>ETH</span></div>
      <div className="balance-in-usd">$370.34 USD</div>
      <div className="send-receive-buttons">
          <div className="send-button"><a className="send">Send</a></div>
          <div className="receive-button"><a className="receive">Receive</a></div>
        </div>
      </div>
    </Layout>
  )
}