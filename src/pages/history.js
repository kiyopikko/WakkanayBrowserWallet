import Layout from '../components/Layout'
import { FZ_SMALL, FW_BOLD, FZ_MEDIUM } from '../fonts'
import { SUBTEXT } from '../colors'

export default function History() {
  const mockHistory = [
    {
      type: 'send',
      amount: 0.2,
      unit: 'ETH',
      message: 'Sent',
      created: new Date()
    },
    {
      type: 'receive',
      amount: 0.6,
      unit: 'DAI',
      message: 'Receive',
      created: new Date()
    },
    {
      type: 'exchange',
      amount: 0.1,
      unit: 'ETH',
      message: 'Exchange with DAI',
      created: new Date()
    }
  ]
  return (
    <Layout>
      <ul>
        {mockHistory.map(({ type, amount, message, created }) => (
          <li className="transaction">
            <div className="transaction__item transaction__item--icon">
              <img src={`/icon-${type}.svg`} />
            </div>
            <div className="transaction__item transaction__item--amount">
              {amount.toFixed(2)} ETH
            </div>
            <div className="transaction__item transaction__item--type">
              {message}
            </div>
            <div className="transaction__item transaction__item--time">
              {created.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .transaction {
          list-style-type: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: ${FZ_MEDIUM};
          font-weight: ${FW_BOLD};
        }
        .transaction + .transaction {
          margin-top: 1rem;
        }
        .transaction__item {
          flex: 1;
        }
        .transaction__item--date {
          padding-bottom: 0.25rem;
        }
        .transaction__item--icon {
          flex: 0;
          flex-basis: 2rem;
          text-align: left;
        }
        .transaction__item--amount {
          flex: 0;
          flex-basis: 6rem;
        }
        .transaction__item--time {
          font-size: ${FZ_SMALL};
          color: ${SUBTEXT};
          flex: 0;
          flex-basis: 8rem;
          text-align: right;
          padding-right: 1rem;
        }
      `}</style>
    </Layout>
  )
}
