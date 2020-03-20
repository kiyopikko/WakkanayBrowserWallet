import { MAIN, White, MAIN_DARK } from '../../colors'
import { FZ_MEDIUM, FW_BLACK } from '../../fonts'

export default props => {
  return (
    <button
      {...props}
      className={`button ${props.isfull ? 'isFull' : ''} ${
        props.small ? 'small' : ''
      } ${props.className}`}
    >
      {props.children}
      <style jsx>{`
        .button {
          background: ${MAIN};
          color: ${White()};
          padding: 1rem 1.25rem;
          border-radius: 1.875rem;
          display: block;
          font-size: ${FZ_MEDIUM};
          font-weight: ${FW_BLACK};
          cursor: pointer;
        }
        .button:hover {
          background: ${MAIN_DARK};
        }
        .isFull {
          width: 100%;
        }
        .small {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
        }
      `}</style>
    </button>
  )
}
