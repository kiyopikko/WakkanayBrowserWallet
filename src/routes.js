import Router from 'next/router'

export const ROOT = '/'

export const WALLET = '/wallet'
export const HISTORY = '/history'

export const PAYMENT = '/payment'
export const EXCHANGE = '/exchange'
export const NFT_COLLECTIBLES = '/nft_collectibles'

/**
 * @name openModal
 * @param {*} modalName is "deposit" or "withdraw"
 */
export function openModal(modalName) {
  Router.push(
    {
      pathname: Router.pathname,
      query: { modal: modalName }
    },
    undefined,
    { shallow: true }
  )
}
