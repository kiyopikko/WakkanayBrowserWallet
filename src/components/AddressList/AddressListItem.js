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
      th,
      td {
        border: 1px solid lightgray;
        font-size: 14px;
        height: 32px;
        padding: 4px;
      }
      th {
        padding: 4px;
        font-weight: 500;
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
        width: 328px;
        height: 24px;
        font-size: 13px;
        font-weight: 300;
        padding: 4px;
      }
      .edit-address-input::placeholder {
        font-family: 'Avenir Next';
        font-size: 14px;
        font-weight: 300;
      }
      .edit-button {
        width: 18px;
        height: 18px;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        color: darkslategrey;
        margin-left: 4px;
      }
      .remove-button {
        width: 18px;
        height: 18px;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        color: darkslategrey;
        margin: 4px 0px;
        margin-left: 4px;
      }
    `}</style>
  </tr>
)
