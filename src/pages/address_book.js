import Layout from '../components/Layout'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faUserPlus, faPen, faTrash)

import { connect } from 'react-redux'
import React, { useRef } from 'react'
import {
  registerAddressList,
  editAddressList,
  removeAddressList
} from '../store/address_book_register'
import { setEditedAddress, setEditedName } from '../store/address_book_edit'
import AddressListItem from '../components/AddressBook/AddressListItem'

const addressBook = props => {
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
            <th className="remove-button-column"> </th>
          </tr>
          {props.addressLists.length === 0 ? (
            <tr>
              <td className="default-name">e.g. Alice</td>
              <td className="default-address">
                e.g. 0x0000000000000000000000000000000000000000
              </td>
              <td className="default-remove-button">
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
          ) : (
            props.addressLists.map(addressList => (
              <AddressListItem
                addressList={addressList}
                editAddressList={props.editAddressList}
                setEditedName={props.setEditedName}
                setEditedAddress={props.setEditedAddress}
                removeAddressList={props.removeAddressList}
                editedNameRef={editedNameRef}
                editedAddressRef={editedAddressRef}
                editedName={props.editedName}
                editedAddress={props.editedAddress}
              />
            ))
          )}
        </table>
        <div className="register-section">
          <div className="register-address-title-box">
            <div className="register-new-address">
              Register Frequent Recepitent
            </div>
            <div className="register-icon">
              <FontAwesomeIcon icon="user-plus" />
            </div>
          </div>
          <div className="name-address-list-box">
            <div className="name-box">
              <div className="name-tag">
                <a className="name-title">Name:</a>
              </div>
              <input className="name-input" type="text" ref={nameInput} />
            </div>
            <div className="address-box">
              <div className="address-tag">
                <a className="address-title">Address:</a>
              </div>
              <input className="address-input" type="text" ref={addressInput} />
            </div>
          </div>
          <div className="cancel-register-buttons">
            <div
              className="cancel-button"
              onClick={() => {
                return (
                  (nameInput.current.value = ''),
                  (addressInput.current.value = '')
                )
              }}
            >
              <a className="cancel">Cancel</a>
            </div>
            <div className="register-button">
              <a
                className="register"
                onClick={() => {
                  if (
                    nameInput.current.value !== '' &&
                    addressInput.current.value !== ''
                  ) {
                    props.registerAddressList({
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
                Register
              </a>
            </div>
          </div>
        </div>
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
        .remove-button-column {
          min-width: 30px;
        }
        .address-book-table {
          width: 560px;
          text-align: center;
          margin-top: 12px;
        }
        .default-name,
        .default-address {
          text-align: initial;
          color: darkgray;
        }
        .default-remove-button {
          width: 20px;
          height: 20px;
          font-size: 11px;
          color: darkgray;
        }
        .register-section {
          width: 568px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px;
          margin: 24px;
          background-color: #fcf7f5;
          border: solid lightgray 2px;
          border-radius: 6px;
        }
        .register-address-title-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .register-new-address {
          font-size: 18px;
          font-weight: 680;
        }
        .register-icon {
          font-size: 18px;
          margin-left: 8px;
        }
        .name-address-list-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .name-box,
        .address-box {
          margin: 8px 0px;
        }
        .address-box {
          margin-left: 12px;
        }
        .name-title,
        .address-title {
          font-size: 16px;
          font-weight: 500;
        }
        .name-input,
        .address-input {
          padding: 4px;
          border: solid 1px lightgray;
          font-size: 16px;
          border-radius: 6px;
        }
        .name-input {
          width: 148px;
        }
        .address-input {
          width: 372px;
          font-size: 14px;
        }
        .cancel-register-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin-top: 12px;
          width: inherit;
        }
        .cancel-button,
        .register-button {
          padding: 3px 4px;
          border: solid gray 2px;
          width: 104px;
          text-align: center;
          background-color: white;
          border-radius: 6px;
          margin-right: 8px;
          cursor: pointer;
        }
        .cancel,
        .register {
          font-size: smaller;
          font-weight: 680;
        }
      `}</style>
    </Layout>
  )
}

const mapStateToProps = state => ({
  addressLists: state.addressLists,
  editedAddress: state.editedAddress,
  editedName: state.editedName
})

const mapDispatchToProps = {
  registerAddressList,
  editAddressList,
  removeAddressList,
  setEditedAddress,
  setEditedName
}

export default connect(mapStateToProps, mapDispatchToProps)(addressBook)
