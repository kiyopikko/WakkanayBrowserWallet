import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './Dropdown'
import classNames from 'classnames'

const Tabs = () => {
  const router = useRouter()
  console.log(router.route === '/home')
  return (
    <div>
      <div className="tabs">
        <div
          className={classNames(
            'tab',
            { selected: router.route === '/home' },
            'home-tab'
          )}
        >
          <Link href="./home">
            <a className="tab-item">Home</a>
          </Link>
        </div>
        <div
          className={classNames('tab', {
            selected: router.route === '/send' || router.route === '/receive'
          })}
        >
          <Dropdown
            buttonName="Payment"
            items={[
              { name: 'Send', href: '/send' },
              { name: 'Receive Request', href: '/receive' }
            ]}
          />
        </div>
        <div
          className={classNames('tab', {
            selected:
              router.route === '/order_request' ||
              router.route === '/order_book'
          })}
        >
          <Dropdown
            buttonName="Exchange"
            items={[
              { name: 'Order Request', href: '/order_request' },
              { name: 'Order Book', href: 'order_book' }
            ]}
          />
        </div>
        <div
          className={classNames('tab', {
            selected:
              router.route === '/nft_collections' ||
              router.route === '/nft_trade'
          })}
        >
          <Dropdown
            buttonName="NFT Collectibles"
            items={[
              { name: 'Collection', href: '/nft_collection' },
              { name: 'Trade', href: '/nft_trade' }
            ]}
          />
        </div>
        <div className="block-explorer-tab">
          <a className="tab-item">L2 Block Explorer</a>
        </div>
      </div>
      <style jsx>{`
        .tabs {
          height: 54px;
          display: flex;
          border-bottom: solid 2px lightgray;
        }
        .tab {
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: solid 2px lightgray;
          background-color: #c0d3ff;
          width: 150px;
        }
        .home-tab {
          cursor: pointer;
        }

        .block-explorer-tab {
          width: calc(100% - 600px);
          background-color: #fcf7f5;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .tab-item {
          font-size: 15px;
          font-weight: 680;
          text-align: center;
          text-decoration: none;
          color: #693997;
        }
        .selected {
          background-color: #b1c6f7;
        }
      `}</style>
    </div>
  )
}

export default Tabs
