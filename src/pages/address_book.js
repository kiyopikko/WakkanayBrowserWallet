import Layout from '../components/Layout'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faUserPlus, faPen, faTrash)

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
  return (
    <Layout>
      <div className="address-book-page">
        <div className="address-book-title">Address Book</div>
        <table className="address-book-table">
          <tr>
            <th className="name-column">Name</th>
            <th className="address-column">Address</th>
            <th className="button-column"> </th>
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
              />
            </td>
            <td className="default-address">
              <input
                className="address-input"
                type="text"
                ref={addressInput}
                placeholder="0x0000000000000000000000000000000000000000"
              />
            </td>
            <td className="default-button">
              <button
                className="register-button"
                onClick={() => {
                  if (
                    nameInput.current.value !== '' &&
                    addressInput.current.value !== ''
                  ) {
                    props.registerAddressListItem({
                      id: `${Date.now()}`,
                      name: nameInput.current.value,
                      address: addressInput.current.value
                    })
                  }
                  return (
                    (nameInput.current.value = ''),
                    (addressInput.current.value = '')
                  )
                }}
              >
                <FontAwesomeIcon icon="user-plus" />
              </button>
            </td>
          </tr>
        </table>
      </div>
      <style jsx>{`
        .address-book-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .address-book-title {
          font-weight: 680;
          font-size: 28px;
          margin-top: 24px;
        }
        .address-book-table,
        tr,
        th,
        td {
          font-size: 14px;
          border: 1px solid lightgray;
          padding: 4px;
          border-spacing: 0px;
        }
        .name-column {
          min-width: 116px;
        }
        .address-column {
          min-width: 400px;
        }
        .default-button {
          width: 20px;
          height: 20px;
          font-size: 11px;
          color: darkgray;
        }
        .button-column {
          min-width: 24px;
        }
        .cancel-button {
          margin: 0px 2px;
          border: solid 1px lightgray;
          padding: 2px;
        }
        .register-button {
          border: solid 1px lightgray;
          width: 20px;
          height: 20px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          color: darkslategrey;
        }
        .address-book-table {
          width: 584px;
          margin-top: 12px;
        }
        .name-input,
        .address-input {
          padding: 4px;
          font-size: 14px;
        }
        .name-input {
          width: 72px;
          height: 24px;
        }
        .name-input::placeholder {
          font-family: 'Avenir Next';
          font-size: 14px;
          font-weight: 300;
        }
        .address-input {
          width: 372px;
          height: 24px;
          font-size: 14px;
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
