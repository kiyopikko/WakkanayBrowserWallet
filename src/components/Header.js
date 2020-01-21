import Link from 'next/link'
import { useRouter } from 'next/router'
import { AREA, TEXT, BACKGROUND } from '../colors'
import { Z_HEADER } from '../zindex'

const Header = () => {
  const router = useRouter()

  return (
    <div className="header">
      <h1 className="title">
        <img src="/logo.svg" width="116" />
      </h1>
      <ul className="tabs">
        <li className={`tab ${router.pathname === '/' && 'active'}`}>
          <Link href="/" passHref>
            <a className="tab__link">
              <span className="tab__txt home">Home</span>
            </a>
          </Link>
        </li>
        <li className={`tab ${router.pathname === '/payment' && 'active'}`}>
          <Link href="/payment" passHref>
            <a className="tab__link">
              <span className="tab__txt payment">Payment</span>
            </a>
          </Link>
        </li>
        <li className={`tab ${router.pathname === '/exchange' && 'active'}`}>
          <Link href="/exchange" passHref>
            <a className="tab__link">
              <span className="tab__txt exchange">Exchange</span>
            </a>
          </Link>
        </li>
        <li
          className={`tab ${router.pathname === '/nft_collectibles' &&
            'active'}`}
        >
          <Link href="/nft_collectibles" passHref>
            <a className="tab__link">
              <span className="tab__txt nft">NFT Collectibles</span>
            </a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .header {
          font-weight: 300;
          z-index: ${Z_HEADER};
          width: 70%;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          background: ${AREA};
          height: 74px;
          padding: 0 1rem;
        }
        .title {
          display: flex;
          align-items: center;
          flex-basis: 126px;
          height: 100%;
          padding-right: 4vw;
        }
        .tabs {
          flex: 1;
          display: flex;
          margin: 0;
          padding: 0;
          list-style-type: none;
          align-items: flex-end;
        }
        .tab {
          flex: 1;
          text-align: center;
          margin: 0;
          border-radius: 5px 5px 0 0;
        }
        .tab + .tab {
          margin-left: 1rem;
        }
        .tab.active {
          background-color: ${BACKGROUND};
        }
        .tab:hover:not(.active) {
          background-color: rgba(0,0,0,0.2);
        }
        .tab__link {
          display: block;
          color: ${TEXT};
          font-size 14px;
          text-decoration: none;
          height: 66px;
          line-height: 66px;
        }
        .tab__txt {
          display: inline-block;
          padding-left: 1.75rem;
          background-repeat: no-repeat;
        }
        .home {
          background-image: url('/tabbar-home.svg');
          background-position: 0 50%;
        }
        .payment {
          background-image: url('/tabbar-payment.svg');
          background-position:  0 50%;
        }
        .exchange {
          background-image: url('/tabbar-exchange.svg');
          background-position: 0 50%;
        }
        .nft {
          background-image: url('/tabbar-nft.svg');
          background-position: 0 50%;
        }
      `}</style>
    </div>
  )
}

export default Header
