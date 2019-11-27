import Layout from '../components/Layout'

//react-font-awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSignOutAlt)

import { connect } from 'react-redux'
import React, { useRef } from 'react'
import {
  registerAddressList,
  editAddressList,
  removeAddressList
} from '../store/address_book_register'
import { setEditedAddress, setEditedName } from '../store/address_book_edit'

const addressBook = props => {
  const nameInput = useRef('')
  const addressInput = useRef('')
  const editedName = useRef('')
  const editedAddress = useRef('')
  return (
    <Layout>
      <div className="address-book-page">
        <div className="address-book-title">Address Book</div>
        <table className="address-book-table">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th> </th>
          </tr>
          {props.addressLists.map(addressList => (
            <tr key={addressList.address} className="address-list">
              <td className="name-section">
                <div className="name">
                  {addressList.name === props.editedName ? (
                    <input
                      placeholder={'name'}
                      defaultValue={addressList.name}
                      className="edit-name-input"
                      type="text"
                      ref={editedName}
                    />
                  ) : (
                    addressList.name
                  )}
                </div>
                <button
                  className="edit-name-button"
                  onClick={() => {
                    if (props.editedName === addressList.name) {
                      props.editAddressList({
                        id: addressList.id,
                        name: editedName.current.value,
                        address: addressList.address
                      })
                      props.setEditedName(null)
                    } else {
                      props.setEditedName(addressList.name)
                    }
                  }}
                >
                  Edit Name
                </button>
              </td>
              <td className="address-section">
                <div className="address">
                  {addressList.address === props.editedAddress ? (
                    <input
                      placeholder={'address'}
                      defaultValue={addressList.address}
                      className="edit-address-input"
                      type="text"
                      ref={editedAddress}
                    />
                  ) : (
                    addressList.address
                  )}
                </div>
                <button
                  className="edit-address-button"
                  onClick={() => {
                    if (props.editedAddress === addressList.address) {
                      props.editAddressList({
                        id: addressList.id,
                        name: addressList.name,
                        address: editedAddress.current.value
                      })
                      props.setEditedAddress(null)
                    } else {
                      props.setEditedAddress(addressList.address)
                    }
                  }}
                >
                  Edit Address
                </button>
              </td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => {
                    props.removeAddressList(addressList.id)
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="register-section">
          <div className="register-address-title-box">
            <div className="register-new-address">
              Register Frequent Recepitent
            </div>
            <div className="send-icon">
              <FontAwesomeIcon icon="sign-out-alt" />
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
            <div className="cancel-button">
              <a className="cancel">Cancel</a>
            </div>
            <div className="register-button">
              <a
                className="register"
                onClick={() => {
                  props.registerAddressList({
                    id: `${Date.now()}`,
                    name: nameInput.current.value,
                    address: addressInput.current.value
                  })
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
        .address-list {
        }
        .address-book-table {
          width: 560px;
          text-align: center;
          margin-top: 12px;
        }
        .name-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .name,
        .address {
          font-size: 14px;
          font-weight: 500;
        }
        .edit-name-input {
          width: 72px;
          height: 20px;
          font-size: 14px;
          font-weight: 300;
          padding: 2px;
        }
        .edit-address-input {
          width: 370px;
          height: 20px;
          font-size: 14px;
          font-weight: 300;
          padding: 2px;
        }
        .edit-name-button {
          width: 72px;
          margin: 4px;
          height: 20px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          padding: 2px;
          cursor: pointer;
        }
        .edit-address-button {
          width: 84px;
          margin: 4px;
          height: 20px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          padding: 2px;
          cursor: pointer;
        }
        .remove-button {
          width: 56px;
          margin: 4px;
          height: 20px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          padding: 2px;
          cursor: pointer;
        }
        .register-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 12px 20px;
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
        .send-icon {
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
          margin-left: 20px;
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
          width: 160px;
        }
        .address-input {
          width: 280px;
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
