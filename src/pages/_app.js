import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import Initial from '../components/Initial'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Initial>
          <Component {...pageProps} />
        </Initial>
      </Provider>
    )
  }
}

export default withRedux(initStore)(MyApp)
