import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Layout from '../components/Layout'
import { WalletTokenItem } from '../components/WalletTokenItem'
import { BACKGROUND, SUBTEXT } from '../constants/colors'
import {
  FZ_MEDIUM,
  FW_NORMAL,
  FZ_SMALL,
  FW_BLACK,
  FZ_LARGE
} from '../constants/fonts'
import { TOKEN_LIST } from '../constants/tokens'
import { PAYMENT } from '../routes'
import {
  getL1TotalBalance,
  getTokenTotalBalance
} from '../store/tokenBalanceList'

function Wallet({ address, tokenBalance, l1TotalBalance, tokenTotalBalance }) {
  return (
    <Layout>
      <Link className="back" href={PAYMENT} passHref>
        <a className="back">← Back</a>
      </Link>

      <div>
        <div className="total">
          <div className="total__walletId">Address: {address}</div>
          <div className="total__list">
            <div className="total__item">
              <h3 className="total__head">L2</h3>
              <div className="total__amount">${tokenTotalBalance}</div>
            </div>
            <div className="total__item">
              <h3 className="total__head">Mainchain</h3>
              <div className="total__amount">${l1TotalBalance}</div>
            </div>
          </div>
        </div>
        <div className="mtl">
          {TOKEN_LIST.map(({ unit, tokenContractAddress }) => (
            <WalletTokenItem
              unit={unit}
              l2={
                tokenBalance.tokenBalance[unit]
                  ? tokenBalance.tokenBalance[unit].amount
                  : 0
              }
              mainchain={
                tokenBalance.l1Balance[unit]
                  ? tokenBalance.l1Balance[unit].amount
                  : 0
              }
              tokenContractAddress={tokenContractAddress}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .back {
          font-size: ${FZ_MEDIUM};
          width: 4rem;
          position: absolute;
          right: 100%;
          top: 1rem;
          text-decoration: none;
        }
        .back:hover {
          text-decoration: underline;
        }
        .total {
          background: ${BACKGROUND};
          border-radius: 1.25rem;
          padding: 1.125rem;
        }
        .total__walletId {
          font-size: ${FZ_SMALL};
          font-weight: ${FW_NORMAL};
          color: ${SUBTEXT};
        }
        .total__list {
          margin-top: 1rem;
          display: flex;
          flex-direction: row;
        }
        .total__item {
          flex: 1;
        }
        .total__head {
          font-size: ${FZ_MEDIUM};
          font-weight: ${FW_BLACK};
          color: ${SUBTEXT};
          margin-bottom: 0.375rem;
        }
        .total__amount {
          font-size: ${FZ_LARGE};
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => ({
  address: state.address,
  tokenBalance: state.tokenBalance,
  l1TotalBalance: getL1TotalBalance(state),
  tokenTotalBalance: getTokenTotalBalance(state)
})
export default connect(mapStateToProps, undefined)(Wallet)
