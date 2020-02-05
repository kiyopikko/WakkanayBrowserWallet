import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

// internal import
import Layout from '../components/Layout'
import AddressListItem from '../components/AddressList/AddressListItem'
import { shortenAddress } from '../utils'

//redux
import { connect } from 'react-redux'
import {
  registerAddressListItem,
  editAddressListItem,
  removeAddressListItem
} from '../store/address_list_item'
import {
  setEditedAddress,
  setEditedName
} from '../store/edited_address_list_item.js'
import { getBalance, getETHtoUSD } from '../store/tokenBalanceList'
import { getAddress } from '../store/address'
import { setTransferredToken } from '../store/transfer'

// clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTooltip from 'react-tooltip'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faClipboard,
  faUserPlus,
  faPen,
  faTrash,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faClipboard, faUserPlus, faPen, faTrash, faBookOpen)

const Home = props => {
  const router = useRouter()
  const nameInput = useRef('')
  const addressInput = useRef('')
  const editedNameRef = useRef('')
  const editedAddressRef = useRef('')
  const ETHtoUSD = props.ETHtoUSD
  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      if (nameInput.current.value !== '' && addressInput.current.value !== '') {
        props.registerAddressListItem({
          id: `${Date.now()}`,
          name: nameInput.current.value,
          address: addressInput.current.value
        })
      }
      return (nameInput.current.value = ''), (addressInput.current.value = '')
    }
  }
  useEffect(() => {
    props.getBalance()
    props.getAddress()
    props.getETHtoUSD() // get the latest ETH price, returned value's unit is USD/ETH
  }, [])

  return (
    <Layout>
      <div className="l1-account-box-wrapper" id="l1-account">
        {/* <div className="l1-account-title">Connected L1 Account</div> */}
        <div className="l1-account-box">
          <div className="user-address-info-box">
            <img
              className="profile-picture"
              src="metamask-icon.png"
              alt="Metamask Account"
            ></img>
            <div className="user-info-bar">
              <span className="account-name">yuriko.eth</span>
              <CopyToClipboard text={props.address}>
                <div className="account-address-set" data-tip="React-tooltip">
                  <div className="account-address">
                    {shortenAddress(props.address)}
                  </div>
                  <div className="copy-button">
                    <FontAwesomeIcon icon="clipboard" />
                  </div>
                </div>
              </CopyToClipboard>
              <ReactTooltip place="bottom" type="dark" effect="solid">
                <span>Copy to Clipboard</span>
              </ReactTooltip>
            </div>
          </div>
          <div className="total-balance-title">L1 Total </div>
          <div className="total-balance">450.34 $</div>
          <div
            className="deposit-button"
            onClick={e => {
              e.preventDefault()
              const href = `${router.route}?deposit`
              router.push(href, href, { shallow: true })
            }}
          >
            <a className="deposit">Deposit</a>
          </div>
        </div>
      </div>
      <div className="l2-token-box-wrapper" id="l2-tokens">
        <div className="l2-token-box-title">L2 Tokens</div>
        <div className="l2-token-box-list">
          {props.tokenBalanceList.map(({ tokenAddress, amount }) => {
            return (
              <div className="l2-token-box">
                <div className="balance-board">
                  <div className="l2-token-img-bg">
                    <img
                      className="l2-token-img"
                      src="../ethereum-icon.png"
                      alt="Ethereum Logo"
                    ></img>
                  </div>
                  <div className="token-balance-unit">ETH</div>
                  <div className="token-balance-number">{amount}</div>
                  <hr className="line"></hr>
                  <div className="balance-in-usd">{ETHtoUSD * amount} USD</div>
                </div>
                <div className="token-buttons-container">
                  <div
                    className="withdraw-button"
                    onClick={e => {
                      e.preventDefault()
                      const href = `${router.route}?withdraw`
                      router.push(href, href, { shallow: true })
                    }}
                  >
                    Withdraw
                  </div>
                  <div className="slash" />
                  <div
                    className="send-button"
                    onClick={() => {
                      props.setTransferredToken(tokenAddress)
                      router.push('/payment#send')
                    }}
                  >
                    Send
                  </div>
                  <div
                    className="exchange-button"
                    onClick={() => {
                      router.push('/exchange#order-request')
                    }}
                  >
                    Exchange
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <hr className="l2-token-total-balance-line"></hr>
        <div className="l2-token-total-balance-wrapper">
          <div className="l2-token-total-balance-title">Total</div>
          <div className="l2-token-total-balance">USD 450.3</div>
        </div>
      </div>
      <div className="address-book-wrapper" id="address-book">
        <div className="address-book-title-box">
          <div className="address-book-title">Address Book</div>
        </div>
        <table className="address-book-table">
          <tr>
            <th className="name-column">Name</th>
            <th className="address-column">Address</th>
          </tr>
          {props.addressList.map(addressListItem => (
            <AddressListItem
              addressListItem={addressListItem}
              editAddressListItem={props.editAddressListItem}
              setEditedName={props.setEditedName}
              setEditedAddress={props.setEditedAddress}
              removeAddressListItem={props.removeAddressListItem}
              editedNameRef={editedNameRef}
              editedAddressRef={editedAddressRef}
              editedName={props.editedAddressListItem.name}
              editedAddress={props.editedAddressListItem.address}
            />
          ))}
          <tr>
            <td className="default-name">
              <input
                className="name-input"
                type="text"
                ref={nameInput}
                placeholder="Alice"
                onKeyDown={onKeyDown}
              />
            </td>
            <td className="default-address">
              <input
                className="address-input"
                type="text"
                ref={addressInput}
                placeholder="0x0000000000000000000000000000000000000000"
                onKeyDown={onKeyDown}
              />
            </td>
          </tr>
        </table>
      </div>

      <style jsx>{`
        .l1-account-box-wrapper {
          width: 100%;
        }
        .l1-account-box {
          background-color: rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 280px;
          margin: 20px;
        }
        .user-address-info-box {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px;
          width: 100%;
          border-bottom: solid 1px black;
        }
        .profile-picture {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 4px solid #c0d3ff;
        }
        .user-info-bar {
          margin-left: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .account-name {
          margin-top: 4px;
          font-weight: 600;
          font-size: 18px;
        }
        .account-address-set {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          cursor: pointer;
        }
        .account-address-set:hover {
          background-color: lightgray;
        }
        .account-address {
          color: lightslategray;
          font-size: 14px;
          font-weight: 500;
        }
        .copy-button {
          font-size: 12px;
          margin-left: 4px;
        }
        .total-balance-title {
          font-size: 16px;
          font-weight: 100;
          margin-top: 20px;
          margin-bottom: 14px;
        }
        .total-balance {
          font-size: 36px;
          font-weight: 200;
        }
        .deposit-button {
          padding: 12px 14px 30px 5px;
          border-radius: 80.7px;
          width: 109px;
          height: 40px;
          text-align: center;
          background: linear-gradient(122.3deg, #ec8383 0.21%, #c13087 93.55%);
          cursor: pointer;
          margin-top: 12px;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .deposit {
          font-weight: 800;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.85);
        }
        .l2-token-box-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 20px;
          margin-top: 20px;
        }
        .l2-token-box-title {
          font-weight: 400;
          font-size: 24px;
        }
        .l2-token-box-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          overflow-y: scroll;
        }
        .l2-token-box {
          padding: 12px;
          background-color: rgba(255, 255, 255, 0.08);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .balance-board {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .l2-token-img-bg {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .l2-token-img {
          height: 22px;
        }
        .token-balance-unit {
          margin-left: 16px;
          font-size: 16px;
          font-weight: 650;
        }
        .token-balance-number {
          margin-left: 12px;
          font-size: 26px;
          font-weight: 500;
        }
        .line {
          margin-left: 24px;
          width: 11px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .balance-in-usd {
          margin-left: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          font-weight: 650;
        }
        .token-buttons-container {
          display: flex;
          align-items: center;
        }
        .withdraw-button {
          padding: 7px;
          border-radius: 80.7px;
          width: 93px;
          height: 30px;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          font-size: 14px;
          font-weight: 800;
        }
        .slash {
          margin-left: 17px;
          width: 11px;
          height: 25px;
          position: relative;
        }
        .slash:after {
          content: '';
          position: absolute;
          left: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 26px;
          transform: rotate(110deg);
          transform-origin: 0% 0%;
        }
        .send-button {
          margin-left: 19px;
          padding: 7px;
          border-radius: 80.7px;
          width: 93px;
          height: 30px;
          text-align: center;
          background-color: #eb3959;
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          font-size: 14px;
          font-weight: 800;
        }
        .exchange-button {
          margin-left: 10px;
          padding: 7px;
          border-radius: 80.7px;
          width: 93px;
          height: 30px;
          text-align: center;
          background-color: #4e3ff4;
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          font-size: 14px;
          font-weight: 800;
        }
        .l2-token-total-balance-line {
          border: none;
          margin-top: 12px;
          width: 100%;
          height: 3px;
          background-color: #000000;
        }
        .l2-token-total-balance-wrapper {
          color: rgba(255, 255, 255, 0.5);
          margin-top: 4px;
          font-size: 18px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .l2-token-total-balance {
          margin-left: 20px;
        }
        .address-book-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 20px;
          margin: 20px 0px;
        }
        .address-book-title-box {
          display: flex;
          align-items: center;
          margin-left: 4px;
        }
        .address-book-title {
          font-weight: 400;
          font-size: 24px;
        }
        .book-icon {
          font-size: 24px;
          margin-left: 8px;
        }
        .address-book-table {
          border-spacing: 0px;
          text-align: left;
          border: 2px solid lightgray;
          border-radius: 16px;
          background-color: white;
          width: 100%;
          border-radius: 6px;
        }
        th,
        td {
          font-size: 20px;
          border-spacing: 0px;
          height: 36px;
        }
        th {
          padding: 8px;
          font-size: 20px;
          font-weight: 500;
          border-bottom: 2px solid lightgray;
        }
        .default-name {
          border-right: 2px solid lightgray;
        }
        .name-column {
          min-width: 100px;
          border-right: 2px solid lightgray;
        }
        .cancel-button {
          margin: 0px 2px;
          border: solid 1px lightgray;
          padding: 2px;
        }
        .name-input,
        .address-input {
          height: 36px;
          padding: 8px;
          font-size: 18px;
          border: none;
        }
        .name-input {
          width: 100px;
          border-bottom-left-radius: 5px;
        }
        .name-input::placeholder {
          font-size: 18px;
          font-weight: 300;
        }
        .address-input {
          width: 460px;
        }
        .address-input::placeholder {
          font-size: 18px;
          font-weight: 300;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => ({
  tokenBalanceList: state.balance.tokenBalanceList,
  ETHtoUSD: state.balance.ETHtoUSD,
  address: state.address,
  addressList: state.addressList,
  editedAddressListItem: state.editedAddressListItem
})

const mapDispatchToProps = {
  registerAddressListItem,
  editAddressListItem,
  removeAddressListItem,
  setEditedAddress,
  setEditedName,
  getBalance,
  getETHtoUSD,
  getAddress,
  setTransferredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
