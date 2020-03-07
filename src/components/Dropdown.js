import ClickOutside from 'react-click-outside'
import { TEXT, SUBTEXT, Black } from '../colors'
import classNames from 'classnames'
import React, { useState } from 'react'
const Dropdown = ({
  onselect,
  topButtonName,
  items,
  renderItem,
  width,
  selectedItem
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="dropdown">
      <button
        className="dropdown-button"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <div className="top-button-name">{topButtonName(selectedItem)}</div>
      </button>
      <ClickOutside
        onClickOutside={() => {
          setIsOpen(false)
        }}
      >
        <div
          className={classNames(
            isOpen ? 'dropdown-open' : 'dropdown-closed',
            'dropdown-content'
          )}
        >
          {items.map(item => (
            <div
              key={item}
              className="dropdown-item"
              onClick={e => {
                e.preventDefault()
                onselect(item.tokenContractAddress)
                setIsOpen(false)
              }}
            >
              {renderItem ? renderItem(item) : item.unit}
            </div>
          ))}
        </div>
      </ClickOutside>
      <style jsx>{`
        .dropdown {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .dropdown-button {
          background: transparent;
          background-image: url('/chevron-down.svg');
          background-repeat: no-repeat;
          background-position: calc(100% - 0.7rem) 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${width ? width : '100%'};
          height: 100%;
          border: none;
          cursor: pointer;
          position: relative;
          color: #ffffff;
        }
        .top-button-name {
          width: 100%;
        }
        .dropdown-closed {
          display: none;
        }
        .dropdown-open {
          display: block;
        }
        .dropdown-content {
          color: ${SUBTEXT};
          position: absolute;
          border-bottom: none;
          background: ${Black(0.9)};
          border-radius: 3px;
          left: -7px;
          top: calc(100% - 0.5rem);
          width: calc(100% + 1rem);
        }
        .dropdown-item:hover {
          color: ${TEXT};
          background: ${Black(1)};
        }
      `}</style>
    </div>
  )
}

export default Dropdown
