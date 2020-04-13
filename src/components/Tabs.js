import Link from 'next/link'
import classNames from 'classnames'
import { MAIN, White } from '../colors'
import { PAYMENT, EXCHANGE, NFT_COLLECTIBLES } from '../routes'
import { FZ_MEDIUM, FW_BLACK } from '../fonts'

export const Tabs = ({ currentPath }) => {
  return (
    <div className="tabs">
      <Link href={PAYMENT} passHref>
        <a
          className={classNames({
            tab: true,
            active: currentPath === PAYMENT
          })}
        >
          Payment
        </a>
      </Link>
      <Link href={EXCHANGE} passHref>
        <a
          className={classNames({
            tab: true,
            active: currentPath === EXCHANGE
          })}
        >
          Exchange
        </a>
      </Link>
      <Link href={NFT_COLLECTIBLES} passHref>
        <a
          className={classNames({
            tab: true,
            active: currentPath === NFT_COLLECTIBLES
          })}
        >
          Collectibles
        </a>
      </Link>
      <style jsx>{`
        .tabs {
          font-size: ${FZ_MEDIUM};
          font-weight: ${FW_BLACK};
          border: 1px solid ${MAIN};
          display: flex;
          border-radius: 0.625rem;
          overflow: hidden;
        }
        .tab {
          flex: 1;
          padding: 1rem 0;
          text-align: center;
          text-decoration: none;
        }
        .tab + .tab {
          border-left: 1px solid ${MAIN};
        }
        .active {
          background: ${MAIN};
          color: ${White()};
        }
      `}</style>
    </div>
  )
}
