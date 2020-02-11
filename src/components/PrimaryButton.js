import { EXTRABOLD } from '../fonts'

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
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
        }
      `}</style>
    </button>
  )
}
