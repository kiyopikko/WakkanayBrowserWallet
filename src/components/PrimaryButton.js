import { EXTRABOLD } from '../fonts'
import { PRIMARY_BUTTON_TEXT } from '../colors'

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
          width: 108px;
          height: 40px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: ${EXTRABOLD};
          background: linear-gradient(122.3deg, #ec8383 0.21%, #c13087 93.55%);
          color: ${PRIMARY_BUTTON_TEXT};
          cursor: pointer;
        }
      `}</style>
    </button>
  )
}
