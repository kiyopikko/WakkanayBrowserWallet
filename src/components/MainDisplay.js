import TransactionHistory from './TransactionHistory'

const MainDisplay = props => {
  return (
    <div className="main-display">
      <div className="pages">{props.children}</div>
      <TransactionHistory />
      <style jsx>{`
        .main-display {
          display: flex;
          justify-content: flex-end;
          height: 100%;
        }
        .pages {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: solid 2px lightgray;
          overflow: scroll;
        }
      `}</style>
    </div>
  )
}
export default MainDisplay
