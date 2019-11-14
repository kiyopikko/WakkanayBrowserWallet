import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'

const Home = () => (
  <Layout>
  <div>
    <Head>
      <title>Home</title>
    </Head>
      <header>
        <h1 className="title">Wakkanay Wallet</h1>
      </header>
      <div className="back-ground">
        <div className="account-info">
          <div className="account-info-box">
            <div className="account-name">Yuriko</div>
            <div className="account-address">0x5153…1BaC</div>
            <div className="account-qr-code"><img></img></div>
            <div className="total-balance-title">Total Balance</div>
            <div className="total-balance">450.34 USD</div>
            <div className="total-balance-unit">(ETH + DAI)</div>
            <div className="deposit-withdraw-buttons">
              <div className="withdraw-button"><a className="withdraw">Withdraw</a></div>
              <div className="deposit-button"><a className="deposit">Deposit</a></div>
            </div>
          </div>
        </div>
        <div className="main-display-background">
          <div className="tabs">
            <div className="tab"><a className="tab-item">Tokens</a></div>
            <div className="tab"><a className="tab-item">Payments</a></div>
            <div className="tab"><a className="tab-item">Exchanges</a></div>
            <div className="tab"><a className="tab-item">L2 Block Explorer</a></div>
          </div>
          <div className="contents">
            <div className="token-list">
aa
            </div>
            <div className="main-display">bb
            </div>
          </div>
        </div>
      </div>
      <footer>
          <h4 >Cryptoeconomics Lab Inc.</h4>
      </footer>
    <style jsx>{`

    .title {
      padding-left: 40px;
      height: 72px;
      align-items: center;
      display: flex;
    }
    .back-ground {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      height: 800px;
      justify-content: flex-start;
      align-items: stretch;
      border-top: solid 2px lightgray;
      border-bottom: solid 2px lightgray;
      margin-left: 20px;
      border-left: solid 2px lightgray;
      margin-right: 20px;
}

    }
    .account-info {
      width: 320px;
      display: flex;
      justify-content:center;
      align-items: center;
    }
    .account-info-box {
      width: 240px;
      height:700.16px;
      border: solid 2px lightgray;
      display: flex;
      flex-direction: column;
      align-items:center;
    }

    .account-name {
      font-weight: 680;
      font-size: xx-large;
    }
    .main-display-background {
      width: calc(100% - 320px);
      display: flex;
      flex-direction: column;
      border-left: solid 2px lightgray;
    }
    .tabs {
      height: 52px;
      display: flex;
      border-bottom: solid 2px lightgray;
    }
    .tab {
      flex: 1;
      display: flex;
      justify-content:center;
      align-items: center;
      border-right: solid 2px lightgray;
    }
    .tab-item {
      font-weight: 680;
    }
    .contents {
      display: flex;
      height: 100%;
      border-right: solid 2px lightgray;
    }
    .token-list {
      flex: 1;
      border-right: solid 2px lightgray;
    }
    .main-display {
      flex: 3;
    }

    footer {
      padding: 20px;
    }
    h4 {
      text-align: center;
    }
    `}</style>
  </div>
  </Layout>
)

export default Home
