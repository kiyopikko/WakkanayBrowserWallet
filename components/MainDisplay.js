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
          height: 100%;s
        }
        .pages {
          width: 600px;
          border-right: solid 2px lightgray;
        }
      `}</style>
    </div>
  )
}
export default MainDisplay