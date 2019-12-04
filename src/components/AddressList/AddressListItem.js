import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({
  addressListItem,
  editAddressListItem,
  setEditedName,
  setEditedAddress,
  removeAddressListItem,
  editedNameRef,
  editedAddressRef,
  editedName,
  editedAddress
}) => (
  <tr key={addressListItem.id} className="address-list">
    <td className="name-section">
      <span className="name">
        {addressListItem.name === editedName ? (
          <input
            placeholder={'name'}
            defaultValue={addressListItem.name}
            className="edit-name-input"
            type="text"
            ref={editedNameRef}
          />
        ) : (
          addressListItem.name
        )}
      </span>
      <button
        className="edit-button"
        onClick={() => {
          if (editedName === addressListItem.name) {
            editAddressListItem({
              id: addressListItem.id,
              name: editedNameRef.current.value,
              address: addressListItem.address
            })
            setEditedName(null)
          } else {
            setEditedName(addressListItem.name)
          }
        }}
      >
        <FontAwesomeIcon icon="pen" />
      </button>
    </td>
    <td className="address-section">
      <span className="address">
        {addressListItem.address === editedAddress ? (
          <input
            placeholder={'address'}
            defaultValue={addressListItem.address}
            className="edit-address-input"
            type="text"
            ref={editedAddressRef}
          />
        ) : (
          addressListItem.address
        )}
      </span>
      <button
        className="edit-button"
        onClick={() => {
          if (editedAddress === addressListItem.address) {
            editAddressListItem({
              id: addressListItem.id,
              name: addressListItem.name,
              address: editedAddressRef.current.value
            })
            setEditedAddress(null)
          } else {
            setEditedAddress(addressListItem.address)
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
          removeAddressListItem(addressListItem.id)
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
        font-size: 14px;
        font-weight: 300;
      }
      .address {
        font-size: 14px;
        font-weight: 300;
      }
      .edit-name-input {
        width: 72px;
        height: 24px;
        font-size: 14px;
        font-weight: 300;
        padding: 4px;
      }
      .edit-name-input::placeholder {
        font-family: 'Avenir Next';
        font-size: 14px;
        font-weight: 300;
      }
      .edit-address-input {
        width: 370px;
        height: 24px;
        font-size: 14px;
        font-weight: 300;
        padding: 4px;
      }
      .edit-address-input::placeholder {
        font-family: 'Avenir Next';
        font-size: 14px;
        font-weight: 300;
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
