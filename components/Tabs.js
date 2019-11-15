
const Tabs = () => {
  return (
    <div>
      <div className="tabs">
        <div className="tab"><a className="tab-item">Payment</a></div>
        <div className="tab"><a className="tab-item">Exchange</a></div>
        <div className="tab"><a className="tab-item">NFT Collectibles</a></div>
        <div className="tab"><a className="tab-item">L2 Block Explorer</a></div>
      </div>
      <style jsx>{`
      .tabs {
        height: 56px;
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
        font-size: large;
        font-weight: 680;
        text-align: center;
      }
      `}</style>
    </div>
  )
}

export default Tabs