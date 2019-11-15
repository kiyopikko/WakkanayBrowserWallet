import Header from './Header'
import AccountInfo from './Account'
import MainDisplay from './MainDisplay'
import Tabs from './Tabs'

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className="back-ground">
        <AccountInfo />
        <div className="main-display-background">
          <Tabs />
          <MainDisplay>
            {props.children}
          </MainDisplay>
        </div>
      </div>
      <footer>
        <h4 >Cryptoeconomics Lab Inc.</h4>
      </footer>
      <style>{`
        *,
        *:after,
        *:before {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        }
        body {
          box-sizing: border-box;
          font-family: 'Avenir Next';
        }
      `}</style>
      <style jsx>{`
        .back-ground {
          display: flex;
          height: 720px;
          border: solid 2px lightgray;
          border-right: none;
          margin: 0px 24px;
        }
        .main-display-background {
          width: calc(100% - 320px);
          display: flex;
          flex-direction: column;
          border-left: solid 2px lightgray;
        }
        footer {
          padding: 20px;
        }
        footer > h4 {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default Layout