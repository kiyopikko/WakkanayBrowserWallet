import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({
  addressList,
  editAddressList,
  setEditedName,
  setEditedAddress,
  removeAddressList,
  editedNameRef,
  editedAddressRef,
  editedName,
  editedAddress
}) => (
  <tr key={addressList.id} className="address-list">
    <td className="name-section">
      <span className="name">
        {addressList.name === editedName ? (
          <input
            placeholder={'name'}
            defaultValue={addressList.name}
            className="edit-name-input"
            type="text"
            ref={editedNameRef}
          />
        ) : (
          addressList.name
        )}
      </span>
      <button
        className="edit-button"
        onClick={() => {
          if (editedName === addressList.name) {
            editAddressList({
              id: addressList.id,
              name: editedNameRef.current.value,
              address: addressList.address
            })
            setEditedName(null)
          } else {
            setEditedName(addressList.name)
          }
        }}
      >
        <FontAwesomeIcon icon="pen" />
      </button>
    </td>
    <td className="address-section">
      <span className="address">
        {addressList.address === editedAddress ? (
          <input
            placeholder={'address'}
            defaultValue={addressList.address}
            className="edit-address-input"
            type="text"
            ref={editedAddressRef}
          />
        ) : (
          addressList.address
        )}
      </span>
      <button
        className="edit-button"
        onClick={() => {
          if (editedAddress === addressList.address) {
            editAddressList({
              id: addressList.id,
              name: addressList.name,
              address: editedAddressRef.current.value
            })
            setEditedAddress(null)
          } else {
            setEditedAddress(addressList.address)
          }
        }}
      >
        <FontAwesomeIcon icon="pen" />
      </button>
    </td>
    <td>
      <button
        className="remove-button"
        onClick={() => {
          removeAddressList(addressList.id)
        }}
      >
        <FontAwesomeIcon icon="trash" />
      </button>
    </td>
    <style jsx>{`
      tr,
      th,
      td {
        font-size: 14px;
        border: 1px solid lightgray;
        padding: 4px;
        border-spacing: 0px;
      }
      .name {
        font-size: 16px;
        font-weight: 500;
      }
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
      .edit-button,
      .remove-button {
        width: 20px;
        height: 20px;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        color: darkslategrey;
      }
      .edit-button {
        margin-left: 6px;
      }
    `}</style>
  </tr>
)
