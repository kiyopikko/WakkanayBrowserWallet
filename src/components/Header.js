import Link from 'next/link'
import { MAIN, Main, MAIN_DARK, White } from '../colors'
import { FW_NORMAL, FZ_MEDIUM } from '../fonts'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

const Header = ({ appRouter }) => {
  const router = useRouter()

  const LinkWrap = ({ children }) =>
    appRouter.routeHistory.length < 2 ? (
      <Link href="/payment" passHref>
        {children}
      </Link>
    ) : (
      <span onClick={router.back}>{children}</span>
    )

  return (
    <div className="header">
      {router.pathname !== '/history' ? (
        <h1 className="title">
          <img src="/logo.svg" width="116" />
        </h1>
      ) : (
        <div />
      )}
      {router.pathname !== '/history' ? (
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
      ) : (
        <LinkWrap>
          <a className="historyButton fill">
            <img
              src="/icon-close.svg"
              width="10"
              className="historyButton__img"
            />
            <span className="historyButton__txt">Close</span>
          </a>
        </LinkWrap>
      )}
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
          cursor: pointer;
        }
        .historyButton:hover {
          background: ${Main(0.05)};
        }
        .fill {
          background: ${MAIN};
          border: 1px solid ${MAIN};
          color: ${White()};
        }
        .fill:hover {
          background: ${MAIN_DARK};
          border: 1px solid ${MAIN_DARK};
        }
        .historyButton__img {
          margin-right: 0.375rem;
        }
        .historyButton__txt {
          font-size: ${FZ_MEDIUM};
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  appRouter: state.appRouter
})

export default connect(mapStateToProps, undefined)(Header)
