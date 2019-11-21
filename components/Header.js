//Font Awesome Import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCogs} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faCogs)

const Header = () => {
  return (
    <div className="header">
        <h1 className="title">Wakkanay Wallet</h1>
        {/* <div className="setting-button"><FontAwesomeIcon icon="cogs" /></div> */}
    <style jsx>{`
        .header {
          width: 1252px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .title {
          padding-left: 52px;
          height: 68px;
          align-items: center;
          display: flex;
        }
        .setting-button {
          padding-right: 20px;
          font-size: 24px;
        }

    `}</style>
    </div>
  )
}

export default Header
