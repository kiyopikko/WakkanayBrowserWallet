import React, { useRef } from 'react'
import { useRouter } from 'next/router'

// internal import
import Layout from '../components/Layout'
import AddressListItem from '../components/AddressList/AddressListItem'

//redux
import { connect } from 'react-redux'
import {
  registerAddressListItem,
  editAddressListItem,
  removeAddressListItem
} from '../store/address_list_item_register'
import {
  setEditedAddress,
  setEditedName
} from '../store/address_list_item_edit'

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

// import mock light client
// import LightClient from 'wakkanay-plasma-light-client'
// const client = new LightClient()
// client.init()

const shortenAddress = address => {
  const former = address.slice(0, 7)
  const latter = address.slice(address.length - 5, address.length)
  return `${former}...${latter}`
}

const Home = props => {
  const router = useRouter()
  const nameInput = useRef('')
  const addressInput = useRef('')
  const editedNameRef = useRef('')
  const editedAddressRef = useRef('')
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
  return (
    <Layout>
      <div className="l1-account-box-wrapper" id="l1-account">
        <div className="l1-account-title">Connected L1 Account</div>
        <div className="l1-account-box">
          <div className="user-address-info-box">
            <img
              className="profile-picture"
              src="yuriko-profile-picture.jpg"
              alt="Yuriko Profile Picture"
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
          <div className="total-balance-title">Total </div>
          <div className="total-balance">$450.34 USD</div>
          <div
            className="deposit-button"
            onClick={e => {
              e.preventDefault()
              const href = `${router.route}?deposit`
              router.push(href, href, { shallow: true })
            }}
          >
            <a className="deposit">Deposit to L2</a>
          </div>
        </div>
      </div>
      <div className="l2-token-box-wrapper" id="l2-tokens">
        <div className="l2-token-box-title">L2 Tokens</div>
        <div className="l2-token-box-list">
          <div className="l2-token-box">
            <div className="l2-token-name">Ethereum</div>
            <img
              className="l2-token-img"
              src="ethereum-icon.png"
              alt="Ethereum Logo"
            ></img>
            <div className="l2-token-balance">$450.34 USD</div>
            <div className="token-buttons-container">
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?deposit`
                  router.push(href, href, { shallow: true })
                }}
              >
                Deposit
              </div>
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?withdraw`
                  router.push(href, href, { shallow: true })
                }}
              >
                Withdraw
              </div>
              <div className="token-button">Send</div>
              <div className="token-button">Exchange</div>
            </div>
          </div>
          <div className="l2-token-box">
            <div className="l2-token-name">Ethereum</div>
            <img
              className="l2-token-img"
              src="ethereum-icon.png"
              alt="Ethereum Logo"
            ></img>
            <div className="l2-token-balance">$450.34 USD</div>
            <div className="token-buttons-container">
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?deposit`
                  router.push(href, href, { shallow: true })
                }}
              >
                Deposit
              </div>
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?withdraw`
                  router.push(href, href, { shallow: true })
                }}
              >
                Withdraw
              </div>
              <div className="token-button">Send</div>
              <div className="token-button">Exchange</div>
            </div>
          </div>
          <div className="l2-token-box">
            <div className="l2-token-name">Ethereum</div>
            <img
              className="l2-token-img"
              src="ethereum-icon.png"
              alt="Ethereum Logo"
            ></img>
            <div className="l2-token-balance">$450.34 USD</div>
            <div className="token-buttons-container">
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?deposit`
                  router.push(href, href, { shallow: true })
                }}
              >
                Deposit
              </div>
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?withdraw`
                  router.push(href, href, { shallow: true })
                }}
              >
                Withdraw
              </div>
              <div className="token-button">Send</div>
              <div className="token-button">Exchange</div>
            </div>
          </div>
          <div className="l2-token-box">
            <div className="l2-token-name">Ethereum</div>
            <img
              className="l2-token-img"
              src="ethereum-icon.png"
              alt="Ethereum Logo"
            ></img>
            <div className="l2-token-balance">$450.34 USD</div>
            <div className="token-buttons-container">
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?deposit`
                  router.push(href, href, { shallow: true })
                }}
              >
                Deposit
              </div>
              <div
                className="token-button"
                onClick={e => {
                  e.preventDefault()
                  const href = `${router.route}?withdraw`
                  router.push(href, href, { shallow: true })
                }}
              >
                Withdraw
              </div>
              <div className="token-button">Send</div>
              <div className="token-button">Exchange</div>
            </div>
          </div>
        </div>
        <hr className="l2-token-total-balance-line"></hr>
        <div className="l2-token-total-balance">
          <div>Total</div>
          <div>$450.3</div>
        </div>
      </div>
      <div className="address-book-wrapper" id="address-book">
        <div className="address-book-title-box">
          <div className="address-book-title">Address Book</div>
          <div className="book-icon">
            <FontAwesomeIcon icon="book-open" />
          </div>
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
              editedName={props.editedName}
              editedAddress={props.editedAddress}
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
          display: flex;
          flex-direction: column;
          width: 400px;
          padding: 20px;
        }
        .l1-account-title {
          font-weight: 600;
          font-size: 32px;
          text-align: center;
        }
        .l1-account-box,
        .l2-token-box {
          border: solid 2px lightgray;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .user-address-info-box {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3px;
          width: 100%;
          border-bottom: solid 2px lightgray;
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
          font-weight: 600;
          font-size: 24px;
          margin-top: 24px;
        }
        .total-balance {
          font-size: 36px;
          font-weight: 700;
        }
        .deposit-button {
          padding: 7px;
          border-radius: 16px;
          width: 148px;
          text-align: center;
          background-color: blue;
          color: white;
          cursor: pointer;
          margin-top: 4px;
          margin-bottom: 40px;
          font-weight: 500;
        }
        .l2-token-box-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 20px;
          margin-top: 20px;
        }
        .l2-token-box-title {
          font-weight: 600;
          font-size: 32px;
          margin-left: 4px;
        }
        .l2-token-box-list {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow-x: scroll;
        }
        .l2-token-box {
          padding: 12px;
          margin-right: 20px;
        }
        .l2-token-name {
          font-size: 24px;
          font-weight: 500;
        }
        .l2-token-img {
          height: 100px;
          margin: 12px;
        }
        .l2-token-balance {
          font-size: 30px;
          font-weight: 700;
        }
        .token-buttons-container {
          width: 220px;
          height: 100px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
        }
        .token-button {
          padding: 7px;
          border-radius: 16px;
          width: 100px;
          height: 36px;
          text-align: center;
          background-color: blue;
          color: white;
          cursor: pointer;
          font-weight: 500;
        }
        .l2-token-total-balance-line {
          border: none;
          margin-top: 12px;
          width: 100%;
          height: 3px;
          background-color: #000000;
        }
        .l2-token-total-balance {
          margin-top: 4px;
          margin-left: 2px;
          font-size: 28px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          font-weight: 600;
          font-size: 32px;
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
          font-family: 'Avenir Next';
          font-size: 18px;
          font-weight: 300;
        }
        .address-input {
          width: 460px;
        }
        .address-input::placeholder {
          font-family: 'Avenir Next';
          font-size: 18px;
          font-weight: 300;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => ({
  address: state.address,
  balance: state.balance,
  addressList: state.addressList,
  editedAddress: state.editedAddress,
  editedName: state.editedName
})

const mapDispatchToProps = {
  registerAddressListItem,
  editAddressListItem,
  removeAddressListItem,
  setEditedAddress,
  setEditedName
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
