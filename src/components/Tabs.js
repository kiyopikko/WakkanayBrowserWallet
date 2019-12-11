import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './Dropdown'
import classNames from 'classnames'

const Tabs = () => {
  const router = useRouter()
  return (
    <div>
      <div className="tabs">
        <Link href="./home">
          <div
            className={classNames(
              'tab',
              { selected: router.route === '/home' },
              'home-tab'
            )}
          >
            <a className="tab-item">Home</a>
          </div>
        </Link>
        <div
          className={classNames('tab', {
            selected:
              router.route === '/send' ||
              router.route === '/receive' ||
              router.route === '/address_book'
          })}
        >
          <Dropdown
            onSelected={router.push}
            buttonName="Payment"
            items={[
              { name: 'Send', value: '/send' },
              { name: 'Receive', value: '/receive' },
              { name: 'Address Book', value: '/address_book' }
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
            onSelected={router.push}
            buttonName="Exchange"
            items={[
              { name: 'Order Request', value: '/order_request' },
              { name: 'Order Book', value: '/order_book' }
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
            onSelected={router.push}
            buttonName="NFT Collectibles"
            items={[
              { name: 'Collection', value: '/nft_collection' },
              { name: 'Trade', value: '/nft_trade' }
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
        .tab-item {
          font-size: 17px;
          font-weight: 680;
          text-align: center;
          text-decoration: none;
          color: #693997;
        }
        .selected {
          background-color: #b1c6f7;
        }
        .tab > :global(.dropdown) {
          position: relative;
          width: 150px;
          height: 100%;
        }
        .tab > :global(.dropdown) > :global(.dropdown-button) {
          font-size: 17px;
          font-weight: 680;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
          color: #693997;
        }
        .tab
          > :global(.dropdown)
          > :global(.dropdown-button)
          > :global(.dropdown-caret) {
          display: none;
        }
        .tab > :global(.dropdown):hover .dropdown-button {
          background-color: #b1c6f7;
        }
        .tab > :global(.dropdown) > :global(.dropdown-content) {
          display: none;
          position: absolute;
          left: -2px;
          width: calc(100% + 4px);
          background-color: #c0d3ff;
          opacity: 90%;
          border: solid 2px lightgray;
        }
        .tab
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
          color: #693997;
          padding: 12px;
          font-size: 17px;
          font-weight: 680;
        }
        .tab
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item):hover {
          background-color: #b1c6f7;
          color: #007bff;
        }
        .home-tab {
          cursor: pointer;
        }
        .home-tab:hover .tab-item {
          color: #007bff;
        }
        .home-tab:hover {
          background-color: #b1c6f7;
        }
        .block-explorer-tab {
          width: calc(100% - 600px);
          background-color: #fcf7f5;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default Tabs
