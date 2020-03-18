import { BACKGROUND, Black } from '../../colors'
import { FZ_MEDIUM, FW_BOLD } from '../../fonts'

export default props => {
  return (
    <React.Fragment>
      <input
        {...props}
        className={`input ${props.isfull ? 'isFull' : ''} ${props.className}`}
      />
      <style jsx>{`
        .input {
          background: ${BACKGROUND};
          padding: 1rem 1.25rem;
          border-radius: 1.875rem;
          display: block;
          font-size: ${FZ_MEDIUM};
          font-weight: ${FW_BOLD};
        }
        .isFull {
          width: 100%;
        }
        .input::placeholder {
          color: ${Black(0.1)};
        }
      `}</style>
    </React.Fragment>
  )
}
