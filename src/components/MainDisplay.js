import BlockExploer from './BlockExplorer'

const MainDisplay = props => {
  return (
    <div className="main-display">
      <div className="pages">{props.children}</div>
      <BlockExploer />
      <style jsx>{`
        .main-display {
          display: flex;
          height: 100%;
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
