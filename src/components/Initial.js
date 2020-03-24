import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import { checkClientInitialized } from '../store/appStatus'
import StartupModal from './StartupModal'
import Header from './Header'
import { TEXT, BACKGROUND, SUBTEXT, ERROR, MAIN, MAIN_DARK } from '../colors'
import Box from './Base/Box'
import { FW_BOLD, FZ_MEDIUM } from '../fonts'
import Wallet from './Wallet'
import Router, { useRouter } from 'next/router'
import { pushRouteHistory, popRouteHistory } from '../store/appRouter'

const Initial = ({
  checkClientInitialized,
  pushRouteHistory,
  popRouteHistory,
  appStatus,
  children
}) => {
  const router = useRouter()
  const isWalletHidden =
    router.pathname === '/wallet' || router.pathname === '/history'

  useEffect(() => {
    checkClientInitialized()
    pushRouteHistory(router.pathname)
    Router.events.on('routeChangeComplete', url => {
      pushRouteHistory(url)
    })
    Router.beforePopState(() => {
      popRouteHistory()
      return true
    })
  }, [])

  const content =
    appStatus.status === 'unloaded' || appStatus.status === 'error' ? (
      <div>
        <StartupModal />
      </div>
    ) : appStatus.status === 'loaded' ? (
      children
    ) : (
      <p>loading...</p>
    )

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:500,700,900&display=swap"
        />
      </Head>
      <Header />
      <div className="container">
        <h2 className="headline">
          {router.pathname !== '/history'
            ? 'Your Wallet'
            : 'Transaction History'}
        </h2>
        {!isWalletHidden && (
          <Box>
            <div className="wallet">
              {appStatus.status !== 'loaded' ? (
                <span className="wallet__txt">No Wallet</span>
              ) : (
                <Wallet
                  l2={0}
                  mainchain={746.12}
                  address="0x81D5F852994b4235904F9AfA038f0647Ad269215"
                  onDeposit={() => console.log('open deposit modal')}
                />
              )}
            </div>
          </Box>
        )}
        <Box>
          {content}
          {appStatus.status === 'error' && (
            <div className="error">
              {appStatus.error ? appStatus.error.message : 'Unexpected error'}
            </div>
          )}
        </Box>
      </div>
      <style>{`
        *,
        *:after,
        *:before {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        }
        button {
          border: none;
        }
        input {
          border: none;
        }
        a {
          color: ${MAIN};
        }
        a:hover {
          color: ${MAIN_DARK};
          text-decoration: none;
        }
        button:focus {outline:0;}
        input:focus {outline:0;}
        body {
          box-sizing: border-box;
          font-family: Roboto, sans-serif;
          font-weight: 500;
          background: ${BACKGROUND};
          color: ${TEXT};
        }
        .sub {
          font-size: ${FZ_MEDIUM};
          color: ${SUBTEXT};
        }
        .mbs {
          margin-bottom: 0.875rem
        }
        .mts {
          margin-top: 0.875rem
        }
        .mbm {
          margin-bottom: 1.5rem
        }
        .mtm {
          margin-top: 1.5rem
        }
      `}</style>
      <style jsx>{`
        .container {
          max-width: 37.5rem;
          margin: 0 auto;
        }
        .headline {
          font-weight: ${FW_BOLD};
          font-size: ${FZ_MEDIUM};
          color: ${SUBTEXT};
          margin-bottom: 0.5rem;
        }
        .wallet {
          margin: -0.375rem 0;
        }
        .wallet__txt {
          color: ${SUBTEXT};
        }
        .error {
          color: ${ERROR};
          text-align: center;
          margin-top: 0.75rem;
          font-size: ${FZ_MEDIUM};
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  appStatus: state.appStatus,
  appRouter: state.appRouter
})

const mapDispatchToProps = {
  checkClientInitialized,
  pushRouteHistory,
  popRouteHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(Initial)
