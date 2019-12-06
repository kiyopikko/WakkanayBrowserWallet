import { useRouter } from 'next/router'
import ClickOutside from 'react-click-outside'
//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faTimes)

const DepositModal = () => {
  const router = useRouter()
  return (
    <div className="modal-bg">
      <ClickOutside
        className="modal-main"
        onClickOutside={e => {
          e.preventDefault()
          const href = `${router.route}`
          router.push(href)
        }}
      >
        <div
          className="close-button"
          onClick={e => {
            e.preventDefault()
            const href = `${router.route}`
            router.push(href)
          }}
        >
          <FontAwesomeIcon icon="times" />
        </div>
        <div className="deposit-page-title">Deposit from Metamask</div>
        <div className="contents">
          <p>
            Directly Deposit Ether If you already have some Ether, the quickest
            way to get Ether in your new wallet by direct deposit. View Account
            Buy ETH with Wyre Wyre lets you use a credit card to deposit ETH
            right in to your MetaMask account. Continue to Wyre Buy on
            CoinSwitch CoinSwitch is the one-stop destination to exchange more
            than 300 cryptocurrencies at the best rate. Continue to CoinSwitch
          </p>
          <p>
            Directly Deposit Ether If you already have some Ether, the quickest
            way to get Ether in your new wallet by direct deposit. View Account
            Buy ETH with Wyre Wyre lets you use a credit card to deposit ETH
            right in to your MetaMask account. Continue to Wyre Buy on
            CoinSwitch CoinSwitch is the one-stop destination to exchange more
            than 300 cryptocurrencies at the best rate. Continue to CoinSwitch
          </p>
          <p>
            Directly Deposit Ether If you already have some Ether, the quickest
            way to get Ether in your new wallet by direct deposit. View Account
            Buy ETH with Wyre Wyre lets you use a credit card to deposit ETH
            right in to your MetaMask account. Continue to Wyre Buy on
            CoinSwitch CoinSwitch is the one-stop destination to exchange more
            than 300 cryptocurrencies at the best rate. Continue to CoinSwitch
          </p>
        </div>
      </ClickOutside>
      <style jsx>{`
        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background-color: rgba(40, 40, 40, 0.5);
          display: flex;
          justify-content: center;
        }
        .modal-bg > :global(.modal-main) {
          position: fixed;
          top: calc(10% + 10px);
          width: 80%;
          max-width: 850px;
          height: calc(80% - 20px);
          background-color: white;
          opacity: 1;
          box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 15px 0px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          overflow: scroll;
        }
        .close-button {
          text-align: end;
          font-size: 32px;
          margin-top: 16px;
          margin-right: 24px;
          color: darkgray;
          cursor: pointer;
        }
        .deposit-page-title {
          font-size: 34px;
          font-weight: 700;
          text-align: center;
        }
        .contents {
          padding: 16px 32px;
        }
      `}</style>
    </div>
  )
}
export default DepositModal
