import Link from 'next/link'
import Dropdown from './Dropdown'

const Tabs = () => {
  return (
    <div>
      <div className="tabs">
        <div className="tab">
          <Link href="./home"><a className="tab-item">Home</a></Link>
        </div>
        <div className="tab">
          <Dropdown buttonName="Payment" items={[
          {name: "Send", href: "/send"},
          {name: "Receive Request", href: "/receive"}]} />
        </div>
        <div className="tab">
          <Dropdown buttonName="Exchange" items={[
          {name:"Order Request", href:"/order_request"},
          {name: "Order Book", href:"order_book"}]} />
        </div>
        <div className="tab">
          <Dropdown buttonName="NFT Collectibles" items={[
            {name: "Collection", href: "/nft_collection"},
            {name: "Trade", href: "/nft_trade"}]} />
        </div>
        <div className="tab block-explorer"><a className="tab-item">L2 Block Explorer</a></div>
      </div>
      <style jsx>{`
      .tabs {
        height: 56px;
        display: flex;
        border-bottom: solid 2px lightgray;
      }
      .tab {
        display: flex;
        justify-content:center;
        align-items: center;
        border-right: solid 2px lightgray;
        background-color: #c0d3ff;
        width: 150px;
      }

      .tab.block-explorer {
        width: calc(100% - 600px);
      }

      .tab-item {
        font-size: 15px;
        font-weight: 680;
        text-align: center;
        text-decoration: none;
        color: #693997;
      }
      `}</style>
    </div>
  )
}

export default Tabs