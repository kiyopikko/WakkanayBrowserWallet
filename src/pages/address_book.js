import Layout from '../components/Layout'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserPlus,
  faPen,
  faTrash,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faUserPlus, faPen, faTrash, faBookOpen)

import { connect } from 'react-redux'
import React, { useRef } from 'react'
import {
  registerAddressListItem,
  editAddressListItem,
  removeAddressListItem
} from '../store/address_list_item_register'
import {
  setEditedAddress,
  setEditedName
} from '../store/address_list_item_edit'
import AddressListItem from '../components/AddressList/AddressListItem'

const addressList = props => {
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
      <div className="address-book-page">
        <div className="balance-box">
          <div className="your-balance-title">Your Ethereum Balance</div>
          <div className="balance-board">
            <img
              className="ethereum-logo"
              src="../ethereum-icon.png"
              alt="Ethereum Logo"
            ></img>
            <div className="total-balance-box">
              <span className="total-balance-number">2</span>
              <span className="total-balance-unit">ETH</span>
              <div className="balance-in-usd">$370.34 USD</div>
            </div>
          </div>
        </div>
        <div className="address-book-section">
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
      </div>
      <style jsx>{`
        .address-book-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .balance-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .your-balance-title {
          font-size: 24px;
          margin-top: 24px;
        }
        .ethereum-logo {
          width: 48px;
          margin-right: 16px;
        }
        .balance-board {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
        }
        .total-balance-number {
          font-size: 52px;
          font-weight: 650;
        }
        .total-balance-unit {
          font-size: 30px;
          font-weight: 650;
          margin-left: 8px;
        }
        .balance-in-usd {
          color: darkgray;
          font-size: 18px;
          font-weight: 650;
        }
        .address-book-section {
          height: 288px;
          display: flex;
          flex-direction: column;
          padding: 20px 24px;
          margin: 24px;
          background-color: #fcf7f5;
          border: solid lightgray 2px;
          border-radius: 6px;
        }
        .address-book-title-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .address-book-title {
          font-weight: 700;
          font-size: 28px;
        }
        .book-icon {
          font-size: 18px;
          margin-left: 8px;
        }
        .address-book-table {
          border-spacing: 0px;
          text-align: left;
          border: 1px solid lightgray;
        }
        th,
        td {
          border: 1px solid lightgray;
          font-size: 14px;
          border-spacing: 0px;
          height: 32px;
        }
        th {
          padding: 4px 6px;
          font-weight: 500;
        }
        .name-column {
          min-width: 100px;
        }
        .cancel-button {
          margin: 0px 2px;
          border: solid 1px lightgray;
          padding: 2px;
        }
        .address-book-wrapper {
          background-color: #fcf7f5;
          border: solid lightgray 2px;
          border-radius: 6px;
        }
        .address-book-table {
          background-color: white;
          width: 502px;
          margin-top: 12px;
        }
        .name-input,
        .address-input {
          height: 30px;
          padding: 4px;
          font-size: 14px;
          border: none;
        }
        .name-input {
          width: 72px;
        }
        .name-input::placeholder {
          font-family: 'Avenir Next';
          font-size: 14px;
          font-weight: 300;
        }
        .address-input {
          width: 353px;
        }
        .address-input::placeholder {
          font-family: 'Avenir Next';
          font-size: 14px;
          font-weight: 300;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(addressList)
