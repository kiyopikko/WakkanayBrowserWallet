import Layout from '../components/Layout'
import { FZ_MEDIUM, FW_NORMAL, FZ_SMALL, FW_BLACK, FZ_LARGE } from '../fonts'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import { BACKGROUND, SUBTEXT } from '../colors'
import { WalletTokenItem } from '../components/WalletTokenItem'

function Wallet({ appRouter }) {
  const router = useRouter()
  const tokenMock = [
    { unit: 'ETH', l2: 23.2, mainchain: 123.3 },
    { unit: 'DAI', l2: 0, mainchain: 524.2 }
  ]

  return (
    <Layout>
      {appRouter.routeHistory.length < 2 ? (
        <Link className="back" href="/payment" passHref>
          <a className="back">← Back</a>
        </Link>
      ) : (
        <a className="back" href="javascript:void(0)" onClick={router.back}>
          ← Back
        </a>
      )}

      <div>
        <div className="total">
          <div className="total__walletId">Wallet ID: 0x34A4...9A24</div>
          <div className="total__list">
            <div className="total__item">
              <h3 className="total__head">L2</h3>
              <div className="total__amount">435.23 USD</div>
            </div>
            <div className="total__item">
              <h3 className="total__head">Mainchain</h3>
              <div className="total__amount">435.23 USD</div>
            </div>
          </div>
        </div>
        <div className="mtl">
          {tokenMock.map(({ unit, l2, mainchain }) => (
            <WalletTokenItem unit={unit} l2={l2} mainchain={mainchain} />
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
  appRouter: state.appRouter
})
export default connect(mapStateToProps, undefined)(Wallet)
