import { EXTRABOLD, SMALL } from '../fonts'
import { MAIN, PRIMARY_BUTTON_TEXT } from '../colors'

export const PrimaryButton = props => {
  return (
    <button className="primary-button" onClick={props.onClick}>
      {props.children}
      <style jsx>{`
        .primary-button {
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 2rem;
          width: 100%;
          height: ${props.height || 50}px;
          border-radius: ${props.height || 50}px;
          font-size: ${SMALL};
          font-weight: ${EXTRABOLD};
          transition: background-color 0.3s ease;
          background-color: ${MAIN};
          color: ${PRIMARY_BUTTON_TEXT};
          cursor: pointer;
        }
        .primary-button:hover {
          background-color: #cf4a86;
        }
      `}</style>
    </button>
  )
}
