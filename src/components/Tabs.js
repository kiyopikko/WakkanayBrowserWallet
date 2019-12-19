import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './Dropdown'
import classNames from 'classnames'

const Tabs = () => {
  const router = useRouter()
  const scrollTo = elementId => {
    const element = document.getElementById(elementId)
    if (element !== null)
      return element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    let tab
    if (
      elementId === 'l1-account' ||
      elementId === 'l2-tokens' ||
      elementId === 'address-book'
    ) {
      tab = '/home'
    } else if (elementId === 'send' || elementId === 'receive') {
      tab = '/payment'
    } else if (elementId === 'order-book' || elementId === 'order-request') {
      tab = '/exchange'
    } else {
      tab = '/nft_collectibles'
    }
    router.push(tab + `#` + elementId)
  }

  return (
    <div>
      <div className="tabs">
        <Link href="/home">
          <div
            className={classNames('tab', {
              selected: router.route === '/home'
            })}
          >
            <Dropdown
              onSelected={scrollTo}
              buttonName="Home"
              items={[
                { name: 'L1 Account', value: 'l1-account' },
                { name: 'L2 Tokens', value: 'l2-tokens' },
                { name: 'Address Book', value: 'address-book' }
              ]}
            />
          </div>
        </Link>
        <Link href="/payment">
          <div
            className={classNames('tab', {
              selected: router.route === 'payment'
            })}
          >
            <Dropdown
              onSelected={scrollTo}
              buttonName="Payment"
              items={[
                { name: 'Send', value: 'send' },
                { name: 'Receive', value: 'receive' }
              ]}
            />
          </div>
        </Link>
        <Link href="/exchange">
          <div
            className={classNames('tab', {
              selected: router.route === '/exchange'
            })}
          >
            <Dropdown
              onSelected={scrollTo}
              buttonName="Exchange"
              items={[
                { name: 'Order Book', value: 'order-book' },
                { name: 'Order Request', value: 'order-request' }
              ]}
            />
          </div>
        </Link>
        <Link href="/nft_collectibles">
          <div
            className={classNames('tab', {
              selected: router.route === '/nft_collectibles'
            })}
          >
            <Dropdown
              onSelected={scrollTo}
              buttonName="NFT Collectibles"
              items={[
                { name: 'Collection', value: 'nft-collection' },
                { name: 'Trade', value: 'nft-trade' }
              ]}
            />
          </div>
        </Link>
        <div className="block-explorer-tab">
          <a className="tab-item">Transaction History</a>
        </div>
      </div>
      <style jsx>{`
        .tabs {
          height: 54px;
          display: flex;
          justify-content: flex-end;
        }
        .tab {
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: solid 2px lightgray;
          background-color: #c0d3ff;
          width: 213px;
          cursor: pointer;
        }
        .tab:hover {
          background-color: #b1c6f7;
        }
        .tab:hover .tab-item {
          color: #007bff;
        }
        .tab:hover
          .tab
          > :global(.dropdown)
          > :global(.dropdown-button)
          > :global(.button-name) {
          color: #007bff;
        }
        .tab-item {
          font-size: 16px;
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
          width: 100%;
          height: 100%;
        }
        .tab > :global(.dropdown) > :global(.dropdown-button) {
          font-size: 16px;
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
          font-size: 16px;
          font-weight: 680;
        }
        .tab
          > :global(.dropdown)
          > :global(.dropdown-content)
          > :global(.dropdown-item):hover {
          background-color: #b1c6f7;
          color: #007bff;
        }
        .block-explorer-tab {
          width: 414px;
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
