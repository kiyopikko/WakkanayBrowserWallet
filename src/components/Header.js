import Link from 'next/link'
import { MAIN, Main } from '../colors'
import { FW_NORMAL, FZ_MEDIUM } from '../fonts'

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">
        <img src="/logo.svg" width="116" />
      </h1>
      <Link href="/history" passHref>
        <a className="historyButton">
          <img
            src="/icon-history.svg"
            width="14"
            className="historyButton__img"
          />
          <span className="historyButton__txt">History</span>
        </a>
      </Link>
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 74px;
          padding: 0 1rem;
        }
        .title {
          display: flex;
          align-items: center;
          flex-basis: 126px;
          height: 100%;
          padding-right: 4vw;
          flex: 1;
        }
        .historyButton {
          display: flex;
          align-items: center;
          padding: 0.5rem 1.25rem;
          border: 1px solid ${MAIN};
          color: ${MAIN};
          font-weight: ${FW_NORMAL};
          text-decoration: none;
          border-radius: 2rem;
        }
        .historyButton:hover {
          background: ${Main(0.05)};
        }
        .historyButton__img {
          width: 14px;
          margin-right: 0.25rem;
        }
        .historyButton__txt {
          font-size: ${FZ_MEDIUM};
        }
      `}</style>
    </div>
  )
}

export default Header
