import BlockExploer from './BlockExplorer'

const MainDisplay = (props) => {
  return (
    <div className="main-display">
      <div className="pages">{props.children}</div>
      <div className="block-explorer-display">
        <BlockExploer />
      </div>
      <style jsx>{`
        .main-display {
          display: flex;
          height: 100%;
          border-right: solid 2px lightgray;
        }
        .pages {
          flex: 3;
          border-right: solid 2px lightgray;
        }
        .block-explorer-display {
          flex: 1;
        }
      `}</style>
    </div>
  )
}
export default MainDisplay