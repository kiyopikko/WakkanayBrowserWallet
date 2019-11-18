import Link from 'next/link'
import Dropdown from './Dropdown'

const Tabs = () => {
  return (
    <div>
      <div className="tabs">
        <div className="tab">
          <Dropdown buttonName="Payment" items={[
          {name: "Send", href: "/send"},
          {name: "ReceiveRequest", href: "/receive"}]} />
        </div>
        <div className="tab">
          <Dropdown buttonName="Exchange" items={[
          {name:"Order Request", href:"/order_request"},
          {name: "Order Take", href:"order_take"}]} />
        </div>
        <div className="tab">
          <Dropdown buttonName="Payment" items={[
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
      }

      .tab.block-explorer {
        width: calc(100% - 600px);
      }

      .tab-item {
        font-size: large;
        font-weight: 680;
        text-align: center;
      }
      `}</style>
    </div>
  )
}

export default Tabs