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
      <div className="name-cell">
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
      </div>
    </td>
    <td className="address-section">
      <div className="address-cell">
        <div className="address">
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
        </div>
        <div className="button-container">
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
          <div className="send-button">Send</div>
        </div>
      </div>
    </td>
    <style jsx>{`
      th,
      td {
        border-bottom: 2px solid black;
        font-size: 18px;
        height: 36px;
        padding: 8px;
      }
      .name-section,
      .address-section {
        padding: 8px;
        color: rgba(255, 255, 255, 0.74);
      }
      .name-section {
        border-right: 2px solid black;
      }
      .name-cell {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .address-cell {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .button-container {
        display: flex;
        align-items: center;
      }
      .name {
        font-size: 18px;
        font-weight: 800;
      }
      .address {
        font-size: 14px;
        font-weight: 800;
      }
      .edit-name-input {
        width: 100px;
        height: 24px;
        font-size: 18px;
        font-weight: 300;
      }
      .edit-name-input::placeholder,
      .edit-address-input::placeholder {
        font-size: 18px;
        font-weight: 300;
      }
      .edit-address-input {
        width: 460px;
        height: 28px;
        font-size: 18px;
        font-weight: 300;
      }
      .edit-button {
        width: 18px;
        height: 18px;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        color: darkgrey;
        margin-left: 20px;
        background-color: lightblue;
      }
      .remove-button {
        width: 18px;
        height: 18px;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        color: darkgrey;
        margin-left: 4px;
        background-color: lightblue;
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
    `}</style>
  </tr>
)
